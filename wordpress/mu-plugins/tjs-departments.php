<?php
/**
 * Plugin Name: TJS Departments
 * Description: Registers the "Department" content type and a user-friendly editing UI (add/remove rows, image picker), exposed via the WP REST API for the Next.js frontend (tjs-nextjs). Data is still stored as JSON in post meta, but editors never see raw JSON.
 * Version: 3.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

// 1. Custom Post Type: Department
add_action('init', function () {
    register_post_type('department', [
        'labels' => [
            'name' => 'Departments',
            'singular_name' => 'Department',
            'add_new_item' => 'Add New Department',
            'edit_item' => 'Edit Department',
        ],
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'departments',
        'supports' => ['title', 'thumbnail', 'custom-fields'],
        'menu_icon' => 'dashicons-welcome-learn-more',
        'has_archive' => false,
        'show_in_menu' => true,
    ]);
});

// 2. Field definitions: key => [group, label, kind, schema]
// kind: 'text' | 'textarea' | 'lines' (one item per line -> JSON array of strings)
//       | 'repeater' (JSON array of objects, edited as add/remove rows)
//       | 'programmes' (nested repeater: tracks with PEOs/POs/PSOs)
function tjs_department_field_defs() {
    return [
        'hero_label' => ['Hero', 'Hero label (small text above the title)', 'text'],
        'hero_description' => ['Hero', 'Hero description (paragraph under the title)', 'textarea'],

        'about_paragraphs' => ['About', 'About paragraphs (one per line)', 'lines'],
        'vision' => ['About', 'Vision', 'textarea'],
        'mission_points' => ['About', 'Mission points (one per line)', 'lines'],

        'hod_message' => ['HOD Desk', "HOD's message (one paragraph per line)", 'lines'],
        'hod_quote' => ['HOD Desk', 'HOD quote', 'text'],
        'hod_signature' => ['HOD Desk', 'HOD signature (one line each: name, department, college)', 'lines'],

        'faculty' => ['Faculty & Staff', 'Faculty', 'repeater', [
            ['key' => 'name', 'label' => 'Name', 'type' => 'text'],
            ['key' => 'grade', 'label' => 'Grade', 'type' => 'text'],
            ['key' => 'specialization', 'label' => 'Specialization', 'type' => 'text'],
            ['key' => 'email', 'label' => 'Email', 'type' => 'text'],
            ['key' => 'photo', 'label' => 'Photo', 'type' => 'image'],
        ]],
        'non_teaching_staff' => ['Faculty & Staff', 'Non-teaching staff', 'repeater', [
            ['key' => 'name', 'label' => 'Name', 'type' => 'text'],
            ['key' => 'designation', 'label' => 'Designation', 'type' => 'text'],
            ['key' => 'photo', 'label' => 'Photo', 'type' => 'image'],
        ]],

        'programmes' => ['Programmes', 'Programmes (tracks with PEOs / POs / PSOs)', 'programmes'],

        'regulations_ug' => ['Regulations', 'UG regulations', 'repeater', [
            ['key' => 'label', 'label' => 'Label', 'type' => 'text'],
            ['key' => 'url', 'label' => 'Link URL', 'type' => 'text'],
        ]],
        'regulations_pg' => ['Regulations', 'PG regulations', 'repeater', [
            ['key' => 'label', 'label' => 'Label', 'type' => 'text'],
            ['key' => 'url', 'label' => 'Link URL', 'type' => 'text'],
        ]],

        'syllabus_ug' => ['Curriculum & Syllabi', 'UG syllabus links', 'repeater', [
            ['key' => 'label', 'label' => 'Label', 'type' => 'text'],
            ['key' => 'url', 'label' => 'Link URL', 'type' => 'text'],
        ]],
        'syllabus_pg' => ['Curriculum & Syllabi', 'PG syllabus links', 'repeater', [
            ['key' => 'label', 'label' => 'Label', 'type' => 'text'],
            ['key' => 'url', 'label' => 'Link URL', 'type' => 'text'],
        ]],

        'trainings' => ['Industry Interface', 'Industrial training programs', 'repeater', [
            ['key' => 'program', 'label' => 'Training Program', 'type' => 'text'],
            ['key' => 'contact', 'label' => 'Contact Details', 'type' => 'text'],
        ]],
        'internships' => ['Industry Interface', 'Internships / in-plant trainings', 'repeater', [
            ['key' => 'company', 'label' => 'Company', 'type' => 'text'],
            ['key' => 'year', 'label' => 'Year', 'type' => 'number'],
            ['key' => 'students', 'label' => 'No. of Students', 'type' => 'number'],
            ['key' => 'color', 'label' => 'Chart Color', 'type' => 'color'],
        ]],

        'research_areas' => ['Research', 'Areas of research', 'textarea'],
        'research_funded_projects' => ['Research', 'Funded projects', 'textarea'],
        'research_seed_money' => ['Research', 'Seed money for research', 'textarea'],

        'facilities_labs' => ['Facilities', 'Academic laboratories (one per line)', 'lines'],
        'facilities_centres' => ['Facilities', 'Centres of competency (one per line)', 'lines'],
    ];
}

add_action('init', function () {
    foreach (tjs_department_field_defs() as $key => $conf) {
        register_post_meta('department', $key, [
            'type' => 'string',
            'single' => true,
            'default' => '',
            'show_in_rest' => true,
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        ]);
    }
});

// 3. Load the WP media picker (for the "Choose Image" buttons) only on the Department edit screen
add_action('admin_enqueue_scripts', function ($hook) {
    global $post;
    if (in_array($hook, ['post.php', 'post-new.php'], true) && isset($post) && $post->post_type === 'department') {
        wp_enqueue_media();
    }
});

// 4. Admin edit screen: a friendly meta box (no raw JSON editing)
add_action('add_meta_boxes', function () {
    add_meta_box(
        'tjs_department_fields',
        'Department Content',
        'tjs_department_fields_cb',
        'department',
        'normal',
        'high'
    );
});

function tjs_department_fields_cb($post) {
    wp_nonce_field('tjs_department_save', 'tjs_department_nonce');

    $defs = tjs_department_field_defs();
    $groups = [];
    foreach ($defs as $key => $conf) {
        $groups[$conf[0]][$key] = $conf;
    }

    echo '<p><em>Title = page title (e.g. "Computer Science and Engineering"), slug = URL (e.g. "cse"), Featured Image = hero image.</em></p>';

    foreach ($groups as $group => $fields) {
        echo '<h3 class="tjs-dept-group-title">' . esc_html($group) . '</h3>';
        foreach ($fields as $key => $conf) {
            $label = $conf[1];
            $kind = $conf[2];
            $schema = $conf[3] ?? null;
            $value = get_post_meta($post->ID, $key, true);

            echo '<div class="tjs-field-block"><label class="tjs-field-label">' . esc_html($label) . '</label>';

            if ($kind === 'text') {
                echo '<input type="text" class="widefat" name="' . esc_attr($key) . '" value="' . esc_attr($value) . '" />';
            } elseif ($kind === 'textarea') {
                echo '<textarea class="widefat" rows="3" name="' . esc_attr($key) . '">' . esc_textarea($value) . '</textarea>';
            } elseif ($kind === 'lines') {
                $lines = json_decode($value, true);
                $text = is_array($lines) ? implode("\n", $lines) : '';
                echo '<textarea class="widefat" rows="5" name="' . esc_attr($key) . '" placeholder="One item per line">' . esc_textarea($text) . '</textarea>';
            } elseif ($kind === 'repeater') {
                echo '<textarea name="' . esc_attr($key) . '" class="tjs-repeater-raw">' . esc_textarea($value) . '</textarea>';
                echo '<div class="tjs-repeater-mount" data-field="' . esc_attr($key) . '" data-schema="' . esc_attr(wp_json_encode($schema)) . '"></div>';
            } elseif ($kind === 'programmes') {
                echo '<textarea name="' . esc_attr($key) . '" class="tjs-repeater-raw">' . esc_textarea($value) . '</textarea>';
                echo '<div class="tjs-programmes-mount" data-field="' . esc_attr($key) . '"></div>';
            }

            echo '</div>';
        }
    }

    tjs_department_admin_assets();
}

function tjs_department_admin_assets() {
    static $printed = false;
    if ($printed) {
        return;
    }
    $printed = true;
    ?>
    <style>
        .tjs-dept-group-title { margin-top: 28px; padding-top: 16px; border-top: 1px solid #dcdcde; }
        .tjs-field-block { margin-bottom: 18px; }
        .tjs-field-label { display: block; font-weight: 600; margin-bottom: 6px; }
        .tjs-repeater-raw { display: none; }
        .tjs-repeater-row {
            border: 1px solid #dcdcde; background: #f9f9f9; border-radius: 4px;
            padding: 12px; margin-bottom: 10px;
        }
        .tjs-repeater-row-field { display: block; margin-bottom: 8px; font-size: 13px; }
        .tjs-repeater-row-field span { display: block; font-weight: 600; margin-bottom: 3px; }
        .tjs-repeater-row-field input, .tjs-repeater-row-field textarea { width: 100%; max-width: 480px; }
        .tjs-repeater-photo-preview { max-width: 80px; max-height: 80px; display: block; margin: 6px 0; border-radius: 4px; }
        .tjs-repeater-remove { color: #b32d2e !important; margin-top: 4px; }
        .tjs-repeater-add, .tjs-programme-add-track { margin-top: 6px; }
        .tjs-programme-track {
            border: 2px solid #2271b1; border-radius: 6px; padding: 14px; margin-bottom: 18px; background: #fff;
        }
        .tjs-programme-track h4 { margin: 14px 0 6px; }
    </style>
    <script>
    (function () {
        function makeField(row, f) {
            var wrap = document.createElement('label');
            wrap.className = 'tjs-repeater-row-field';
            var span = document.createElement('span');
            span.textContent = f.label;
            wrap.appendChild(span);

            var input;
            if (f.type === 'textarea') {
                input = document.createElement('textarea');
                input.rows = 2;
            } else {
                input = document.createElement('input');
                input.type = f.type === 'number' ? 'number' : (f.type === 'color' ? 'color' : 'text');
            }
            input.dataset.key = f.key;
            input.value = row[f.key] != null ? row[f.key] : '';
            wrap.appendChild(input);

            if (f.type === 'image') {
                var preview = document.createElement('img');
                preview.className = 'tjs-repeater-photo-preview';
                preview.src = input.value;
                preview.style.display = input.value ? 'block' : 'none';
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'button';
                btn.textContent = input.value ? 'Change Image' : 'Choose Image';
                btn.addEventListener('click', function () {
                    var frame = wp.media({ title: 'Select Image', multiple: false });
                    frame.on('select', function () {
                        var att = frame.state().get('selection').first().toJSON();
                        input.value = att.url;
                        preview.src = att.url;
                        preview.style.display = 'block';
                        input.dispatchEvent(new Event('input'));
                    });
                    frame.open();
                });
                wrap.appendChild(btn);
                wrap.appendChild(preview);
            }

            return { wrap: wrap, input: input };
        }

        function mountRepeater(mountEl) {
            var field = mountEl.dataset.field;
            var schema = JSON.parse(mountEl.dataset.schema);
            var hidden = mountEl.previousElementSibling;
            var rows = [];
            try { rows = JSON.parse(hidden.value || '[]'); } catch (e) { rows = []; }

            function sync() {
                var data = Array.prototype.map.call(mountEl.children, function (rowEl) {
                    var obj = {};
                    schema.forEach(function (f) {
                        var input = rowEl.querySelector('[data-key="' + f.key + '"]');
                        var v = input.value;
                        if (f.type === 'number') v = v === '' ? '' : Number(v);
                        obj[f.key] = v;
                    });
                    return obj;
                });
                hidden.value = JSON.stringify(data);
            }

            function renderRow(row) {
                var rowEl = document.createElement('div');
                rowEl.className = 'tjs-repeater-row';
                schema.forEach(function (f) {
                    var built = makeField(row, f);
                    built.input.addEventListener('input', sync);
                    rowEl.appendChild(built.wrap);
                });
                var rm = document.createElement('button');
                rm.type = 'button';
                rm.className = 'button tjs-repeater-remove';
                rm.textContent = 'Remove';
                rm.addEventListener('click', function () { rowEl.remove(); sync(); });
                rowEl.appendChild(rm);
                mountEl.appendChild(rowEl);
            }

            rows.forEach(renderRow);

            var addBtn = document.createElement('button');
            addBtn.type = 'button';
            addBtn.className = 'button button-primary tjs-repeater-add';
            addBtn.textContent = '+ Add Row';
            addBtn.addEventListener('click', function () {
                var empty = {};
                schema.forEach(function (f) { empty[f.key] = ''; });
                renderRow(empty);
                sync();
            });
            mountEl.parentNode.insertBefore(addBtn, mountEl.nextSibling);

            sync();
        }

        function mountProgrammes(mountEl) {
            var hidden = mountEl.previousElementSibling;
            var tracks = [];
            try { tracks = JSON.parse(hidden.value || '[]'); } catch (e) { tracks = []; }
            var subSchema = [
                { key: 'title', label: 'Title', type: 'text' },
                { key: 'text', label: 'Description', type: 'textarea' },
            ];

            function sync() {
                var data = Array.prototype.map.call(mountEl.children, function (trackEl) {
                    var trackInput = trackEl.querySelector('[data-key="track"]');
                    function readRows(cls) {
                        var container = trackEl.querySelector('.' + cls);
                        return Array.prototype.map.call(container.children, function (rowEl) {
                            return {
                                title: rowEl.querySelector('[data-key="title"]').value,
                                text: rowEl.querySelector('[data-key="text"]').value,
                            };
                        });
                    }
                    return {
                        track: trackInput.value,
                        peos: readRows('tjs-peos'),
                        pos: readRows('tjs-pos'),
                        psos: readRows('tjs-psos'),
                    };
                });
                hidden.value = JSON.stringify(data);
            }

            function renderSubRow(container, row) {
                var rowEl = document.createElement('div');
                rowEl.className = 'tjs-repeater-row';
                subSchema.forEach(function (f) {
                    var built = makeField(row, f);
                    built.input.addEventListener('input', sync);
                    rowEl.appendChild(built.wrap);
                });
                var rm = document.createElement('button');
                rm.type = 'button';
                rm.className = 'button tjs-repeater-remove';
                rm.textContent = 'Remove';
                rm.addEventListener('click', function () { rowEl.remove(); sync(); });
                rowEl.appendChild(rm);
                container.appendChild(rowEl);
            }

            function renderSubRepeater(trackEl, cls, label, rows) {
                var h = document.createElement('h4');
                h.textContent = label;
                trackEl.appendChild(h);
                var container = document.createElement('div');
                container.className = cls;
                trackEl.appendChild(container);
                rows.forEach(function (r) { renderSubRow(container, r); });
                var addBtn = document.createElement('button');
                addBtn.type = 'button';
                addBtn.className = 'button';
                addBtn.textContent = '+ Add ' + label.slice(0, -1);
                addBtn.addEventListener('click', function () {
                    renderSubRow(container, { title: '', text: '' });
                    sync();
                });
                trackEl.appendChild(addBtn);
            }

            function renderTrack(track) {
                var trackEl = document.createElement('div');
                trackEl.className = 'tjs-programme-track';

                var nameBuilt = makeField({ track: track.track }, { key: 'track', label: 'Track Name (e.g. B.E - CSE)', type: 'text' });
                nameBuilt.input.addEventListener('input', sync);
                trackEl.appendChild(nameBuilt.wrap);

                renderSubRepeater(trackEl, 'tjs-peos', 'PEOs', track.peos || []);
                renderSubRepeater(trackEl, 'tjs-pos', 'POs', track.pos || []);
                renderSubRepeater(trackEl, 'tjs-psos', 'PSOs', track.psos || []);

                var rmTrack = document.createElement('button');
                rmTrack.type = 'button';
                rmTrack.className = 'button tjs-repeater-remove';
                rmTrack.textContent = 'Remove Track';
                rmTrack.addEventListener('click', function () { trackEl.remove(); sync(); });
                trackEl.appendChild(rmTrack);

                mountEl.appendChild(trackEl);
            }

            tracks.forEach(renderTrack);

            var addTrackBtn = document.createElement('button');
            addTrackBtn.type = 'button';
            addTrackBtn.className = 'button button-primary tjs-programme-add-track';
            addTrackBtn.textContent = '+ Add Track (e.g. new programme)';
            addTrackBtn.addEventListener('click', function () {
                renderTrack({ track: '', peos: [], pos: [], psos: [] });
                sync();
            });
            mountEl.parentNode.insertBefore(addTrackBtn, mountEl.nextSibling);

            sync();
        }

        document.addEventListener('DOMContentLoaded', function () {
            document.querySelectorAll('.tjs-repeater-mount').forEach(mountRepeater);
            document.querySelectorAll('.tjs-programmes-mount').forEach(mountProgrammes);
        });
    })();
    </script>
    <?php
}

add_action('save_post_department', function ($post_id) {
    if (!isset($_POST['tjs_department_nonce']) || !wp_verify_nonce($_POST['tjs_department_nonce'], 'tjs_department_save')) {
        return;
    }
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    foreach (tjs_department_field_defs() as $key => $conf) {
        if (!isset($_POST[$key])) {
            continue;
        }
        $raw = wp_unslash($_POST[$key]);
        $kind = $conf[2];

        if ($kind === 'lines') {
            $lines = array_values(array_filter(array_map('trim', explode("\n", $raw)), fn ($l) => $l !== ''));
            update_post_meta($post_id, $key, wp_json_encode($lines, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE));
        } elseif ($kind === 'repeater' || $kind === 'programmes') {
            json_decode($raw);
            if (json_last_error() === JSON_ERROR_NONE) {
                update_post_meta($post_id, $key, $raw);
            }
        } elseif ($kind === 'text') {
            update_post_meta($post_id, $key, sanitize_text_field($raw));
        } else {
            update_post_meta($post_id, $key, wp_kses_post($raw));
        }
    }
});

// 5. One-time seed of the "cse" department with the content that currently
// lives in the Next.js page, so the REST API has real data immediately.
add_action('init', function () {
    $existing = get_page_by_path('cse', OBJECT, 'department');
    if ($existing) {
        return;
    }

    $post_id = wp_insert_post([
        'post_type' => 'department',
        'post_title' => 'Computer Science and Engineering',
        'post_name' => 'cse',
        'post_status' => 'publish',
    ]);

    if (!$post_id || is_wp_error($post_id)) {
        return;
    }

    $json = fn ($data) => wp_json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

    update_post_meta($post_id, 'hero_label', 'Undergraduate & Postgraduate Programme');
    update_post_meta($post_id, 'hero_description', 'Established in 2009–2010, the Department of Computer Science and Engineering trains skilled, innovative, and industry-ready computing professionals through modern labs, practical learning, and industry-oriented training.');

    update_post_meta($post_id, 'about_paragraphs', $json([
        'Established in 2009–2010, the Department of Computer Science and Engineering at T.J.S. Engineering College is committed to developing skilled, innovative, and industry-ready computing professionals.',
        'The department offers <strong>B.E. Computer Science and Engineering</strong> and <strong>M.E. Computer Science and Engineering</strong> programmes, supported by experienced faculty, modern infrastructure, practical learning, and industry-oriented training.',
        'Our academic approach focuses on strengthening technical knowledge, problem-solving abilities, innovation, research, entrepreneurship, and professional skills. Students are encouraged to explore emerging technologies and apply their knowledge to real-world challenges.',
        'The department continuously strives to create a vibrant learning environment where students can transform their ideas into innovative solutions and become confident professionals ready to meet the challenges of the evolving technology landscape.',
    ]));
    update_post_meta($post_id, 'vision', 'To nurture technically proficient, innovative, ethical, and socially responsible computing professionals who can contribute effectively to industry, research, and society.');
    update_post_meta($post_id, 'mission_points', $json([
        'To provide quality education with strong technical and practical knowledge.',
        'To develop problem-solving, analytical, communication, and professional skills.',
        'To encourage innovation, research, entrepreneurship, and lifelong learning.',
        'To provide opportunities for industry interaction, projects, internships, and practical exposure.',
        'To prepare students for successful careers, higher studies, and global opportunities.',
    ]));

    update_post_meta($post_id, 'hod_message', $json([
        'It gives me immense pleasure to welcome you to the Department of Computer Science and Engineering at T.J.S. Engineering College.',
        'Computer Science and Engineering is more than a discipline—it is a driving force behind the transformation of our world. From Artificial Intelligence and Data Science to Cloud Computing, Cybersecurity, Internet of Things, and emerging digital technologies, computing continues to create new possibilities and redefine the way we live, work, and innovate.',
        'At our department, we are committed to creating an inspiring, inclusive, and technology-driven learning environment where students are encouraged to think beyond conventional boundaries. Our academic programmes are designed to build strong fundamentals while providing meaningful exposure to practical applications, emerging technologies, research, innovation, and industry practices.',
        'Our experienced faculty members play an important role in mentoring students and guiding them towards academic and professional excellence. Through hands-on laboratory learning, technical workshops, internships, industrial visits, expert interactions, coding activities, hackathons, projects, and research initiatives, we provide students with opportunities to transform their ideas into practical solutions.',
        'We strongly believe that a successful engineer requires more than technical knowledge. Creativity, critical thinking, communication, teamwork, ethical responsibility, leadership, and a commitment to lifelong learning are equally essential. Therefore, we strive to nurture confident and responsible graduates who are prepared to contribute meaningfully to industry, research, entrepreneurship, and society.',
        'I warmly invite you to explore the opportunities offered by the Department of Computer Science and Engineering, T.J.S. Engineering College, and become part of a vibrant community committed to learning, innovation, excellence, and transformation.',
    ]));
    update_post_meta($post_id, 'hod_quote', 'Think Beyond. Innovate Today. Shape Tomorrow.');
    update_post_meta($post_id, 'hod_signature', $json([
        'Head of the Department',
        'Department of Computer Science and Engineering',
        'T.J.S. Engineering College',
    ]));

    update_post_meta($post_id, 'faculty', $json([]));
    update_post_meta($post_id, 'non_teaching_staff', $json([]));

    update_post_meta($post_id, 'programmes', $json([
        [
            'track' => 'B.E - CSE',
            'peos' => [
                ['title' => 'PEO1 – Professional Excellence', 'text' => 'Pursue successful careers and higher education by applying strong foundations in Computer Science, problem-solving, analytical thinking, and emerging technologies.'],
                ['title' => 'PEO2 – Innovation, Research and Entrepreneurship', 'text' => 'Demonstrate innovation, entrepreneurial thinking, and a research-oriented mindset to develop sustainable solutions for real-world challenges through industry and interdisciplinary collaboration.'],
                ['title' => 'PEO3 – Ethics, Leadership and Lifelong Learning', 'text' => 'Demonstrate professional ethics, teamwork, leadership, social responsibility, and lifelong learning to contribute effectively to society and advance technological progress at both national and global levels.'],
            ],
            'pos' => [
                ['title' => 'PO1 – Engineering Knowledge', 'text' => 'Apply knowledge of mathematics, natural sciences, computing, engineering fundamentals, and specialized engineering concepts to develop effective solutions to complex engineering problems.'],
                ['title' => 'PO2 – Problem Analysis', 'text' => 'Identify, formulate, review relevant literature, and analyze complex engineering problems to arrive at well-supported conclusions while considering the principles of sustainable development.'],
                ['title' => 'PO3 – Design and Development of Solutions', 'text' => 'Design and develop innovative solutions, systems, components, and processes to address complex engineering problems while considering public health and safety, economic factors, culture, society, and environmental sustainability.'],
                ['title' => 'PO4 – Conduct Investigations of Complex Problems', 'text' => 'Conduct systematic investigations of complex engineering problems using research-based knowledge, including experimental design, modelling, analysis, and interpretation of data to arrive at valid and reliable conclusions.'],
                ['title' => 'PO5 – Engineering Tool Usage', 'text' => 'Select, create, and apply appropriate techniques, resources, and modern engineering and information technology tools, including modelling and prediction techniques, while recognizing their capabilities and limitations.'],
                ['title' => 'PO6 – The Engineer and the World', 'text' => 'Analyze and evaluate the societal and environmental impacts of engineering solutions with respect to sustainability, economy, health, safety, legal and regulatory requirements, culture, and the environment.'],
                ['title' => 'PO7 – Ethics', 'text' => 'Apply ethical principles and demonstrate professional ethics, human values, diversity, and inclusivity while complying with relevant national and international laws and professional standards.'],
                ['title' => 'PO8 – Individual and Collaborative Teamwork', 'text' => 'Function effectively as an individual and as a member or leader of diverse, multidisciplinary teams, contributing positively towards the achievement of common goals.'],
                ['title' => 'PO9 – Communication', 'text' => 'Communicate effectively and inclusively with the engineering community and society through clear reports, technical documentation, presentations, and other forms of professional communication, while considering cultural, linguistic, and learning differences.'],
                ['title' => 'PO10 – Project Management and Finance', 'text' => 'Apply engineering management principles, economic decision-making, and financial understanding to manage projects effectively and contribute efficiently as an individual, team member, or team leader in multidisciplinary environments.'],
                ['title' => 'PO11 – Lifelong Learning', 'text' => 'Recognize the importance of continuous learning and develop the ability to pursue independent and lifelong learning, adapt to emerging technologies, and apply critical thinking in response to technological and professional changes.'],
            ],
            'psos' => [
                ['title' => 'PSO1 – Computing Systems Design and Development', 'text' => 'Apply fundamental and advanced concepts of computing, algorithms, programming, and computational frameworks to design, develop, and implement innovative hardware and software solutions for real-world applications.'],
                ['title' => 'PSO2 – Emerging Technologies and Innovation', 'text' => 'Apply knowledge of advanced computing concepts and emerging technologies in Computer Science and Engineering to develop innovative, sustainable, and socially relevant solutions that address the evolving needs of industry and society.'],
            ],
        ],
        [
            'track' => 'M.E - CSE',
            'peos' => [
                ['title' => 'PEO1 – Professional and Career Excellence', 'text' => 'Apply advanced knowledge and technical skills in Computer Science and Engineering to pursue successful careers and excel in industry, higher education, entrepreneurship, and research.'],
                ['title' => 'PEO2 – Innovation and Lifelong Learning', 'text' => 'Design and develop innovative, sustainable, and technology-driven solutions to complex computing challenges through critical thinking, creativity, continuous learning, and adaptability to emerging technologies.'],
                ['title' => 'PEO3 – Leadership, Ethics and Social Responsibility', 'text' => 'Demonstrate leadership, professionalism, ethical values, teamwork, and effective communication to contribute responsibly to society and succeed in global and multidisciplinary environments.'],
            ],
            'pos' => [
                ['title' => 'PO1 – Research and Problem Solving', 'text' => 'Independently conduct research, investigation, and development activities to analyze and address practical and complex problems using appropriate technical approaches.'],
                ['title' => 'PO2 – Technical Communication', 'text' => 'Prepare, document, and effectively present comprehensive technical reports, research findings, and project documentation using professional standards.'],
                ['title' => 'PO3 – Domain Expertise', 'text' => 'Demonstrate a strong level of expertise and mastery in the chosen area of specialization within Computer Science and Engineering and apply specialized knowledge to professional and research-oriented challenges.'],
            ],
            'psos' => [
                ['title' => 'PSO1 – Advanced Computing and Innovation', 'text' => 'Apply advanced computing knowledge, analytical skills, and design principles to develop innovative, sustainable, and technology-driven solutions to contemporary challenges in Computer Science and Engineering.'],
                ['title' => 'PSO2 – Interdisciplinary Research and Emerging Technologies', 'text' => 'Engage in interdisciplinary research and continuous learning to explore, adapt, and contribute to the advancement of emerging technologies in the field of computing.'],
            ],
        ],
    ]));

    update_post_meta($post_id, 'regulations_ug', $json([
        ['label' => 'B.E. and B.Tech. Regulations (2026)', 'url' => '#'],
        ['label' => 'B.E. and B.Tech. Regulations (2025)', 'url' => '#'],
        ['label' => 'B.E. and B.Tech. Regulations (2021)', 'url' => '#'],
    ]));
    update_post_meta($post_id, 'regulations_pg', $json([
        ['label' => 'M.E. Regulations (2026)', 'url' => '#'],
        ['label' => 'M.E. Regulations (2025)', 'url' => '#'],
        ['label' => 'M.E. Regulations (2021)', 'url' => '#'],
        ['label' => 'M.B.A. Regulations (2026)', 'url' => '#'],
        ['label' => 'M.B.A. Regulations (2025)', 'url' => '#'],
        ['label' => 'M.B.A. Regulations (2021)', 'url' => '#'],
    ]));

    update_post_meta($post_id, 'syllabus_ug', $json([
        ['label' => 'B.E. Computer Science and Engineering', 'url' => '#'],
        ['label' => 'B.E. Electrical and Electronics Engineering', 'url' => '#'],
        ['label' => 'B.E. Electronics and Communication Engineering', 'url' => '#'],
        ['label' => 'B.Tech. Artificial Intelligence and Data Science', 'url' => '#'],
        ['label' => 'B.E. Mechanical Engineering', 'url' => '#'],
        ['label' => 'B.E. Information Technology', 'url' => '#'],
    ]));
    update_post_meta($post_id, 'syllabus_pg', $json([
        ['label' => 'M.E. Computer Science and Engineering', 'url' => '#'],
        ['label' => 'M.E. VLSI & Design', 'url' => '#'],
        ['label' => 'M.B.A', 'url' => '#'],
    ]));

    update_post_meta($post_id, 'trainings', $json([
        ['program' => 'Python', 'contact' => 'To be updated'],
    ]));

    update_post_meta($post_id, 'internships', $json([
        ['company' => 'SAP', 'year' => 2024, 'students' => 30, 'color' => '#16225c'],
        ['company' => 'Kaar', 'year' => 2023, 'students' => 15, 'color' => '#2ba9c4'],
        ['company' => 'ELGI', 'year' => 2024, 'students' => 10, 'color' => '#8e5fb5'],
        ['company' => 'eSilicon', 'year' => 2021, 'students' => 17, 'color' => '#f4a340'],
        ['company' => 'Vyoma Systems', 'year' => 2021, 'students' => 2, 'color' => '#d9534f'],
        ['company' => 'IIT Guwahati', 'year' => 2022, 'students' => 7, 'color' => '#2bb7a0'],
        ['company' => 'IIT Madras', 'year' => 2022, 'students' => 19, 'color' => '#7b5ea7'],
        ['company' => 'IIT Srirangam', 'year' => 2023, 'students' => 55, 'color' => '#4a7fc1'],
        ['company' => 'IIT Palakkad', 'year' => 2021, 'students' => 7, 'color' => '#8bc34a'],
        ['company' => 'IITDM', 'year' => 2022, 'students' => 28, 'color' => '#6b8e23'],
    ]));

    update_post_meta($post_id, 'research_areas', 'Content to be updated.');
    update_post_meta($post_id, 'research_funded_projects', 'Content to be updated.');
    update_post_meta($post_id, 'research_seed_money', 'Content to be updated.');

    update_post_meta($post_id, 'facilities_labs', $json([
        'Computer Centre',
        'Mobile and App Development Lab',
        'Cloud Lab',
    ]));
    update_post_meta($post_id, 'facilities_centres', $json([
        'WIPRO – details to be updated',
    ]));
}, 20);
