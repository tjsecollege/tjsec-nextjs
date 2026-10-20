import { notFound } from "next/navigation";
import DepartmentPage from "../DepartmentPage";
import { getDepartment } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Departments → Information Technology
export default async function ITDepartment() {
  const dept = await getDepartment("it");
  if (!dept) notFound();
  return <DepartmentPage dept={dept} />;
}
