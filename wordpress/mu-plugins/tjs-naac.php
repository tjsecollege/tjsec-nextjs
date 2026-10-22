<?php
/**
 * Plugin Name: TJS NAAC
 * Description: Editing screen for the website's IQAC → NAAC page (tjs-nextjs /iqac/naac). Every sidebar category is a "section" that editors can add, remove and re-order, choosing from a few section types (PDF, PDF tabs, metric table, criterion, text, dated list, link groups). Read via GET /wp-json/tjs/v1/naac.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

const TJS_NAAC_ID = 'naac'; // SCF "post id" the NAAC options are stored under

/* -------------------------------------------------------------------------
 * 1. Admin menu: IQAC → NAAC
 * ---------------------------------------------------------------------- */

add_action('acf/init', function () {
    if (!function_exists('acf_add_options_page')) {
        return;
    }
    acf_add_options_page([
        'page_title' => 'IQAC',
        'menu_title' => 'IQAC',
        'menu_slug' => 'tjs-iqac',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-awards',
        'position' => 6,
        'redirect' => true,
    ]);
    acf_add_options_sub_page([
        'page_title' => 'NAAC Page',
        'menu_title' => 'NAAC',
        'menu_slug' => 'tjs-naac',
        'parent_slug' => 'tjs-iqac',
        'capability' => 'edit_posts',
        'post_id' => TJS_NAAC_ID,
        'update_button' => 'Save NAAC Page',
        'updated_message' => 'NAAC page saved. Changes will appear on the website shortly.',
    ]);
});

/* -------------------------------------------------------------------------
 * 2. Fields
 * ---------------------------------------------------------------------- */

/** PDF upload with an optional pasted link (for documents hosted elsewhere). */
function tjs_naac_doc_fields($width = null) {
    $w = $width ? ['wrapper' => ['width' => (string) $width]] : [];
    return [
        tjs_file('document', 'Upload PDF', array_merge($w, ['instructions' => 'Upload the file…'])),
        tjs_f('url', 'link', '…or paste a link', array_merge($w, ['instructions' => 'Used only when no file is uploaded.', 'placeholder' => 'https://…'])),
    ];
}

function tjs_naac_layout($name, $label, $sub_fields) {
    return [
        'name' => $name,
        'label' => $label,
        'display' => 'block',
        'sub_fields' => array_merge([
            tjs_text('menu_label', 'Sidebar name', ['required' => 1, 'wrapper' => ['width' => '40'], 'placeholder' => 'e.g. Criterion 1']),
            tjs_text('title', 'Heading (optional)', ['wrapper' => ['width' => '60'], 'instructions' => 'Shown above the content. Leave empty to use the sidebar name.']),
        ], $sub_fields),
    ];
}

