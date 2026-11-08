import InfoPage from "../../components/InfoPage";
import { getIndustryAbout } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Industry Interface → About
export default async function IndustryInterfaceAbout() {
  return <InfoPage bannerTitle="Industry Interface" page={await getIndustryAbout()} fallbackTitle="About Industry Interface" />;
}
