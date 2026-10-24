import { notFound } from "next/navigation";
import DepartmentPage from "../DepartmentPage";
import { getDepartment } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Departments → Artificial Intelligence and Data Science
export default async function AIDSDepartment() {
  const dept = await getDepartment("aids");
  if (!dept) notFound();
  return <DepartmentPage dept={dept} />;
}
