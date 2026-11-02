<?php
/**
 * Plugin Name: TJS IV Forms
 * Description: Editing screen for the website's Industry Interface → Industry Visit (IV) Forms page (tjs-nextjs /industry-interface/iv-forms): the 3 steps, the downloadable forms and the important instructions. Read via GET /wp-json/tjs/v1/iv-forms.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

const TJS_IV_FORMS_ID = 'iv_forms'; // SCF "post id" the options are stored under

add_action('acf/init', function () {
    if (!function_exists('acf_add_options_page')) {
        return;
    }
    acf_add_options_page([
        'page_title' => 'Industry Visit (IV) Forms Page',
        'menu_title' => 'IV Forms',
        'menu_slug' => 'tjs-iv-forms',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-clipboard',
        'position' => 15,
        'redirect' => false,
        'post_id' => TJS_IV_FORMS_ID,
        'update_button' => 'Save IV Forms Page',
        'updated_message' => 'IV Forms page saved. Changes will appear on the website shortly.',
    ]);
});

function tjs_iv_forms_fields() {
    return [
        tjs_heading('How to edit this page', 'Use the <strong>+ Add</strong> buttons to add steps, forms or instructions, drag the ☰ handle to re-order, and the <strong>–</strong> button to remove. Click <strong>Save IV Forms Page</strong> when done.'),
        tjs_text('page_title', 'Page heading', ['placeholder' => 'e.g. Industry Visit (IV) Forms']),

        tjs_heading('Steps', 'The small cards at the top of the page.'),
        tjs_repeater('steps', 'Steps', '+ Add Step', [
            tjs_select('icon', 'Icon', [
                'ri-download-2-line' => 'Download',
                'ri-edit-2-line' => 'Fill / edit',
                'ri-send-plane-2-line' => 'Submit / send',
                'ri-checkbox-circle-line' => 'Approved / done',
                'ri-file-list-3-line' => 'Document',
                'ri-user-follow-line' => 'Signature / approval',
            ], ['wrapper' => ['width' => '25']]),
            tjs_text('title', 'Title', ['required' => 1, 'placeholder' => 'e.g. Step 1', 'wrapper' => ['width' => '25']]),
            tjs_text('description', 'Description', ['placeholder' => 'e.g. Download the required forms', 'wrapper' => ['width' => '50']]),
        ], ['layout' => 'table']),

        tjs_heading('Forms', 'Each form is a card that downloads its file.'),
        tjs_repeater('forms', 'Forms', '+ Add Form', [
            tjs_text('title', 'Form name', ['required' => 1, 'placeholder' => 'e.g. Industry Visit (IV) Form', 'wrapper' => ['width' => '30']]),
            tjs_text('description', 'Short description', ['placeholder' => 'e.g. Form to be filled before an industry visit.', 'wrapper' => ['width' => '35']]),
            tjs_file('file', 'File', ['required' => 1, 'mime_types' => 'doc, docx, pdf, xls, xlsx', 'instructions' => 'Word, PDF or Excel.', 'wrapper' => ['width' => '35']]),
        ], ['layout' => 'table']),

        tjs_heading('Important Instructions', 'The highlighted box at the bottom of the page.'),
        tjs_text('instructions_title', 'Box heading', ['placeholder' => 'e.g. Important Instructions']),
        tjs_repeater('instructions', 'Instructions', '+ Add Instruction', [
            tjs_text('text', 'Instruction', ['required' => 1]),
        ], ['layout' => 'table']),
    ];
}

add_action('acf/include_fields', function () {
    if (!function_exists('acf_add_local_field_group') || !function_exists('tjs_assign_keys')) {
        return;
    }
    acf_add_local_field_group([
        'key' => 'group_tjs_iv_forms',
        'title' => 'IV Forms Content',
        'fields' => tjs_assign_keys(tjs_iv_forms_fields(), 'tjsiv'),
        'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'tjs-iv-forms']]],
        'style' => 'seamless',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
    ]);
});

function tjs_iv_forms_field_names() {
    return ['page_title', 'steps', 'forms', 'instructions_title', 'instructions'];
}

add_action('rest_api_init', function () {
    register_rest_route('tjs/v1', '/iv-forms', [
        [
            'methods' => 'GET',
            'permission_callback' => '__return_true',
            'callback' => function () {
                $out = [];
                foreach (tjs_iv_forms_field_names() as $name) {
                    $out[$name] = get_field($name, TJS_IV_FORMS_ID);
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
                foreach (tjs_iv_forms_field_names() as $name) {
                    if (array_key_exists($name, $body)) {
                        update_field('field_tjsiv_' . $name, $body[$name], TJS_IV_FORMS_ID);
                    }
                }
                return ['saved' => true];
            },
        ],
    ]);
});

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen || strpos($screen->id, 'tjs-iv-forms') === false) {
        return;
    }
    ?>
    <style>
        .tjs-section-heading { border-top: 0 !important; }
        .tjs-section-heading > .acf-label label { font-size: 17px; color: #1d2a6b; padding-top: 14px; }
        .tjs-section-heading .acf-input { color: #646970; }
        .acf-repeater .acf-actions .acf-button { font-size: 13px; padding: 4px 14px; }
    </style>
    <?php
});
