import ProgrammesView from "./ProgrammesView";
import { getProgrammes } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Academics → Programmes Offered
export default async function ProgrammesOffered() {
  const { pageTitle, intro, categories } = await getProgrammes();
  return <ProgrammesView pageTitle={pageTitle} intro={intro} categories={categories} />;
}
