import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold">Limarpoo</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Tu tienda online de confianza. Productos de calidad con envío a todo el Perú.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Tienda</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-foreground transition-colors">Todos los productos</Link></li>
              <li><Link href="/cart" className="hover:text-foreground transition-colors">Mi carrito</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Mi cuenta</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/login" className="hover:text-foreground transition-colors">Ingresar</Link></li>
              <li><Link href="/register" className="hover:text-foreground transition-colors">Registrarse</Link></li>
              <li><Link href="/account" className="hover:text-foreground transition-colors">Mis pedidos</Link></li>
              <li><Link href="/account/profile" className="hover:text-foreground transition-colors">Mi perfil</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Contacto</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>soporte@limarpoo.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+51 999 999 999</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>Lima, Perú</span>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Limarpoo. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <span>Envío seguro</span>
            <span>Garantía de calidad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
