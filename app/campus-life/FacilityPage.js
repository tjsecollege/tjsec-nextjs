import InfoPage from "../components/InfoPage";
import { getFacility } from "@/lib/wordpress";

// The simple Campus Life facility pages (Convention Centre, Software Development
// Cell, Canteen, Student Hostel).
// Content is managed in WordPress: admin.tjsec.ac.in → Campus Life → <page>
export default async function FacilityPage({ slug, fallbackTitle }) {
  return <InfoPage bannerTitle="Campus Life" page={await getFacility(slug)} fallbackTitle={fallbackTitle} />;
}
