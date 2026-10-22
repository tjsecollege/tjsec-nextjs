import { notFound } from "next/navigation";
import DepartmentPage from "../DepartmentPage";
import { getDepartment } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Departments → Computer Science and Engineering
export default async function CSEDepartment() {
  const dept = await getDepartment("cse");
  if (!dept) notFound();
  return <DepartmentPage dept={dept} />;
}
