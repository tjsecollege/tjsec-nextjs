<?php
/**
 * Plugin Name: TJS Mandatory Disclosure
 * Description: Editing screen for the website's Mandatory Disclosure page (tjs-nextjs /mandatory-disclosure). Editors add categories (Public self disclosure/Mandatory disclosure, UGC Undertaking Letter, RTI…), each a sidebar tab with one or more PDF / Word documents. Read via GET /wp-json/tjs/v1/mandatory-disclosure.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

const TJS_MANDATORY_DISCLOSURE_ID = 'mandatory_disclosure'; // SCF "post id" the options are stored under

add_action('acf/init', function () {
    if (!function_exists('acf_add_options_page')) {
        return;
    }
    acf_add_options_page([
        'page_title' => 'Mandatory Disclosure Page',
        'menu_title' => 'Mandatory Disclosure',
        'menu_slug' => 'tjs-mandatory-disclosure',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-shield',
        'position' => 16,
        'redirect' => false,
        'post_id' => TJS_MANDATORY_DISCLOSURE_ID,
        'update_button' => 'Save Mandatory Disclosure',
        'updated_message' => 'Mandatory Disclosure saved. Changes will appear on the website shortly.',
    ]);
});

function tjs_mandatory_disclosure_fields() {
    return [
        tjs_heading('How to edit this page', 'Each <strong>category</strong> is one item in the left-hand menu (e.g. Public self disclosure/Mandatory disclosure, Right to Information (RTI)). Inside it, add one or more documents: with one document the page shows it straight away; with several, each becomes a year tab (newest first — drag the ☰ handle to re-order). Click <strong>Save Mandatory Disclosure</strong> when done.'),
        tjs_text('page_title', 'Page heading', ['placeholder' => 'e.g. Public Self Disclosure / Mandatory Disclosure']),
        tjs_repeater('categories', 'Categories', '+ Add Category', [
            tjs_text('label', 'Sidebar name', ['required' => 1, 'placeholder' => 'e.g. Right to Information (RTI)', 'wrapper' => ['width' => '35']]),
            tjs_text('title', 'Heading (optional)', ['placeholder' => 'e.g. Right to Information (RTI)', 'instructions' => 'Leave empty to use the sidebar name.', 'wrapper' => ['width' => '65']]),
            tjs_repeater('documents', 'Documents', '+ Add Document', [
                tjs_text('tab', 'Tab name', ['placeholder' => 'e.g. 2026-27', 'instructions' => 'Only shown when there is more than one document.', 'wrapper' => ['width' => '30']]),
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
        'key' => 'group_tjs_mandatory_disclosure',
        'title' => 'Mandatory Disclosure Content',
        'fields' => tjs_assign_keys(tjs_mandatory_disclosure_fields(), 'tjsmd'),
        'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'tjs-mandatory-disclosure']]],
        'style' => 'seamless',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
    ]);
});

add_action('rest_api_init', function () {
    register_rest_route('tjs/v1', '/mandatory-disclosure', [
        [
            'methods' => 'GET',
            'permission_callback' => '__return_true',
            'callback' => function () {
                return [
                    'page_title' => get_field('page_title', TJS_MANDATORY_DISCLOSURE_ID) ?: '',
                    'categories' => get_field('categories', TJS_MANDATORY_DISCLOSURE_ID) ?: [],
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
                        update_field('field_tjsmd_' . $name, $body[$name], TJS_MANDATORY_DISCLOSURE_ID);
                    }
                }
                return ['saved' => true];
            },
        ],
    ]);
});

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen || strpos($screen->id, 'tjs-mandatory-disclosure') === false) {
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
