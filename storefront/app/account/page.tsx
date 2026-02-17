"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, MapPin, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

export default function AccountDashboard() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user && token) {
      getUserOrders(user.id, token)
        .then(setOrders)
        .catch(() => {});
    }
  }, [user, token]);

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mi cuenta</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link href="/account/orders">
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{orders.length}</p>
                <p className="text-sm text-muted-foreground">Pedidos</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/account/addresses">
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <MapPin className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium">Direcciones</p>
                <p className="text-sm text-muted-foreground">Gestionar</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/account/profile">
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex items-center gap-4 p-6">
              <User className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium">Perfil</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Pedidos recientes</CardTitle>
          <Link href="/account/orders" className="text-sm text-primary hover:underline">
            Ver todos
          </Link>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-muted-foreground">Aún no tienes pedidos</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/account/orders/${order.id}`}
                  className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted"
                >
                  <div>
                    <p className="font-medium text-sm">
                      Pedido #{order.id.slice(0, 8)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString("es-PE")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">
                      {statusLabels[order.status] || order.status}
                    </Badge>
                    <span className="font-medium">
                      {formatPrice(order.total_amount)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
