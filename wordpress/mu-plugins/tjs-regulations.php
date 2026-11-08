<?php
/**
 * Plugin Name: TJS Regulations & Curriculum
 * Description: Editing screen for the website's Academics → Regulations and Curriculum page (tjs-nextjs /academics/regulations-and-curriculum). Two tabs — Regulations, and Curriculum & Syllabi — each made of groups (e.g. "UG Regulations 2026") holding PDF documents. Read via GET /wp-json/tjs/v1/regulations.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

const TJS_REGULATIONS_ID = 'regulations'; // SCF "post id" the options are stored under

// Nested under the "Academics" menu (tjs-academics.php) to match the website,
// where Regulations and Curriculum is one of the items in the Academics dropdown.
add_action('acf/init', function () {
    if (!function_exists('acf_add_options_sub_page')) {
        return;
    }
    acf_add_options_sub_page([
        'page_title' => 'Regulations and Curriculum Page',
        'menu_title' => 'Regulations and Curriculum',
        'menu_slug' => 'tjs-regulations',
        'parent_slug' => 'tjs-academics',
        'capability' => 'edit_posts',
        'post_id' => TJS_REGULATIONS_ID,
        'update_button' => 'Save Regulations Page',
        'updated_message' => 'Regulations and Curriculum page saved. Changes will appear on the website shortly.',
    ]);
});

/** Groups of documents, e.g. "UG Regulations 2026" → [name + PDF, …]. */
function tjs_regulations_groups($name, $label, $placeholder) {
    return tjs_repeater($name, $label, '+ Add Group', [
        tjs_text('heading', 'Group heading', ['required' => 1, 'placeholder' => $placeholder]),
        tjs_repeater('documents', 'Documents', '+ Add Document', [
            tjs_text('label', 'Document name', ['required' => 1, 'placeholder' => 'e.g. B.E. Computer Science and Engineering', 'wrapper' => ['width' => '45']]),
            tjs_file('file', 'PDF', ['required' => 1, 'mime_types' => 'pdf', 'instructions' => '', 'wrapper' => ['width' => '55']]),
        ], ['layout' => 'table']),
    ], ['collapsed' => 'heading', 'instructions' => 'Groups appear in this order on the website; drag the ☰ handle to re-order (newest first).']);
}

function tjs_regulations_fields() {
    return [
        tjs_heading('How to edit this page', 'Each tab is one section of the page. Inside, every <strong>group</strong> (e.g. "UG Regulations 2026") is a heading followed by its PDF documents. Use <strong>+ Add Group</strong> for a new regulation year, <strong>+ Add Document</strong> for each programme, and click <strong>Save Regulations Page</strong> when done.'),

        tjs_tab('Regulations'),
        tjs_text('regulations_title', 'Section heading', ['placeholder' => 'e.g. Regulations']),
        tjs_regulations_groups('regulations', 'Regulation groups', 'e.g. UG Regulations 2026'),

        tjs_tab('Curriculum & Syllabi'),
        tjs_text('curriculum_title', 'Section heading', ['placeholder' => 'e.g. Curriculum & Syllabi']),
        tjs_regulations_groups('curriculum', 'Curriculum groups', 'e.g. Undergraduate – 2026 Curriculum & Syllabi'),
    ];
}

add_action('acf/include_fields', function () {
    if (!function_exists('acf_add_local_field_group') || !function_exists('tjs_assign_keys')) {
        return;
    }
    acf_add_local_field_group([
        'key' => 'group_tjs_regulations',
        'title' => 'Regulations and Curriculum Content',
        'fields' => tjs_assign_keys(tjs_regulations_fields(), 'tjsreg'),
        'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'tjs-regulations']]],
        'style' => 'seamless',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
    ]);
});

function tjs_regulations_field_names() {
    return ['regulations_title', 'regulations', 'curriculum_title', 'curriculum'];
}

add_action('rest_api_init', function () {
    register_rest_route('tjs/v1', '/regulations', [
        [
            'methods' => 'GET',
            'permission_callback' => '__return_true',
            'callback' => function () {
                $out = [];
                foreach (tjs_regulations_field_names() as $name) {
                    $out[$name] = get_field($name, TJS_REGULATIONS_ID);
                }
                return $out;
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
                foreach (tjs_regulations_field_names() as $name) {
                    if (array_key_exists($name, $body)) {
                        update_field('field_tjsreg_' . $name, $body[$name], TJS_REGULATIONS_ID);
                    }
                }
                return ['saved' => true];
            },
        ],
    ]);
});

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen || strpos($screen->id, 'tjs-regulations') === false) {
        return;
    }
    ?>
    <style>
        .tjs-section-heading { border-top: 0 !important; }
        .tjs-section-heading > .acf-label label { font-size: 17px; color: #1d2a6b; }
        .acf-tab-wrap .acf-tab-group li a { font-size: 14px; }
        .acf-repeater .acf-actions .acf-button { font-size: 13px; padding: 4px 14px; }
    </style>
    <?php
});
