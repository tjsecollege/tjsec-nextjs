<?php
/**
 * Plugin Name: TJS Campus Life
 * Description: Editing screens for the website's Campus Life menu under one "Campus Life" admin menu: Library (/campus-life/library), Transport (/campus-life/transport) and the facility pages Convention Centre, Software Development Cell, Canteen and Student Hostel (/campus-life/<slug>). Wellness Centre, Sports and Fitness, Students Club and Medical Centre (their own plugins) sit in the same menu. Read via GET /wp-json/tjs/v1/library, /transport and /facility/<slug>.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * The pages: admin slug => [SCF post id, REST route, field key prefix, menu title].
 * Order = order in the admin menu (matches the website's Campus Life menu).
 */
function tjs_campus_life_pages() {
    return [
        'tjs-library' => ['library', 'library', 'tjslib', 'Library'],
        'tjs-convention-centre' => ['convention_centre', 'facility/convention-centre', 'tjsfcc', 'Convention Centre'],
        'tjs-transport' => ['transport', 'transport', 'tjstrn', 'Transport'],
        'tjs-software-development-cell' => ['software_development_cell', 'facility/software-development-cell', 'tjsfsdc', 'Software Development Cell'],
        'tjs-canteen' => ['canteen', 'facility/canteen', 'tjsfcan', 'Canteen'],
        'tjs-student-hostel' => ['student_hostel', 'facility/student-hostel', 'tjsfhos', 'Student Hostel'],
    ];
}

add_action('acf/init', function () {
    if (!function_exists('acf_add_options_page')) {
        return;
    }
    acf_add_options_page([
        'page_title' => 'Campus Life',
        'menu_title' => 'Campus Life',
        'menu_slug' => 'tjs-campus-life',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-building',
        'position' => 7,
        'redirect' => true, // opens the first page below
    ]);
    foreach (tjs_campus_life_pages() as $slug => [$post_id, , , $menu_title]) {
        acf_add_options_sub_page([
            'page_title' => $menu_title . ' Page',
            'menu_title' => $menu_title,
            'menu_slug' => $slug,
            'parent_slug' => 'tjs-campus-life',
            'capability' => 'edit_posts',
            'post_id' => $post_id,
            'update_button' => 'Save ' . $menu_title,
            'updated_message' => $menu_title . ' saved. Changes will appear on the website shortly.',
        ]);
    }
});

/* -------------------------------------------------------------------------
 * Fields
 * ---------------------------------------------------------------------- */

/** Icon choices for number cards and highlight cards: value = Remix Icon class used by the website. */
function tjs_campus_life_icons() {
    return [
        'ri-book-2-line' => 'Books',
        'ri-file-text-line' => 'Document / titles',
        'ri-stack-line' => 'Volumes / stack',
        'ri-newspaper-line' => 'Journals / newspaper',
        'ri-disc-line' => 'CD / DVD',
        'ri-user-line' => 'Person / seats',
        'ri-group-line' => 'Group / capacity',
        'ri-team-line' => 'Team',
        'ri-map-pin-2-line' => 'Area / location',
        'ri-award-line' => 'Award / certified',
        'ri-cloud-line' => 'Cloud / online',
        'ri-computer-line' => 'Computer',
        'ri-code-s-slash-line' => 'Code / software',
        'ri-terminal-box-line' => 'Terminal / lab',
        'ri-wifi-line' => 'Wi-Fi',
        'ri-projector-line' => 'Projector',
        'ri-presentation-line' => 'Presentation / stage',
        'ri-mic-line' => 'Microphone / audio',
        'ri-tv-2-line' => 'Screen / display',
        'ri-temp-cold-line' => 'Air-conditioned',
        'ri-sofa-line' => 'Seating / lounge',
        'ri-building-2-line' => 'Building',
        'ri-hotel-bed-line' => 'Bed / rooms',
        'ri-home-heart-line' => 'Home / care',
        'ri-restaurant-2-line' => 'Food',
        'ri-cup-line' => 'Beverages',
        'ri-water-flash-line' => 'Water / power',
        'ri-shield-check-line' => 'Safety / security',
        'ri-time-line' => 'Timings',
        'ri-parking-box-line' => 'Parking',
        'ri-bus-line' => 'Bus',
        'ri-lightbulb-flash-line' => 'Ideas / innovation',
        'ri-star-line' => 'Highlight',
    ];
}

