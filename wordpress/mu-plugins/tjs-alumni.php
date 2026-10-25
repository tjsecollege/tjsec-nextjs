<?php
/**
 * Plugin Name: TJS Alumni
 * Description: Editing screen for the website's Alumni page (tjs-nextjs /alumni). One tab per sidebar section: About us, Office Bearers, Alumni Meet, Gallery, Testimonials, Registration Forms and Contact us. Read via GET /wp-json/tjs/v1/alumni.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

const TJS_ALUMNI_ID = 'alumni'; // SCF "post id" the Alumni options are stored under

/* -------------------------------------------------------------------------
 * 1. Admin menu: Alumni
 * ---------------------------------------------------------------------- */

add_action('acf/init', function () {
    if (!function_exists('acf_add_options_page')) {
        return;
    }
    acf_add_options_page([
        'page_title' => 'Alumni Page',
        'menu_title' => 'Alumni',
        'menu_slug' => 'tjs-alumni',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-groups',
        'position' => 7,
        'redirect' => false,
        'post_id' => TJS_ALUMNI_ID,
        'update_button' => 'Save Alumni Page',
        'updated_message' => 'Alumni page saved. Changes will appear on the website shortly.',
    ]);
});

/* -------------------------------------------------------------------------
 * 2. Fields — one tab per sidebar section of the page
 * ---------------------------------------------------------------------- */

function tjs_alumni_fields() {
    return [
        tjs_heading('How to edit this page', 'Pick a section from the menu on the left — they match the sidebar on the Alumni page. Use the <strong>+ Add</strong> buttons to add rows, drag the ☰ handle to re-order, and the <strong>–</strong> button to remove. Click <strong>Save Alumni Page</strong> when done. Sections left empty show “Content coming soon” on the website.'),
        tjs_text('page_title', 'Page heading', ['placeholder' => 'e.g. Alumni Association']),

        tjs_tab('About us'),
        tjs_heading('About us', 'Sidebar: About us'),
        tjs_editor('about', 'About the Alumni Association'),

        tjs_tab('Office Bearers'),
        tjs_heading('Office Bearers', 'Sidebar: Office Bearers. Shown as a table; S.No is added automatically.'),
        tjs_text('office_bearers_heading', 'Table heading', ['placeholder' => 'e.g. Alumni Office Bearers']),
        tjs_textarea('office_bearers_intro', 'Text above the table (optional)', ['rows' => 2]),
        tjs_repeater('office_bearers', 'Office Bearers', '+ Add Office Bearer', [
            tjs_text('position', 'Position', array_merge(tjs_half(), ['required' => 1, 'placeholder' => 'e.g. President'])),
            tjs_text('name', 'Name', array_merge(tjs_half(), ['required' => 1, 'placeholder' => 'e.g. Mr. M. Prakash, M.E., (Mech)'])),
            tjs_textarea('responsibility', 'Responsibilities', array_merge(tjs_half(), ['rows' => 3])),
            tjs_textarea('address', 'Residential address', array_merge(tjs_half(), ['rows' => 3])),
        ], ['collapsed' => 'name']),

        tjs_tab('Alumni Meet'),
        tjs_heading('Alumni Meet', 'Sidebar: Alumni Meet'),
        tjs_repeater('meets', 'Alumni Meets', '+ Add Alumni Meet', [
            tjs_text('program', 'Name of the program', ['required' => 1, 'placeholder' => 'e.g. Alumni Meet 2025-2026', 'wrapper' => ['width' => '65']]),
            tjs_date('date', 'Date', ['wrapper' => ['width' => '35']]),
        ], ['layout' => 'table']),

        tjs_tab('Gallery'),
        tjs_heading('Gallery', 'Sidebar: Gallery. Add one album per group of photos (e.g. "Alumni Meet", "Alumni Talks"); each album becomes a tab on the website.'),
        tjs_repeater('gallery_albums', 'Albums', '+ Add Album', [
            tjs_text('title', 'Album name', ['required' => 1, 'placeholder' => 'e.g. Alumni Meet']),
            tjs_gallery('photos', 'Photos'),
        ], ['collapsed' => 'title']),

        tjs_tab('Testimonials'),
        tjs_heading('Testimonials', 'Sidebar: Testimonials'),
        tjs_repeater('testimonials', 'Testimonials', '+ Add Testimonial', [
            tjs_text('name', 'Name', array_merge(tjs_half(), ['required' => 1])),
            tjs_text('details', 'Batch / designation', array_merge(tjs_half(), ['placeholder' => 'e.g. 2018 Batch, Senior Engineer, TCS'])),
            tjs_textarea('message', 'Testimonial', ['rows' => 4, 'instructions' => 'Leave an empty line between paragraphs.']),
            tjs_image('photo', 'Photo (optional)'),
        ]),

        tjs_tab('Registration Forms'),
        tjs_heading('Alumni New-Registration Forms', 'Sidebar: Alumni New-Registration Forms'),
        tjs_textarea('registration_intro', 'Text above the links', ['rows' => 2]),
        tjs_repeater('registration_links', 'Form links', '+ Add Form Link', [
            tjs_text('label', 'Button text', ['required' => 1, 'placeholder' => 'e.g. Open Registration Form', 'wrapper' => ['width' => '40']]),
            tjs_f('url', 'url', 'Link', ['required' => 1, 'placeholder' => 'https://docs.google.com/forms/…', 'wrapper' => ['width' => '60']]),
        ], ['layout' => 'table']),

        tjs_tab('Contact us'),
        tjs_heading('Contact us', 'Sidebar: Contact us'),
        tjs_editor('contact', 'Contact details'),
    ];
}

add_action('acf/include_fields', function () {
    if (!function_exists('acf_add_local_field_group') || !function_exists('tjs_assign_keys')) {
        return;
    }
    acf_add_local_field_group([
        'key' => 'group_tjs_alumni',
        'title' => 'Alumni Page Content',
        'fields' => tjs_assign_keys(tjs_alumni_fields(), 'tjsa'),
        'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'tjs-alumni']]],
        'style' => 'seamless',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
    ]);
});

/* -------------------------------------------------------------------------
 * 3. REST API: GET (public) / POST (admins, used for bulk imports)
 * ---------------------------------------------------------------------- */

function tjs_alumni_field_names() {
    $names = [];
    foreach (tjs_alumni_fields() as $f) {
        if ($f['name'] !== '' && !in_array($f['type'], ['tab', 'message'], true)) {
            $names[] = $f['name'];
        }
    }
    return $names;
}

add_action('rest_api_init', function () {
    register_rest_route('tjs/v1', '/alumni', [
        [
            'methods' => 'GET',
            'permission_callback' => '__return_true',
            'callback' => function () {
                $out = [];
                foreach (tjs_alumni_field_names() as $name) {
                    $out[$name] = get_field($name, TJS_ALUMNI_ID);
                }
                return $out;
            },
        ],
        [
            'methods' => 'POST',
            'permission_callback' => function () {
                return current_user_can('manage_options');
            },
            'callback' => function (WP_REST_Request $request) {
                $body = (array) $request->get_json_params();
                foreach (tjs_alumni_field_names() as $name) {
                    if (array_key_exists($name, $body)) {
                        update_field('field_tjsa_' . $name, $body[$name], TJS_ALUMNI_ID);
                    }
                }
                return ['saved' => true];
            },
        ],
    ]);
});

/* -------------------------------------------------------------------------
 * 4. Admin styling (left-hand section menu, like the department screens)
 * ---------------------------------------------------------------------- */

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen || strpos($screen->id, 'tjs-alumni') === false) {
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
