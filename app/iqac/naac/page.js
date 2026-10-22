import NaacView from "./NaacView";
import { getNaac } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → IQAC → NAAC
export default async function NAACPage() {
  const { page_title, sections } = await getNaac();
  return <NaacView pageTitle={page_title} sections={sections} />;
}
