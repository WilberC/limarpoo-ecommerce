import Link from "next/link";
import { ArrowRight, ShoppingBag, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductGrid } from "@/components/product/product-grid";
import { getProducts, getCategories } from "@/lib/api";

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts().catch(() => []),
    getCategories().catch(() => []),
  ]);

  const featured = products.slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-muted/60 to-background py-20 sm:py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Bienvenido a <span className="text-primary">Limarpoo</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Encuentra los mejores productos al mejor precio. Compra fácil, rápido y seguro.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/products">
                Ver productos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/register">
                Crear cuenta
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b">
        <div className="container mx-auto grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0 px-4">
          {[
            { icon: Truck, title: "Envío a todo el Perú", desc: "Recibe tu pedido en la puerta de tu casa" },
            { icon: Shield, title: "Compra segura", desc: "Tus datos siempre protegidos" },
            { icon: ShoppingBag, title: "Calidad garantizada", desc: "Productos seleccionados con cuidado" },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4 py-6 px-4 sm:justify-center">
              <item.icon className="h-8 w-8 shrink-0 text-primary" />
              <div>
                <p className="font-medium text-sm">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="mb-6 text-2xl font-bold">Explora por categorías</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/categories/${cat.id}`}>
                <Card className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                  <CardContent className="flex items-center justify-center p-6">
                    <span className="font-medium">{cat.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Productos destacados</h2>
            <Button variant="ghost" asChild>
              <Link href="/products">
                Ver todos <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ProductGrid products={featured} />
        </section>
      )}
    </div>
  );
}
