import { getAboutPage } from "@/lib/wordpress";
import AboutTrusteeView from "../AboutTrusteeView";

// Content is managed in WordPress: admin.tjsec.ac.in → About → Secretary
export default async function Secretary() {
  const trustee = await getAboutPage("secretary");
  return <AboutTrusteeView crumbLabel="Secretary" pageTitle="Secretary" messageTitle="Secretary's Message" trustee={trustee} />;
}
