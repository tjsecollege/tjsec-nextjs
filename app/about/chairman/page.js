import { getAboutPage } from "@/lib/wordpress";
import AboutTrusteeView from "../AboutTrusteeView";

// Content is managed in WordPress: admin.tjsec.ac.in → About → Chairman
export default async function Chairman() {
  const trustee = await getAboutPage("chairman");
  return <AboutTrusteeView crumbLabel="Chairman" pageTitle="Chairman" messageTitle="Chairman's Message" trustee={trustee} />;
}
