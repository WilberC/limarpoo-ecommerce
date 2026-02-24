<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'

const store = useArticlesStore()
onMounted(() => store.loadArticles())

const search = ref('')

const filtered = computed(() => {
  if (!search.value.trim()) return store.articles
  const q = search.value.toLowerCase()
  return store.articles.filter(
    (a) => a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q),
  )
})

const featuredArticle = computed(() => (!search.value && filtered.value.length > 0 ? filtered.value[0] : null))
const remainingArticles = computed(() => (search.value ? filtered.value : filtered.value.slice(1)))

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-PE', { month: 'long', day: 'numeric', year: 'numeric' })
}

function authorName(article: (typeof store.articles)[0]) {
  const p = article.author?.customer_profile
  if (p?.first_name) return `${p.first_name} ${p.last_name}`
  return article.author?.email ?? 'Equipo Limarpoo'
}

function excerpt(content: string, max = 160) {
  const stripped = content.replace(/<[^>]+>/g, '')
  return stripped.length > max ? stripped.slice(0, max) + '…' : stripped
}

function readTime(content: string) {
  const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}
</script>

<template>
  <!-- Header -->
  <section class="pt-32 pb-20 bg-gradient-to-br from-primary-900 to-primary-700 relative overflow-hidden">
    <div class="absolute inset-0">
      <div class="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary-600/30 blur-3xl" />
    </div>
    <div class="container-narrow relative">
      <div class="max-w-2xl">
        <span class="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4 border border-white/10">Nuestro Blog</span>
        <h1 class="text-5xl font-bold text-white mb-4">Artículos y Novedades</h1>
        <p class="text-xl text-white/70">
          Consejos, guías e historias del equipo de Limarpoo para ayudarte a comprar mejor.
        </p>
      </div>
    </div>
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
        <path d="M0 60H1440V30C1440 30 1080 0 720 0C360 0 0 30 0 30V60Z" fill="white"/>
      </svg>
    </div>
  </section>

  <!-- Search + Articles -->
  <section class="py-16 bg-white">
    <div class="container-narrow">
      <!-- Search bar -->
      <div class="max-w-xl mb-12">
        <div class="relative">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Buscar artículos…"
            class="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-gray-800 placeholder-gray-400"
          />
        </div>
      </div>

      <!-- Loading skeleton -->
      <div v-if="store.loading" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="card p-6 animate-pulse">
          <div class="h-40 bg-gray-100 rounded-xl mb-4" />
          <div class="h-5 bg-gray-200 rounded w-3/4 mb-3" />
          <div class="h-4 bg-gray-100 rounded w-full mb-2" />
          <div class="h-4 bg-gray-100 rounded w-2/3" />
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="store.error" class="text-center py-16">
        <span class="text-5xl block mb-4">📡</span>
        <h3 class="text-xl font-bold text-gray-700 mb-2">No se pudo conectar al servidor</h3>
        <p class="text-gray-500">Asegúrate de que el servidor esté activo e intenta de nuevo.</p>
        <button @click="store.loadArticles()" class="btn-primary mt-6">Reintentar</button>
      </div>

      <!-- No results -->
      <div v-else-if="filtered.length === 0" class="text-center py-16">
        <span class="text-5xl block mb-4">🔍</span>
        <h3 class="text-xl font-bold text-gray-700 mb-2">No se encontraron artículos</h3>
        <p class="text-gray-500">Intenta con otro término de búsqueda.</p>
        <button @click="search = ''" class="btn-secondary mt-6">Limpiar búsqueda</button>
      </div>

      <!-- Grid -->
      <div v-else>
        <!-- Featured first article -->
        <RouterLink
          v-if="featuredArticle"
          :to="`/blog/${featuredArticle.id}`"
          class="group block mb-8"
        >
          <div class="card overflow-hidden">
            <div class="grid md:grid-cols-2">
              <div class="h-64 md:h-auto bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center">
                <span class="text-[120px] opacity-20">📰</span>
              </div>
              <div class="p-8 flex flex-col justify-center">
                <div class="inline-block px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold mb-4">
                  Artículo Destacado
                </div>
                <h2 class="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-3 leading-snug">
                  {{ featuredArticle.title }}
                </h2>
                <p class="text-gray-500 leading-relaxed mb-5">{{ excerpt(featuredArticle.content, 200) }}</p>
                <div class="flex items-center gap-4 text-sm text-gray-400">
                  <span>{{ authorName(featuredArticle) }}</span>
                  <span>&bull;</span>
                  <span>{{ formatDate(featuredArticle.published_at ?? featuredArticle.created_at) }}</span>
                  <span>&bull;</span>
                  <span>{{ readTime(featuredArticle.content) }} min de lectura</span>
                </div>
              </div>
            </div>
          </div>
        </RouterLink>

        <!-- Rest of articles -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <RouterLink
            v-for="article in remainingArticles"
            :key="article.id"
            :to="`/blog/${article.id}`"
            class="card group flex flex-col"
          >
            <div class="h-44 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <span class="text-6xl opacity-25">📝</span>
            </div>
            <div class="p-6 flex flex-col flex-1">
              <div class="flex items-center gap-2 text-xs text-gray-400 mb-3">
                <span>{{ authorName(article) }}</span>
                <span>&bull;</span>
                <span>{{ readTime(article.content) }} min de lectura</span>
              </div>
              <h3 class="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors leading-snug">
                {{ article.title }}
              </h3>
              <p class="text-sm text-gray-500 leading-relaxed flex-1">{{ excerpt(article.content) }}</p>
              <div class="mt-4 flex items-center justify-between">
                <span class="text-xs text-gray-400">{{ formatDate(article.published_at ?? article.created_at) }}</span>
                <span class="text-primary-600 text-sm font-semibold flex items-center gap-1">
                  Leer
                  <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>
