import CoeView from "./CoeView";
import { getCoe } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Academics → Controller of Examinations
export default async function ControllerOfExaminations() {
  return <CoeView coe={await getCoe()} />;
}
