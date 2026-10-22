<?php
/**
 * Plugin Name: TJS Departments
 * Description: "Departments" content type for the Next.js site (tjs-nextjs). Every department page section (About, People, Academics, Industry Interface, Research, Facilities, Events, Placements, Achievements, Others) gets a friendly, tabbed editing screen with "+ Add" rows, photo galleries and document uploads. Exposed read-only via the WP REST API: /wp-json/wp/v2/departments?slug=eee&acf_format=standard
 * Version: 4.0.0
 *
 * Requires the "Secure Custom Fields" plugin (WordPress.org). Fields are defined
 * in code below so editors cannot accidentally break them.
 */

if (!defined('ABSPATH')) {
    exit;
}

/* -------------------------------------------------------------------------
 * 1. Content type: Department
 * ---------------------------------------------------------------------- */

add_action('init', function () {
    register_post_type('department', [
        'labels' => [
            'name' => 'Departments',
            'singular_name' => 'Department',
            'menu_name' => 'Departments',
            'all_items' => 'All Departments',
            'add_new' => 'Add Department',
            'add_new_item' => 'Add New Department',
            'edit_item' => 'Edit Department Page',
            'new_item' => 'New Department',
            'search_items' => 'Search Departments',
            'not_found' => 'No departments yet.',
            'item_updated' => 'Department page updated. Changes will appear on the website shortly.',
            'item_published' => 'Department page published.',
        ],
        // Headless: the website is the Next.js app, so WordPress itself never
        // renders department pages. The REST API still serves them.
        'public' => false,
        'publicly_queryable' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'rest_base' => 'departments',
        'menu_position' => 5,
        'menu_icon' => 'dashicons-welcome-learn-more',
        'supports' => ['title', 'revisions'],
        'has_archive' => false,
        'rewrite' => false,
    ]);
});

add_filter('enter_title_here', function ($text, $post) {
    return $post->post_type === 'department' ? 'Department name (e.g. Electrical and Electronics Engineering)' : $text;
}, 10, 2);

/* -------------------------------------------------------------------------
 * 2. "Website address" box (replaces the hidden slug box)
 * ---------------------------------------------------------------------- */

add_action('add_meta_boxes_department', function () {
    remove_meta_box('slugdiv', 'department', 'normal');
    add_meta_box('tjs_dept_address', 'Website Address', function ($post) {
        echo '<p style="margin-top:0">Page link on the website:</p>';
        echo '<p><code>/departments/</code><input type="text" name="post_name" value="' . esc_attr($post->post_name) . '" placeholder="e.g. eee" style="width:110px" /></p>';
        echo '<p class="description">Short name used in the link. Please do not change it after the page is live, or old links will stop working.</p>';
    }, 'department', 'side', 'high');
});

add_filter('manage_department_posts_columns', function ($cols) {
    $new = [];
    foreach ($cols as $k => $v) {
        $new[$k] = $v;
        if ($k === 'title') {
            $new['tjs_address'] = 'Website Address';
        }
    }
    return $new;
});

add_action('manage_department_posts_custom_column', function ($col, $post_id) {
    if ($col === 'tjs_address') {
        echo '<code>/departments/' . esc_html(get_post_field('post_name', $post_id)) . '</code>';
    }
}, 10, 2);

/* -------------------------------------------------------------------------
 * 3. Field builders (keep the definitions below short and readable)
 * ---------------------------------------------------------------------- */

function tjs_f($type, $name, $label, $extra = []) {
    return array_merge(['type' => $type, 'name' => $name, 'label' => $label], $extra);
}

function tjs_text($name, $label, $extra = []) {
    return tjs_f('text', $name, $label, $extra);
}

function tjs_textarea($name, $label, $extra = []) {
    return tjs_f('textarea', $name, $label, array_merge(['rows' => 4, 'new_lines' => ''], $extra));
}

function tjs_editor($name, $label, $extra = []) {
    return tjs_f('wysiwyg', $name, $label, array_merge(['tabs' => 'visual', 'toolbar' => 'full', 'media_upload' => 0], $extra));
}