function tjs_campus_life_stat_repeater($name, $label) {
    return tjs_repeater($name, $label, '+ Add Number Card', [
        tjs_select('icon', 'Icon', tjs_campus_life_icons(), ['wrapper' => ['width' => '25']]),
        tjs_text('value', 'Number / value', ['required' => 1, 'placeholder' => 'e.g. 18,000+', 'wrapper' => ['width' => '30']]),
        tjs_text('label', 'Label', ['placeholder' => 'e.g. Books & Study Materials', 'wrapper' => ['width' => '45']]),
    ], ['layout' => 'table']);
}

function tjs_campus_life_link_repeater($name, $label) {
    return tjs_repeater($name, $label, '+ Add', [
        tjs_text('label', 'Name', ['required' => 1, 'wrapper' => ['width' => '50']]),
        tjs_f('url', 'link', 'Link (optional)', ['placeholder' => 'https://…', 'wrapper' => ['width' => '50']]),
    ], ['layout' => 'table']);
}

function tjs_campus_life_text_list($name, $label, $button) {
    return tjs_repeater($name, $label, $button, [
        tjs_textarea('text', 'Text', ['rows' => 2, 'required' => 1]),
    ], ['layout' => 'table']);
}

function tjs_campus_life_library_fields() {
    $journal_list = function ($name, $label) {
        return tjs_repeater($name, $label, '+ Add Journal', [
            tjs_text('name', 'Journal name', ['required' => 1, 'wrapper' => ['width' => '70']]),
            tjs_text('publisher', 'Publisher', ['wrapper' => ['width' => '30']]),
        ], ['layout' => 'table']);
    };
    return [
        tjs_heading('How to edit this page', 'The tabs below match the sections of the Library page (and the menu at its top). Use the <strong>+ Add</strong> buttons to add rows, drag the ☰ handle to re-order, and the <strong>–</strong> button to remove. Click <strong>Save Library</strong> when done. Empty sections are hidden on the website.'),

        tjs_tab('About'),
        tjs_heading('About the Library', 'Section: About'),
        tjs_editor('about', 'About text'),
        tjs_campus_life_link_repeater('memberships', 'Memberships (shown as badges)'),
        tjs_campus_life_stat_repeater('about_stats', 'Number cards'),
        tjs_textarea('software_note', 'Library software (optional)', ['rows' => 2, 'placeholder' => 'e.g. LIBMAN – Library Management System…']),
        tjs_gallery('about_photos', 'Photos'),

        tjs_tab('Facilities'),
        tjs_heading('Library Facilities & Services', 'Section: Facilities & Services — shown in two columns.'),
        tjs_repeater('facilities', 'Facilities & services', '+ Add Facility', [
            tjs_text('text', 'Facility / service', ['required' => 1]),
        ], ['layout' => 'table']),

        tjs_tab('Collections'),
        tjs_heading('Library Collections', 'Section: Collections'),
        tjs_text('collections_title', 'Section heading', ['placeholder' => 'e.g. Library Collections – 2026']),
        tjs_campus_life_stat_repeater('collection_stats', 'Number cards'),
        tjs_campus_life_link_repeater('collection_links', 'Subscriptions (shown as badges)'),

        tjs_tab('Department-wise'),
        tjs_heading('Details of Library Books, Journals & CDs', 'Section: Department-wise. The Total row is added up automatically.'),
        tjs_gallery('deptwise_photos', 'Photos'),
        tjs_repeater('deptwise', 'Departments', '+ Add Department', [
            tjs_text('department', 'Department', ['required' => 1, 'wrapper' => ['width' => '25']]),
            tjs_f('number', 'titles', 'Titles', ['wrapper' => ['width' => '15']]),
            tjs_f('number', 'volumes', 'Volumes', ['wrapper' => ['width' => '15']]),
            tjs_f('number', 'national_journals', 'Journals (Nat.)', ['wrapper' => ['width' => '15']]),
            tjs_f('number', 'international_journals', 'Journals (Int.)', ['wrapper' => ['width' => '15']]),
            tjs_f('number', 'cds', "CD's", ['wrapper' => ['width' => '15']]),
        ], ['layout' => 'table']),

        tjs_tab('E-Resources'),
        tjs_heading('E-Resources Details', 'Section: E-Resources'),
        tjs_repeater('eresources', 'E-Resources', '+ Add Row', [
            tjs_text('source', 'Source', ['required' => 1, 'placeholder' => 'e.g. K-Hub', 'wrapper' => ['width' => '20']]),
            tjs_f('url', 'link', 'Source link (optional)', ['placeholder' => 'https://…', 'wrapper' => ['width' => '25']]),
            tjs_text('category', 'Category', ['placeholder' => 'e.g. E-Books', 'wrapper' => ['width' => '35']]),
            tjs_text('count', 'Count', ['placeholder' => 'e.g. 5,200', 'wrapper' => ['width' => '20']]),
        ], ['layout' => 'table']),
        tjs_repeater('other_collections', 'Other collections', '+ Add Row', [
            tjs_text('category', 'Collection', ['required' => 1, 'wrapper' => ['width' => '70']]),
            tjs_text('count', 'Count', ['wrapper' => ['width' => '30']]),
        ], ['layout' => 'table']),

        tjs_tab('Journals'),
        tjs_heading('National & International Journals', 'Section: Journals — one drop-down per department.'),
        tjs_repeater('journals', 'Departments', '+ Add Department', [
            tjs_text('department', 'Department', ['required' => 1]),
            $journal_list('national', 'National journals'),
            $journal_list('international', 'International journals'),
        ], ['collapsed' => 'department']),

        tjs_tab('Rules'),
        tjs_heading('Library Rules', 'Section: Library Rules'),
        tjs_campus_life_text_list('general_rules', 'General library rules', '+ Add Rule'),
        tjs_campus_life_text_list('digital_rules', 'Digital library rules', '+ Add Rule'),

        tjs_tab('Committee'),
        tjs_heading('Library Committee', 'Section: Committee'),
        tjs_repeater('committee', 'Members', '+ Add Member', [
            tjs_text('name', 'Name', ['required' => 1, 'wrapper' => ['width' => '40']]),
            tjs_text('designation', 'Designation', ['wrapper' => ['width' => '35']]),
            tjs_text('position', 'Position', ['placeholder' => 'e.g. Member', 'wrapper' => ['width' => '25']]),
        ], ['layout' => 'table']),

        tjs_tab('Contact'),
        tjs_heading('Contact', 'Section: Contact'),
        tjs_editor('contact', 'Contact details'),
    ];
}

