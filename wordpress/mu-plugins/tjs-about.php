<?php
/**
 * Plugin Name: TJS About Pages
 * Description: Editing screens for the website's About menu (tjs-nextjs /about/*): About T.J.S, Chairman, Secretary, The Director, Principal, Directors, Governing Council, Committees and Organogram. Each page is read via GET /wp-json/tjs/v1/about/<slug>, e.g. /wp-json/tjs/v1/about/chairman.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

/* -------------------------------------------------------------------------
 * 1. Which About pages exist, and the shape of each one's fields.
 *    "trustee" pages (Chairman, Secretary, The Director, Principal) all
 *    share one shape: a photo + message, like the website's trustee layout.
 * ---------------------------------------------------------------------- */

function tjs_about_trustee_fields() {
    return [
        tjs_text('name', 'Name', ['required' => 1, 'placeholder' => 'e.g. Dr. J. Prakash']),
        tjs_text('qualification', 'Qualification (optional)', ['placeholder' => 'e.g. M.E., Ph.D., MISTE., MIE.,']),
        tjs_text('role', 'Role', ['required' => 1, 'placeholder' => 'e.g. Principal']),
        tjs_text('org', 'Organisation line (optional)', ['placeholder' => 'e.g. T.J.S. Engineering College']),
        tjs_image('photo', 'Photo'),
        tjs_editor('message', 'Message'),
        tjs_text('quote_text', 'Quote (optional)', ['placeholder' => 'e.g. Education is the most powerful weapon which you can use to change the world.']),
        tjs_text('quote_author', 'Quote author (optional)', ['placeholder' => 'e.g. Nelson Mandela']),
    ];
}

function tjs_about_tjs_fields() {
    return [
        tjs_editor('about', 'About'),
        tjs_editor('vision', 'Vision'),
        tjs_editor('mission', 'Mission (bullet list)'),
    ];
}

function tjs_about_directors_fields() {
    return [
        tjs_repeater('members', 'Directors', '+ Add Director', [
            tjs_text('name', 'Name', array_merge(tjs_half(), ['required' => 1])),
            tjs_text('qualification', 'Qualification (optional)', tjs_half()),
            tjs_text('role', 'Role', array_merge(tjs_half(), ['placeholder' => 'e.g. Director'])),
            tjs_image('photo', 'Photo', tjs_half()),
        ], ['collapsed' => 'name']),
        tjs_editor('message', "Directors' Message"),
    ];
}

function tjs_about_governing_council_fields() {
    return [
        tjs_repeater('members', 'Members', '+ Add Member', [
            tjs_text('name', 'Name', array_merge(tjs_half(), ['required' => 1])),
            tjs_text('position', 'Position', array_merge(tjs_half(), ['placeholder' => 'e.g. Chairman / Member / Member Secretary', 'instructions' => 'A member with position "Chairman" is highlighted on the website.'])),
            tjs_text('designation', 'Designation', ['placeholder' => 'e.g. Trustee, TJS Group of Institutions']),
            tjs_image('photo', 'Photo (optional)'),
        ], ['collapsed' => 'name']),
    ];
}

function tjs_about_committees_fields() {
    return [
        tjs_repeater('committees', 'Committees', '+ Add Committee', [
            tjs_text('name', 'Committee name', ['required' => 1, 'placeholder' => 'e.g. Internal Committee (ICC)']),
            tjs_editor('intro', 'Intro content (optional, shown above the members table)'),
            tjs_repeater('members', 'Members', '+ Add Member', [
                tjs_text('name', 'Name', tjs_half()),
                tjs_text('designation', 'Designation', tjs_half()),
                tjs_text('position', 'Position', tjs_half()),
                tjs_text('email', 'Email (optional)', tjs_half()),
            ], ['layout' => 'table']),
        ], ['collapsed' => 'name']),
    ];
}

function tjs_about_organogram_fields() {
    return [tjs_image('image', 'Organogram image')];
}

/** slug => [menu title, icon, fields callback, field names to expose via REST] */
function tjs_about_pages() {
    $trustee_names = ['name', 'qualification', 'role', 'org', 'photo', 'message', 'quote_text', 'quote_author'];
    return [
        'about-tjs' => ['About T.J.S', 'dashicons-info', 'tjs_about_tjs_fields', ['about', 'vision', 'mission']],
        'chairman' => ['Chairman', 'dashicons-businessman', 'tjs_about_trustee_fields', $trustee_names],
        'secretary' => ['Secretary', 'dashicons-businessman', 'tjs_about_trustee_fields', $trustee_names],
        'the-director' => ['The Director', 'dashicons-businessman', 'tjs_about_trustee_fields', $trustee_names],
        'principal' => ['Principal', 'dashicons-businessman', 'tjs_about_trustee_fields', $trustee_names],
        'directors' => ['Directors', 'dashicons-groups', 'tjs_about_directors_fields', ['members', 'message']],
        'governing-council' => ['Governing Council', 'dashicons-groups', 'tjs_about_governing_council_fields', ['members']],
        'committees' => ['Committees', 'dashicons-list-view', 'tjs_about_committees_fields', ['committees']],
        'organogram' => ['Organogram', 'dashicons-networking', 'tjs_about_organogram_fields', ['image']],
    ];
}

