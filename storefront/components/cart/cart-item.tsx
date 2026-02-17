"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice, getInitials } from "@/lib/utils";
import { useCart } from "@/providers/cart-provider";
import type { CartItem as CartItemType } from "@/types";

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

export function CartItemRow({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();
  const price = parseFloat(String(item.product.price));

  return (
    <div className="rounded-lg border p-4 transition-shadow hover:shadow-sm">
      {/* Mobile: stacked layout / Desktop: horizontal */}
      <div className="flex gap-4">
        <Link
          href={`/products/${item.product.id}`}
          className={`flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-md text-sm font-bold ${getColor(item.product.id)}`}
        >
          {getInitials(item.product.name)}
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Link href={`/products/${item.product.id}`} className="font-medium hover:text-primary transition-colors line-clamp-2 sm:truncate">
                {item.product.name}
              </Link>
              <p className="text-sm text-muted-foreground mt-0.5">
                {formatPrice(item.product.price)} c/u
              </p>
            </div>
            {/* Desktop: show subtotal inline */}
            <div className="hidden sm:block text-right shrink-0">
              <p className="font-bold">{formatPrice(price * item.quantity)}</p>
            </div>
          </div>

          {/* Controls row */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                aria-label="Disminuir cantidad"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-10 text-center font-medium" aria-live="polite">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                aria-label="Aumentar cantidad"
              >
                <Plus className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-destructive hover:text-destructive ml-1"
                onClick={() => removeItem(item.product.id)}
                aria-label="Eliminar producto"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            {/* Mobile: show subtotal below controls */}
            <p className="font-bold sm:hidden">{formatPrice(price * item.quantity)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
