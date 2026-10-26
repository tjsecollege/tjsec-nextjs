import ApprovalsView from "./ApprovalsView";
import { getApprovals } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Approvals
export default async function ApprovalAffiliation() {
  const { page_title, categories } = await getApprovals();
  return <ApprovalsView pageTitle={page_title} categories={categories} />;
}
