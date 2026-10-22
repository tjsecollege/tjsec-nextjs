"use client";

import Link from "next/link";
import { useState } from "react";

// Uploaded file wins; otherwise the pasted link.
function docUrl(item) {
  return item?.document?.url || item?.link || null;
}

// "2022-09-12" -> "12-09-2022"
function formatDate(ymd) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd || "");
  return m ? `${m[3]}-${m[2]}-${m[1]}` : ymd || "";
}

function list(value) {
  return Array.isArray(value) ? value : [];
}

function ViewLink({ url }) {
  return url ? (
    <a href={url} target="_blank" rel="noopener" style={{ color: "var(--rs-theme-blue)", fontWeight: 600 }}>
      VIEW
    </a>
  ) : (
    "VIEW"
  );
}

function MetricTable({ rows }) {
  return (
    <div className="tjs-dept-table-wrap">
      <table className="tjs-dept-table">
        <thead>
          <tr>
            <th>Metric No.</th>
            <th>Parameter</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {list(rows).map((row, i) => (
            <tr key={i}>
              <td>{row.metric}</td>
              <td>{row.parameter}</td>
              <td>
                <ViewLink url={docUrl(row)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CriterionTables({ indicators }) {
  return (
    <>
      {list(indicators).map((indicator, i) => (
        <div key={i} style={{ marginBottom: 28 }}>
          <h4>{indicator.heading}</h4>
          <div className="tjs-dept-table-wrap">
            <table className="tjs-dept-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Type</th>
                  <th>Weight</th>
                  <th>Description</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {list(indicator.metrics).map((row, j) => (
                  <tr key={j}>
                    <td>{row.metric}</td>
                    <td>{row.type}</td>
                    <td>{row.weight}</td>
                    <td>{row.description}</td>
                    <td>
                      <ViewLink url={docUrl(row)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
}

function PdfViewer({ url, title }) {
  if (!url) return <p className="tjs-dept-pending">Document coming soon.</p>;
  return (
    <div className="tjs-approvals-viewer">
      <iframe key={url} src={url} title={title} />
    </div>
  );
}

function PdfTabs({ tabs, title }) {
  const items = list(tabs);
  const [active, setActive] = useState(items.length - 1); // latest tab opens first
  const current = items[active] || items[items.length - 1];
  if (!current) return null;
  return (
    <>
      <div className="tjs-approvals-year-tabs-row">
        <div className="tjs-approvals-year-tabs">
          {items.map((tab, i) => (
            <button
              key={tab.label + i}
              type="button"
              className={"tjs-approvals-year" + (tab === current ? " active" : "")}
              onClick={() => setActive(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <PdfViewer url={docUrl(current)} title={`${title} ${current.label}`} />
    </>
  );
}

function SectionBody({ section, title }) {
  switch (section.acf_fc_layout) {
    case "pdf":
      return <PdfViewer url={docUrl(section)} title={title} />;
    case "pdf_tabs":
      return <PdfTabs tabs={section.tabs} title={title} />;
    case "metric_table":
      return <MetricTable rows={section.rows} />;
    case "criterion":
      return <CriterionTables indicators={section.indicators} />;
    case "text":
      return <div className="tjs-committee-body" dangerouslySetInnerHTML={{ __html: section.content || "" }} />;
    case "dated_list":
      return (
        <div className="tjs-committee-body">
          {list(section.groups).map((group, i) => (
            <div key={i} style={{ marginBottom: 24 }}>
              <h4>{group.heading}</h4>
              <ul>
                {list(group.items).map((item, j) => (
                  <li key={j}>
                    {item.title}
                    {item.date && <> &ndash; {formatDate(item.date)}</>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    case "link_groups":
      return (
        <div className="tjs-committee-body">
          {list(section.groups).map((group, i) => (
            <div key={i}>
              <h4 style={i > 0 ? { marginTop: 24 } : undefined}>{group.heading}</h4>
              <div className="tjs-dept-link-list">
                {list(group.links).map((link, j) => {
                  const url = docUrl(link);
                  const isPdf = link.document?.url || /\.pdf($|\?)/i.test(url || "");
                  return (
                    <a href={url || "#"} target="_blank" rel="noopener" key={j}>
                      <span>{link.label}</span>
                      <span className="tjs-dept-link-arrow">
                        <i className={isPdf ? "ri-file-pdf-2-line" : "ri-external-link-line"}></i>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default function NaacView({ pageTitle, sections }) {
  const [active, setActive] = useState(0);
  const section = sections[active];
  const title = section ? section.title || section.menu_label : "";

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>IQAC</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>NAAC</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          {pageTitle && (
            <h2 className="tjs-subpage-title">
              <span className="tjs-subpage-title-bar"></span>
              {pageTitle}
            </h2>
          )}

          {section ? (
            <div className="tjs-approvals-layout">
              <aside className="tjs-approvals-sidebar">
                {sections.map((s, i) => (
                  <button
                    key={s.menu_label + i}
                    type="button"
                    className={"tjs-approvals-cat" + (i === active ? " active" : "")}
                    onClick={() => setActive(i)}
                  >
                    {s.menu_label}
                  </button>
                ))}
              </aside>

              <div className="tjs-approvals-panel">
                <h3>{title}</h3>
                {/* key resets per-section state (e.g. the selected Cycle tab) when switching sections */}
                <SectionBody key={active} section={section} title={title} />
              </div>
            </div>
          ) : (
            <p className="tjs-dept-pending">Content coming soon.</p>
          )}
        </section>
      </div>
    </>
  );
}
