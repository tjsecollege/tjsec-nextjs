import StudentsClubView from "./StudentsClubView";
import { getStudentsClub } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Students Club
export default async function StudentsClub() {
  const { page_title, clubs } = await getStudentsClub();
  return <StudentsClubView pageTitle={page_title} clubs={clubs} />;
}
