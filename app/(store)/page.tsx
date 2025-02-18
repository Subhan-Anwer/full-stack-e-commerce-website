import BlackFridayBanner from "@/components/BlackFridayBanner";
import ProductsView from "@/components/ProductView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopit",
  description: "Developed by Subhan Anwer",
};

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

  // console.log(
  //   crypto.randomUUID().slice(0, 5) +
  //   `Rendered the home page cache with ${products.length} products & ${categories.length} categories`
  // )

  return (
    <div>
      <BlackFridayBanner />

      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>

    </div>
  );
}
