import { notFound } from "next/navigation";
import ShDepartmentView from "../ShDepartmentView";
import { getShDepartment } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Science & Humanities
export default async function PhysicsDepartment() {
  const dept = await getShDepartment("physics");
  if (!dept) notFound();
  return <ShDepartmentView dept={dept} />;
}
