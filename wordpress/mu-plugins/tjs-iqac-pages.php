<?php
/**
 * Plugin Name: TJS IQAC Pages
 * Description: Editing screens for the website's IQAC menu items other than NAAC and Capacity Building: About IQAC (/iqac/about-iqac — sidebar sections of text, documents, the IQAC composition and the contact card), Innovation Cell (/iqac/innovation-cell) and NIRF (/iqac/nirf). They sit in the "IQAC" admin menu created by tjs-naac.php. Read via GET /wp-json/tjs/v1/iqac/about, /iqac/innovation-cell and /iqac/nirf.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

/** The pages: admin slug => [SCF post id, REST route, field key prefix, menu title]. */
function tjs_iqac_pages() {
    return [
        'tjs-about-iqac' => ['about_iqac', 'iqac/about', 'tjsaiq', 'About IQAC'],
        'tjs-innovation-cell' => ['innovation_cell', 'iqac/innovation-cell', 'tjsinc', 'Innovation Cell'],
        'tjs-nirf' => ['nirf', 'iqac/nirf', 'tjsnirf', 'NIRF'],
    ];
}

// Priority 15: after tjs-naac.php registers the IQAC menu (priority 10), before
// tjs-capacity-building.php (priority 20).
add_action('acf/init', function () {
    if (!function_exists('acf_add_options_sub_page')) {
        return;
    }
    foreach (tjs_iqac_pages() as $slug => [$post_id, , , $menu_title]) {
        acf_add_options_sub_page([
            'page_title' => $menu_title . ' Page',
            'menu_title' => $menu_title,
            'menu_slug' => $slug,
            'parent_slug' => 'tjs-iqac',
            'capability' => 'edit_posts',
            'post_id' => $post_id,
            'update_button' => 'Save ' . $menu_title,
            'updated_message' => $menu_title . ' saved. Changes will appear on the website shortly.',
        ]);
    }
}, 15);

/* -------------------------------------------------------------------------
 * Fields
 * ---------------------------------------------------------------------- */

function tjs_iqac_section_layout($name, $label, $sub_fields) {
    return [
        'name' => $name,
        'label' => $label,
        'display' => 'block',
        'sub_fields' => array_merge([
            tjs_text('menu_label', 'Sidebar name', ['required' => 1, 'wrapper' => ['width' => '40'], 'placeholder' => 'e.g. AQAR']),
            tjs_text('title', 'Heading (optional)', ['wrapper' => ['width' => '60'], 'instructions' => 'Shown above the content. Leave empty to use the sidebar name.']),
        ], $sub_fields),
    ];
}

function tjs_iqac_about_fields() {
    return [
        tjs_heading('How to edit this page', 'Each <strong>section</strong> below is one item in the left-hand menu of the About IQAC page. Use <strong>+ Add Section</strong> and pick the kind of content, drag the ☰ handle to re-order, and the <strong>–</strong> button to remove. Click <strong>Save About IQAC</strong> when done.'),
        tjs_text('page_title', 'Page heading', ['placeholder' => 'e.g. Internal Quality Assurance Cell']),
        tjs_f('flexible_content', 'sections', 'Sections', [
            'button_label' => '+ Add Section',
            'layouts' => [
                tjs_iqac_section_layout('text', 'Text (editor)', [
                    tjs_editor('content', 'Content', ['instructions' => 'Use the "Heading 4" style from the Paragraph dropdown for sub-headings.']),
                ]),
                tjs_iqac_section_layout('documents', 'Documents / links (e.g. AQAR, Annual Reports)', [
                    tjs_editor('intro', 'Text above the list (optional)'),
                    tjs_repeater('items', 'Documents', '+ Add Document', [
                        tjs_text('label', 'Name', ['required' => 1, 'placeholder' => 'e.g. 2023-2024', 'wrapper' => ['width' => '30']]),
                        tjs_file('document', 'Upload PDF', ['instructions' => 'Upload the file…', 'wrapper' => ['width' => '35']]),
                        tjs_f('url', 'link', '…or paste a link', ['instructions' => 'Used only when no file is uploaded (e.g. a Google Form).', 'placeholder' => 'https://…', 'wrapper' => ['width' => '35']]),
                    ], ['layout' => 'table']),
                ]),
                tjs_iqac_section_layout('composition', 'Composition table (criteria with members)', [
                    tjs_repeater('groups', 'Criteria', '+ Add Criteria', [
                        tjs_text('criteria', 'Composition criteria', ['required' => 1, 'placeholder' => 'e.g. Faculty Members']),
                        tjs_repeater('members', 'Members', '+ Add Member', [
                            tjs_text('name', 'Name', ['required' => 1, 'wrapper' => ['width' => '45']]),
                            tjs_text('designation', 'Designation', ['wrapper' => ['width' => '55']]),
                        ], ['layout' => 'table']),
                    ], ['collapsed' => 'criteria']),
                ]),
                tjs_iqac_section_layout('contact', 'Contact card', [
                    tjs_image('photo', 'Photo (optional)', ['wrapper' => ['width' => '25']]),
                    tjs_text('name', 'Name', ['required' => 1, 'wrapper' => ['width' => '25']]),
                    tjs_text('role', 'Role', ['placeholder' => 'e.g. IQAC Coordinator', 'wrapper' => ['width' => '25']]),
                    tjs_text('phone', 'Phone', ['wrapper' => ['width' => '25']]),
                    tjs_f('email', 'email', 'Email'),
                ]),
            ],
        ]),
    ];
}

