import AboutIqacView from "./AboutIqacView";
import { getAboutIqac } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → IQAC → About IQAC
export default async function AboutIQAC() {
  const { pageTitle, sections } = await getAboutIqac();
  return <AboutIqacView pageTitle={pageTitle} sections={sections} />;
}
