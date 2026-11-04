<?php
/**
 * Plugin Name: TJS Capacity Building
 * Description: Editing screen for the website's IQAC → Capacity Building and Skill Enhancement page (tjs-nextjs /iqac/capacity-building): an intro and groups of programs (Soft Skills, Life Skills…), each program with its photo, resource person and date. Read via GET /wp-json/tjs/v1/capacity-building.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here). The admin
 * page sits in the IQAC menu created by tjs-naac.php.
 */

if (!defined('ABSPATH')) {
    exit;
}

const TJS_CAPACITY_BUILDING_ID = 'capacity_building'; // SCF "post id" the options are stored under

// Priority 20: after tjs-naac.php registers the IQAC menu, so NAAC stays its first item.
add_action('acf/init', function () {
    if (!function_exists('acf_add_options_sub_page')) {
        return;
    }
    acf_add_options_sub_page([
        'page_title' => 'Capacity Building and Skill Enhancement Page',
        'menu_title' => 'Capacity Building',
        'menu_slug' => 'tjs-capacity-building',
        'parent_slug' => 'tjs-iqac',
        'capability' => 'edit_posts',
        'post_id' => TJS_CAPACITY_BUILDING_ID,
        'update_button' => 'Save Capacity Building Page',
        'updated_message' => 'Capacity Building page saved. Changes will appear on the website shortly.',
    ]);
}, 20);

function tjs_capacity_building_fields() {
    return [
        tjs_heading('How to edit this page', 'Each <strong>group</strong> (e.g. Soft Skills) is a heading on the page with its programs shown as photo cards below it. Use <strong>+ Add Group</strong> / <strong>+ Add Program</strong> to add, drag the ☰ handle to re-order, and the <strong>–</strong> button to remove. Click <strong>Save Capacity Building Page</strong> when done.'),
        tjs_text('page_title', 'Page heading', ['placeholder' => 'e.g. Capacity Building and Skill Enhancement']),
        tjs_textarea('intro', 'Intro text (optional)', ['rows' => 3]),
        tjs_repeater('groups', 'Groups', '+ Add Group', [
            tjs_text('heading', 'Group heading', ['required' => 1, 'placeholder' => 'e.g. Soft Skills']),
            tjs_textarea('description', 'Group description (optional)', ['rows' => 3]),
            tjs_repeater('items', 'Programs', '+ Add Program', [
                tjs_text('title', 'Program', ['required' => 1, 'wrapper' => ['width' => '30'], 'placeholder' => 'e.g. Training on “Interview Skills”']),
                tjs_textarea('resource_person', 'Resource person (optional)', ['rows' => 2, 'wrapper' => ['width' => '30'], 'placeholder' => 'e.g. Mr. M. Vigneshwaran, Soft Skills Trainer, Southerland Global Services']),
                tjs_date('date', 'Date', ['wrapper' => ['width' => '15']]),
                tjs_image('photo', 'Photo', ['wrapper' => ['width' => '25'], 'instructions' => 'Any size — the full photo opens when clicked.']),
            ], ['layout' => 'table']),
        ], ['collapsed' => 'heading']),
    ];
}

add_action('acf/include_fields', function () {
    if (!function_exists('acf_add_local_field_group') || !function_exists('tjs_assign_keys')) {
        return;
    }
    acf_add_local_field_group([
        'key' => 'group_tjs_capacity_building',
        'title' => 'Capacity Building Content',
        'fields' => tjs_assign_keys(tjs_capacity_building_fields(), 'tjscb'),
        'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'tjs-capacity-building']]],
        'style' => 'seamless',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
    ]);
});

add_action('rest_api_init', function () {
    register_rest_route('tjs/v1', '/capacity-building', [
        [
            'methods' => 'GET',
            'permission_callback' => '__return_true',
            'callback' => function () {
                return [
                    'page_title' => get_field('page_title', TJS_CAPACITY_BUILDING_ID) ?: '',
                    'intro' => get_field('intro', TJS_CAPACITY_BUILDING_ID) ?: '',
                    'groups' => get_field('groups', TJS_CAPACITY_BUILDING_ID) ?: [],
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
                foreach (['page_title', 'intro', 'groups'] as $name) {
                    if (array_key_exists($name, $body)) {
                        update_field('field_tjscb_' . $name, $body[$name], TJS_CAPACITY_BUILDING_ID);
                    }
                }
                return ['saved' => true];
            },
        ],
    ]);
});

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen || strpos($screen->id, 'tjs-capacity-building') === false) {
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
