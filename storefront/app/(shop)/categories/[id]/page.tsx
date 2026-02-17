import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getCategory, getProducts } from "@/lib/api";
import { ProductGrid } from "@/components/product/product-grid";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let category;
  try {
    category = await getCategory(id);
  } catch {
    notFound();
  }

  const allProducts = await getProducts().catch(() => []);
  const products = allProducts.filter((p) => p.category_id === id);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/products" className="hover:text-foreground transition-colors">Productos</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium">{category.name}</span>
      </nav>

      <h1 className="mb-6 text-3xl font-bold">{category.name}</h1>
      <p className="mb-8 text-muted-foreground">
        {products.length} producto{products.length !== 1 && "s"} encontrado{products.length !== 1 && "s"}
      </p>
      <ProductGrid products={products} />
    </div>
  );
}
