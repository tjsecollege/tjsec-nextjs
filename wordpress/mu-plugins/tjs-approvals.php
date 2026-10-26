<?php
/**
 * Plugin Name: TJS Approval & Affiliations
 * Description: Editing screen for the website's About → Approval & Affiliations page (tjs-nextjs /about/approval-affiliation). Editors add categories (AICTE, Anna University, UGC…) and, inside each, one PDF per year/tab. Read via GET /wp-json/tjs/v1/approvals.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

const TJS_APPROVALS_ID = 'approvals'; // SCF "post id" the options are stored under

add_action('acf/init', function () {
    if (!function_exists('acf_add_options_page')) {
        return;
    }
    acf_add_options_page([
        'page_title' => 'Approval & Affiliations',
        'menu_title' => 'Approvals',
        'menu_slug' => 'tjs-approvals',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-media-document',
        'position' => 8,
        'redirect' => false,
        'post_id' => TJS_APPROVALS_ID,
        'update_button' => 'Save Approvals Page',
        'updated_message' => 'Approval & Affiliations page saved. Changes will appear on the website shortly.',
    ]);
});

function tjs_approvals_fields() {
    return [
        tjs_heading('How to edit this page', 'Each <strong>category</strong> is one item in the left-hand menu of the Approval &amp; Affiliations page (e.g. AICTE, Anna University, UGC). Inside a category, each <strong>document</strong> becomes a year tab with its PDF. The first document opens by default, so add the newest year at the top (drag the ☰ handle to re-order). Click <strong>Save Approvals Page</strong> when done.'),
        tjs_text('page_title', 'Page heading', ['placeholder' => 'e.g. Approval & Affiliations']),
        tjs_repeater('categories', 'Categories', '+ Add Category', [
            tjs_text('label', 'Sidebar name', ['required' => 1, 'placeholder' => 'e.g. AICTE', 'wrapper' => ['width' => '35']]),
            tjs_text('title', 'Heading', ['placeholder' => 'e.g. AICTE – Extension of Approval (EoA)', 'instructions' => 'Leave empty to use the sidebar name.', 'wrapper' => ['width' => '65']]),
            tjs_repeater('documents', 'Documents', '+ Add Document', [
                tjs_text('tab', 'Tab label', ['required' => 1, 'placeholder' => 'e.g. 2026-27', 'wrapper' => ['width' => '30']]),
                tjs_file('document', 'PDF', ['mime_types' => 'pdf', 'required' => 1, 'instructions' => 'Upload the approval / affiliation PDF.', 'wrapper' => ['width' => '70']]),
            ], ['layout' => 'table']),
        ], ['collapsed' => 'label']),
    ];
}

add_action('acf/include_fields', function () {
    if (!function_exists('acf_add_local_field_group') || !function_exists('tjs_assign_keys')) {
        return;
    }
    acf_add_local_field_group([
        'key' => 'group_tjs_approvals',
        'title' => 'Approval & Affiliations Content',
        'fields' => tjs_assign_keys(tjs_approvals_fields(), 'tjsap'),
        'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'tjs-approvals']]],
        'style' => 'seamless',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
    ]);
});

// GET (public) / POST (admins, used for bulk imports)
add_action('rest_api_init', function () {
    register_rest_route('tjs/v1', '/approvals', [
        [
            'methods' => 'GET',
            'permission_callback' => '__return_true',
            'callback' => function () {
                return [
                    'page_title' => get_field('page_title', TJS_APPROVALS_ID) ?: '',
                    'categories' => get_field('categories', TJS_APPROVALS_ID) ?: [],
                ];
            },
        ],
        [
            'methods' => 'POST',
            'permission_callback' => function () {
                return current_user_can('manage_options');
            },
            'callback' => function (WP_REST_Request $request) {
                $body = (array) $request->get_json_params();
                foreach (['page_title', 'categories'] as $name) {
                    if (array_key_exists($name, $body)) {
                        update_field('field_tjsap_' . $name, $body[$name], TJS_APPROVALS_ID);
                    }
                }
                return ['saved' => true];
            },
        ],
    ]);
});

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen || strpos($screen->id, 'tjs-approvals') === false) {
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