function tjs_image($name, $label, $extra = []) {
    return tjs_f('image', $name, $label, array_merge([
        'return_format' => 'array',
        'preview_size' => 'thumbnail',
        'library' => 'all',
        'mime_types' => 'jpg, jpeg, png, webp',
    ], $extra));
}

function tjs_gallery($name = 'photos', $label = 'Photos', $extra = []) {
    return tjs_f('gallery', $name, $label, array_merge([
        'return_format' => 'array',
        'preview_size' => 'thumbnail',
        'library' => 'all',
        'insert' => 'append',
        'mime_types' => 'jpg, jpeg, png, webp',
        'instructions' => 'Click "Add to gallery" to upload or pick photos. Drag photos to change their order.',
    ], $extra));
}

function tjs_file($name, $label, $extra = []) {
    return tjs_f('file', $name, $label, array_merge([
        'return_format' => 'array',
        'library' => 'all',
        'mime_types' => 'pdf, doc, docx, ppt, pptx, xls, xlsx',
        'instructions' => 'Upload a PDF / Word file.',
    ], $extra));
}

function tjs_date($name, $label, $extra = []) {
    return tjs_f('date_picker', $name, $label, array_merge([
        'display_format' => 'd/m/Y',
        'return_format' => 'Y-m-d',
        'first_day' => 1,
    ], $extra));
}

function tjs_select($name, $label, $choices, $extra = []) {
    return tjs_f('select', $name, $label, array_merge([
        'choices' => $choices,
        'default_value' => array_key_first($choices),
        'ui' => 0,
        'return_format' => 'value',
    ], $extra));
}

function tjs_repeater($name, $label, $button, $sub_fields, $extra = []) {
    return tjs_f('repeater', $name, $label, array_merge([
        'layout' => 'block',
        'button_label' => $button,
        'sub_fields' => $sub_fields,
        // Name of the sub field shown as the row's title when a row is collapsed
        'collapsed' => $sub_fields[0]['name'] ?? '',
    ], $extra));
}

function tjs_tab($label) {
    return ['type' => 'tab', 'name' => '', 'label' => $label, 'placement' => 'left', 'endpoint' => 0];
}

function tjs_heading($label, $message = '') {
    return ['type' => 'message', 'name' => '', 'label' => $label, 'message' => $message, 'new_lines' => 'wpautop', 'wrapper' => ['class' => 'tjs-section-heading']];
}

function tjs_half() {
    return ['wrapper' => ['width' => '50']];
}

function tjs_third() {
    return ['wrapper' => ['width' => '33']];
}

/** Shared shape for dated activities (visits, conferences, seminars, achievements…). */
function tjs_event_repeater($name, $label, $button, $extra_sub = [], $extra = [], $lead_sub = []) {
    $sub = array_merge(
        $lead_sub,
        [
            tjs_text('title', 'Title', ['required' => 1]),
            tjs_date('start_date', 'Date', array_merge(tjs_half(), ['required' => 1, 'instructions' => 'Used to group entries by year on the website.'])),
            tjs_date('end_date', 'End date (only if more than one day)', tjs_half()),
            tjs_textarea('description', 'Description', ['instructions' => 'Leave an empty line between paragraphs.']),
        ],
        $extra_sub,
        [tjs_gallery()]
    );
    return tjs_repeater($name, $label, $button, $sub, array_merge(['collapsed' => 'title'], $extra));
}

function tjs_people_subrepeater($name, $label, $button, $role_label = 'Role / Designation') {
    return tjs_repeater($name, $label, $button, [
        tjs_text('name', 'Name', tjs_half()),
        tjs_text('role', $role_label, tjs_half()),
    ], ['layout' => 'table']);
}

function tjs_doc_repeater($name, $label, $button) {
    return tjs_repeater($name, $label, $button, [
        tjs_text('title', 'Title', ['required' => 1]),
        tjs_file('document', 'Document'),
    ]);
}

/**
 * Give every field a stable, unique key derived from its position, and turn the
 * shorthand used above ('collapsed' => sub field name, conditional logic on
 * '@sibling_name') into the real field keys SCF expects.
 */
