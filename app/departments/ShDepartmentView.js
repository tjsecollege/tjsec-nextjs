"use client";

import Link from "next/link";
import { useState } from "react";

const CATEGORIES = [
  { id: "objectives", label: "Objectives" },
  { id: "faculty", label: "Faculty Profile" },
  { id: "staff", label: "Non-Teaching Staff" },
  { id: "gallery", label: "Gallery" },
];

const PENDING = <p className="tjs-dept-pending">Content coming soon.</p>;

function list(value) {
  return Array.isArray(value) ? value : [];
}

function PeopleGrid({ people, withIds }) {
  if (!people.length) return PENDING;
  return (
    <div className="tjs-dept-people-grid-full">
      {people.map((p, i) => (
        <div className="tjs-dept-people-card" key={p.name + i}>
          <div className="tjs-dept-people-photo">
            {p.photo?.url ? <img src={p.photo.url} alt={p.photo.alt || p.name} /> : <span>Photo</span>}
          </div>
          <h4>{p.name}</h4>
          <p className="tjs-dept-people-role">{[p.designation, p.qualification].filter(Boolean).join(", ")}</p>
          {withIds && (
            <p className="tjs-dept-people-spec">
              AICTE ID: {p.aicte_id || "—"}
              <br />
              AU-FIN: {p.au_fin || "—"}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

// Science & Humanities department page (Chemistry, English, Maths, Physics,
// Tamil): a sidebar with Objectives, Faculty Profile, Non-Teaching Staff and Gallery.
export default function ShDepartmentView({ dept }) {
  const [activeCat, setActiveCat] = useState("objectives");
  const gallery = list(dept.gallery);

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>Departments</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{dept.title}</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            {dept.title}
          </h2>

          <div className="tjs-approvals-layout">
            <aside className="tjs-approvals-sidebar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={"tjs-approvals-cat" + (activeCat === cat.id ? " active" : "")}
                  onClick={() => setActiveCat(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </aside>

            <div className="tjs-approvals-panel">
              {activeCat === "objectives" && (
                <div className="tjs-committee-body">
                  <h4>{dept.objectives_heading || dept.title}</h4>
                  {dept.objectives ? <div dangerouslySetInnerHTML={{ __html: dept.objectives }} /> : PENDING}
                </div>
              )}

              {activeCat === "faculty" && (
                <div className="tjs-committee-body">
                  <h4>Faculty Profile</h4>
                  <PeopleGrid people={list(dept.faculty)} withIds />
                </div>
              )}

              {activeCat === "staff" && (
                <div className="tjs-committee-body">
                  <h4>Non-Teaching Staff</h4>
                  <PeopleGrid people={list(dept.non_teaching)} />
                </div>
              )}

              {activeCat === "gallery" && (
                <div className="tjs-committee-body">
                  <h4>Gallery</h4>
                  {gallery.length ? (
                    <div className="tjs-dept-event-imgs">
                      {gallery.map((img) => (
                        <img key={img.url} src={img.url} alt={img.alt || `${dept.title} gallery`} />
                      ))}
                    </div>
                  ) : (
                    PENDING
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