function tjs_naac_fields() {
    return [
        tjs_heading('How to edit this page', 'Each <strong>section</strong> below is one item in the left-hand menu of the NAAC page. Use <strong>+ Add Section</strong> and pick the kind of content, drag the ☰ handle to re-order, and the <strong>–</strong> button to remove. Inside a section, the <strong>+ Add</strong> buttons add rows. Click <strong>Save NAAC Page</strong> when done.'),
        tjs_text('page_title', 'Page heading', ['placeholder' => 'e.g. NAAC – Self Study Report (Cycle II)']),

        tjs_f('flexible_content', 'sections', 'Sections', [
            'button_label' => '+ Add Section',
            'layouts' => [
                tjs_naac_layout('pdf', 'PDF document', tjs_naac_doc_fields()),

                tjs_naac_layout('pdf_tabs', 'PDF documents with tabs (e.g. Cycle I / Cycle II)', [
                    tjs_repeater('tabs', 'Tabs', '+ Add Tab', array_merge(
                        [tjs_text('label', 'Tab name', ['required' => 1, 'placeholder' => 'e.g. Cycle II', 'wrapper' => ['width' => '30']])],
                        tjs_naac_doc_fields(35)
                    ), ['layout' => 'table', 'instructions' => 'The last tab opens first.']),
                ]),

                tjs_naac_layout('metric_table', 'Metric table (Metric No. · Parameter · Link)', [
                    tjs_repeater('rows', 'Rows', '+ Add Row', array_merge([
                        tjs_text('metric', 'Metric No.', ['wrapper' => ['width' => '15'], 'placeholder' => 'e.g. 1.1']),
                        tjs_textarea('parameter', 'Parameter', ['rows' => 2, 'wrapper' => ['width' => '45']]),
                    ], tjs_naac_doc_fields(20)), ['layout' => 'table']),
                ]),

                tjs_naac_layout('criterion', 'Criterion (Key Indicators with metrics)', [
                    tjs_repeater('indicators', 'Key Indicators', '+ Add Key Indicator', [
                        tjs_text('heading', 'Key Indicator', ['required' => 1, 'placeholder' => 'e.g. Key Indicator 1.1 – Curricular Planning and Implementation (20)']),
                        tjs_repeater('metrics', 'Metrics', '+ Add Metric', array_merge([
                            tjs_text('metric', 'Metric', ['wrapper' => ['width' => '10'], 'placeholder' => '1.1.1']),
                            tjs_select('type', 'Type', ['QlM' => 'QlM', 'QnM' => 'QnM'], ['wrapper' => ['width' => '10']]),
                            tjs_f('number', 'weight', 'Weight', ['wrapper' => ['width' => '8']]),
                            tjs_textarea('description', 'Description', ['rows' => 2, 'wrapper' => ['width' => '36']]),
                        ], tjs_naac_doc_fields(18)), ['layout' => 'table']),
                    ], ['collapsed' => 'heading']),
                ]),

                tjs_naac_layout('text', 'Text content (editor)', [
                    tjs_editor('content', 'Content'),
                ]),

                tjs_naac_layout('dated_list', 'Grouped list with dates (e.g. Capacity Building)', [
                    tjs_repeater('groups', 'Groups', '+ Add Group', [
                        tjs_text('heading', 'Group heading', ['required' => 1, 'placeholder' => 'e.g. Soft Skills']),
                        tjs_repeater('items', 'Items', '+ Add Item', [
                            tjs_text('title', 'Title', ['wrapper' => ['width' => '70']]),
                            tjs_date('date', 'Date', ['wrapper' => ['width' => '30']]),
                        ], ['layout' => 'table']),
                    ], ['collapsed' => 'heading']),
                ]),

                tjs_naac_layout('link_groups', 'Link groups (e.g. Feedback Forms / Feedback Documents)', [
                    tjs_repeater('groups', 'Groups', '+ Add Group', [
                        tjs_text('heading', 'Group heading', ['required' => 1, 'placeholder' => 'e.g. Feedback Forms']),
                        tjs_repeater('links', 'Links', '+ Add Link', array_merge(
                            [tjs_text('label', 'Name', ['required' => 1, 'wrapper' => ['width' => '30']])],
                            tjs_naac_doc_fields(35)
                        ), ['layout' => 'table']),
                    ], ['collapsed' => 'heading']),
                ]),
            ],
        ]),
    ];
}

add_action('acf/include_fields', function () {
    if (!function_exists('acf_add_local_field_group') || !function_exists('tjs_assign_keys')) {
        return;
    }
    acf_add_local_field_group([
        'key' => 'group_tjs_naac',
        'title' => 'NAAC Page Content',
        'fields' => tjs_assign_keys(tjs_naac_fields(), 'tjsn'),
        'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'tjs-naac']]],
        'style' => 'seamless',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
    ]);
});

// Show each section's sidebar name in its header, e.g. "Criterion 1 — Criterion (Key Indicators with metrics)".
add_filter('acf/fields/flexible_content/layout_title/key=field_tjsn_sections', function ($title) {
    $name = get_sub_field('menu_label');
    return $name ? '<strong>' . esc_html($name) . '</strong> &nbsp;—&nbsp; ' . $title : $title;
});

/* -------------------------------------------------------------------------
 * 3. REST API: GET (public) / POST (admins, used for bulk imports)
 * ---------------------------------------------------------------------- */

add_action('rest_api_init', function () {
    register_rest_route('tjs/v1', '/naac', [
        [
            'methods' => 'GET',
            'permission_callback' => '__return_true',
            'callback' => function () {
                return [
                    'page_title' => get_field('page_title', TJS_NAAC_ID) ?: '',
                    'sections' => get_field('sections', TJS_NAAC_ID) ?: [],
                ];
            },
        ],
        [
            'methods' => 'POST',
            'permission_callback' => function () {
                return current_user_can('manage_options');
            },
            'callback' => function (WP_REST_Request $request) {
                $body = $request->get_json_params();
                foreach (['page_title', 'sections'] as $name) {
                    if (array_key_exists($name, (array) $body)) {
                        update_field('field_tjsn_' . $name, $body[$name], TJS_NAAC_ID);
                    }
                }
                return ['saved' => true];
            },
        ],
    ]);
});

/* -------------------------------------------------------------------------
 * 4. Admin styling
 * ---------------------------------------------------------------------- */

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen || strpos($screen->id, 'tjs-naac') === false) {
        return;
    }
    ?>
    <style>
        .acf-flexible-content .layout { border-radius: 6px; margin-bottom: 18px; }
        .acf-flexible-content .layout .acf-fc-layout-handle { font-size: 14px; font-weight: 600; color: #1d2a6b; padding: 12px 14px; }
        .acf-flexible-content > .acf-actions .acf-button { font-size: 14px; padding: 6px 18px; }
        .tjs-section-heading { border-top: 0 !important; }
        .tjs-section-heading > .acf-label label { font-size: 17px; color: #1d2a6b; }
    </style>
    <?php
});
