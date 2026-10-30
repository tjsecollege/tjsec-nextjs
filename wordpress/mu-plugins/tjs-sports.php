<?php
/**
 * Plugin Name: TJS Sports & Fitness
 * Description: Editing screen for the website's Campus Life → Sports and Fitness page (tjs-nextjs /campus-life/sports-fitness). One tab per sidebar section: Overview, Outdoor Games, Indoor Games, Fitness and Wellness, Sports Events (year-wise, by category), Achievements (year-wise), Sports Gallery and Sports Committee. Read via GET /wp-json/tjs/v1/sports.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

const TJS_SPORTS_ID = 'sports'; // SCF "post id" the options are stored under

add_action('acf/init', function () {
    if (!function_exists('acf_add_options_page')) {
        return;
    }
    acf_add_options_page([
        'page_title' => 'Sports and Fitness Page',
        'menu_title' => 'Sports & Fitness',
        'menu_slug' => 'tjs-sports',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-awards',
        'position' => 11,
        'redirect' => false,
        'post_id' => TJS_SPORTS_ID,
        'update_button' => 'Save Sports Page',
        'updated_message' => 'Sports and Fitness page saved. Changes will appear on the website shortly.',
    ]);
});

/** One PDF / Word file per academic year — shown as year tabs with a viewer. */
function tjs_sports_year_docs($name, $label, $button) {
    return tjs_repeater($name, $label, $button, [
        tjs_select('year', 'Academic year', tjs_academic_years(), ['default_value' => '', 'required' => 1, 'wrapper' => ['width' => '25']]),
        tjs_file('file', 'File (PDF or Word)', [
            'required' => 1,
            'mime_types' => 'pdf, doc, docx',
            'instructions' => '',
            'wrapper' => ['width' => '75'],
        ]),
    ], ['layout' => 'table', 'instructions' => 'Each year becomes a tab; the newest year opens first.']);
}

function tjs_sports_fields() {
    return [
        tjs_heading('How to edit this page', 'Pick a section from the menu on the left — they match the sidebar of the Sports and Fitness page. Use the <strong>+ Add</strong> buttons to add rows, drag the ☰ handle to re-order, and the <strong>–</strong> button to remove. Click <strong>Save Sports Page</strong> when done. Sections left empty show “Content coming soon” on the website.'),

        tjs_tab('Overview'),
        tjs_heading('Overview', 'Sidebar: Overview'),
        tjs_editor('overview', 'Overview'),

        tjs_tab('Outdoor Games'),
        tjs_heading('Outdoor Games', 'Sidebar: Outdoor Games'),
        tjs_editor('outdoor', 'Outdoor sports facilities'),
        tjs_gallery('outdoor_photos', 'Photos (optional)'),

        tjs_tab('Indoor Games'),
        tjs_heading('Indoor Games', 'Sidebar: Indoor Games'),
        tjs_editor('indoor', 'Indoor sports facilities'),
        tjs_gallery('indoor_photos', 'Photos (optional)'),

        tjs_tab('Fitness and Wellness'),
        tjs_heading('Fitness and Wellness', 'Sidebar: Fitness and Wellness'),
        tjs_editor('fitness', 'Fitness and wellness'),
        tjs_gallery('fitness_photos', 'Photos (optional)'),

        tjs_tab('Sports Events'),
        tjs_heading('Sports Events', 'Sidebar: Sports Events. Add one category per kind of event (Annual Sports Day, Intra-tournaments, Invitation-tournaments…); inside each, one file per academic year.'),
        tjs_repeater('event_categories', 'Event categories', '+ Add Category', [
            tjs_text('name', 'Category name', ['required' => 1, 'placeholder' => 'e.g. Annual Sports Day']),
            tjs_sports_year_docs('documents', 'Year-wise documents', '+ Add Year'),
        ], ['collapsed' => 'name']),

        tjs_tab('Achievements'),
        tjs_heading('Achievements', 'Sidebar: Achievements — student awards, medals and sports accomplishments, year-wise.'),
        tjs_editor('achievements_intro', 'Intro text (optional)'),
        tjs_sports_year_docs('achievements', 'Year-wise documents', '+ Add Year'),

        tjs_tab('Sports Gallery'),
        tjs_heading('Sports Gallery', 'Sidebar: Sports Gallery — photos and videos of courts, fields, events and students.'),
        tjs_repeater('gallery_albums', 'Photo albums', '+ Add Album', [
            tjs_text('title', 'Album name', ['required' => 1, 'placeholder' => 'e.g. Annual Sports Day 2026']),
            tjs_gallery('photos', 'Photos'),
        ], ['collapsed' => 'title', 'instructions' => 'Each album becomes a tab on the website.']),
        tjs_repeater('videos', 'Videos', '+ Add Video', [
            tjs_text('title', 'Video title', ['required' => 1, 'wrapper' => ['width' => '35']]),
            tjs_f('url', 'youtube', 'YouTube link', ['placeholder' => 'https://www.youtube.com/watch?v=…', 'wrapper' => ['width' => '35']]),
            tjs_file('file', '…or upload a video (MP4)', ['mime_types' => 'mp4, webm', 'instructions' => 'Used only when there is no YouTube link. Keep videos small.', 'wrapper' => ['width' => '30']]),
        ], ['layout' => 'table']),

        tjs_tab('Sports Committee'),
        tjs_heading('Sports Committee', 'Sidebar: Sports Committee — physical education staff, coordinators and committee members.'),
        tjs_textarea('committee_intro', 'Intro text (optional)', ['rows' => 2]),
        tjs_repeater('committee', 'Members', '+ Add Member', [
            tjs_text('name', 'Name', array_merge(tjs_half(), ['required' => 1])),
            tjs_text('role', 'Role in committee', array_merge(tjs_half(), ['placeholder' => 'e.g. Physical Director / Coordinator'])),
            tjs_text('designation', 'Designation & department (optional)', ['placeholder' => 'e.g. Assistant Professor, Dept. of EEE']),
            tjs_image('photo', 'Photo (optional)'),
        ], ['collapsed' => 'name']),
    ];
}

