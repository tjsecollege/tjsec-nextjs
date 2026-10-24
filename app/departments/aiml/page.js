import { notFound } from "next/navigation";
import DepartmentPage from "../DepartmentPage";
import { getDepartment } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Departments → Computer Science and Engineering (AI & ML)
export default async function AIMLDepartment() {
  const dept = await getDepartment("aiml");
  if (!dept) notFound();
  return <DepartmentPage dept={dept} />;
}
