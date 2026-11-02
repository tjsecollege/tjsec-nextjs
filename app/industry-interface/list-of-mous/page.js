import CategoryDocsView from "../../components/CategoryDocsView";
import { getMous } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → List of MoUs
export default async function ListOfMoUs() {
  const { pageTitle, categories } = await getMous();
  return (
    <CategoryDocsView
      bannerTitle="Industry Interface"
      crumb="List of MoUs"
      pageTitle={pageTitle || "List of MoUs"}
      categories={categories}
    />
  );
}
