"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/providers/auth-provider";
import { getUserOrders } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types";

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  PAID: "Pagado",
  SHIPPED: "Enviado",
  DELIVERED: "Entregado",
  CANCELLED: "Cancelado",
};

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PENDING: "outline",
  PAID: "secondary",
  SHIPPED: "default",
  DELIVERED: "default",
  CANCELLED: "destructive",
};

export default function OrdersPage() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && token) {
      getUserOrders(user.id, token)
        .then(setOrders)
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user, token]);

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Mis pedidos</h1>
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Mis pedidos</h1>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <Package className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="font-medium">No tienes pedidos aún</p>
          <p className="text-sm text-muted-foreground">
            Tus pedidos aparecerán aquí
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted"
            >
              <div>
                <p className="font-medium">
                  Pedido #{order.id.slice(0, 8)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString("es-PE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={statusVariant[order.status] || "secondary"}>
                  {statusLabels[order.status] || order.status}
                </Badge>
                <span className="text-lg font-bold">
                  {formatPrice(order.total_amount)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
