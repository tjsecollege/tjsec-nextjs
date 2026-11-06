import { getAboutPage } from "@/lib/wordpress";
import AboutTrusteeView from "../AboutTrusteeView";

// Content is managed in WordPress: admin.tjsec.ac.in → About → Principal
export default async function Principal() {
  const trustee = await getAboutPage("principal");
  return <AboutTrusteeView crumbLabel="Principal" pageTitle="Principal" messageTitle="Principal's Message" trustee={trustee} />;
}
