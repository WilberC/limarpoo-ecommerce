<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'

const articlesStore = useArticlesStore()
onMounted(() => articlesStore.loadArticles())

const features = [
  {
    icon: '🛡️',
    title: 'Calidad Garantizada',
    desc: 'Cada producto es cuidadosamente seleccionado y verificado antes de llegar a tus manos.',
  },
  {
    icon: '🚚',
    title: 'Entrega Rápida',
    desc: 'Recibe tus pedidos rápidamente en todo el Perú con seguimiento en tiempo real.',
  },
  {
    icon: '💳',
    title: 'Pagos Seguros',
    desc: 'Paga con confianza usando nuestro proceso de pago cifrado y completamente seguro.',
  },
  {
    icon: '🔄',
    title: 'Devoluciones Fáciles',
    desc: '¿No estás satisfecho? Devuelve tu compra en 30 días sin preguntas.',
  },
]

const categories = [
  { name: 'Electrónica', emoji: '💻', color: 'bg-blue-50 text-blue-700' },
  { name: 'Ropa', emoji: '👕', color: 'bg-purple-50 text-purple-700' },
  { name: 'Hogar', emoji: '🏠', color: 'bg-amber-50 text-amber-700' },
  { name: 'Deportes', emoji: '⚽', color: 'bg-green-50 text-green-700' },
  { name: 'Libros', emoji: '📚', color: 'bg-rose-50 text-rose-700' },
  { name: 'Belleza', emoji: '✨', color: 'bg-pink-50 text-pink-700' },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-PE', { month: 'short', day: 'numeric', year: 'numeric' })
}

function authorName(article: (typeof articlesStore.articles)[0]) {
  const p = article.author?.customer_profile
  if (p?.first_name) return `${p.first_name} ${p.last_name}`
  return article.author?.email ?? 'Equipo Limarpoo'
}

function excerpt(content: string, max = 120) {
  const stripped = content.replace(/<[^>]+>/g, '')
  return stripped.length > max ? stripped.slice(0, max) + '…' : stripped
}

const storefrontUrl = import.meta.env.VITE_STOREFRONT_URL ?? 'http://localhost:3001'
</script>

