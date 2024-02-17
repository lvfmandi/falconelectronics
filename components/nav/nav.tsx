import { getCategories } from "@/lib/queries/categories";
import { NavComponent } from "./nav-component";

export async function DesktopNav() {
  // getting categories
  const categories = await getCategories();
  return <NavComponent categories={categories} />;
}
