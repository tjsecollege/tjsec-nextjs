<?php
/**
 * Plugin Name: TJS Medical Centre
 * Description: Editing screen for the website's Campus Life → Other Facilities → Medical Centre page (tjs-nextjs /campus-life/medical-centre): intro, photos, facilities (with icons) and objectives. Read via GET /wp-json/tjs/v1/medical-centre.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

const TJS_MEDICAL_ID = 'medical_centre'; // SCF "post id" the options are stored under

add_action('acf/init', function () {
    if (!function_exists('acf_add_options_page')) {
        return;
    }
    acf_add_options_page([
        'page_title' => 'Medical Centre Page',
        'menu_title' => 'Medical Centre',
        'menu_slug' => 'tjs-medical-centre',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-plus-alt',
        'position' => 12,
        'redirect' => false,
        'post_id' => TJS_MEDICAL_ID,
        'update_button' => 'Save Medical Centre Page',
        'updated_message' => 'Medical Centre page saved. Changes will appear on the website shortly.',
    ]);
});

// Icon choices for facility cards: value = Remix Icon class used by the website.
function tjs_medical_icons() {
    return [
        'ri-first-aid-kit-line' => 'First aid kit',
        'ri-stethoscope-line' => 'Stethoscope',
        'ri-alarm-warning-line' => 'Emergency',
        'ri-heart-pulse-line' => 'Heart / health check',
        'ri-user-heart-line' => 'Care / assistance',
        'ri-hospital-line' => 'Hospital',
        'ri-lightbulb-flash-line' => 'Awareness',
        'ri-capsule-line' => 'Medicine',
        'ri-empathize-line' => 'Support',
        'ri-shield-cross-line' => 'Safety',
    ];
}

function tjs_medical_fields() {
    return [
        tjs_heading('How to edit this page', 'Use the <strong>+ Add</strong> buttons to add facilities or objectives, drag the ☰ handle to re-order, and the <strong>–</strong> button to remove. Click <strong>Save Medical Centre Page</strong> when done.'),
        tjs_text('page_title', 'Page heading', ['placeholder' => 'e.g. Medical Centre']),
        tjs_editor('intro', 'Introduction'),
        tjs_gallery('photos', 'Photos (optional)', ['instructions' => 'Shown as a photo slider beside the introduction.']),

        tjs_heading('Facilities Available', 'Shown as cards with an icon.'),
        tjs_text('facilities_heading', 'Section heading', ['placeholder' => 'e.g. Facilities Available']),
        tjs_repeater('facilities', 'Facilities', '+ Add Facility', [
            tjs_select('icon', 'Icon', tjs_medical_icons(), ['wrapper' => ['width' => '20']]),
            tjs_text('title', 'Title', ['required' => 1, 'placeholder' => 'e.g. First Aid Services', 'wrapper' => ['width' => '30']]),
            tjs_textarea('description', 'Description', ['rows' => 2, 'wrapper' => ['width' => '50']]),
        ], ['layout' => 'table']),

        tjs_heading('Objectives', 'Shown as a numbered list.'),
        tjs_text('objectives_heading', 'Section heading', ['placeholder' => 'e.g. Objectives']),
        tjs_repeater('objectives', 'Objectives', '+ Add Objective', [
            tjs_textarea('text', 'Objective', ['rows' => 2, 'required' => 1]),
        ], ['layout' => 'table']),
    ];
}

add_action('acf/include_fields', function () {
    if (!function_exists('acf_add_local_field_group') || !function_exists('tjs_assign_keys')) {
        return;
    }
    acf_add_local_field_group([
        'key' => 'group_tjs_medical',
        'title' => 'Medical Centre Content',
        'fields' => tjs_assign_keys(tjs_medical_fields(), 'tjsmed'),
        'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'tjs-medical-centre']]],
        'style' => 'seamless',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
    ]);
});

function tjs_medical_field_names() {
    $names = [];
    foreach (tjs_medical_fields() as $f) {
        if ($f['name'] !== '' && !in_array($f['type'], ['tab', 'message'], true)) {
            $names[] = $f['name'];
        }
    }
    return $names;
}

add_action('rest_api_init', function () {
    register_rest_route('tjs/v1', '/medical-centre', [
        [
            'methods' => 'GET',
            'permission_callback' => '__return_true',
            'callback' => function () {
                $out = [];
                foreach (tjs_medical_field_names() as $name) {
                    $out[$name] = get_field($name, TJS_MEDICAL_ID);
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
                foreach (tjs_medical_field_names() as $name) {
                    if (array_key_exists($name, $body)) {
                        update_field('field_tjsmed_' . $name, $body[$name], TJS_MEDICAL_ID);
                    }
                }
                return ['saved' => true];
            },
        ],
    ]);
});

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen || strpos($screen->id, 'tjs-medical-centre') === false) {
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
