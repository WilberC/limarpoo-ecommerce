"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/cart-provider";
import type { Product } from "@/types";

export function AddToCart({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const disabled = product.stock_quantity <= 0;

  const handleAdd = () => {
    addItem(product, quantity);
    setAdded(true);
    toast.success(`${product.name} agregado al carrito`, {
      description: `Cantidad: ${quantity}`,
      action: { label: "Ver carrito", onClick: () => window.location.href = "/cart" },
    });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex items-center gap-2 rounded-lg border self-start">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={disabled}
          aria-label="Disminuir cantidad"
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center font-medium" aria-live="polite">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          onClick={() => setQuantity((q) => Math.min(product.stock_quantity, q + 1))}
          disabled={disabled}
          aria-label="Aumentar cantidad"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button
        onClick={handleAdd}
        disabled={disabled}
        size="lg"
        className="flex-1 transition-all"
      >
        {added ? (
          <>
            <Check className="mr-2 h-4 w-4" /> Agregado
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {disabled ? "Agotado" : "Agregar al carrito"}
          </>
        )}
      </Button>
    </div>
  );
}
