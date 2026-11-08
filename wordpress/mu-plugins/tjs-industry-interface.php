<?php
/**
 * Plugin Name: TJS Industry Interface
 * Description: Editing screens for the website's Industry Interface menu under one "Industry Interface" admin menu: About (/industry-interface/about), Professor of Practice (/industry-interface/professor-of-practice) and Industry Academy Conclave (/industry-interface/industry-academy-conclave). List of MoUs and IV Forms (their own plugins) sit in the same menu. Read via GET /wp-json/tjs/v1/industry/<page>.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * and the facility-page fields from tjs-campus-life.php (mu-plugins load alphabetically,
 * so both are already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * The pages: admin slug => [SCF post id, REST route, field key prefix, menu title].
 * Order = order in the admin menu (matches the website's Industry Interface menu).
 */
function tjs_industry_pages() {
    return [
        'tjs-industry-about' => ['industry_about', 'industry/about', 'tjsiab', 'About'],
        'tjs-professor-of-practice' => ['professor_of_practice', 'industry/professor-of-practice', 'tjspop', 'Professor of Practice'],
        'tjs-industry-conclave' => ['industry_conclave', 'industry/conclave', 'tjsiac', 'Industry Academy Conclave'],
    ];
}

add_action('acf/init', function () {
    if (!function_exists('acf_add_options_page')) {
        return;
    }
    acf_add_options_page([
        'page_title' => 'Industry Interface',
        'menu_title' => 'Industry Interface',
        'menu_slug' => 'tjs-industry-interface',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-networking',
        'position' => 8,
        'redirect' => true, // opens the first page below
    ]);
    foreach (tjs_industry_pages() as $slug => [$post_id, , , $menu_title]) {
        acf_add_options_sub_page([
            'page_title' => $menu_title . ' Page',
            'menu_title' => $menu_title,
            'menu_slug' => $slug,
            'parent_slug' => 'tjs-industry-interface',
            'capability' => 'edit_posts',
            'post_id' => $post_id,
            'update_button' => 'Save ' . $menu_title,
            'updated_message' => $menu_title . ' saved. Changes will appear on the website shortly.',
        ]);
    }
});

/* -------------------------------------------------------------------------
 * Fields
 * ---------------------------------------------------------------------- */

function tjs_industry_professor_fields() {
    return [
        tjs_heading('How to edit this page', 'Add each Professor of Practice with <strong>+ Add Professor</strong>, drag the ☰ handle to re-order, and the <strong>–</strong> button to remove. Click <strong>Save Professor of Practice</strong> when done.'),
        tjs_text('page_title', 'Page heading', ['placeholder' => 'e.g. Professor of Practice']),
        tjs_editor('intro', 'Introduction', ['instructions' => 'e.g. what the Professor of Practice scheme is and how industry experts support teaching at the college.']),
        tjs_repeater('professors', 'Professors of Practice', '+ Add Professor', [
            tjs_image('photo', 'Photo (optional)'),
            tjs_text('name', 'Name', array_merge(tjs_half(), ['required' => 1, 'placeholder' => 'e.g. Mr. R. Kumar'])),
            tjs_text('designation', 'Designation & organisation', array_merge(tjs_half(), ['placeholder' => 'e.g. Senior Manager, ABC Technologies'])),
            tjs_text('department', 'Department at T.J.S (optional)', array_merge(tjs_half(), ['placeholder' => 'e.g. Department of ECE'])),
            tjs_text('period', 'Period (optional)', array_merge(tjs_half(), ['placeholder' => 'e.g. 2025-26'])),
            tjs_textarea('expertise', 'Area of expertise (optional)', ['rows' => 2]),
        ], ['collapsed' => 'name']),
    ];
}

function tjs_industry_conclave_fields() {
    return [
        tjs_heading('How to edit this page', 'Add each conclave with <strong>+ Add Conclave</strong> (title, date, description, photos and the speakers / guests). The website groups them by year, newest first. Click <strong>Save Industry Academy Conclave</strong> when done.'),
        tjs_text('page_title', 'Page heading', ['placeholder' => 'e.g. Industry Academy Conclave']),
        tjs_editor('intro', 'Introduction'),
        tjs_event_repeater('conclaves', 'Conclaves', '+ Add Conclave', [
            tjs_people_subrepeater('coordinators', 'Speakers / guests (optional)', '+ Add Person', 'Designation & organisation'),
        ]),
    ];
}

/** Fields of one page, by admin slug. */
function tjs_industry_fields($slug) {
    switch ($slug) {
        case 'tjs-industry-about':
            // Same layout as the Campus Life facility pages: intro, photos, highlight cards, more text.
            return tjs_campus_life_facility_fields('About');
        case 'tjs-professor-of-practice':
            return tjs_industry_professor_fields();
        case 'tjs-industry-conclave':
            return tjs_industry_conclave_fields();
    }
    return [];
}

/** Saved (non-layout) field names of one page. */
function tjs_industry_field_names($slug) {
    $names = [];
    foreach (tjs_industry_fields($slug) as $f) {
        if ($f['name'] !== '' && !in_array($f['type'], ['tab', 'message'], true)) {
            $names[] = $f['name'];
        }
    }
    return $names;
}

add_action('acf/include_fields', function () {
    if (!function_exists('acf_add_local_field_group') || !function_exists('tjs_assign_keys') || !function_exists('tjs_campus_life_facility_fields')) {
        return;
    }
    foreach (tjs_industry_pages() as $slug => [, , $prefix, $menu_title]) {
        acf_add_local_field_group([
            'key' => 'group_' . $prefix,
            'title' => $menu_title . ' Content',
            'fields' => tjs_assign_keys(tjs_industry_fields($slug), $prefix),
            'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => $slug]]],
            'style' => 'seamless',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
        ]);
    }
});

/* -------------------------------------------------------------------------
 * REST API: GET (public) / POST (admins, used for the initial import)
 * ---------------------------------------------------------------------- */

add_action('rest_api_init', function () {
    foreach (tjs_industry_pages() as $slug => [$post_id, $route, $prefix]) {
        register_rest_route('tjs/v1', '/' . $route, [
            [
                'methods' => 'GET',
                'permission_callback' => '__return_true',
                'callback' => function () use ($slug, $post_id) {
                    $out = [];
                    foreach (tjs_industry_field_names($slug) as $name) {
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
                'callback' => function (WP_REST_Request $request) use ($slug, $post_id, $prefix) {
                    $body = (array) $request->get_json_params();
                    foreach (tjs_industry_field_names($slug) as $name) {
                        if (array_key_exists($name, $body)) {
                            update_field('field_' . $prefix . '_' . $name, $body[$name], $post_id);
                        }
                    }
                    return ['saved' => true];
                },
            ],
        ]);
    }
});

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen || !preg_match('/tjs-(industry-about|professor-of-practice|industry-conclave)/', $screen->id)) {
        return;
    }
    ?>
    <style>
        .tjs-section-heading { border-top: 0 !important; }
        .tjs-section-heading > .acf-label label { font-size: 17px; color: #1d2a6b; }
        .tjs-section-heading .acf-input { color: #646970; }
        .acf-repeater .acf-actions .acf-button { font-size: 13px; padding: 4px 14px; }
    </style>
    <?php
});
