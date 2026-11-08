<?php
/**
 * Plugin Name: TJS List of MoUs
 * Description: Editing screen for the website's Industry Interface → List of MoUs page (tjs-nextjs /industry-interface/list-of-mous). Editors add categories (Academic Institutions, Industries…), each a sidebar tab with one or more PDF / Word documents. Read via GET /wp-json/tjs/v1/mous.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

const TJS_MOUS_ID = 'mous'; // SCF "post id" the options are stored under

// Nested under the "Industry Interface" menu (tjs-industry-interface.php) to match the website.
add_action('acf/init', function () {
    if (!function_exists('acf_add_options_sub_page')) {
        return;
    }
    acf_add_options_sub_page([
        'page_title' => 'List of MoUs Page',
        'menu_title' => 'List of MoUs',
        'menu_slug' => 'tjs-mous',
        'parent_slug' => 'tjs-industry-interface',
        'capability' => 'edit_posts',
        'post_id' => TJS_MOUS_ID,
        'update_button' => 'Save List of MoUs',
        'updated_message' => 'List of MoUs saved. Changes will appear on the website shortly.',
    ]);
});

function tjs_mous_fields() {
    return [
        tjs_heading('How to edit this page', 'Each <strong>category</strong> is one item in the left-hand menu (e.g. Academic Institutions, Industries). Inside it, add one or more documents: with one document the page shows it straight away; with several, each becomes a tab (newest first — drag the ☰ handle to re-order). Click <strong>Save List of MoUs</strong> when done.'),
        tjs_text('page_title', 'Page heading', ['placeholder' => 'e.g. List of MoUs']),
        tjs_repeater('categories', 'Categories', '+ Add Category', [
            tjs_text('label', 'Sidebar name', ['required' => 1, 'placeholder' => 'e.g. Industries', 'wrapper' => ['width' => '35']]),
            tjs_text('title', 'Heading (optional)', ['placeholder' => 'e.g. MoUs with Industries', 'instructions' => 'Leave empty to use the sidebar name.', 'wrapper' => ['width' => '65']]),
            tjs_repeater('documents', 'Documents', '+ Add Document', [
                tjs_text('tab', 'Tab name', ['placeholder' => 'e.g. 2025-26', 'instructions' => 'Only shown when there is more than one document.', 'wrapper' => ['width' => '30']]),
                tjs_file('file', 'File (PDF or Word)', ['required' => 1, 'mime_types' => 'pdf, doc, docx', 'instructions' => '', 'wrapper' => ['width' => '70']]),
            ], ['layout' => 'table']),
        ], ['collapsed' => 'label']),
    ];
}

add_action('acf/include_fields', function () {
    if (!function_exists('acf_add_local_field_group') || !function_exists('tjs_assign_keys')) {
        return;
    }
    acf_add_local_field_group([
        'key' => 'group_tjs_mous',
        'title' => 'List of MoUs Content',
        'fields' => tjs_assign_keys(tjs_mous_fields(), 'tjsmou'),
        'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'tjs-mous']]],
        'style' => 'seamless',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
    ]);
});

add_action('rest_api_init', function () {
    register_rest_route('tjs/v1', '/mous', [
        [
            'methods' => 'GET',
            'permission_callback' => '__return_true',
            'callback' => function () {
                return [
                    'page_title' => get_field('page_title', TJS_MOUS_ID) ?: '',
                    'categories' => get_field('categories', TJS_MOUS_ID) ?: [],
                ];
            },
        ],
        [
            // Admins only, used for the initial content import.
            'methods' => 'POST',
            'permission_callback' => function () {
                return current_user_can('manage_options');
            },
            'callback' => function (WP_REST_Request $request) {
                $body = (array) $request->get_json_params();
                foreach (['page_title', 'categories'] as $name) {
                    if (array_key_exists($name, $body)) {
                        update_field('field_tjsmou_' . $name, $body[$name], TJS_MOUS_ID);
                    }
                }
                return ['saved' => true];
            },
        ],
    ]);
});

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen || strpos($screen->id, 'tjs-mous') === false) {
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
