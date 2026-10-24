import { notFound } from "next/navigation";
import DepartmentPage from "../DepartmentPage";
import { getDepartment } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Departments → Electronics and Communication Engineering
export default async function ECEDepartment() {
  const dept = await getDepartment("ece");
  if (!dept) notFound();
  return <DepartmentPage dept={dept} />;
}
