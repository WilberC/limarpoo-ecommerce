"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CartItemRow } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { useCart } from "@/providers/cart-provider";

export default function CartPage() {
  const { items, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center">
        <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Tu carrito está vacío</h1>
        <p className="mt-2 text-muted-foreground">
          Explora nuestros productos y encuentra algo que te guste.
        </p>
        <Button asChild className="mt-6">
          <Link href="/products">Explorar productos</Link>
        </Button>
      </div>
    );
  }

  const handleClear = () => {
    clearCart();
    toast.success("Carrito vaciado");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="hidden sm:inline-flex">
            <Link href="/products"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Carrito</h1>
            <p className="text-sm text-muted-foreground">{items.length} producto{items.length !== 1 && "s"}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleClear}>
          Vaciar carrito
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {items.map((item) => (
            <CartItemRow key={item.product.id} item={item} />
          ))}
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
