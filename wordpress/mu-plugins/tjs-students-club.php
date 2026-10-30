<?php
/**
 * Plugin Name: TJS Students Club
 * Description: Editing screen for the website's Campus Life → Students Club page (tjs-nextjs /campus-life/students-club). Editors add clubs (Cultural Club, EDC, NSS, YRC…), each shown as a sidebar tab, and upload any number of Word / PDF documents per club. Read via GET /wp-json/tjs/v1/students-club.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

const TJS_STUDENTS_CLUB_ID = 'students_club'; // SCF "post id" the options are stored under

add_action('acf/init', function () {
    if (!function_exists('acf_add_options_page')) {
        return;
    }
    acf_add_options_page([
        'page_title' => 'Students Club Page',
        'menu_title' => 'Students Club',
        'menu_slug' => 'tjs-students-club',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-groups',
        'position' => 10,
        'redirect' => false,
        'post_id' => TJS_STUDENTS_CLUB_ID,
        'update_button' => 'Save Students Club Page',
        'updated_message' => 'Students Club page saved. Changes will appear on the website shortly.',
    ]);
});

function tjs_students_club_fields() {
    return [
        tjs_heading('How to edit this page', 'Each <strong>club</strong> is one tab in the left-hand menu of the Students Club page. Inside a club, use <strong>+ Add Document</strong> for every Word / PDF file. Drag the ☰ handle to re-order clubs or documents, and the <strong>–</strong> button to remove. Click <strong>Save Students Club Page</strong> when done.'),
        tjs_text('page_title', 'Page heading', ['placeholder' => 'e.g. Students Club']),
        tjs_repeater('clubs', 'Clubs', '+ Add Club', [
            tjs_text('name', 'Club name (sidebar tab)', ['required' => 1, 'placeholder' => 'e.g. Cultural Club', 'wrapper' => ['width' => '40']]),
            tjs_text('title', 'Heading (optional)', ['placeholder' => 'e.g. Cultural Club – Events & Activities', 'instructions' => 'Leave empty to use the club name.', 'wrapper' => ['width' => '60']]),
            tjs_editor('description', 'About the club (optional)'),
            tjs_repeater('documents', 'Documents', '+ Add Document', [
                tjs_text('title', 'Document name', ['required' => 1, 'placeholder' => 'e.g. Onam Celebration 28.08.2026', 'wrapper' => ['width' => '35']]),
                tjs_select('year', 'Academic year', tjs_academic_years(), [
                    'default_value' => '',
                    'allow_null' => 1,
                    'instructions' => 'Documents are grouped by year on the website.',
                    'wrapper' => ['width' => '20'],
                ]),
                tjs_file('file', 'File', [
                    'required' => 1,
                    'mime_types' => 'doc, docx, pdf, ppt, pptx, xls, xlsx',
                    'instructions' => 'Word, PDF, PowerPoint or Excel file.',
                    'wrapper' => ['width' => '45'],
                ]),
            ], ['layout' => 'table']),
        ], ['collapsed' => 'name']),
    ];
}

add_action('acf/include_fields', function () {
    if (!function_exists('acf_add_local_field_group') || !function_exists('tjs_assign_keys')) {
        return;
    }
    acf_add_local_field_group([
        'key' => 'group_tjs_students_club',
        'title' => 'Students Club Content',
        'fields' => tjs_assign_keys(tjs_students_club_fields(), 'tjssc'),
        'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'tjs-students-club']]],
        'style' => 'seamless',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
    ]);
});

add_action('rest_api_init', function () {
    register_rest_route('tjs/v1', '/students-club', [
        [
            'methods' => 'GET',
            'permission_callback' => '__return_true',
            'callback' => function () {
                return [
                    'page_title' => get_field('page_title', TJS_STUDENTS_CLUB_ID) ?: '',
                    'clubs' => get_field('clubs', TJS_STUDENTS_CLUB_ID) ?: [],
                ];
            },
        ],
        [
            // Admins only: set the academic year on existing documents,
            // { "set_years": [{ "club": 0, "doc": 2, "year": "2025-26" }] }.
            // Everything else is re-saved from its raw stored values.
            'methods' => 'POST',
            'permission_callback' => function () {
                return current_user_can('manage_options');
            },
            'callback' => function (WP_REST_Request $request) {
                $body = (array) $request->get_json_params();
                $raw = get_field('clubs', TJS_STUDENTS_CLUB_ID, false) ?: [];
                $docs_key = 'field_tjssc_clubs_documents';
                $year_key = 'field_tjssc_clubs_documents_year';
                foreach ((array) ($body['set_years'] ?? []) as $set) {
                    $c = (int) ($set['club'] ?? -1);
                    $d = (int) ($set['doc'] ?? -1);
                    if (!isset($raw[$c][$docs_key][$d])) {
                        return new WP_Error('tjs_bad_index', "No document {$d} in club {$c}.", ['status' => 400]);
                    }
                    $raw[$c][$docs_key][$d][$year_key] = (string) ($set['year'] ?? '');
                }
                update_field('field_tjssc_clubs', $raw, TJS_STUDENTS_CLUB_ID);
                return ['saved' => true];
            },
        ],
    ]);
});

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen || strpos($screen->id, 'tjs-students-club') === false) {
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
