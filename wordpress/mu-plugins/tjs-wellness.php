<?php
/**
 * Plugin Name: TJS Wellness Centre
 * Description: Editing screen for the website's Campus Life → Wellness Centre page (tjs-nextjs /campus-life/wellness-centre): intro with booking links, objective with the four well-being cards, FAQs, common challenges, privacy note and contact details. Read via GET /wp-json/tjs/v1/wellness-centre.
 * Version: 1.0.0
 *
 * Requires "Secure Custom Fields" and reuses the field builders from tjs-departments.php
 * (mu-plugins load alphabetically, so that file is already loaded here).
 */

if (!defined('ABSPATH')) {
    exit;
}

const TJS_WELLNESS_ID = 'wellness_centre'; // SCF "post id" the options are stored under

add_action('acf/init', function () {
    if (!function_exists('acf_add_options_page')) {
        return;
    }
    acf_add_options_page([
        'page_title' => 'Wellness Centre Page',
        'menu_title' => 'Wellness Centre',
        'menu_slug' => 'tjs-wellness-centre',
        'capability' => 'edit_posts',
        'icon_url' => 'dashicons-heart',
        'position' => 17,
        'redirect' => false,
        'post_id' => TJS_WELLNESS_ID,
        'update_button' => 'Save Wellness Centre Page',
        'updated_message' => 'Wellness Centre page saved. Changes will appear on the website shortly.',
    ]);
});

// Icon choices for the well-being cards: value = Remix Icon class used by the website.
function tjs_wellness_icons() {
    return [
        'ri-run-line' => 'Physical / fitness',
        'ri-brain-line' => 'Mind / psychological',
        'ri-emotion-happy-line' => 'Emotions',
        'ri-team-line' => 'Social / community',
        'ri-heart-pulse-line' => 'Health',
        'ri-chat-heart-line' => 'Care / support',
        'ri-shield-check-line' => 'Safety',
    ];
}

