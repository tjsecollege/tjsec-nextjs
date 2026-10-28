<?php
/**
 * Plugin Name: TJS Placements
 * Description: Editing screen for the website's Placements page (tjs-nextjs /placements). For now it manages the "Placed Students" section: one PDF per academic year, shown as year tabs. Read via GET /wp-json/tjs/v1/placements.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

const TJS_PLACEMENTS_ID = 'placements'; // SCF "post id" the options are stored under

add_action('acf/init', function () {
    if (!function_exists('acf_add_options_page')) {
        return;
    }
    acf_add_options_page([
        'page_title' => 'Placements Page',
        'menu_title' => 'Placements',
        'menu_slug' => 'tjs-placements',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-businessperson',
        'position' => 9,
        'redirect' => false,
        'post_id' => TJS_PLACEMENTS_ID,
        'update_button' => 'Save Placements Page',
        'updated_message' => 'Placements page saved. Changes will appear on the website shortly.',
    ]);
});

function tjs_placements_fields() {
    return [
        tjs_heading('Placed Students', 'Sidebar: Placed Students. Add one PDF per academic year; each becomes a year tab. The first year opens by default, so keep the newest year at the top (drag the ☰ handle to re-order). Click <strong>Save Placements Page</strong> when done.'),
        tjs_repeater('placed_students', 'Placed Students – year-wise PDFs', '+ Add Year', [
            tjs_text('tab', 'Year', ['required' => 1, 'placeholder' => 'e.g. 2025-26', 'wrapper' => ['width' => '30']]),
            tjs_file('document', 'PDF', ['mime_types' => 'pdf', 'required' => 1, 'instructions' => 'Upload the placed students list for that year.', 'wrapper' => ['width' => '70']]),
        ], ['layout' => 'table']),

        tjs_heading('Our Recruiters', 'Sidebar: Our Recruiters. Each tab (e.g. "Major Recruiters", "Recruiters (AY 2025-26)") shows a grid of company logos. Select several logos at once in "Add to gallery"; the company name shown on hover is the image Title in the media library.'),
        tjs_repeater('recruiter_groups', 'Recruiter tabs', '+ Add Tab', [
            tjs_text('tab', 'Tab name', ['required' => 1, 'placeholder' => 'e.g. Recruiters (AY 2026-27)']),
            tjs_gallery('logos', 'Company logos', ['mime_types' => 'jpg, jpeg, png, webp, svg', 'instructions' => 'Click "Add to gallery" to upload or pick logos. Drag to change their order.']),
        ], ['collapsed' => 'tab']),
    ];
}

add_action('acf/include_fields', function () {
    if (!function_exists('acf_add_local_field_group') || !function_exists('tjs_assign_keys')) {
        return;
    }
    acf_add_local_field_group([
        'key' => 'group_tjs_placements',
        'title' => 'Placements Page Content',
        'fields' => tjs_assign_keys(tjs_placements_fields(), 'tjspl'),
        'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'tjs-placements']]],
        'style' => 'seamless',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
    ]);
});

add_action('rest_api_init', function () {
    register_rest_route('tjs/v1', '/placements', [
        [
            'methods' => 'GET',
            'permission_callback' => '__return_true',
            'callback' => function () {
                return [
                    'placed_students' => get_field('placed_students', TJS_PLACEMENTS_ID) ?: [],
                    'recruiter_groups' => get_field('recruiter_groups', TJS_PLACEMENTS_ID) ?: [],
                ];
            },
        ],
        [
            // Admins only, used for bulk imports.
            'methods' => 'POST',
            'permission_callback' => function () {
                return current_user_can('manage_options');
            },
            'callback' => function (WP_REST_Request $request) {
                $body = (array) $request->get_json_params();
                foreach (['placed_students', 'recruiter_groups'] as $name) {
                    if (array_key_exists($name, $body)) {
                        update_field('field_tjspl_' . $name, $body[$name], TJS_PLACEMENTS_ID);
                    }
                }
                return ['saved' => true];
            },
        ],
    ]);
});

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen || strpos($screen->id, 'tjs-placements') === false) {
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
