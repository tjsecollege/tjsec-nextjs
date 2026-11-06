import { getAboutPage } from "@/lib/wordpress";
import AboutTrusteeView from "../AboutTrusteeView";

// Content is managed in WordPress: admin.tjsec.ac.in → About → The Director
export default async function TheDirector() {
  const trustee = await getAboutPage("the-director");
  return <AboutTrusteeView crumbLabel="The Director" pageTitle="The Director" messageTitle="Director's Message" trustee={trustee} />;
}