function tjs_wellness_fields() {
    return [
        tjs_heading('How to edit this page', 'Fill in the sections below. Use the <strong>+ Add</strong> buttons to add cards, questions or challenges, drag the ☰ handle to re-order, and the <strong>–</strong> button to remove. Empty buttons and contact details are hidden on the website. Click <strong>Save Wellness Centre Page</strong> when done.'),

        tjs_heading('Top of the page', 'The welcome block with the booking buttons.'),
        tjs_text('page_title', 'Page heading', ['placeholder' => 'e.g. Wellness Centre']),
        tjs_text('hero_eyebrow', 'Small line above the heading', ['placeholder' => 'e.g. A caring campus. A healthier you.']),
        tjs_text('hero_title', 'Heading', ['placeholder' => 'e.g. Your well-being has a team.']),
        tjs_textarea('hero_text', 'Introduction', ['rows' => 3]),
        tjs_f('url', 'book_link', '"Book a Chat" link', array_merge(tjs_half(), ['placeholder' => 'https://forms.gle/…', 'instructions' => 'Appointment form (e.g. a Google Form). Also used by the "Talk to a Counsellor" button.'])),
        tjs_f('url', 'thoughts_link', '"Share Your Thoughts" link', array_merge(tjs_half(), ['placeholder' => 'https://forms.gle/…', 'instructions' => 'Anonymous feedback form.'])),
        tjs_image('hero_photo', 'Photo (optional)', tjs_half()),
        tjs_text('hero_note', 'Line under the photo (optional)', array_merge(tjs_half(), ['placeholder' => 'e.g. Your well-being matters. Start with a conversation.'])),

        tjs_heading('Objective', 'Section "Our Purpose".'),
        tjs_text('objective_title', 'Section heading', ['placeholder' => 'e.g. Objective of the Wellness Centre']),
        tjs_textarea('objective_text', 'Text', ['rows' => 6, 'instructions' => 'Leave an empty line between paragraphs.']),
        tjs_repeater('pillars', 'Well-being cards', '+ Add Card', [
            tjs_select('icon', 'Icon', tjs_wellness_icons(), ['wrapper' => ['width' => '20']]),
            tjs_text('title', 'Title', ['required' => 1, 'placeholder' => 'e.g. Physical Well-being', 'wrapper' => ['width' => '30']]),
            tjs_text('text', 'Short description', ['wrapper' => ['width' => '50']]),
        ], ['layout' => 'table']),

        tjs_heading('Frequently Asked Questions', 'Section "Need to know?".'),
        tjs_text('faq_title', 'Section heading', ['placeholder' => 'e.g. Frequently Asked Questions']),
        tjs_textarea('faq_intro', 'Introduction', ['rows' => 2]),
        tjs_repeater('faqs', 'Questions', '+ Add Question', [
            tjs_text('question', 'Question', ['required' => 1, 'wrapper' => ['width' => '35']]),
            tjs_textarea('answer', 'Answer', ['rows' => 3, 'wrapper' => ['width' => '65']]),
        ], ['layout' => 'table']),
        tjs_text('challenges_title', 'Challenges heading', ['placeholder' => 'e.g. Common challenges we can discuss']),
        tjs_repeater('challenges', 'Challenges', '+ Add Challenge', [
            tjs_text('text', 'Challenge', ['required' => 1]),
        ], ['layout' => 'table']),
        tjs_text('privacy_title', 'Privacy heading', ['placeholder' => 'e.g. Your privacy matters']),
        tjs_textarea('privacy_text', 'Privacy note', ['rows' => 2]),

        tjs_heading('Contact', 'Section "Stay connected" at the bottom of the page.'),
        tjs_text('contact_title', 'Section heading', ['placeholder' => "e.g. Let's build a healthier campus together."]),
        tjs_textarea('contact_text', 'Text', ['rows' => 2]),
        tjs_text('location', 'Location', array_merge(tjs_half(), ['placeholder' => 'e.g. Wellness Centre, Main Block – 2nd floor'])),
        tjs_f('email', 'email', 'Email', array_merge(tjs_half(), ['placeholder' => 'e.g. wellness@tjsec.in'])),
        tjs_text('phone', 'Phone', array_merge(tjs_half(), ['placeholder' => 'e.g. 044-27967602'])),
        tjs_f('url', 'instagram', 'Instagram link', array_merge(tjs_half(), ['placeholder' => 'https://www.instagram.com/…'])),
    ];
}

add_action('acf/include_fields', function () {
    if (!function_exists('acf_add_local_field_group') || !function_exists('tjs_assign_keys')) {
        return;
    }
    acf_add_local_field_group([
        'key' => 'group_tjs_wellness',
        'title' => 'Wellness Centre Content',
        'fields' => tjs_assign_keys(tjs_wellness_fields(), 'tjswell'),
        'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'tjs-wellness-centre']]],
        'style' => 'seamless',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
    ]);
});

function tjs_wellness_field_names() {
    $names = [];
    foreach (tjs_wellness_fields() as $f) {
        if ($f['name'] !== '' && $f['type'] !== 'message') {
            $names[] = $f['name'];
        }
    }
    return $names;
}

add_action('rest_api_init', function () {
    register_rest_route('tjs/v1', '/wellness-centre', [
        [
            'methods' => 'GET',
            'permission_callback' => '__return_true',
            'callback' => function () {
                $out = [];
                foreach (tjs_wellness_field_names() as $name) {
                    $out[$name] = get_field($name, TJS_WELLNESS_ID);
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
                foreach (tjs_wellness_field_names() as $name) {
                    if (array_key_exists($name, $body)) {
                        update_field('field_tjswell_' . $name, $body[$name], TJS_WELLNESS_ID);
                    }
                }
                return ['saved' => true];
            },
        ],
    ]);
});

add_action('admin_head', function () {
    $screen = get_current_screen();
    if (!$screen || strpos($screen->id, 'tjs-wellness-centre') === false) {
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