function tjs_campus_life_transport_fields() {
    return [
        tjs_heading('How to edit this page', 'Add a row per bus route with <strong>+ Add Route</strong>, drag the ☰ handle to re-order, and the <strong>–</strong> button to remove. Click <strong>Save Transport</strong> when done.'),
        tjs_text('page_title', 'Page heading', ['placeholder' => 'e.g. Transport Details']),
        tjs_textarea('intro', 'Intro text', ['rows' => 3]),
        tjs_repeater('routes', 'Bus routes', '+ Add Route', [
            tjs_text('route_no', 'Route No.', ['required' => 1, 'wrapper' => ['width' => '12']]),
            tjs_text('vehicle_no', 'Vehicle No.', ['wrapper' => ['width' => '20']]),
            tjs_text('route_name', 'Route name', ['wrapper' => ['width' => '24']]),
            tjs_text('driver', 'Driver name', ['wrapper' => ['width' => '24']]),
            tjs_text('phone', 'Phone number', ['wrapper' => ['width' => '20']]),
        ], ['layout' => 'table']),
        tjs_text('coordinators_title', 'Coordinators heading', ['placeholder' => 'e.g. Bus Co-Ordinators']),
        tjs_repeater('coordinators', 'Bus coordinators', '+ Add Coordinator', [
            tjs_text('name', 'Name & role', ['required' => 1, 'placeholder' => 'e.g. Prabhu (Librarian)', 'wrapper' => ['width' => '60']]),
            tjs_text('phone', 'Phone', ['wrapper' => ['width' => '40']]),
        ], ['layout' => 'table']),
    ];
}

