<?php
/**
 * Plugin Name: TJS REST Cache
 * Description: Caches the public JSON the website reads (GET /wp-json/tjs/v1/* and /wp/v2/departments, /wp/v2/sh-departments) so repeated requests skip rebuilding every field, and slims image/file objects to the parts the website uses. The whole cache is invalidated whenever content, media or these mu-plugins change. Responses carry an "X-TJS-Cache: HIT|MISS" header.
 * Version: 1.0.0
 *
 * Why: the host (Hostinger) caps how many PHP requests it serves at once, and a website
 * build asks for every page's data together — each department alone is 200–550 KB of
 * ACF output. Serving stored JSON keeps those requests cheap so they stay under the cap.
 */

if (!defined('ABSPATH')) {
    exit;
}

const TJS_REST_CACHE_TTL = 6 * HOUR_IN_SECONDS; // safety net; saves invalidate immediately

/** Whether a request is one the website makes and may be served from the cache. */
function tjs_rest_cache_applies(WP_REST_Request $request) {
    if ($request->get_method() !== 'GET' || is_user_logged_in()) {
        return false; // logged-in reads (admin tools, imports) always get fresh, full data
    }
    return (bool) preg_match('#^/(tjs/v1/|wp/v2/(departments|sh-departments)(/|$))#', $request->get_route());
}

/**
 * Cache key: the route and query, plus a version that changes on every content save
 * and whenever an mu-plugin file changes (new fields must show up straight away).
 */
function tjs_rest_cache_key(WP_REST_Request $request) {
    $params = $request->get_query_params();
    ksort($params);
    $plugins_mtime = 0;
    foreach (glob(WPMU_PLUGIN_DIR . '/*.php') ?: [] as $file) {
        $plugins_mtime = max($plugins_mtime, (int) @filemtime($file));
    }
    $version = (int) get_option('tjs_rest_cache_version', 1);
    return 'tjs_rc_' . md5($version . '|' . $plugins_mtime . '|' . $request->get_route() . '|' . wp_json_encode($params));
}

/**
 * The key of a request, worked out once — before the route runs. Core /wp/v2 routes
 * sanitize their query params in place while running (e.g. slug becomes an array), so
 * a key computed afterwards would never match the one used to look the copy up.
 */
function tjs_rest_cache_request_key(WP_REST_Request $request) {
    static $keys = [];
    $id = spl_object_id($request);
    if (!isset($keys[$id])) {
        $keys[$id] = tjs_rest_cache_key($request);
    }
    return $keys[$id];
}

/**
 * Reduces SCF/ACF attachment arrays (image, file and gallery values) to the parts the
 * website uses, dropping the per-size URLs and other metadata. Other values are kept.
 */
function tjs_rest_cache_slim($value) {
    if (!is_array($value)) {
        return $value;
    }
    if (isset($value['mime_type'], $value['url']) && (isset($value['sizes']) || isset($value['filename']))) {
        return array_intersect_key($value, array_flip(['ID', 'id', 'title', 'filename', 'url', 'alt', 'mime_type', 'width', 'height']));
    }
    foreach ($value as $k => $v) {
        $value[$k] = tjs_rest_cache_slim($v);
    }
    return $value;
}

// Serve a stored copy before the route runs.
add_filter('rest_pre_dispatch', function ($result, $server, $request) {
    if ($result !== null || !tjs_rest_cache_applies($request)) {
        return $result;
    }
    $cached = get_transient(tjs_rest_cache_request_key($request));
    if (!is_array($cached) || !array_key_exists('data', $cached)) {
        return $result;
    }
    $response = new WP_REST_Response($cached['data'], 200);
    $response->header('X-TJS-Cache', 'HIT');
    return $response;
}, 10, 3);

// Slim and store fresh successful responses (after core's _fields filtering at priority 10).
add_filter('rest_post_dispatch', function ($response, $server, $request) {
    if (!($response instanceof WP_REST_Response) || !tjs_rest_cache_applies($request)) {
        return $response;
    }
    $headers = $response->get_headers();
    if (($headers['X-TJS-Cache'] ?? '') === 'HIT') {
        return $response;
    }
    if ($response->get_status() !== 200) {
        return $response;
    }
    $data = tjs_rest_cache_slim($response->get_data());
    $response->set_data($data);
    $response->header('X-TJS-Cache', 'MISS');
    set_transient(tjs_rest_cache_request_key($request), ['data' => $data], TJS_REST_CACHE_TTL);
    return $response;
}, 99, 3);

/* -------------------------------------------------------------------------
 * Invalidation: any content change bumps the version (once per request).
 * Old entries are never read again and expire on their own.
 * ---------------------------------------------------------------------- */

function tjs_rest_cache_bump() {
    update_option('tjs_rest_cache_version', (int) get_option('tjs_rest_cache_version', 1) + 1, false);
}

function tjs_rest_cache_flush_later() {
    static $queued = false;
    if (!$queued) {
        $queued = true;
        add_action('shutdown', 'tjs_rest_cache_bump');
    }
}

foreach ([
    'acf/save_post',        // admin "Save" / "Update" on options pages and posts
    'save_post',
    'deleted_post',
    'trashed_post',
    'untrashed_post',
    'add_attachment',
    'edit_attachment',
    'attachment_updated',
    'delete_attachment',
] as $hook) {
    add_action($hook, 'tjs_rest_cache_flush_later');
}

// Field updates from code and REST imports (update_field). acf/update_value is a
// filter, so the value must be passed through unchanged.
add_filter('acf/update_value', function ($value) {
    tjs_rest_cache_flush_later();
    return $value;
}, 99);
