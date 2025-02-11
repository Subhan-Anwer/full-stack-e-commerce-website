import ProductsView from "@/components/ProductView";
import { Button } from "@/components/ui/button";
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
      <h1>Hello world!!!</h1>

      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>

      {/* <Button className="active:scale-90 transition-transform duration-200">Click me</Button> */}
    </div>
  );
}
