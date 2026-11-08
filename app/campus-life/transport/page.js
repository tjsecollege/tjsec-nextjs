import Link from "next/link";
import { getTransport } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Campus Life → Transport
export default async function Transport() {
  const t = await getTransport();

  return (
    <>
      <section className="tjs-subpage-banner" style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}>
        <h1>Campus Life</h1>
        <nav className="tjs-subpage-crumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Transport</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            {t.pageTitle || "Transport Details"}
          </h2>

          {t.intro && <p>{t.intro}</p>}

          {t.routes.length > 0 ? (
            <div className="tjs-dept-table-wrap">
              <table className="tjs-dept-table">
                <thead>
                  <tr>
                    <th>Route No.</th>
                    <th>Vehicle No.</th>
                    <th>Route Name</th>
                    <th>Driver Name</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {t.routes.map((r, i) => (
                    <tr key={r.routeNo + i}>
                      <td>{r.routeNo}</td>
                      <td>{r.vehicleNo}</td>
                      <td>{r.routeName}</td>
                      <td>{r.driver}</td>
                      <td>{r.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="tjs-dept-pending">Route details will be added soon.</p>
          )}

          {t.coordinators.length > 0 && (
            <>
              <h3>{t.coordinatorsTitle || "Bus Co-Ordinators"}</h3>
              <ul className="tjs-dept-bullets">
                {t.coordinators.map((c, i) => (
                  <li key={c.name + i}>
                    {c.name}
                    {c.phone && <> &ndash; {c.phone}</>}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </div>
    </>
  );
}
