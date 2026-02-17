"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/providers/auth-provider";
import { getCustomerProfile, updateCustomerProfile } from "@/lib/api";
import type { CustomerProfile } from "@/types";

export default function ProfilePage() {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });

  useEffect(() => {
    if (user && token) {
      getCustomerProfile(user.id, token)
        .then((p) => {
          setProfile(p);
          setForm({
            first_name: p.first_name || "",
            last_name: p.last_name || "",
            phone: p.phone || "",
          });
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user, token]);

  const handleSave = async () => {
    if (!profile || !token) return;
    setSaving(true);
    try {
      const updated = await updateCustomerProfile(profile.id, form, token);
      setProfile(updated);
      toast.success("Perfil actualizado correctamente");
    } catch {
      toast.error("Error al actualizar el perfil");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Perfil</h1>
        <Skeleton className="h-24 rounded-lg" />
        <Skeleton className="h-64 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Perfil</h1>

      <Card>
        <CardHeader>
          <CardTitle>Información de cuenta</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{user?.email}</p>
            <p className="text-sm text-muted-foreground">Cliente</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Información personal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!profile && (
            <div className="rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
              Completa tu perfil para una mejor experiencia de compra.
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first_name">Nombre</Label>
              <Input
                id="first_name"
                value={form.first_name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, first_name: e.target.value }))
                }
                placeholder="Juan"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Apellido</Label>
              <Input
                id="last_name"
                value={form.last_name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, last_name: e.target.value }))
                }
                placeholder="Pérez"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                placeholder="+51 999 999 999"
              />
            </div>
          </div>
          {profile && (
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Guardando..." : "Guardar cambios"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