<template>
  <!-- HERO -->
  <section class="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary-600/30 blur-3xl" />
      <div class="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-accent-500/20 blur-3xl" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary-700/20 blur-3xl" />
    </div>

    <!-- Subtle dot pattern overlay -->
    <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 30px 30px" />

    <div class="container-narrow relative pt-24 pb-16">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
            <span class="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
            La confianza de miles de peruanos
          </div>
          <h1 class="text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Compra con
            <span class="relative">
              <span class="text-accent-400">confianza</span>
              <svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 6C50 2 150 2 199 6" stroke="#F59E0B" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </span>
          </h1>
          <p class="text-xl text-white/70 leading-relaxed mb-8 max-w-lg">
            Descubre miles de productos de calidad a precios competitivos. Envío rápido, pagos seguros y atención al cliente excepcional — todo en un solo lugar.
          </p>
          <div class="flex flex-wrap gap-4">
            <a :href="storefrontUrl" class="btn-primary bg-accent-500 hover:bg-accent-600 text-gray-900 font-bold">
              Empezar a Comprar
              <svg class="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <RouterLink to="/about" class="btn-outline">
              Conoce Más
            </RouterLink>
          </div>
          <div class="mt-10 flex items-center gap-6">
            <div class="text-center">
              <p class="text-3xl font-bold text-white">10k+</p>
              <p class="text-white/60 text-sm">Productos</p>
            </div>
            <div class="w-px h-10 bg-white/20" />
            <div class="text-center">
              <p class="text-3xl font-bold text-white">50k+</p>
              <p class="text-white/60 text-sm">Clientes</p>
            </div>
            <div class="w-px h-10 bg-white/20" />
            <div class="text-center">
              <p class="text-3xl font-bold text-white">4.9★</p>
              <p class="text-white/60 text-sm">Valoración</p>
            </div>
          </div>
        </div>

        <!-- Hero illustration -->
        <div class="hidden lg:flex justify-end">
          <div class="relative w-[440px] h-[440px]">
            <!-- Floating cards -->
            <div class="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden">
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-[180px] opacity-20">🛍️</span>
              </div>
            </div>
            <div class="absolute -top-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl">✅</div>
              <div>
                <p class="text-xs text-gray-500">Pedido realizado</p>
                <p class="text-sm font-semibold text-gray-900">Pedido #4521</p>
              </div>
            </div>
            <div class="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-xl">🚚</div>
              <div>
                <p class="text-xs text-gray-500">Envío gratis</p>
                <p class="text-sm font-semibold text-gray-900">En pedidos +S/.100</p>
              </div>
            </div>
            <div class="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-white rounded-2xl shadow-xl p-4">
              <div class="flex items-center gap-1 mb-1">
                <span class="text-accent-500 text-sm">★★★★★</span>
              </div>
              <p class="text-xs text-gray-600">"¡La mejor tienda online!"</p>
              <p class="text-xs font-medium text-gray-900 mt-1">— María R.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wave bottom -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
        <path d="M0 80H1440V40C1440 40 1080 0 720 0C360 0 0 40 0 40V80Z" fill="white"/>
      </svg>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="py-24 bg-white">
    <div class="container-narrow">
      <div class="text-center mb-14">
        <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">Por qué elegirnos</span>
        <h2 class="section-title mt-2">Comprar nunca fue tan fácil</h2>
        <p class="section-subtitle">Todo lo que necesitas para una experiencia de compra excepcional, en un solo lugar.</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="card p-6 group hover:-translate-y-1 transition-transform duration-200"
        >
          <div class="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-2xl mb-4 group-hover:bg-primary-100 transition-colors">
            {{ feature.icon }}
          </div>
          <h3 class="font-bold text-gray-900 mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed">{{ feature.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CATEGORIES -->
  <section class="py-24 bg-gray-50">
    <div class="container-narrow">
      <div class="text-center mb-14">
        <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">Explorar</span>
        <h2 class="section-title mt-2">Compra por categoría</h2>
        <p class="section-subtitle">Encuentra exactamente lo que buscas en nuestra amplia selección de productos.</p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <a
          v-for="cat in categories"
          :key="cat.name"
          :href="`${storefrontUrl}/products`"
          class="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-white border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-200"
        >
          <span class="text-4xl group-hover:scale-110 transition-transform duration-200">{{ cat.emoji }}</span>
          <span class="text-sm font-medium text-gray-700 text-center">{{ cat.name }}</span>
        </a>
      </div>
      <div class="text-center mt-10">
        <a :href="`${storefrontUrl}/products`" class="btn-primary">Ver Todos los Productos</a>
      </div>
    </div>
  </section>

  <!-- ABOUT TEASER -->
  <section class="py-24 bg-white overflow-hidden">
    <div class="container-narrow">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div class="relative">
          <div class="aspect-square max-w-md rounded-3xl bg-gradient-to-br from-primary-600 to-primary-800 overflow-hidden shadow-2xl">
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-[160px] opacity-20">🏪</span>
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60">
              <p class="text-white font-bold text-xl">Desde 2020</p>
              <p class="text-white/70 text-sm">Sirviendo a clientes peruanos</p>
            </div>
          </div>
          <div class="absolute -bottom-4 -right-4 bg-accent-500 rounded-2xl p-5 shadow-xl">
            <p class="text-white font-bold text-2xl">98%</p>
            <p class="text-white/80 text-xs">Tasa de satisfacción</p>
          </div>
        </div>
        <div>
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">Nuestra historia</span>
          <h2 class="section-title mt-2 text-left">Creados por peruanos, para peruanos</h2>
          <p class="text-gray-500 mt-4 leading-relaxed">
            Limarpoo EIRL nació con una misión simple: hacer que los productos de calidad sean accesibles para cada hogar peruano. Creemos en precios justos, servicio honesto y relaciones duraderas con nuestros clientes.
          </p>
          <p class="text-gray-500 mt-4 leading-relaxed">
            Desde nuestros inicios en Lima, hemos crecido para atender a clientes en todo el país — siempre manteniendo nuestro compromiso con la excelencia en el centro de todo lo que hacemos.
          </p>
          <div class="mt-8 flex flex-wrap gap-6">
            <div>
              <p class="text-3xl font-bold text-primary-600">5+</p>
              <p class="text-sm text-gray-500">Años en el negocio</p>
            </div>
            <div>
              <p class="text-3xl font-bold text-primary-600">25+</p>
              <p class="text-sm text-gray-500">Regiones atendidas</p>
            </div>
            <div>
              <p class="text-3xl font-bold text-primary-600">500+</p>
              <p class="text-sm text-gray-500">Marcas asociadas</p>
            </div>
          </div>
          <div class="mt-8">
            <RouterLink to="/about" class="btn-primary">Conoce al Equipo</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- BLOG PREVIEW -->
  <section class="py-24 bg-gray-50">
    <div class="container-narrow">
      <div class="flex items-end justify-between mb-14">
        <div>
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">Novedades</span>
          <h2 class="section-title mt-2">Lo último de nuestro blog</h2>
        </div>
        <RouterLink to="/blog" class="hidden sm:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
          Ver todos los artículos
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </RouterLink>
      </div>

      <!-- Loading -->
      <div v-if="articlesStore.loading" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 3" :key="n" class="card p-6 animate-pulse">
          <div class="h-5 bg-gray-200 rounded w-3/4 mb-3" />
          <div class="h-4 bg-gray-100 rounded w-full mb-2" />
          <div class="h-4 bg-gray-100 rounded w-5/6" />
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="articlesStore.error" class="text-center py-12 text-gray-500">
        <span class="text-4xl block mb-3">📭</span>
        <p>No se pudieron cargar los artículos en este momento. ¡Vuelve pronto!</p>
      </div>

      <!-- Articles -->
      <div v-else-if="articlesStore.articles.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <RouterLink
          v-for="article in articlesStore.articles.slice(0, 3)"
          :key="article.id"
          :to="`/blog/${article.id}`"
          class="card group flex flex-col"
        >
          <div class="h-44 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
            <span class="text-6xl opacity-30">📝</span>
          </div>
          <div class="p-6 flex flex-col flex-1">
            <div class="flex items-center gap-2 text-xs text-gray-400 mb-3">
              <span>{{ authorName(article) }}</span>
              <span>&bull;</span>
              <span>{{ formatDate(article.published_at ?? article.created_at) }}</span>
            </div>
            <h3 class="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors leading-snug">
              {{ article.title }}
            </h3>
            <p class="text-sm text-gray-500 leading-relaxed flex-1">{{ excerpt(article.content) }}</p>
            <div class="mt-4 flex items-center text-primary-600 text-sm font-semibold">
              Leer más
              <svg class="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </RouterLink>
      </div>

      <!-- Empty -->
      <div v-else class="text-center py-12 text-gray-400">
        <span class="text-5xl block mb-3">📝</span>
        <p>Aún no hay artículos. ¡Vuelve pronto!</p>
      </div>

      <div class="sm:hidden text-center mt-8">
        <RouterLink to="/blog" class="btn-secondary">Ver todos los artículos</RouterLink>
      </div>
    </div>
  </section>

  <!-- CTA BANNER -->
  <section class="py-24 bg-gradient-to-r from-primary-700 to-primary-900 relative overflow-hidden">
    <div class="absolute inset-0">
      <div class="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
      <div class="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent-500/10 blur-3xl" />
    </div>
    <div class="container-narrow relative text-center">
      <h2 class="text-4xl lg:text-5xl font-bold text-white mb-4">¿Listo para empezar a comprar?</h2>
      <p class="text-white/70 text-lg mb-8 max-w-xl mx-auto">
        Únete a miles de clientes satisfechos y vive la forma más sencilla de comprar online en Perú.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <a :href="storefrontUrl" class="btn-primary bg-accent-500 hover:bg-accent-600 text-gray-900 font-bold px-8 py-4 text-lg">
          Ir a la Tienda — Es Gratis
        </a>
        <RouterLink to="/contact" class="btn-outline px-8 py-4 text-lg">
          Contáctanos
        </RouterLink>
      </div>
    </div>
  </section>
</template>