function tjs_assign_keys(array $fields, $prefix) {
    $keys = [];
    foreach ($fields as $i => $f) {
        $id = $f['name'] !== '' ? $f['name'] : $f['type'] . $i;
        $fields[$i]['key'] = 'field_' . $prefix . '_' . $id;
        $keys[$f['name']] = $fields[$i]['key'];
    }
    foreach ($fields as $i => $f) {
        if (!empty($f['sub_fields'])) {
            $fields[$i]['sub_fields'] = tjs_assign_keys($f['sub_fields'], substr($f['key'], 6));
            if (!empty($f['collapsed'])) {
                $fields[$i]['collapsed'] = $f['key'] . '_' . $f['collapsed'];
            }
        }
        // Flexible content: each layout gets its own key and keyed sub fields.
        if (!empty($f['layouts'])) {
            $layouts = [];
            foreach ($f['layouts'] as $layout) {
                $prefix_l = substr($f['key'], 6) . '_' . $layout['name'];
                $layout['key'] = 'layout_' . $prefix_l;
                $layout['sub_fields'] = tjs_assign_keys($layout['sub_fields'], $prefix_l);
                $layouts[$layout['key']] = $layout;
            }
            $fields[$i]['layouts'] = $layouts;
        }
        if (!empty($f['conditional_logic'])) {
            foreach ($f['conditional_logic'] as $g => $rules) {
                foreach ($rules as $r => $rule) {
                    $fields[$i]['conditional_logic'][$g][$r]['field'] = $keys[ltrim($rule['field'], '@')];
                }
            }
        }
    }
    return $fields;
}

/* -------------------------------------------------------------------------
 * 4. Department page fields — one tab per website menu
 * ---------------------------------------------------------------------- */

