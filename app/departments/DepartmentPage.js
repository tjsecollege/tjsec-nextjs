import DeptMegaNav from "./DeptMegaNav";
import PeopleCarousel from "./PeopleCarousel";
import DeptPhotoSlider from "./DeptPhotoSlider";
import EventSlider from "./EventSlider";
import MouTabsViewer from "./MouTabsViewer";
import YearGroupedVisits from "./YearGroupedVisits";
import LabAccordion from "./LabAccordion";
import ProgrammeTabs from "./ProgrammeTabs";

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const MENU = [
  {
    label: "About",
    children: [
      { href: "#about", label: "About us" },
      { href: "#vision-mission", label: "Vision and Mission" },
      { href: "#hod", label: "HOD's Desk" },
      { href: "#magazine", label: "Magazine" },
    ],
  },
  {
    label: "People",
    children: [
      { href: "#faculty", label: "Faculty" },
      { href: "#staff", label: "Non-Teaching" },
    ],
  },
  {
    label: "Academics",
    children: [
      { href: "#programmes", label: "Programme Offered" },
      { href: "#bos", label: "BOS" },
      { href: "#curriculum", label: "Curriculum & Syllabi" },
    ],
  },
  {
    label: "Industry Interface",
    children: [
      { href: "#mou", label: "MOU's" },
      { href: "#consultancy", label: "Area of Consultancy" },
      { href: "#industry-visits", label: "Industry Visits" },
      { href: "#internships", label: "Internship" },
    ],
  },
  {
    label: "Research",
    children: [
      { href: "#publication", label: "Publication" },
      { href: "#patent", label: "Patent" },
      { href: "#books-chapters", label: "Books & Chapters" },
    ],
  },
  {
    label: "Facilities",
    children: [{ href: "#facilities", label: "Department Laboratories" }],
  },
  {
    label: "Events",
    children: [
      { href: "#conferences", label: "Conference" },
      { href: "#fdp-workshop", label: "Guest Lecturer, FDP & Workshop" },
      { href: "#value-added-course", label: "Value Added Course" },
      { href: "#symposium", label: "Symposium" },
      { href: "#seminars", label: "Seminars & Activities" },
    ],
  },
  {
    label: "Placements",
    children: [
      { href: "#recruiters", label: "Major Recruiters" },
      { href: "#placed-students", label: "Placed Students" },
    ],
  },
  {
    label: "Achievements",
    children: [
      { href: "#faculty-achievements", label: "Faculty Achievements" },
      { href: "#students-achievements", label: "Students Achievements" },
      { href: "#co-curricular", label: "Co-Curricular" },
      { href: "#extra-curricular", label: "Extra-Curricular" },
    ],
  },
  {
    label: "Others",
    children: [
      { href: "#gallery", label: "Gallery" },
      { href: "#alumni", label: "Alumni Interactions" },
      { href: "#distinguished-alumni", label: "Distinguished Alumni" },
      { href: "#entrepreneurship", label: "Entrepreneurship" },
    ],
  },
];

const FDP_CATEGORIES = {
  guest_lecture: "Guest Lecture",
  workshop: "Workshop",
  fdp_organised: "FDP Organised",
  fdp_attended: "FDP Attended",
};

const PENDING = <p className="tjs-dept-pending">Content coming soon.</p>;

// ---- Helpers turning WordPress rows into what the shared components expect ----

function list(value) {
  return Array.isArray(value) ? value : [];
}

// "2025-02-27" -> "27-02-2025"
function formatDate(ymd, sep = "-") {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd || "");
  return m ? [m[3], m[2], m[1]].join(sep) : ymd || "";
}

function dateRange(start, end) {
  const from = formatDate(start);
  return end && end !== start ? `${from} to ${formatDate(end)}` : from;
}

