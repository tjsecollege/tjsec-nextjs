"use client";

const ROUTES = [
  { route: "101", vehicle: "TN18 CX7114", name: "Thirumangalam", driver: "Sadhasivam", phone: "8056179018" },
  { route: "102", vehicle: "TN18 CX6480", name: "Thiruvotriyur", driver: "Guru", phone: "9940468264" },
  { route: "103", vehicle: "TN18 CX7191", name: "Avadi", driver: "Jayavel", phone: "9843315385" },
  { route: "104", vehicle: "TN18 AU9668", name: "Manali New Town", driver: "Balasubaramani", phone: "9789868135" },
  { route: "105", vehicle: "TN 18 AU9499", name: "Ennore", driver: "Anbu Rajendran", phone: "9380599382" },
  { route: "106", vehicle: "TN18 C5353", name: "Manali", driver: "John David", phone: "8778182756" },
  { route: "107", vehicle: "TN18 AS3431", name: "Thathaimanji", driver: "Rathi", phone: "9962367979" },
  { route: "108", vehicle: "TN18 M4131", name: "Pulicat", driver: "D.Kulasekaran", phone: "9047332722" },
  { route: "109", vehicle: "TN18 A3335", name: "Anupampattu", driver: "N.Varadhan", phone: "8754932758" },
  { route: "110", vehicle: "TN19 5538", name: "Uthukottai", driver: "Pattabi", phone: "9786129640" },
  { route: "111", vehicle: "TN21 AU9578", name: "Thiruvallur", driver: "Raghavaraj", phone: "9360679025" },
  { route: "112", vehicle: "TN18 AU8718", name: "Arambakkam", driver: "B.Kabir", phone: "8825712670" },
  { route: "113", vehicle: "TN18 CY5622", name: "Retambedu", driver: "K.suganraj", phone: "8015224070" },
  { route: "114", vehicle: "TN19 5934", name: "Madharpakkam", driver: "Saravanan", phone: "7871726810" },
  { route: "115", vehicle: "TN18 AD3431", name: "Sathyavedu", driver: "P.Nataraj", phone: "9688722522" },
  { route: "116", vehicle: "TN18 AD9085", name: "Redhills", driver: "Khalidas", phone: "8122770922" },
  { route: "117", vehicle: "TN18 M4026", name: "Arambakkam", driver: "Raffiq", phone: "7695869629" },
  { route: "118", vehicle: "TN18 M0428", name: "Periyapalayam", driver: "Surendhar", phone: "9150503012" },
  { route: "119", vehicle: "TN18 A3331", name: "Vallur camp", driver: "Sethuraman", phone: "9962456969" },
];

const COORDINATORS = [
  { name: "Prabhu (Librarian)", phone: "9894151106" },
  { name: "Prakash (Asst.Prof-Mechanical)", phone: "9047347346" },
];

export default function Transport() {
  return (
    <>
      <section
        className="tjs-subpage-banner"
        style={{ backgroundImage: "url(/assets/images/about_bg.jpg)" }}
      >
        <h1>Campus Life</h1>
        <nav className="tjs-subpage-crumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>Transport</span>
        </nav>
      </section>

      <div className="tjs-dept-page">
        <section className="tjs-dept-section">
          <h2 className="tjs-subpage-title">
            <span className="tjs-subpage-title-bar"></span>
            Transport Details
          </h2>

          <p>
            T.J.S. Engineering College operates a fleet of buses covering major routes around the
            campus for the convenience of students and staff. Route-wise vehicle and driver details
            are listed below.
          </p>

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
                {ROUTES.map((r) => (
                  <tr key={r.route}>
                    <td>{r.route}</td>
                    <td>{r.vehicle}</td>
                    <td>{r.name}</td>
                    <td>{r.driver}</td>
                    <td>{r.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3>Bus Co-Ordinators</h3>
          <ul className="tjs-dept-bullets">
            {COORDINATORS.map((c) => (
              <li key={c.name}>
                {c.name} &ndash; {c.phone}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
