import { notFound } from "next/navigation";
import DepartmentPage from "../DepartmentPage";
import { getDepartment } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Departments → Mechanical Engineering
export default async function MechDepartment() {
  const dept = await getDepartment("mech");
  if (!dept) notFound();
  return <DepartmentPage dept={dept} />;
}
