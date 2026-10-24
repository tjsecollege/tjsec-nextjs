import { notFound } from "next/navigation";
import ShDepartmentView from "../ShDepartmentView";
import { getShDepartment } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Science & Humanities
export default async function MathsDepartment() {
  const dept = await getShDepartment("maths");
  if (!dept) notFound();
  return <ShDepartmentView dept={dept} />;
}