function paragraphs(text) {
  return (text || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function lines(text) {
  return (text || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function photos(gallery, fallbackAlt) {
  return list(gallery).map((p) => ({ src: p.url, alt: p.alt || fallbackAlt }));
}

function docLinks(rows) {
  return list(rows)
    .filter((r) => r.document?.url)
    .map((r) => ({ label: r.title, href: r.document.url }));
}

function joinNonEmpty(parts, sep) {
  return parts.filter(Boolean).join(sep);
}

// Untitled rows become a numbered list; a row may hold several items
// separated by blank lines. Titled rows keep their own heading.
function outcomes(rows) {
  let number = 0;
  return list(rows).flatMap((row) => {
    if (row.title) return [{ title: row.title, text: row.text || "" }];
    return paragraphs(row.text).map((text) => ({ number: ++number, text }));
  });
}

function toSlide(row, category) {
  const imgs = list(row.photos).map((p) => p.url);
  return {
    title: row.title,
    date: dateRange(row.start_date, row.end_date),
    category,
    img: imgs[0],
    imgs,
    desc: row.description || "",
  };
}

function toYearEntry(row) {
  return {
    title: row.title,
    date: dateRange(row.start_date, row.end_date),
    desc: row.description || "",
    people: list(row.coordinators).filter((p) => p.name),
    imgs: photos(row.photos, row.title),
  };
}

function fdpSlide(row) {
  const slide = toSlide(row, FDP_CATEGORIES[row.type] || "Event");
  slide.desc = joinNonEmpty(
    [
      row.description,
      row.organised_by && `Organised by: ${row.organised_by}`,
      row.attended_by && `Attended by: ${row.attended_by}`,
      ...list(row.schedule).map((d) => joinNonEmpty([formatDate(d.date), joinNonEmpty([d.topic, d.speaker], " — ")], ": ")),
    ],
    "\n\n"
  );
  return slide;
}

function stripQuotes(text) {
  return (text || "").trim().replace(/^["“”']+|["“”']+$/g, "");
}

function LinkList({ items }) {
  if (!items.length) return PENDING;
  return (
    <div className="tjs-dept-link-list">
      {items.map((item) => (
        <a href={item.href} target="_blank" rel="noopener" key={item.label + item.href}>
          <span>{item.label}</span>
          <span className="tjs-dept-link-arrow">
            <ArrowIcon />
          </span>
        </a>
      ))}
    </div>
  );
}

function Slider({ rows, category }) {
  const items = list(rows).map((r) => toSlide(r, category));
  return items.length ? <EventSlider items={items} /> : PENDING;
}

function YearList({ rows, title }) {
  const items = list(rows).map(toYearEntry);
  return items.length ? <YearGroupedVisits items={items} title={title} /> : PENDING;
}

function Html({ html }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

// ---- Page ----

export default function DepartmentPage({ dept }) {
  const toppers = list(dept.toppers).map((t) => ({ name: t.name, photo: t.photo?.url, role: t.details }));
  const faculty = list(dept.faculty);
  const nonTeaching = list(dept.non_teaching);
  const mission = list(dept.mission).filter((m) => m.point);

  const programmes = list(dept.programmes).map((p) => ({
    name: p.programme_name,
    peos: outcomes(p.peos),
    pos: outcomes(p.pos),
    psos: outcomes(p.psos),
  }));

  const bosMembers = list(dept.bos_members)
    .map((g) => ({ position: g.position, members: list(g.members).filter((m) => m.name || m.details) }))
    .filter((g) => g.members.length);
  const bosMeta = [
    dept.bos_meeting_date && ["Date & Time of the Meeting", joinNonEmpty([formatDate(dept.bos_meeting_date, "."), dept.bos_meeting_time], " & ")],
    dept.bos_meeting_number && ["BoS Meeting Number", dept.bos_meeting_number],
    dept.bos_venue && ["Venue", dept.bos_venue],
  ].filter(Boolean);

  const mous = list(dept.mous)
    .filter((m) => m.document?.url)
    .map((m) => ({
      label: m.signed_date ? `${m.company} (${formatDate(m.signed_date, ".")})` : m.company,
      href: m.document.url,
    }));

  const internships = list(dept.internships);
  const publications = list(dept.publications);
  const patents = list(dept.patents);
  const books = list(dept.books);

  const labs = list(dept.labs).map((lab, i) => {
    const subLabs = list(lab.sub_labs).map((s) => ({
      name: s.name,
      label: "About the Laboratory",
      paragraphs: paragraphs(s.description),
      imgs: photos(s.photos, s.name),
    }));
    return {
      name: `${i + 1}. ${lab.name}`,
      label: "About the Laboratory",
      paragraphs: paragraphs(lab.description),
      imgs: photos(lab.photos, lab.name),
      ...(subLabs.length ? { subLabs } : {}),
    };
  });

  const fdpSlides = list(dept.fdp_workshops).map(fdpSlide);
  const courses = list(dept.value_added_courses);
  const recruiters = list(dept.recruiters).filter((r) => r.logo?.url);
  const placed = list(dept.placed_students).map((s) => ({
    name: s.name,
    photo: s.photo?.url,
    role: s.company,
    spec: joinNonEmpty([formatDate(s.placed_date), s.package], " · "),
  }));
  const gallery = photos(dept.gallery, `${dept.title} gallery`);
  const distinguished = list(dept.distinguished_alumni);
  const entrepreneurs = list(dept.entrepreneurs);

  return (
    <>
      <section className="tjs-dept-hero-split">
        <div className="tjs-dept-hero-text">
          <span className="tjs-dept-hero-label">{dept.hero_label || "Department"}</span>
          <h1>{dept.title}</h1>
          {dept.hero_description && <p>{dept.hero_description}</p>}
        </div>
        {dept.hero_image?.url && (
          <div className="tjs-dept-hero-image">
            <img src={dept.hero_image.url} alt={dept.hero_image.alt || `${dept.title} at T.J.S Engineering College`} />
          </div>
        )}
      </section>

      <div className="tjs-dept-page">
        <DeptMegaNav categories={MENU} />

        {toppers.length > 0 && (
          <div className="tjs-dept-toppers-top">
            <h3>Academic Toppers</h3>
            <PeopleCarousel items={toppers} />
          </div>
        )}

        <section id="about" className="tjs-dept-section">
          <h2>About us</h2>
          {dept.about_content ? <Html html={dept.about_content} /> : PENDING}
        </section>

        <section id="vision-mission" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Vision and Mission</h2>
          {dept.vision || mission.length ? (
            <div className="tjs-dept-grid-2">
              <div className="tjs-dept-card">
                <h3>Vision</h3>
                <p>{dept.vision}</p>
              </div>
              <div className="tjs-dept-card">
                <h3>Mission</h3>
                <ul>
                  {mission.map((m, i) => (
                    <li key={i}>{m.point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            PENDING
          )}
        </section>

        <section id="hod" className="tjs-dept-section">
          <h2>HOD&apos;s Desk</h2>
          {dept.hod_message || dept.hod_name ? (
            <div className="tjs-dept-hod">
              <div className="tjs-dept-hod-photo">
                {dept.hod_photo?.url && <img src={dept.hod_photo.url} alt={dept.hod_photo.alt || `${dept.hod_name}, Head of Department`} />}
              </div>
              <div className="tjs-dept-hod-message">
                {dept.hod_message_title && <h3>{dept.hod_message_title}</h3>}
                {dept.hod_message && <Html html={dept.hod_message} />}
                {dept.hod_quote && <p className="tjs-dept-hod-quote">&ldquo;{stripQuotes(dept.hod_quote)}&rdquo;</p>}
                {(dept.hod_name || dept.hod_designation) && (
                  <p className="tjs-dept-hod-sign">
                    {dept.hod_name}
                    {dept.hod_name && dept.hod_designation && <br />}
                    {dept.hod_designation}
                  </p>
                )}
              </div>
            </div>
          ) : (
            PENDING
          )}
        </section>

        <section id="magazine" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Magazine</h2>
          <LinkList items={docLinks(dept.magazines)} />
        </section>

        <section id="faculty" className="tjs-dept-section">
          <h2>Faculty</h2>
          {faculty.length ? (
            <div className="tjs-dept-people-grid-full">
              {faculty.map((f, i) => (
                <div className="tjs-dept-people-card" key={f.name + i}>
                  <div className="tjs-dept-people-photo">
                    {f.photo?.url ? <img src={f.photo.url} alt={f.photo.alt || f.name} /> : <span>Photo</span>}
                  </div>
                  <h4>{f.name}</h4>
                  <p className="tjs-dept-people-role">{joinNonEmpty([f.designation, f.qualification], ", ")}</p>
                  <p className="tjs-dept-people-spec">
                    AICTE ID: {f.aicte_id || "—"}
                    <br />
                    AU-FIN: {f.au_fin || "—"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            PENDING
          )}
        </section>

        <section id="staff" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Non-Teaching</h2>
          {nonTeaching.length ? (
            <div className="tjs-dept-people-grid">
              {nonTeaching.map((s, i) => (
                <div className="tjs-dept-people-card" key={s.name + i}>
                  <div className="tjs-dept-people-photo">
                    {s.photo?.url ? <img src={s.photo.url} alt={s.photo.alt || s.name} /> : <span>Photo</span>}
                  </div>
                  <h4>{s.name}</h4>
                  <p className="tjs-dept-people-role">{s.designation}</p>
                </div>
              ))}
            </div>
          ) : (
            PENDING
          )}
        </section>

        <section id="programmes" className="tjs-dept-section">
          <h2>Programme Offered</h2>
          {programmes.length ? <ProgrammeTabs programmes={programmes} /> : PENDING}
        </section>

        <section id="bos" className="tjs-dept-section tjs-dept-section-alt">
          <h2>BOS</h2>
          {bosMembers.length || bosMeta.length ? (
            <>
              <h3>Board of Studies Composition</h3>
              {bosMeta.length > 0 && (
                <p>
                  {bosMeta.map(([label, value], i) => (
                    <span key={label}>
                      {i > 0 && <br />}
                      <strong>{label}:</strong> {value}
                    </span>
                  ))}
                </p>
              )}
              {bosMembers.length > 0 && (
                <div className="tjs-dept-table-wrap">
                  <table className="tjs-dept-table">
                    <thead>
                      <tr>
                        <th>Position in Board of Studies</th>
                        <th>Name of the Members</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bosMembers.map((group, g) =>
                        group.members.map((m, i) => (
                          <tr key={`${g}-${i}`}>
                            {i === 0 && <td rowSpan={group.members.length}>{group.position}</td>}
                            <td>
                              <strong>{m.name}</strong>
                              {m.details && (
                                <>
                                  <br />
                                  {m.details}
                                </>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            PENDING
          )}
        </section>

        <section id="curriculum" className="tjs-dept-section">
          <h2>Regulation &amp; Curriculum</h2>
          <LinkList items={docLinks(dept.curriculum_documents)} />
        </section>

        <section id="mou" className="tjs-dept-section tjs-dept-section-alt">
          <h2>MOU&apos;s</h2>
          {dept.mou_intro && <Html html={dept.mou_intro} />}
          {mous.length ? <MouTabsViewer items={mous} /> : !dept.mou_intro && PENDING}
        </section>

        <section id="consultancy" className="tjs-dept-section">
          <h2>Area of Consultancy</h2>
          <LinkList items={docLinks(dept.consultancy)} />
        </section>

        <section id="industry-visits" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Industry Visits</h2>
          <YearList rows={dept.industry_visits} title="Industry Visits" />
        </section>

        <section id="internships" className="tjs-dept-section">
          <h2>Internship</h2>
          {internships.length ? (
            <>
              <div className="tjs-dept-table-wrap">
                <table className="tjs-dept-table">
                  <thead>
                    <tr>
                      <th>Organisation</th>
                      <th>Duration</th>
                      <th>Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    {internships.map((row, i) => (
                      <tr key={row.organisation + i}>
                        <td>{row.organisation}</td>
                        <td>{dateRange(row.start_date, row.end_date)}</td>
                        <td>{row.students}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {internships
                .filter((row) => list(row.photos).length)
                .map((row, i) => (
                  <div className="tjs-dept-intern-photos" key={row.organisation + i}>
                    <h4 className="tjs-dept-intern-org">{row.organisation}</h4>
                    <div className="tjs-dept-event-imgs">
                      {photos(row.photos, row.organisation).map((img) => (
                        <img key={img.src} src={img.src} alt={img.alt} />
                      ))}
                    </div>
                  </div>
                ))}
            </>
          ) : (
            PENDING
          )}
        </section>

        <section id="publication" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Publication</h2>
          {publications.length ? (
            <div className="tjs-pub-list">
              {publications.map((p, i) => {
                const Card = p.link ? "a" : "div";
                const linkProps = p.link ? { href: p.link, target: "_blank", rel: "noopener" } : {};
                const source = joinNonEmpty([p.published_in, p.year], ", ");
                return (
                  <Card className="tjs-pub-card" key={p.title + i} {...linkProps}>
                    <div className="tjs-pub-icon">
                      <i className="ri-file-text-line"></i>
                    </div>
                    <div className="tjs-pub-content">
                      <h4 className="tjs-pub-title">
                        {p.title.trim()} {p.link && <i className="ri-external-link-line"></i>}
                      </h4>
                      {(p.authors || source) && (
                        <p className="tjs-pub-meta">
                          {p.authors && <strong>{p.authors}</strong>}
                          {p.authors && source && <> &middot; </>}
                          {source}
                        </p>
                      )}
                      {(p.impact_factor || p.citations) && (
                        <div className="tjs-pub-badges">
                          {p.impact_factor && <span className="tjs-pub-badge">Impact Factor {p.impact_factor}</span>}
                          {p.citations && <span className="tjs-pub-badge tjs-pub-badge-alt">Citation {p.citations}</span>}
                        </div>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            PENDING
          )}
        </section>

        <section id="patent" className="tjs-dept-section">
          <h2>Patent</h2>
          {patents.length ? (
            <div className="tjs-dept-table-wrap">
              <table className="tjs-dept-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Inventors</th>
                    <th>Application / Patent No.</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {patents.map((p, i) => (
                    <tr key={p.title + i}>
                      <td>
                        {p.document?.url ? (
                          <a href={p.document.url} target="_blank" rel="noopener">
                            {p.title}
                          </a>
                        ) : (
                          p.title
                        )}
                      </td>
                      <td>{p.inventors}</td>
                      <td>{p.application_number}</td>
                      <td style={{ textTransform: "capitalize" }}>{p.status}</td>
                      <td>{formatDate(p.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            PENDING
          )}
        </section>

        <section id="books-chapters" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Books &amp; Chapters</h2>
          {books.length ? (
            <div className="tjs-dept-table-wrap">
              <table className="tjs-dept-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Authors</th>
                    <th>Publisher</th>
                    <th>ISBN</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((b, i) => (
                    <tr key={b.title + i}>
                      <td>
                        {b.link ? (
                          <a href={b.link} target="_blank" rel="noopener">
                            {b.title}
                          </a>
                        ) : (
                          b.title
                        )}
                      </td>
                      <td>{b.type === "chapter" ? "Book Chapter" : "Book"}</td>
                      <td>{b.authors}</td>
                      <td>{b.publisher}</td>
                      <td>{b.isbn}</td>
                      <td>{formatDate(b.date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            PENDING
          )}
        </section>

        <section id="facilities" className="tjs-dept-section">
          <h2>Department Laboratories</h2>
          {labs.length ? <LabAccordion items={labs} /> : PENDING}
        </section>

        <section id="conferences" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Conference</h2>
          <Slider rows={dept.conferences} category="Conference" />
        </section>

        <section id="fdp-workshop" className="tjs-dept-section">
          <h2>Guest Lecturer, FDP &amp; Workshop</h2>
          {fdpSlides.length ? <EventSlider items={fdpSlides} /> : PENDING}
        </section>

        <section id="value-added-course" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Value Added Course</h2>
          {courses.length
            ? courses.map((c, i) => {
                const details = [
                  ["Organized By", c.organised_by],
                  ["In Association With", c.association],
                  ["Participants", c.participants],
                  ["Date", dateRange(c.start_date, c.end_date)],
                  ["Time", c.timing],
                ].filter(([, value]) => value);
                const trainers = lines(c.trainers);
                const images = photos(c.photos, c.title);
                return (
                  <div className="tjs-dept-media-row" key={c.title + i}>
                    <div className="tjs-dept-media-row-text">
                      <h3>{c.title}</h3>
                      {paragraphs(c.description).map((p, j) => (
                        <p key={j}>{p}</p>
                      ))}

                      {(details.length > 0 || trainers.length > 0) && (
                        <div className="tjs-dept-card">
                          <h3>Course Details</h3>
                          <ul>
                            {details.map(([label, value]) => (
                              <li key={label}>
                                <strong>{label}:</strong> {value}
                              </li>
                            ))}
                            {trainers.length > 0 && (
                              <li>
                                <strong>Speakers/Trainers:</strong>
                                <ul className="tjs-dept-person-list">
                                  {trainers.map((t) => (
                                    <li key={t}>{t}</li>
                                  ))}
                                </ul>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>

                    {images.length > 0 && (
                      <div className="tjs-dept-media-row-img">
                        <DeptPhotoSlider images={images} />
                      </div>
                    )}
                  </div>
                );
              })
            : PENDING}
        </section>

        <section id="symposium" className="tjs-dept-section">
          <h2>Symposium</h2>
          <YearList rows={dept.symposiums} title="Symposium" />
        </section>

        <section id="seminars" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Seminars &amp; Activities</h2>
          <YearList rows={dept.seminars} title="Seminars & Activities" />
        </section>

        <section id="recruiters" className="tjs-dept-section">
          <h2>Major Recruiters</h2>
          {recruiters.length ? (
            <div className="tjs-dept-photo-grid">
              {recruiters.map((r, i) => (
                <img key={r.name + i} src={r.logo.url} alt={r.name} title={r.name} className="tjs-dept-logo-real" />
              ))}
            </div>
          ) : (
            PENDING
          )}
        </section>

        <section id="placed-students" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Placed Students</h2>
          {placed.length ? <PeopleCarousel items={placed} /> : PENDING}
        </section>

        <section id="faculty-achievements" className="tjs-dept-section">
          <h2>Faculty Achievements</h2>
          <Slider rows={dept.faculty_achievements} category="Faculty Achievement" />
        </section>

        <section id="students-achievements" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Students Achievements</h2>
          <LinkList items={docLinks(dept.student_achievements)} />
        </section>

        <section id="co-curricular" className="tjs-dept-section">
          <h2>Co-Curricular</h2>
          <Slider rows={dept.co_curricular} category="Co-Curricular" />
        </section>

        <section id="extra-curricular" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Extra-Curricular</h2>
          <Slider rows={dept.extra_curricular} category="Extra-Curricular" />
        </section>

        <section id="gallery" className="tjs-dept-section">
          <h2>Gallery</h2>
          {gallery.length ? (
            <div className="tjs-dept-event-imgs">
              {gallery.map((img) => (
                <img key={img.src} src={img.src} alt={img.alt} />
              ))}
            </div>
          ) : (
            PENDING
          )}
        </section>

        <section id="alumni" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Alumni Interactions</h2>
          <YearList rows={dept.alumni_interactions} title="Alumni Interactions" />
        </section>

        <section id="distinguished-alumni" className="tjs-dept-section">
          <h2>Distinguished Alumni</h2>
          {distinguished.length ? (
            <div className="tjs-dept-table-wrap">
              <table className="tjs-dept-table">
                <thead>
                  <tr>
                    <th>Alumni Name</th>
                    <th>Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {distinguished.map((a, i) => (
                    <tr key={a.name + i}>
                      <td>{a.batch ? `${a.name} (${a.batch})` : a.name}</td>
                      <td>{a.designation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            PENDING
          )}
        </section>

        <section id="entrepreneurship" className="tjs-dept-section tjs-dept-section-alt">
          <h2>Entrepreneurship</h2>
          {entrepreneurs.length
            ? entrepreneurs.map((e, i) => {
                const details = [e.designation, ...lines(e.address), e.phone && `Phone: ${e.phone}`].filter(Boolean);
                return (
                  <div className="tjs-dept-card" key={e.name + i} style={i > 0 ? { marginTop: 16 } : undefined}>
                    <h4 style={{ marginTop: 0, color: "var(--rs-theme-blue)" }}>{e.batch ? `${e.name} (${e.batch})` : e.name}</h4>
                    <p style={{ marginBottom: 0 }}>
                      {details.map((d, j) => (
                        <span key={j}>
                          {j > 0 && <br />}
                          {d}
                        </span>
                      ))}
                    </p>
                  </div>
                );
              })
            : PENDING}
        </section>
      </div>
    </>
  );
}
