import AlumniView from "./AlumniView";
import { getAlumni } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Alumni
export default async function AlumniPage() {
  const alumni = await getAlumni();
  return <AlumniView alumni={alumni} />;
}
