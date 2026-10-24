<?php
/**
 * Plugin Name: TJS Science & Humanities
 * Description: "Science & Humanities" content type for the smaller department pages of the Next.js site (Chemistry, English, Maths, Physics, Tamil). Each page has four sidebar sections: Objectives, Faculty Profile, Non-Teaching Staff and Gallery. Read via /wp-json/wp/v2/sh-departments?slug=chemistry&acf_format=standard
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

/* -------------------------------------------------------------------------
 * 1. Content type
 * ---------------------------------------------------------------------- */

add_action('init', function () {
    register_post_type('sh_department', [
        'labels' => [
            'name' => 'Science & Humanities',
            'singular_name' => 'Science & Humanities Department',
            'menu_name' => 'Science & Humanities',
            'all_items' => 'All S&H Departments',
            'add_new' => 'Add Department',
            'add_new_item' => 'Add New S&H Department',
            'edit_item' => 'Edit S&H Department Page',
            'search_items' => 'Search',
            'not_found' => 'No departments yet.',
            'item_updated' => 'Page updated. Changes will appear on the website shortly.',
            'item_published' => 'Page published.',
        ],
        'public' => false,
        'publicly_queryable' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'show_in_rest' => true,
        'rest_base' => 'sh-departments',
        'menu_position' => 5,
        'menu_icon' => 'dashicons-book-alt',
        'supports' => ['title', 'revisions'],
        'has_archive' => false,
        'rewrite' => false,
    ]);
});

add_filter('enter_title_here', function ($text, $post) {
    return $post->post_type === 'sh_department' ? 'Page heading (e.g. Department of Chemistry)' : $text;
}, 10, 2);

// Same "Website Address" box as the main departments.
add_action('add_meta_boxes_sh_department', function () {
    remove_meta_box('slugdiv', 'sh_department', 'normal');
    add_meta_box('tjs_sh_address', 'Website Address', function ($post) {
        echo '<p style="margin-top:0">Page link on the website:</p>';
        echo '<p><code>/departments/</code><input type="text" name="post_name" value="' . esc_attr($post->post_name) . '" placeholder="e.g. chemistry" style="width:110px" /></p>';
        echo '<p class="description">Short name used in the link. Please do not change it after the page is live, or old links will stop working.</p>';
    }, 'sh_department', 'side', 'high');
});

add_filter('manage_sh_department_posts_columns', function ($cols) {
    $new = [];
    foreach ($cols as $k => $v) {
        $new[$k] = $v;
        if ($k === 'title') {
            $new['tjs_address'] = 'Website Address';
        }
    }
    return $new;
});

add_action('manage_sh_department_posts_custom_column', function ($col, $post_id) {
    if ($col === 'tjs_address') {
        echo '<code>/departments/' . esc_html(get_post_field('post_name', $post_id)) . '</code>';
    }
}, 10, 2);

/* -------------------------------------------------------------------------
 * 2. Fields — one tab per sidebar section of the page
 * ---------------------------------------------------------------------- */

function tjs_sh_fields() {
    return [
        tjs_heading('How to edit this page', 'Pick a section from the menu on the left — they match the sidebar on the website. Use the <strong>+ Add</strong> buttons to add people, drag the ☰ handle to re-order, and the <strong>–</strong> button to remove. Click the blue <strong>Update</strong> button (top right) to save. Sections left empty show “Content coming soon” on the website.'),

        tjs_tab('Objectives'),
        tjs_heading('Objectives', 'Sidebar: Objectives'),
        tjs_text('objectives_heading', 'Heading (optional)', ['placeholder' => 'e.g. Department of Chemistry', 'instructions' => 'Leave empty to use the page heading typed in the title box above.']),
        tjs_editor('objectives', 'Objectives text'),

        tjs_tab('Faculty Profile'),
        tjs_heading('Faculty Profile', 'Sidebar: Faculty Profile'),
        tjs_faculty_repeater(),

        tjs_tab('Non-Teaching Staff'),
        tjs_heading('Non-Teaching Staff', 'Sidebar: Non-Teaching Staff'),
        tjs_non_teaching_repeater(),

        tjs_tab('Gallery'),
        tjs_heading('Gallery', 'Sidebar: Gallery'),
        tjs_gallery('gallery', 'Photo Gallery'),
    ];
}

add_action('acf/include_fields', function () {
    if (!function_exists('acf_add_local_field_group') || !function_exists('tjs_assign_keys')) {
        return;
    }
    acf_add_local_field_group([
        'key' => 'group_tjs_sh_department',
        'title' => 'Science & Humanities Page Content',
        'fields' => tjs_assign_keys(tjs_sh_fields(), 'tjssh'),
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'sh_department']]],
        'position' => 'acf_after_title',
        'style' => 'seamless',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'show_in_rest' => 1,
    ]);
});

/* -------------------------------------------------------------------------
 * 3. Admin styling (same look as the department screens)
 * ---------------------------------------------------------------------- */

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen || $screen->post_type !== 'sh_department') {
        return;
    }
    ?>
    <style>
        .post-type-sh_department .acf-fields.-sidebar { padding-left: 220px !important; }
        .post-type-sh_department .acf-fields.-sidebar::before { width: 200px; }
        .post-type-sh_department .acf-tab-wrap.-left .acf-tab-group { width: 200px; }
        .post-type-sh_department .acf-tab-wrap.-left .acf-tab-group li a { font-size: 14px; padding: 12px 14px; }
        .post-type-sh_department .acf-tab-wrap.-left .acf-tab-group li.active a { color: #1d2a6b; font-weight: 600; }
        .post-type-sh_department .tjs-section-heading { border-top: 0 !important; }
        .post-type-sh_department .tjs-section-heading > .acf-label label { font-size: 17px; color: #1d2a6b; padding-top: 14px; }
        .post-type-sh_department .tjs-section-heading .acf-input { color: #646970; }
        .post-type-sh_department .acf-repeater .acf-actions .acf-button { font-size: 13px; padding: 4px 14px; }
        @media (min-width: 851px) {
            .post-type-sh_department #postbox-container-1 #side-sortables { position: sticky; top: 46px; }
        }
    </style>
    <?php
});
