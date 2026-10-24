import { notFound } from "next/navigation";
import DepartmentPage from "../DepartmentPage";
import { getDepartment } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Departments → M.E. Computer Science and Engineering
export default async function MECSEDepartment() {
  const dept = await getDepartment("me-cse");
  if (!dept) notFound();
  return <DepartmentPage dept={dept} />;
}
