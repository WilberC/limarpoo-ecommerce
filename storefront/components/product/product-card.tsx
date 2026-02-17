import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice, getInitials } from "@/lib/utils";
import type { Product } from "@/types";

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

export function ProductCard({ product }: { product: Product }) {
  const outOfStock = product.stock_quantity <= 0;

  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
        <div
          className={`relative flex h-48 items-center justify-center text-3xl font-bold transition-transform duration-200 group-hover:scale-[1.02] ${getColor(product.id)}`}
        >
          {getInitials(product.name)}
          {outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[1px]">
              <Badge variant="destructive" className="text-sm">Agotado</Badge>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="line-clamp-1 font-medium group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground h-10">
            {product.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            {!outOfStock && (
              <Badge variant="secondary" className="text-xs">En stock</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