add_action('acf/include_fields', function () {
    if (!function_exists('acf_add_local_field_group') || !function_exists('tjs_assign_keys')) {
        return;
    }
    acf_add_local_field_group([
        'key' => 'group_tjs_sports',
        'title' => 'Sports and Fitness Content',
        'fields' => tjs_assign_keys(tjs_sports_fields(), 'tjssp'),
        'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'tjs-sports']]],
        'style' => 'seamless',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
    ]);
});

function tjs_sports_field_names() {
    $names = [];
    foreach (tjs_sports_fields() as $f) {
        if ($f['name'] !== '' && !in_array($f['type'], ['tab', 'message'], true)) {
            $names[] = $f['name'];
        }
    }
    return $names;
}

add_action('rest_api_init', function () {
    register_rest_route('tjs/v1', '/sports', [
        [
            'methods' => 'GET',
            'permission_callback' => '__return_true',
            'callback' => function () {
                $out = [];
                foreach (tjs_sports_field_names() as $name) {
                    $out[$name] = get_field($name, TJS_SPORTS_ID);
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
                foreach (tjs_sports_field_names() as $name) {
                    if (array_key_exists($name, $body)) {
                        update_field('field_tjssp_' . $name, $body[$name], TJS_SPORTS_ID);
                    }
                }
                return ['saved' => true];
            },
        ],
    ]);
});

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen || strpos($screen->id, 'tjs-sports') === false) {
        return;
    }
    ?>
    <style>
        .acf-fields.-sidebar { padding-left: 220px !important; }
        .acf-fields.-sidebar::before { width: 200px; }
        .acf-tab-wrap.-left .acf-tab-group { width: 200px; }
        .acf-tab-wrap.-left .acf-tab-group li a { font-size: 14px; padding: 12px 14px; }
        .acf-tab-wrap.-left .acf-tab-group li.active a { color: #1d2a6b; font-weight: 600; }
        .tjs-section-heading { border-top: 0 !important; }
        .tjs-section-heading > .acf-label label { font-size: 17px; color: #1d2a6b; padding-top: 14px; }
        .tjs-section-heading .acf-input { color: #646970; }
        .acf-repeater .acf-actions .acf-button { font-size: 13px; padding: 4px 14px; }
    </style>
    <?php
});
