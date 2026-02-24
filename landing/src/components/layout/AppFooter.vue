<script setup lang="ts">
const year = new Date().getFullYear()
const storefrontUrl = import.meta.env.VITE_STOREFRONT_URL ?? 'http://localhost:3001'

const links = {
  company: [
    { label: 'Sobre Nosotros', to: '/about' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contacto', to: '/contact' },
    { label: 'Preguntas Frecuentes', to: '/faq' },
  ],
  shop: [
    { label: 'Productos', href: `${storefrontUrl}/products` },
    { label: 'Mi Cuenta', href: `${storefrontUrl}/account` },
    { label: 'Mis Pedidos', href: `${storefrontUrl}/orders` },
  ],
}
</script>

<template>
  <footer class="bg-gray-900 text-gray-400">
    <div class="container-narrow py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center">
              <span class="text-white font-bold text-lg">L</span>
            </div>
            <span class="font-bold text-xl text-white">Limarpoo EIRL</span>
          </div>
          <p class="text-sm leading-relaxed max-w-xs">
            Tu tienda online de confianza para productos de calidad. Entregamos excelencia en cada pedido a lo largo del Perú.
          </p>
          <div class="flex items-center gap-3 mt-6">
            <a href="#" class="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary-600 flex items-center justify-center transition-colors" aria-label="Facebook">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="#" class="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary-600 flex items-center justify-center transition-colors" aria-label="Instagram">
              <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" class="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary-600 flex items-center justify-center transition-colors" aria-label="Twitter">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
          </div>
        </div>

        <!-- Company links -->
        <div>
          <h3 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Empresa</h3>
          <ul class="space-y-3">
            <li v-for="link in links.company" :key="link.label">
              <RouterLink :to="link.to" class="text-sm hover:text-white transition-colors">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </div>

        <!-- Shop links -->
        <div>
          <h3 class="text-white font-semibold text-sm uppercase tracking-wider mb-4">Tienda</h3>
          <ul class="space-y-3">
            <li v-for="link in links.shop" :key="link.label">
              <a :href="link.href" class="text-sm hover:text-white transition-colors">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs">&copy; {{ year }} Limarpoo EIRL. Todos los derechos reservados.</p>
        <div class="flex items-center gap-4 text-xs">
          <a href="#" class="hover:text-white transition-colors">Política de Privacidad</a>
          <a href="#" class="hover:text-white transition-colors">Términos de Servicio</a>
        </div>
      </div>
    </div>
  </footer>
</template>