function tjs_department_fields() {
    $fdp_types = [
        'guest_lecture' => 'Guest Lecture',
        'workshop' => 'Workshop',
        'fdp_organised' => 'FDP Organised by the Department',
        'fdp_attended' => 'FDP Attended by Faculty',
    ];
    $when_fdp = function ($value) {
        return ['conditional_logic' => [[['field' => '@type', 'operator' => '==', 'value' => $value]]]];
    };    return [
        tjs_heading('How to edit this page', 'Pick a section from the menu on the left. Use the <strong>+ Add</strong> buttons to add new entries, drag the ☰ handle to re-order, and the <strong>–</strong> button to remove. Click the blue <strong>Update</strong> button (top right) to save. Sections left empty show “Content coming soon” on the website.'),

        // ---------------- Banner ----------------
        tjs_tab('Top Banner & Toppers'),
        tjs_heading('Top Banner', 'The large banner at the top of the department page. The page heading is the department name typed in the title box above.'),
        tjs_text('hero_label', 'Small label above the heading', ['default_value' => 'Department']),
        tjs_textarea('hero_description', 'Short introduction under the heading', ['rows' => 3]),
        tjs_gallery('hero_images', 'Banner photos', ['preview_size' => 'medium', 'instructions' => 'Upload one or more photos. With two or more, the banner becomes a slider; drag photos to change their order.']),
        tjs_heading('Academic Toppers', 'Photo slider shown just below the department menu.'),
        tjs_repeater('toppers', 'Academic Toppers', '+ Add Topper', [
            tjs_text('name', 'Student name', tjs_half()),
            tjs_text('details', 'Details (optional, e.g. "University Rank 3, 2025 Batch")', tjs_half()),
            tjs_image('photo', 'Photo'),
        ]),

        // ---------------- About ----------------
        tjs_tab('About'),
        tjs_heading('About us', 'Menu: About → About us'),
        tjs_editor('about_content', 'About the department'),
        tjs_heading('Vision and Mission', 'Menu: About → Vision and Mission'),
        tjs_textarea('vision', 'Vision', ['rows' => 3]),
        tjs_repeater('mission', 'Mission points', '+ Add Mission Point', [
            tjs_textarea('point', 'Mission point', ['rows' => 2]),
        ], ['layout' => 'table']),
        tjs_heading("HOD's Desk", "Menu: About → HOD's Desk"),
        tjs_image('hod_photo', 'HOD photo', tjs_third()),
        tjs_text('hod_name', 'HOD name', array_merge(tjs_third(), ['placeholder' => 'e.g. Mrs. M. Shunmuga Sankari'])),
        tjs_text('hod_designation', 'HOD designation', array_merge(tjs_third(), ['placeholder' => 'e.g. HOD, Department of EEE'])),
        tjs_text('hod_message_title', 'Message heading', ['placeholder' => 'e.g. Welcome to the Department of Electrical and Electronics Engineering']),
        tjs_editor('hod_message', "HOD's message", ['instructions' => 'Use the "Heading 4" style from the Paragraph dropdown for sub-headings.']),
        tjs_text('hod_quote', 'Closing quote (optional)'),
        tjs_heading('Magazine', 'Menu: About → Magazine. Newsletters / magazines that visitors can open or download.'),
        tjs_doc_repeater('magazines', 'Magazines & Newsletters', '+ Add Magazine'),

        // ---------------- People ----------------
        tjs_tab('People'),
        tjs_heading('Faculty', 'Menu: People → Faculty'),
        tjs_repeater('faculty', 'Faculty Members', '+ Add Faculty Member', [
            tjs_text('name', 'Name', array_merge(tjs_half(), ['required' => 1, 'placeholder' => 'e.g. Mr. Ganesh S'])),
            tjs_text('designation', 'Designation', array_merge(tjs_half(), ['placeholder' => 'e.g. Assistant Professor'])),
            tjs_text('qualification', 'Qualification', array_merge(tjs_third(), ['placeholder' => 'e.g. M.E / Ph.D'])),
            tjs_text('aicte_id', 'AICTE ID', tjs_third()),
            tjs_text('au_fin', 'AU-FIN (Anna University ID)', tjs_third()),
            tjs_image('photo', 'Photo'),
        ]),
        tjs_heading('Non-Teaching Staff', 'Menu: People → Non-Teaching'),
        tjs_repeater('non_teaching', 'Non-Teaching Staff', '+ Add Staff Member', [
            tjs_text('name', 'Name', array_merge(tjs_half(), ['required' => 1])),
            tjs_text('designation', 'Designation', array_merge(tjs_half(), ['placeholder' => 'e.g. Lab Instructor'])),
            tjs_image('photo', 'Photo'),
        ]),

        // ---------------- Academics ----------------
        tjs_tab('Academics'),
        tjs_heading('Programme Offered', 'Menu: Academics → Programme Offered. Add one entry per programme (e.g. B.E – EEE, M.E – Power Systems). Each programme becomes a tab on the website.'),
        tjs_repeater('programmes', 'Programmes', '+ Add Programme', [
            tjs_text('programme_name', 'Programme name', ['required' => 1, 'placeholder' => 'e.g. B.E – EEE']),
            tjs_repeater('peos', 'Program Educational Objectives (PEOs)', '+ Add PEO', [
                tjs_text('title', 'Title (optional)', ['placeholder' => 'e.g. PEO1 – Professional Excellence', 'instructions' => 'Leave empty for a simple numbered list. If you add a title, include its number here (e.g. PEO1 – …).']),
                tjs_textarea('text', 'Description', ['rows' => 2, 'instructions' => 'Do not type the number (1., 2., …). If Title is empty, the website numbers the items automatically.']),
            ]),
            tjs_repeater('pos', 'Program Outcomes (POs)', '+ Add PO', [
                tjs_text('title', 'Title (optional)', ['placeholder' => 'e.g. PO1 – Engineering Knowledge', 'instructions' => 'Leave empty for a simple numbered list. If you add a title, include its number here (e.g. PO1 – …).']),
                tjs_textarea('text', 'Description', ['rows' => 2, 'instructions' => 'Do not type the number (1., 2., …). If Title is empty, the website numbers the items automatically.']),
            ]),
            tjs_repeater('psos', 'Program Specific Outcomes (PSOs)', '+ Add PSO', [
                tjs_text('title', 'Title (optional)', ['placeholder' => 'e.g. PSO1. Foundation of Electrical Engineering', 'instructions' => 'Leave empty for a simple numbered list. If you add a title, include its number here (e.g. PSO1. …).']),
                tjs_textarea('text', 'Description', ['rows' => 2, 'instructions' => 'Do not type the number (1., 2., …). If Title is empty, the website numbers the items automatically.']),
            ]),
        ]),
        tjs_heading('Board of Studies (BOS)', 'Menu: Academics → BOS'),
        tjs_date('bos_meeting_date', 'Meeting date', tjs_third()),
        tjs_f('time_picker', 'bos_meeting_time', 'Meeting time', array_merge(tjs_third(), ['display_format' => 'g:i a', 'return_format' => 'g:i a'])),
        tjs_text('bos_meeting_number', 'Meeting number', array_merge(tjs_third(), ['placeholder' => 'e.g. 01'])),
        tjs_text('bos_venue', 'Venue', ['placeholder' => 'e.g. Board Room, T.J.S Engineering College']),
        tjs_repeater('bos_members', 'BOS Members', '+ Add Position', [
            tjs_text('position', 'Position in Board of Studies', ['required' => 1, 'placeholder' => 'e.g. Expert Nominated from Anna University']),
            tjs_repeater('members', 'Members in this position', '+ Add Member', [
                tjs_text('name', 'Name', ['wrapper' => ['width' => '35']]),
                tjs_textarea('details', 'Designation & organisation', ['rows' => 2, 'wrapper' => ['width' => '65']]),
            ], ['layout' => 'table']),
        ]),
        tjs_heading('Regulation & Curriculum', 'Menu: Academics → Curriculum & Syllabi'),
        tjs_doc_repeater('curriculum_documents', 'Regulation & Curriculum Documents', '+ Add Document'),

        // ---------------- Industry Interface ----------------
        tjs_tab('Industry Interface'),
        tjs_heading("MOU's", "Menu: Industry Interface → MOU's"),
        tjs_editor('mou_intro', 'Introduction text'),
        tjs_repeater('mous', 'MoUs', '+ Add MoU', [
            tjs_text('company', 'Company / organisation', array_merge(tjs_half(), ['required' => 1])),
            tjs_date('signed_date', 'Date signed', tjs_half()),
            tjs_file('document', 'MoU document (PDF)', ['mime_types' => 'pdf', 'instructions' => 'Upload the scanned MoU as a PDF.']),
        ]),
        tjs_heading('Area of Consultancy', 'Menu: Industry Interface → Area of Consultancy'),
        tjs_doc_repeater('consultancy', 'Consultancy Work', '+ Add Consultancy'),
        tjs_heading('Industry Visits', 'Menu: Industry Interface → Industry Visits. Grouped by year on the website.'),
        tjs_event_repeater('industry_visits', 'Industry Visits', '+ Add Industry Visit', [
            tjs_people_subrepeater('coordinators', 'Faculty coordinators (optional)', '+ Add Coordinator', 'Designation (e.g. AP/EEE)'),
        ]),
        tjs_heading('Internship', 'Menu: Industry Interface → Internship'),
        tjs_repeater('internships', 'Internships', '+ Add Internship', [
            tjs_text('organisation', 'Organisation', ['required' => 1]),
            tjs_date('start_date', 'From', tjs_half()),
            tjs_date('end_date', 'To', tjs_half()),
            tjs_textarea('students', 'Students', ['rows' => 2, 'placeholder' => 'e.g. III Year students: Hemaraj R, Logendheran R, …']),
            tjs_gallery(),
        ]),

        // ---------------- Research ----------------
        tjs_tab('Research'),
        tjs_heading('Publication', 'Menu: Research → Publication'),
        tjs_repeater('publications', 'Publications', '+ Add Publication', [
            tjs_text('title', 'Paper title', ['required' => 1]),
            tjs_text('authors', 'Authors', array_merge(tjs_half(), ['placeholder' => 'e.g. Shalini Chowdary'])),
            tjs_text('published_in', 'Journal / Conference name', array_merge(tjs_half(), ['placeholder' => 'e.g. Medical Engineering & Physics', 'instructions' => 'Name only — type the year in the Year box.'])),
            tjs_f('number', 'year', 'Year', array_merge(tjs_third(), ['placeholder' => 'e.g. 2024', 'min' => 1950, 'max' => 2100, 'step' => 1])),
            tjs_text('impact_factor', 'Impact Factor (optional)', array_merge(tjs_third(), ['placeholder' => 'e.g. 2.5'])),
            tjs_text('citations', 'Citations (optional)', array_merge(tjs_third(), ['placeholder' => 'e.g. 52'])),
            tjs_f('url', 'link', 'Link to the paper (optional)', ['placeholder' => 'https://…', 'instructions' => 'Google Scholar / journal page. The card opens this link when clicked.']),
        ]),
        tjs_heading('Patent', 'Menu: Research → Patent'),
        tjs_repeater('patents', 'Patents', '+ Add Patent', [
            tjs_text('title', 'Patent title', ['required' => 1]),
            tjs_text('inventors', 'Inventors', tjs_half()),
            tjs_text('application_number', 'Application / Patent number', tjs_half()),
            tjs_select('status', 'Status', ['filed' => 'Filed', 'published' => 'Published', 'granted' => 'Granted'], tjs_half()),
            tjs_date('date', 'Date', tjs_half()),
            tjs_file('document', 'Certificate / document (optional)'),
        ]),
        tjs_heading('Books & Chapters', 'Menu: Research → Books & Chapters'),
        tjs_repeater('books', 'Books & Chapters', '+ Add Book / Chapter', [
            tjs_text('title', 'Title', ['required' => 1]),
            tjs_select('type', 'Type', ['book' => 'Book', 'chapter' => 'Book Chapter'], tjs_third()),
            tjs_text('authors', 'Authors', tjs_third()),
            tjs_text('publisher', 'Publisher', tjs_third()),
            tjs_text('isbn', 'ISBN', tjs_third()),
            tjs_date('date', 'Published date', tjs_third()),
            tjs_f('url', 'link', 'Link (optional)', tjs_third()),
        ]),

        // ---------------- Facilities ----------------
        tjs_tab('Facilities'),
        tjs_heading('Department Laboratories', 'Menu: Facilities → Department Laboratories. Each lab opens as an expandable panel on the website.'),
        tjs_repeater('labs', 'Laboratories', '+ Add Laboratory', [
            tjs_text('name', 'Laboratory name', ['required' => 1, 'placeholder' => 'e.g. Electrical Machines Lab']),
            tjs_textarea('description', 'About the laboratory', ['rows' => 5, 'instructions' => 'Leave an empty line between paragraphs.']),
            tjs_gallery(),
            tjs_repeater('sub_labs', 'Labs inside this lab (optional)', '+ Add Sub-Lab', [
                tjs_text('name', 'Name'),
                tjs_textarea('description', 'About', ['rows' => 4, 'instructions' => 'Leave an empty line between paragraphs.']),
                tjs_gallery(),
            ], ['instructions' => 'Use this only when one room has two labs, e.g. "Control & Instrumentation Lab and Power System Simulation Lab".']),
        ]),
        // ---------------- Events ----------------
        tjs_tab('Events'),
        tjs_heading('Conference', 'Menu: Events → Conference'),
        tjs_event_repeater('conferences', 'Conferences', '+ Add Conference'),
        tjs_heading('Guest Lecture, FDP & Workshop', 'Menu: Events → Guest Lecturer, FDP & Workshop'),
        tjs_event_repeater('fdp_workshops', 'Guest Lectures, FDPs & Workshops', '+ Add Guest Lecture / FDP / Workshop', [
            tjs_text('organised_by', 'Organised by', array_merge(tjs_half(), $when_fdp('fdp_attended'))),
            tjs_text('attended_by', 'Attended by (faculty names)', array_merge(tjs_half(), $when_fdp('fdp_attended'))),
            tjs_repeater('schedule', 'Day-wise schedule (optional)', '+ Add Day', [
                tjs_date('date', 'Date', ['wrapper' => ['width' => '20']]),
                tjs_text('topic', 'Topic', ['wrapper' => ['width' => '40']]),
                tjs_text('speaker', 'Speaker', ['wrapper' => ['width' => '40']]),
            ], array_merge(['layout' => 'table'], $when_fdp('fdp_organised'))),
        ], [], [
            tjs_select('type', 'Type', $fdp_types, ['required' => 1]),
        ]),
        tjs_heading('Value Added Course', 'Menu: Events → Value Added Course'),
        tjs_repeater('value_added_courses', 'Value Added Courses', '+ Add Course', [
            tjs_text('title', 'Course name', ['required' => 1, 'placeholder' => 'e.g. Embedded System with IoT']),
            tjs_textarea('description', 'Description', ['rows' => 3]),
            tjs_text('organised_by', 'Organised by', tjs_half()),
            tjs_text('association', 'In association with', tjs_half()),
            tjs_text('participants', 'Participants', array_merge(tjs_half(), ['placeholder' => 'e.g. II, III and IV Year EEE Students'])),
            tjs_text('timing', 'Time', array_merge(tjs_half(), ['placeholder' => 'e.g. 9:00 AM to 3:15 PM'])),
            tjs_date('start_date', 'From', tjs_half()),
            tjs_date('end_date', 'To', tjs_half()),
            tjs_textarea('trainers', 'Speakers / Trainers', ['rows' => 2, 'instructions' => 'One name per line.']),
            tjs_gallery(),
        ]),
        tjs_heading('Symposium', 'Menu: Events → Symposium'),
        tjs_event_repeater('symposiums', 'Symposiums', '+ Add Symposium'),
        tjs_heading('Seminars & Activities', 'Menu: Events → Seminars & Activities'),
        tjs_event_repeater('seminars', 'Seminars & Activities', '+ Add Seminar / Activity'),

        // ---------------- Placements ----------------
        tjs_tab('Placements'),
        tjs_heading('Major Recruiters', 'Menu: Placements → Major Recruiters'),
        tjs_repeater('recruiters', 'Recruiters', '+ Add Recruiter', [
            tjs_text('name', 'Company name', array_merge(tjs_half(), ['required' => 1])),
            tjs_image('logo', 'Company logo', tjs_half()),
        ]),
        tjs_heading('Placed Students', 'Menu: Placements → Placed Students'),
        tjs_repeater('placed_students', 'Placed Students', '+ Add Placed Student', [
            tjs_text('name', 'Student name', array_merge(tjs_half(), ['required' => 1])),
            tjs_text('company', 'Company', array_merge(tjs_half(), ['required' => 1])),
            tjs_date('placed_date', 'Date of placement', tjs_half()),
            tjs_text('package', 'Package (CTC)', array_merge(tjs_half(), ['placeholder' => 'e.g. 2.4 LPA'])),
            tjs_image('photo', 'Photo'),
        ]),

        // ---------------- Achievements ----------------
        tjs_tab('Achievements'),
        tjs_heading('Faculty Achievements', 'Menu: Achievements → Faculty Achievements'),
        tjs_event_repeater('faculty_achievements', 'Faculty Achievements', '+ Add Faculty Achievement'),
        tjs_heading('Students Achievements', 'Menu: Achievements → Students Achievements'),
        tjs_doc_repeater('student_achievements', 'Students Achievements', '+ Add Student Achievement'),
        tjs_heading('Co-Curricular', 'Menu: Achievements → Co-Curricular'),
        tjs_event_repeater('co_curricular', 'Co-Curricular Activities', '+ Add Co-Curricular Activity'),
        tjs_heading('Extra-Curricular', 'Menu: Achievements → Extra-Curricular'),
        tjs_event_repeater('extra_curricular', 'Extra-Curricular Activities', '+ Add Extra-Curricular Activity'),

        // ---------------- Others ----------------
        tjs_tab('Others'),
        tjs_heading('Gallery', 'Menu: Others → Gallery'),
        tjs_gallery('gallery', 'Photo Gallery'),
        tjs_heading('Alumni Interactions', 'Menu: Others → Alumni Interactions'),
        tjs_event_repeater('alumni_interactions', 'Alumni Interactions', '+ Add Alumni Interaction'),
        tjs_heading('Distinguished Alumni', 'Menu: Others → Distinguished Alumni'),
        tjs_repeater('distinguished_alumni', 'Distinguished Alumni', '+ Add Alumni', [
            tjs_text('name', 'Name', array_merge(tjs_third(), ['required' => 1])),
            tjs_text('designation', 'Designation & company', tjs_third()),
            tjs_text('batch', 'Batch (optional)', array_merge(tjs_third(), ['placeholder' => 'e.g. 2014–2018'])),
            tjs_image('photo', 'Photo (optional)'),
        ]),
        tjs_heading('Entrepreneurship', 'Menu: Others → Entrepreneurship'),
        tjs_repeater('entrepreneurs', 'Entrepreneurs', '+ Add Entrepreneur', [
            tjs_text('name', 'Name', array_merge(tjs_half(), ['required' => 1])),
            tjs_text('batch', 'Batch', array_merge(tjs_half(), ['placeholder' => 'e.g. 2021 Batch'])),
            tjs_text('designation', 'Designation & company', ['placeholder' => 'e.g. Managing Director, Sri Vinayaka Auto Tech']),
            tjs_textarea('address', 'Address', array_merge(tjs_half(), ['rows' => 2])),
            tjs_text('phone', 'Phone (optional)', tjs_half()),
            tjs_image('photo', 'Photo (optional)'),
        ]),
    ];
}

