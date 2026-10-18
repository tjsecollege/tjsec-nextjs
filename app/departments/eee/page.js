import { notFound } from "next/navigation";
import DepartmentPage from "../DepartmentPage";
import { getDepartment } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Departments → Electrical and Electronics Engineering
export default async function EEEDepartment() {
  const dept = await getDepartment("eee");
  if (!dept) notFound();
  return <DepartmentPage dept={dept} />;
}
