import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { getProduct, getProductReviews } from "@/lib/api";
import { formatPrice, getInitials } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AddToCart } from "@/components/product/add-to-cart";
import { Rating } from "@/components/product/rating";

const colors = [
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-purple-100 text-purple-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
  "bg-teal-100 text-teal-700",
];

function getColor(id: string) {
  let hash = 0;
  for (const ch of id) hash = (hash + ch.charCodeAt(0)) % colors.length;
  return colors[hash];
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product;
  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  const reviews = await getProductReviews(id).catch(() => []);
  const avgRating =
    reviews.length > 0
      ? Math.round(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length)
      : 0;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/products" className="hover:text-foreground transition-colors">Productos</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground font-medium truncate max-w-48">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Product image placeholder - smaller on mobile */}
        <div
          className={`flex aspect-square max-h-[500px] items-center justify-center rounded-xl text-6xl sm:text-8xl font-bold ${getColor(product.id)}`}
          role="img"
          aria-label={`Imagen de ${product.name}`}
        >
          {getInitials(product.name)}
        </div>

        {/* Product info - sticky on desktop */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <div>
            {product.category && (
              <Link
                href={`/categories/${product.category_id}`}
                className="text-sm text-primary hover:underline"
              >
                {product.category.name}
              </Link>
            )}
            <h1 className="mt-1 text-2xl sm:text-3xl font-bold">{product.name}</h1>
          </div>

          <div className="flex items-center gap-3">
            {reviews.length > 0 ? (
              <>
                <Rating value={avgRating} />
                <span className="text-sm text-muted-foreground">
                  ({reviews.length} reseña{reviews.length !== 1 && "s"})
                </span>
              </>
            ) : (
              <span className="text-sm text-muted-foreground">Sin reseñas aún</span>
            )}
          </div>

          <p className="text-3xl font-bold text-primary">
            {formatPrice(product.price)}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {product.stock_quantity > 0 ? (
              <Badge variant="secondary" className="gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
                {product.stock_quantity} en stock
              </Badge>
            ) : (
              <Badge variant="destructive" className="gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
                Agotado
              </Badge>
            )}
            <Badge variant="outline">SKU: {product.sku}</Badge>
          </div>

          <Separator />

          <div className="prose prose-sm text-muted-foreground">
            <p>{product.description}</p>
          </div>

          <Separator />

          <AddToCart product={product} />
        </div>
      </div>

      {/* Reviews section */}
      <section className="mt-16">
        <Separator className="mb-8" />
        <h2 className="mb-6 text-2xl font-bold">
          Reseñas ({reviews.length})
        </h2>
        {reviews.length === 0 ? (
          <div className="flex flex-col items-center rounded-lg border border-dashed py-12 text-center">
            <p className="font-medium">Aún no hay reseñas</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Sé el primero en dejar tu opinión sobre este producto.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <Rating value={review.rating} />
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.created_at).toLocaleDateString("es-PE", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {review.comment && (
                  <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
