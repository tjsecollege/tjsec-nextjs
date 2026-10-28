import PlacementsView from "./PlacementsView";
import { getPlacements } from "@/lib/wordpress";

// "Placed Students" PDFs and "Our Recruiters" logos are managed in WordPress:
// admin.tjsec.ac.in → Placements. The other sections are still static in PlacementsView.js.
export default async function Placements() {
  const { placedStudents, recruiterGroups } = await getPlacements();
  return <PlacementsView placedStudents={placedStudents} recruiterGroups={recruiterGroups} />;
}
