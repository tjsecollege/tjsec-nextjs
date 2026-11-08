import LibraryView from "./LibraryView";
import { getLibrary } from "@/lib/wordpress";

// Content is managed in WordPress: admin.tjsec.ac.in → Campus Life → Library
export default async function Library() {
  return <LibraryView lib={await getLibrary()} />;
}
