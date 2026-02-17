"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingBag, Lock, Truck, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/providers/cart-provider";
import { useAuth } from "@/providers/auth-provider";
import { getAddresses, createAddress, createOrder } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import type { Address } from "@/types";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, token, isAuthenticated } = useAuth();
  const router = useRouter();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    country: "Perú",
    zip_code: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated && token) {
      getAddresses(token)
        .then((addrs) => {
          setAddresses(addrs);
          const def = addrs.find((a) => a.is_default);
          if (def) setSelectedAddress(def.id);
          else if (addrs.length > 0) setSelectedAddress(addrs[0].id);
          else setShowNewAddress(true);
        })
        .catch(() => {});
    }
  }, [isAuthenticated, token]);

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center">
        <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground" />
        <h1 className="text-2xl font-bold">No hay productos en el carrito</h1>
        <p className="mt-2 text-muted-foreground">Agrega productos antes de proceder al pago.</p>
        <Button asChild className="mt-6">
          <Link href="/products">Ver productos</Link>
        </Button>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-20 text-center">
        <Lock className="mb-4 h-16 w-16 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Inicia sesión para continuar</h1>
        <p className="mt-2 text-muted-foreground">
          Necesitas una cuenta para realizar tu compra. Tu carrito se mantendrá guardado.
        </p>
        <div className="mt-6 flex gap-3">
          <Button asChild>
            <Link href="/login?redirect=/checkout">Ingresar</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/register">Registrarse</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!user || !token) return;
    setLoading(true);
    setError("");

    try {
      let addressId = selectedAddress;

      if (showNewAddress) {
        if (!newAddress.street || !newAddress.city || !newAddress.zip_code) {
          setError("Completa todos los campos de la dirección");
          setLoading(false);
          return;
        }
        const addr = await createAddress(
          { ...newAddress, user_id: user.id, is_default: addresses.length === 0 },
          token
        );
        addressId = addr.id;
      }

      if (!addressId) {
        setError("Selecciona o crea una dirección de envío");
        setLoading(false);
        return;
      }

      const order = await createOrder(
        {
          user_id: user.id,
          shipping_address_id: addressId,
          items: items.map((i) => ({
            product_id: i.product.id,
            quantity: i.quantity,
            price_at_purchase: parseFloat(String(i.product.price)),
          })),
          total_amount: totalPrice,
        },
        token
      );

      clearCart();
      toast.success("Pedido realizado con éxito", {
        description: `Pedido #${order.id.slice(0, 8)} creado correctamente`,
      });
      router.push(`/account/orders/${order.id}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error al crear el pedido";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Checkout steps indicator */}
      <div className="mb-8 flex items-center justify-center gap-4 text-sm">
        <Link href="/cart" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
          <ShoppingBag className="h-4 w-4" /> Carrito
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="flex items-center gap-1 font-medium">
          <Truck className="h-4 w-4" /> Envío
        </span>
        <span className="text-muted-foreground">/</span>
        <span className="flex items-center gap-1 text-muted-foreground">
          <CreditCard className="h-4 w-4" /> Confirmación
        </span>
      </div>

      <h1 className="mb-6 text-3xl font-bold">Checkout</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
        {/* Address */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" /> Dirección de envío
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {addresses.length > 0 && !showNewAddress && (
                <>
                  <div className="space-y-2">
                    {addresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                          selectedAddress === addr.id
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-transparent bg-muted/30 hover:bg-muted/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          value={addr.id}
                          checked={selectedAddress === addr.id}
                          onChange={() => setSelectedAddress(addr.id)}
                          className="accent-primary"
                        />
                        <div>
                          <p className="font-medium">{addr.street}</p>
                          <p className="text-sm text-muted-foreground">
                            {addr.city}, {addr.country} {addr.zip_code}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowNewAddress(true)}
                  >
                    Agregar nueva dirección
                  </Button>
                </>
              )}
              {(showNewAddress || addresses.length === 0) && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2 space-y-2">
                    <Label htmlFor="street">Calle</Label>
                    <Input
                      id="street"
                      value={newAddress.street}
                      onChange={(e) =>
                        setNewAddress((p) => ({ ...p, street: e.target.value }))
                      }
                      placeholder="Av. Principal 123"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input
                      id="city"
                      value={newAddress.city}
                      onChange={(e) =>
                        setNewAddress((p) => ({ ...p, city: e.target.value }))
                      }
                      placeholder="Lima"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">Código postal</Label>
                    <Input
                      id="zip"
                      value={newAddress.zip_code}
                      onChange={(e) =>
                        setNewAddress((p) => ({ ...p, zip_code: e.target.value }))
                      }
                      placeholder="15001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">País</Label>
                    <Input
                      id="country"
                      value={newAddress.country}
                      onChange={(e) =>
                        setNewAddress((p) => ({ ...p, country: e.target.value }))
                      }
                    />
                  </div>
                  {addresses.length > 0 && (
                    <div className="flex items-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowNewAddress(false)}
                      >
                        Usar dirección existente
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary - sticky on desktop */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardHeader>
              <CardTitle>Resumen del pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="flex-1 truncate mr-2">
                    {item.product.name} <span className="text-muted-foreground">x{item.quantity}</span>
                  </span>
                  <span className="font-medium shrink-0">
                    {formatPrice(
                      parseFloat(String(item.product.price)) * item.quantity
                    )}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              {error && (
                <p className="text-sm text-destructive" role="alert">{error}</p>
              )}
              <Button
                className="w-full"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? "Procesando..." : `Pagar ${formatPrice(totalPrice)}`}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                <Lock className="mr-1 inline h-3 w-3" />
                Pago seguro
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
