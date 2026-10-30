import SportsView from "./SportsView";
import { getSports } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Sports & Fitness
export default async function SportsFitness() {
  const sports = await getSports();
  return <SportsView sports={sports} />;
}