/** Shared layout of the simple facility pages (Convention Centre, Canteen, …). */
function tjs_campus_life_facility_fields($menu_title) {
    return [
        tjs_heading('How to edit this page', 'Fill in the parts you need — empty parts are hidden on the website, and the page shows “Content coming soon” until something is added. Click <strong>Save ' . esc_html($menu_title) . '</strong> when done.'),
        tjs_text('page_title', 'Page heading', ['placeholder' => 'e.g. ' . $menu_title]),
        tjs_editor('intro', 'Introduction'),
        tjs_gallery('photos', 'Photos (optional)', ['instructions' => 'Shown as a photo slider beside the introduction.']),
        tjs_heading('Highlights', 'Cards with an icon, e.g. seating capacity, facilities, timings.'),
        tjs_text('highlights_heading', 'Section heading', ['placeholder' => 'e.g. Facilities']),
        tjs_repeater('highlights', 'Highlights', '+ Add Card', [
            tjs_select('icon', 'Icon', tjs_campus_life_icons(), ['wrapper' => ['width' => '20']]),
            tjs_text('title', 'Title', ['required' => 1, 'wrapper' => ['width' => '30']]),
            tjs_textarea('description', 'Description', ['rows' => 2, 'wrapper' => ['width' => '50']]),
        ], ['layout' => 'table']),
        tjs_heading('More information (optional)', 'Any further text — rules, timings, contact person and so on.'),
        tjs_text('more_heading', 'Section heading', ['placeholder' => 'e.g. Contact']),
        tjs_editor('more', 'Text'),
    ];
}

/** Fields of one page, by admin slug. */
function tjs_campus_life_fields($slug) {
    if ($slug === 'tjs-library') {
        return tjs_campus_life_library_fields();
    }
    if ($slug === 'tjs-transport') {
        return tjs_campus_life_transport_fields();
    }
    $pages = tjs_campus_life_pages();
    return isset($pages[$slug]) ? tjs_campus_life_facility_fields($pages[$slug][3]) : [];
}

/** Saved (non-layout) field names of one page. */
function tjs_campus_life_field_names($slug) {
    $names = [];
    foreach (tjs_campus_life_fields($slug) as $f) {
        if ($f['name'] !== '' && !in_array($f['type'], ['tab', 'message'], true)) {
            $names[] = $f['name'];
        }
    }
    return $names;
}

add_action('acf/include_fields', function () {
    if (!function_exists('acf_add_local_field_group') || !function_exists('tjs_assign_keys')) {
        return;
    }
    foreach (tjs_campus_life_pages() as $slug => [, , $prefix, $menu_title]) {
        acf_add_local_field_group([
            'key' => 'group_' . $prefix,
            'title' => $menu_title . ' Content',
            'fields' => tjs_assign_keys(tjs_campus_life_fields($slug), $prefix),
            'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => $slug]]],
            'style' => 'seamless',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
        ]);
    }
});

/* -------------------------------------------------------------------------
 * REST API: GET (public) / POST (admins, used for the initial import)
 * ---------------------------------------------------------------------- */

add_action('rest_api_init', function () {
    foreach (tjs_campus_life_pages() as $slug => [$post_id, $route, $prefix]) {
        register_rest_route('tjs/v1', '/' . $route, [
            [
                'methods' => 'GET',
                'permission_callback' => '__return_true',
                'callback' => function () use ($slug, $post_id) {
                    $out = [];
                    foreach (tjs_campus_life_field_names($slug) as $name) {
                        $out[$name] = get_field($name, $post_id);
                    }
                    return $out;
                },
            ],
            [
                'methods' => 'POST',
                'permission_callback' => function () {
                    return current_user_can('manage_options');
                },
                'callback' => function (WP_REST_Request $request) use ($slug, $post_id, $prefix) {
                    $body = (array) $request->get_json_params();
                    foreach (tjs_campus_life_field_names($slug) as $name) {
                        if (array_key_exists($name, $body)) {
                            update_field('field_' . $prefix . '_' . $name, $body[$name], $post_id);
                        }
                    }
                    return ['saved' => true];
                },
            ],
        ]);
    }
});

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen) {
        return;
    }
    $ours = false;
    foreach (array_keys(tjs_campus_life_pages()) as $slug) {
        $ours = $ours || strpos($screen->id, $slug) !== false;
    }
    if (!$ours) {
        return;
    }
    ?>
    <style>
        .tjs-section-heading { border-top: 0 !important; }
        .tjs-section-heading > .acf-label label { font-size: 17px; color: #1d2a6b; }
        .tjs-section-heading .acf-input { color: #646970; }
        .acf-repeater .acf-actions .acf-button { font-size: 13px; padding: 4px 14px; }
    </style>
    <?php
});