/* -------------------------------------------------------------------------
 * 2. Admin menu: About → one sub-page per item above
 * ---------------------------------------------------------------------- */

add_action('acf/init', function () {
    if (!function_exists('acf_add_options_page')) {
        return;
    }
    acf_add_options_page([
        'page_title' => 'About Pages',
        'menu_title' => 'About',
        'menu_slug' => 'tjs-about',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-info',
        'position' => 4,
        'redirect' => true,
    ]);
    foreach (tjs_about_pages() as $slug => $page) {
        [$title, $icon] = $page;
        acf_add_options_sub_page([
            'page_title' => $title,
            'menu_title' => $title,
            'menu_slug' => 'tjs-about-' . $slug,
            'parent_slug' => 'tjs-about',
            'capability' => 'edit_posts',
            'post_id' => 'about_' . str_replace('-', '_', $slug),
            'update_button' => 'Save ' . $title . ' Page',
            'updated_message' => $title . ' page saved. Changes will appear on the website shortly.',
        ]);
    }
});

/* -------------------------------------------------------------------------
 * 3. Field groups — one per About sub-page
 * ---------------------------------------------------------------------- */

add_action('acf/include_fields', function () {
    if (!function_exists('acf_add_local_field_group') || !function_exists('tjs_assign_keys')) {
        return;
    }
    foreach (tjs_about_pages() as $slug => $page) {
        [$title, , $fields_fn] = $page;
        $key_prefix = 'tjsab' . str_replace('-', '', $slug);
        acf_add_local_field_group([
            'key' => 'group_tjs_about_' . str_replace('-', '_', $slug),
            'title' => $title . ' Content',
            'fields' => tjs_assign_keys($fields_fn(), $key_prefix),
            'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'tjs-about-' . $slug]]],
            'style' => 'seamless',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
        ]);
    }
});

/* -------------------------------------------------------------------------
 * 4. REST API: GET /wp-json/tjs/v1/about/<slug> (public)
 *    POST (admins only, used for the initial content import)
 * ---------------------------------------------------------------------- */

add_action('rest_api_init', function () {
    register_rest_route('tjs/v1', '/about/(?P<slug>[a-z-]+)', [
        [
            'methods' => 'GET',
            'permission_callback' => '__return_true',
            'callback' => function (WP_REST_Request $request) {
                $pages = tjs_about_pages();
                $slug = $request->get_param('slug');
                if (!isset($pages[$slug])) {
                    return new WP_Error('tjs_not_found', 'No such About page.', ['status' => 404]);
                }
                [, , , $field_names] = $pages[$slug];
                $post_id = 'about_' . str_replace('-', '_', $slug);
                $out = [];
                foreach ($field_names as $name) {
                    $out[$name] = get_field($name, $post_id);
                }
                return $out;
            },
        ],
        [
            'methods' => 'POST',
            'permission_callback' => function () {
                return current_user_can('manage_options');
            },
            'callback' => function (WP_REST_Request $request) {
                $pages = tjs_about_pages();
                $slug = $request->get_param('slug');
                if (!isset($pages[$slug])) {
                    return new WP_Error('tjs_not_found', 'No such About page.', ['status' => 404]);
                }
                [, , , $field_names] = $pages[$slug];
                $key_prefix = 'tjsab' . str_replace('-', '', $slug);
                $post_id = 'about_' . str_replace('-', '_', $slug);
                $body = (array) $request->get_json_params();
                foreach ($field_names as $name) {
                    if (array_key_exists($name, $body)) {
                        update_field('field_' . $key_prefix . '_' . $name, $body[$name], $post_id);
                    }
                }
                return ['saved' => true];
            },
        ],
    ]);
});

/* -------------------------------------------------------------------------
 * 5. Admin styling
 * ---------------------------------------------------------------------- */

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen || strpos($screen->id, 'tjs-about') === false) {
        return;
    }
    ?>
    <style>
        .tjs-section-heading { border-top: 0 !important; }
        .tjs-section-heading > .acf-label label { font-size: 17px; color: #1d2a6b; }
        .acf-repeater .acf-actions .acf-button { font-size: 13px; padding: 4px 14px; }
    </style>
    <?php
});