/** Innovation Cell / NIRF: heading, intro and one or more documents (tabs). */
function tjs_iqac_documents_fields($menu_title, $tab_example) {
    return [
        tjs_heading('How to edit this page', 'Add documents with <strong>+ Add Document</strong>. With one document the page shows it straight away; with several, each becomes a tab (first one opens first — drag the ☰ handle to re-order). Click <strong>Save ' . esc_html($menu_title) . '</strong> when done.'),
        tjs_text('page_title', 'Page heading', ['placeholder' => 'e.g. ' . $menu_title]),
        tjs_textarea('intro', 'Intro text (optional)', ['rows' => 2]),
        tjs_repeater('documents', 'Documents', '+ Add Document', [
            tjs_text('tab', 'Tab name', ['placeholder' => 'e.g. ' . $tab_example, 'instructions' => 'Only shown when there is more than one document.', 'wrapper' => ['width' => '30']]),
            tjs_file('file', 'File (PDF)', ['required' => 1, 'mime_types' => 'pdf, doc, docx', 'instructions' => '', 'wrapper' => ['width' => '70']]),
        ], ['layout' => 'table']),
    ];
}

/** Fields of one page, by admin slug. */
function tjs_iqac_fields($slug) {
    switch ($slug) {
        case 'tjs-about-iqac':
            return tjs_iqac_about_fields();
        case 'tjs-innovation-cell':
            return tjs_iqac_documents_fields('Innovation Cell', '2023');
        case 'tjs-nirf':
            return tjs_iqac_documents_fields('NIRF', '2026');
    }
    return [];
}

/** Saved (non-layout) field names of one page. */
function tjs_iqac_field_names($slug) {
    $names = [];
    foreach (tjs_iqac_fields($slug) as $f) {
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
    foreach (tjs_iqac_pages() as $slug => [, , $prefix, $menu_title]) {
        acf_add_local_field_group([
            'key' => 'group_' . $prefix,
            'title' => $menu_title . ' Content',
            'fields' => tjs_assign_keys(tjs_iqac_fields($slug), $prefix),
            'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => $slug]]],
            'style' => 'seamless',
            'label_placement' => 'top',
            'instruction_placement' => 'label',
        ]);
    }
});

// Show each About IQAC section's sidebar name in its header, e.g. "AQAR — Documents / links".
add_filter('acf/fields/flexible_content/layout_title/key=field_tjsaiq_sections', function ($title) {
    $name = get_sub_field('menu_label');
    return $name ? '<strong>' . esc_html($name) . '</strong> &nbsp;—&nbsp; ' . $title : $title;
});

/* -------------------------------------------------------------------------
 * REST API: GET (public) / POST (admins, used for the initial import)
 * ---------------------------------------------------------------------- */

add_action('rest_api_init', function () {
    foreach (tjs_iqac_pages() as $slug => [$post_id, $route, $prefix]) {
        register_rest_route('tjs/v1', '/' . $route, [
            [
                'methods' => 'GET',
                'permission_callback' => '__return_true',
                'callback' => function () use ($slug, $post_id) {
                    $out = [];
                    foreach (tjs_iqac_field_names($slug) as $name) {
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
                    foreach (tjs_iqac_field_names($slug) as $name) {
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
    if (!$screen || !preg_match('/tjs-(about-iqac|innovation-cell|nirf)/', $screen->id)) {
        return;
    }
    ?>
    <style>
        .acf-flexible-content .layout { border-radius: 6px; margin-bottom: 18px; }
        .acf-flexible-content .layout .acf-fc-layout-handle { font-size: 14px; font-weight: 600; color: #1d2a6b; padding: 12px 14px; }
        .acf-flexible-content > .acf-actions .acf-button { font-size: 14px; padding: 6px 18px; }
        .tjs-section-heading { border-top: 0 !important; }
        .tjs-section-heading > .acf-label label { font-size: 17px; color: #1d2a6b; }
        .acf-repeater .acf-actions .acf-button { font-size: 13px; padding: 4px 14px; }
    </style>
    <?php
});
