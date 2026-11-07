<?php
/**
 * Plugin Name: TJS Research
 * Description: Editing screen for the website's Research menu (tjs-nextjs /research/publications, /research/patents, /research/grants): year-wise PDF documents for Publications, Patents and Research Grants, shown as year tabs with a viewer. Read via GET /wp-json/tjs/v1/research.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

const TJS_RESEARCH_ID = 'research'; // SCF "post id" the options are stored under

add_action('acf/init', function () {
    if (!function_exists('acf_add_options_page')) {
        return;
    }
    acf_add_options_page([
        'page_title' => 'Research Pages',
        'menu_title' => 'Research',
        'menu_slug' => 'tjs-research',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-welcome-learn-more',
        'position' => 18,
        'redirect' => false,
        'post_id' => TJS_RESEARCH_ID,
        'update_button' => 'Save Research Pages',
        'updated_message' => 'Research pages saved. Changes will appear on the website shortly.',
    ]);
});

/** One PDF / Word file per academic year — shown as year tabs with a viewer. */
function tjs_research_year_docs($name, $label, $button) {
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

/** Heading, optional intro and year-wise documents for one Research page. */
function tjs_research_section($prefix, $menu, $title_example, $button) {
    return [
        tjs_tab($menu),
        tjs_heading($menu, 'Menu: Research → ' . $menu),
        tjs_text($prefix . '_title', 'Page heading', ['placeholder' => 'e.g. ' . $title_example]),
        tjs_textarea($prefix . '_intro', 'Intro text (optional)', ['rows' => 2]),
        tjs_research_year_docs($prefix, 'Documents', $button),
    ];
}

function tjs_research_fields() {
    return array_merge(
        [tjs_heading('How to edit these pages', 'Each tab below is one page of the Research menu. Add one document per academic year with <strong>+ Add Year</strong>, drag the ☰ handle to re-order, and the <strong>–</strong> button to remove. Click <strong>Save Research Pages</strong> when done.')],
        tjs_research_section('publications', 'Publication', 'Publications', '+ Add Year'),
        tjs_research_section('patents', 'Patents', 'Patents', '+ Add Year'),
        tjs_research_section('grants', 'Research Grants', 'Research Grants', '+ Add Year')
    );
}

add_action('acf/include_fields', function () {
    if (!function_exists('acf_add_local_field_group') || !function_exists('tjs_assign_keys')) {
        return;
    }
    acf_add_local_field_group([
        'key' => 'group_tjs_research',
        'title' => 'Research Pages Content',
        'fields' => tjs_assign_keys(tjs_research_fields(), 'tjsres'),
        'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'tjs-research']]],
        'style' => 'seamless',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
    ]);
});

function tjs_research_field_names() {
    $names = [];
    foreach (tjs_research_fields() as $f) {
        if ($f['name'] !== '' && !in_array($f['type'], ['tab', 'message'], true)) {
            $names[] = $f['name'];
        }
    }
    return $names;
}

add_action('rest_api_init', function () {
    register_rest_route('tjs/v1', '/research', [
        [
            'methods' => 'GET',
            'permission_callback' => '__return_true',
            'callback' => function () {
                $out = [];
                foreach (tjs_research_field_names() as $name) {
                    $out[$name] = get_field($name, TJS_RESEARCH_ID);
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
                foreach (tjs_research_field_names() as $name) {
                    if (array_key_exists($name, $body)) {
                        update_field('field_tjsres_' . $name, $body[$name], TJS_RESEARCH_ID);
                    }
                }
                return ['saved' => true];
            },
        ],
    ]);
});

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen || strpos($screen->id, 'tjs-research') === false) {
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
