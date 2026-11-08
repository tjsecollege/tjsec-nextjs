<?php
/**
 * Plugin Name: TJS Academics
 * Description: Editing screens for the website's Academics menu: Programmes Offered (/programmes-offered), Academic Calendar (/academics/academic-calendar) and Controller of Examinations (/academics/controller-of-examinations), under one "Academics" admin menu (Regulations and Curriculum, from tjs-regulations.php, sits there too). Read via GET /wp-json/tjs/v1/programmes, /academic-calendar and /coe.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * The pages: admin slug => [SCF post id, REST route, field key prefix, menu title, page title].
 * Order = order in the admin menu (matches the website's Academics menu).
 */
function tjs_academics_pages() {
    return [
        'tjs-programmes' => ['programmes', 'programmes', 'tjsprog', 'Programmes Offered', 'Programmes Offered Page'],
        'tjs-academic-calendar' => ['academic_calendar', 'academic-calendar', 'tjscal', 'Academic Calendar', 'Academic Calendar Page'],
        'tjs-coe' => ['coe', 'coe', 'tjscoe', 'Controller of Examinations', 'Controller of Examinations Page'],
    ];
}

add_action('acf/init', function () {
    if (!function_exists('acf_add_options_page')) {
        return;
    }
    acf_add_options_page([
        'page_title' => 'Academics',
        'menu_title' => 'Academics',
        'menu_slug' => 'tjs-academics',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-welcome-learn-more',
        'position' => 5,
        'redirect' => true, // opens the first page below
    ]);
    foreach (tjs_academics_pages() as $slug => [$post_id, , , $menu_title, $page_title]) {
        acf_add_options_sub_page([
            'page_title' => $page_title,
            'menu_title' => $menu_title,
            'menu_slug' => $slug,
            'parent_slug' => 'tjs-academics',
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

function tjs_academics_programmes_fields() {
    return [
        tjs_heading('How to edit this page', 'Each <strong>category</strong> (B.E, B.Tech, M.E, MBA…) is a tab on the website with its programmes as cards. Use the <strong>+ Add</strong> buttons to add, drag the ☰ handle to re-order, and the <strong>–</strong> button to remove. Click <strong>Save Programmes Offered</strong> when done.'),
        tjs_text('page_title', 'Page heading', ['placeholder' => 'e.g. Programmes Offered']),
        tjs_text('intro', 'Line under the heading', ['placeholder' => 'e.g. Explore our undergraduate and postgraduate programmes']),
        tjs_repeater('categories', 'Categories', '+ Add Category', [
            tjs_text('label', 'Category (tab name)', ['required' => 1, 'placeholder' => 'e.g. B.E']),
            tjs_repeater('programmes', 'Programmes', '+ Add Programme', [
                tjs_text('name', 'Programme name', ['required' => 1, 'placeholder' => 'e.g. Computer Science and Engineering', 'wrapper' => ['width' => '35']]),
                tjs_text('duration', 'Duration', ['placeholder' => 'e.g. 4 Years', 'wrapper' => ['width' => '15']]),
                tjs_text('intake', 'Intake (optional)', ['placeholder' => 'e.g. 60', 'wrapper' => ['width' => '15']]),
                tjs_f('post_object', 'department', 'Department page', [
                    'post_type' => ['department'],
                    'return_format' => 'object',
                    'allow_null' => 1,
                    'ui' => 1,
                    'instructions' => 'The "Explore" button opens this department.',
                    'wrapper' => ['width' => '35'],
                ]),
            ], ['layout' => 'table']),
        ], ['collapsed' => 'label']),
    ];
}

function tjs_academics_calendar_fields() {
    return [
        tjs_heading('How to edit this page', 'Add one calendar (PDF or Word) per academic year with <strong>+ Add Year</strong>. Each year becomes a tab on the website and the newest year opens first. Click <strong>Save Academic Calendar</strong> when done.'),
        tjs_text('page_title', 'Page heading', ['placeholder' => 'e.g. Academic Calendar']),
        tjs_textarea('intro', 'Intro text (optional)', ['rows' => 2]),
        tjs_repeater('calendars', 'Calendars', '+ Add Year', [
            tjs_select('year', 'Academic year', tjs_academic_years(), ['default_value' => '', 'required' => 1, 'wrapper' => ['width' => '25']]),
            tjs_file('file', 'File (PDF or Word)', ['required' => 1, 'mime_types' => 'pdf, doc, docx', 'instructions' => '', 'wrapper' => ['width' => '75']]),
        ], ['layout' => 'table']),
    ];
}

function tjs_academics_coe_fields() {
    return [
        tjs_heading('How to edit this page', 'The tabs below match the sidebar of the Controller of Examinations page. Use the <strong>+ Add</strong> buttons to add rows, drag the ☰ handle to re-order, and the <strong>–</strong> button to remove. Click <strong>Save Controller of Examinations</strong> when done. Sections left empty show “will be added soon” on the website.'),

        tjs_tab('Quick links'),
        tjs_heading('Quick links', 'The four cards at the top of the page. "Circulars" and "Guidelines" open their sections; Results and Exam Timetable need a link or file below (they stay greyed out until then).'),
        tjs_f('url', 'results_link', 'Results link', ['placeholder' => 'https://…', 'instructions' => 'e.g. the online results portal.']),
        tjs_file('timetable_file', 'Exam Timetable file', array_merge(tjs_half(), ['mime_types' => 'pdf, doc, docx, xls, xlsx', 'instructions' => 'Upload the current timetable…'])),
        tjs_f('url', 'timetable_link', '…or Exam Timetable link', array_merge(tjs_half(), ['placeholder' => 'https://…', 'instructions' => 'Used only when no file is uploaded.'])),

        tjs_tab('About'),
        tjs_heading('About', 'Sidebar: About (also opened by the "Guidelines" card).'),
        tjs_editor('about', 'About the Controller of Examinations'),
        tjs_text('rules_heading', 'Rules heading', ['placeholder' => 'e.g. Rules and Regulations for the Conduct of Examinations']),
        tjs_repeater('rules', 'Rules', '+ Add Rule', [
            tjs_textarea('text', 'Rule', ['rows' => 2, 'required' => 1, 'instructions' => 'Do not type the number — the website numbers the rules.']),
        ], ['layout' => 'table']),

        tjs_tab('People'),
        tjs_heading('People', 'Sidebar: People — the Controller of Examinations and office staff.'),
        tjs_repeater('people', 'People', '+ Add Person', [
            tjs_image('photo', 'Photo (optional)', ['wrapper' => ['width' => '20']]),
            tjs_text('name', 'Name', ['required' => 1, 'wrapper' => ['width' => '25']]),
            tjs_text('designation', 'Designation', ['placeholder' => 'e.g. Controller of Examinations', 'wrapper' => ['width' => '25']]),
            tjs_text('contact', 'Email / phone (optional)', ['wrapper' => ['width' => '30']]),
        ], ['layout' => 'table']),

        tjs_tab('Circulars'),
        tjs_heading('Circulars', 'Sidebar: Circulars (also opened by the "Circulars" card). Newest first — drag to re-order.'),
        tjs_repeater('circulars', 'Circulars', '+ Add Circular', [
            tjs_text('title', 'Title', ['required' => 1, 'wrapper' => ['width' => '45']]),
            tjs_date('date', 'Date (optional)', ['wrapper' => ['width' => '20']]),
            tjs_file('file', 'File', ['required' => 1, 'mime_types' => 'pdf, doc, docx, xls, xlsx', 'instructions' => '', 'wrapper' => ['width' => '35']]),
        ], ['layout' => 'table']),

        tjs_tab('Contact'),
        tjs_heading('Contact', 'Sidebar: Contact.'),
        tjs_textarea('contact_address', 'Office / address', ['rows' => 3, 'placeholder' => "e.g. Office of the Controller of Examinations\nT.J.S. Engineering College, Peruvoyal"]),
        tjs_f('email', 'contact_email', 'Email', tjs_half()),
        tjs_text('contact_phone', 'Phone', tjs_half()),
        tjs_text('contact_hours', 'Office hours (optional)', ['placeholder' => 'e.g. 9:00 AM – 4:30 PM, Monday to Saturday']),
    ];
}

/** Fields of one page, by admin slug. */
function tjs_academics_fields($slug) {
    switch ($slug) {
        case 'tjs-programmes':
            return tjs_academics_programmes_fields();
        case 'tjs-academic-calendar':
            return tjs_academics_calendar_fields();
        case 'tjs-coe':
            return tjs_academics_coe_fields();
    }
    return [];
}

/** Saved (non-layout) field names of one page. */
function tjs_academics_field_names($slug) {
    $names = [];
    foreach (tjs_academics_fields($slug) as $f) {
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
    foreach (tjs_academics_pages() as $slug => [, , $prefix, $menu_title]) {
        acf_add_local_field_group([
            'key' => 'group_' . $prefix,
            'title' => $menu_title . ' Content',
            'fields' => tjs_assign_keys(tjs_academics_fields($slug), $prefix),
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
    foreach (tjs_academics_pages() as $slug => [$post_id, $route, $prefix]) {
        register_rest_route('tjs/v1', '/' . $route, [
            [
                'methods' => 'GET',
                'permission_callback' => '__return_true',
                'callback' => function () use ($slug, $post_id) {
                    $out = [];
                    foreach (tjs_academics_field_names($slug) as $name) {
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
                    foreach (tjs_academics_field_names($slug) as $name) {
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
    if (!$screen || !preg_match('/tjs-(programmes|academic-calendar|coe)/', $screen->id)) {
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
