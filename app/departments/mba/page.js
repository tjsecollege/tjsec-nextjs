import { notFound } from "next/navigation";
import DepartmentPage from "../DepartmentPage";
import { getDepartment } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Departments → Master of Business Administration
export default async function MBADepartment() {
  const dept = await getDepartment("mba");
  if (!dept) notFound();
  return <DepartmentPage dept={dept} />;
}
