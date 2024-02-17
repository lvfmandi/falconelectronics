// data
import { getCategories } from "@/lib/queries/categories";
import { FilterItems } from "@/lib/queries/global";
import { FooterComponent } from "./footer-component";

export async function Footer() {
  const categories = await getCategories();
  const { brands } = await FilterItems();

  return <FooterComponent categories={categories} brands={brands} />;
}
