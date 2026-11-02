import CategoryDocsView from "../components/CategoryDocsView";
import { getMandatoryDisclosure } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Mandatory Disclosure
export default async function MandatoryDisclosure() {
  const { pageTitle, categories } = await getMandatoryDisclosure();
  return (
    <CategoryDocsView
      bannerTitle="Mandatory Disclosure"
      crumb="Mandatory Disclosure"
      pageTitle={pageTitle || "Public Self Disclosure / Mandatory Disclosure"}
      categories={categories}
    />
  );
}
