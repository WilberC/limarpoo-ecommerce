"use client";

import { useEffect, useState } from "react";
import { MapPin, Plus, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/providers/auth-provider";
import { getAddresses, createAddress, updateAddress, deleteAddress } from "@/lib/api";
import type { Address } from "@/types";

export default function AddressesPage() {
  const { user, token } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const [form, setForm] = useState({
    street: "",
    city: "",
    country: "Perú",
    zip_code: "",
  });

  const loadAddresses = () => {
    if (!token) return;
    getAddresses(token)
      .then(setAddresses)
      .catch(() => toast.error("Error al cargar direcciones"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAddresses();
  }, [token]);

  const handleCreate = async () => {
    if (!user || !token) return;
    if (!form.street || !form.city || !form.zip_code) {
      toast.error("Completa todos los campos");
      return;
    }
    try {
      await createAddress(
        { ...form, user_id: user.id, is_default: addresses.length === 0 },
        token
      );
      setForm({ street: "", city: "", country: "Perú", zip_code: "" });
      setDialogOpen(false);
      toast.success("Dirección creada correctamente");
      loadAddresses();
    } catch {
      toast.error("Error al crear la dirección");
    }
  };

  const handleSetDefault = async (id: string) => {
    if (!token) return;
    try {
      await updateAddress(id, { is_default: true }, token);
      toast.success("Dirección predeterminada actualizada");
      loadAddresses();
    } catch {
      toast.error("Error al actualizar la dirección");
    }
  };

  const confirmDelete = (id: string) => {
    setAddressToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!token || !addressToDelete) return;
    try {
      await deleteAddress(addressToDelete, token);
      toast.success("Dirección eliminada");
      setDeleteDialogOpen(false);
      setAddressToDelete(null);
      loadAddresses();
    } catch {
      toast.error("Error al eliminar la dirección");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Direcciones</h1>
        {Array.from({ length: 2 }, (_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Direcciones</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Agregar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nueva dirección</DialogTitle>
              <DialogDescription>
                Agrega una dirección de envío para tus pedidos.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="street">Calle</Label>
                <Input
                  id="street"
                  value={form.street}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, street: e.target.value }))
                  }
                  placeholder="Av. Principal 123"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    value={form.city}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, city: e.target.value }))
                    }
                    placeholder="Lima"
                  />
                </div>
                <div>
                  <Label htmlFor="zip">Código postal</Label>
                  <Input
                    id="zip"
                    value={form.zip_code}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, zip_code: e.target.value }))
                    }
                    placeholder="15001"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="country">País</Label>
                <Input
                  id="country"
                  value={form.country}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, country: e.target.value }))
                  }
                />
              </div>
              <Button onClick={handleCreate}>Guardar dirección</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar dirección</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar esta dirección? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {addresses.length === 0 ? (
        <div className="flex flex-col items-center rounded-lg border border-dashed py-16 text-center">
          <MapPin className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="font-medium">No tienes direcciones guardadas</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tu primera dirección será la predeterminada para envíos.
          </p>
          <Button size="sm" className="mt-4" onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Agregar dirección
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {addresses.map((addr) => (
            <Card key={addr.id} className="transition-shadow hover:shadow-sm">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{addr.street}</p>
                      {addr.is_default && (
                        <Badge variant="secondary" className="text-xs">Predeterminada</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {addr.city}, {addr.country} {addr.zip_code}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  {!addr.is_default && (
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Establecer como predeterminada"
                      aria-label="Establecer como predeterminada"
                      onClick={() => handleSetDefault(addr.id)}
                    >
                      <Star className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    title="Eliminar dirección"
                    aria-label="Eliminar dirección"
                    onClick={() => confirmDelete(addr.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