add_action('acf/include_fields', function () {
    if (!function_exists('acf_add_local_field_group')) {
        return;
    }
    acf_add_local_field_group([
        'key' => 'group_tjs_department',
        'title' => 'Department Page Content',
        'fields' => tjs_assign_keys(tjs_department_fields(), 'tjsd'),
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'department']]],
        'position' => 'acf_after_title',
        'style' => 'seamless',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'show_in_rest' => 1,
    ]);
});

/* -------------------------------------------------------------------------
 * 5. Editor-friendly admin touches
 * ---------------------------------------------------------------------- */

// Field definitions live in this file; hide the field builder so nobody edits them by mistake.
add_filter('acf/settings/show_admin', '__return_false');

add_action('admin_notices', function () {
    if (!function_exists('acf_add_local_field_group') && current_user_can('activate_plugins')) {
        echo '<div class="notice notice-error"><p><strong>TJS Departments:</strong> please activate the <em>Secure Custom Fields</em> plugin, otherwise the department editing screens are empty.</p></div>';
    }
});

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen || $screen->post_type !== 'department') {
        return;
    }
    ?>
    <style>
        /* Left-hand section menu */
        .post-type-department .acf-fields.-sidebar { padding-left: 220px !important; }
        .post-type-department .acf-fields.-sidebar::before { width: 200px; }
        .post-type-department .acf-tab-wrap.-left .acf-tab-group { width: 200px; }
        .post-type-department .acf-tab-wrap.-left .acf-tab-group li a { font-size: 14px; padding: 12px 14px; }
        .post-type-department .acf-tab-wrap.-left .acf-tab-group li.active a { color: #1d2a6b; font-weight: 600; }
        /* Section headings inside a tab */
        .post-type-department .tjs-section-heading { border-top: 0 !important; }
        .post-type-department .tjs-section-heading > .acf-label label { font-size: 17px; color: #1d2a6b; padding-top: 14px; }
        .post-type-department .tjs-section-heading .acf-input { color: #646970; }
        /* Make "+ Add" buttons stand out */
        .post-type-department .acf-repeater .acf-actions .acf-button { font-size: 13px; padding: 4px 14px; }
        /* Keep the Update button in view on long pages */
        @media (min-width: 851px) {
            .post-type-department #postbox-container-1 #side-sortables { position: sticky; top: 46px; }
        }
    </style>
    <?php
});
