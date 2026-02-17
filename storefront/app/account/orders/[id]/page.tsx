"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { getOrder } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types";

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  PAID: "Pagado",
  SHIPPED: "Enviado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && id) {
      getOrder(id, token)
        .then(setOrder)
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [token, id]);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 rounded-lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-16">
        <p className="font-medium">Pedido no encontrado</p>
        <Button asChild variant="ghost" className="mt-4">
          <Link href="/account/orders">Volver a mis pedidos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/account/orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            Pedido #{order.id.slice(0, 8)}
          </h1>
          <p className="text-sm text-muted-foreground">
            {new Date(order.created_at).toLocaleDateString("es-PE", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <Badge className="ml-auto">
          {statusLabels[order.status] || order.status}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Productos</CardTitle>
        </CardHeader>
        <CardContent>
          {order.items && order.items.length > 0 ? (
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">
                      {item.product?.name || `Producto ${item.product_id.slice(0, 8)}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Cantidad: {item.quantity} &times;{" "}
                      {formatPrice(item.price_at_purchase)}
                    </p>
                  </div>
                  <span className="font-medium">
                    {formatPrice(
                      parseFloat(String(item.price_at_purchase)) * item.quantity
                    )}
                  </span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatPrice(order.total_amount)}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No se encontraron detalles de productos
            </p>
          )}
        </CardContent>
      </Card>

      {order.shipping_address && (
        <Card>
          <CardHeader>
            <CardTitle>Dirección de envío</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{order.shipping_address.street}</p>
            <p className="text-sm text-muted-foreground">
              {order.shipping_address.city}, {order.shipping_address.country}{" "}
              {order.shipping_address.zip_code}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
