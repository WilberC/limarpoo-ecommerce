<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'

const route = useRoute()
const store = useArticlesStore()

const articleId = computed(() => route.params.id as string)

onMounted(() => {
  store.loadArticle(articleId.value)
  store.loadArticles()
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-PE', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}

function authorName(article: typeof store.currentArticle) {
  if (!article) return ''
  const p = article.author?.customer_profile
  if (p?.first_name) return `${p.first_name} ${p.last_name}`
  return article.author?.email ?? 'Equipo Limarpoo'
}

function readTime(content: string) {
  const words = content.replace(/<[^>]+>/g, '').split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function excerpt(content: string, max = 120) {
  const stripped = content.replace(/<[^>]+>/g, '')
  return stripped.length > max ? stripped.slice(0, max) + '…' : stripped
}

const relatedArticles = computed(() =>
  store.articles.filter((a) => a.id !== articleId.value).slice(0, 3),
)
</script>

<template>
  <div class="min-h-screen">
    <!-- Loading -->
    <div v-if="store.loading && !store.currentArticle" class="pt-32 pb-16">
      <div class="container-narrow max-w-3xl">
        <div class="animate-pulse">
          <div class="h-8 bg-gray-200 rounded w-2/3 mb-4" />
          <div class="h-5 bg-gray-100 rounded w-1/2 mb-10" />
          <div class="space-y-3">
            <div class="h-4 bg-gray-100 rounded w-full" />
            <div class="h-4 bg-gray-100 rounded w-5/6" />
            <div class="h-4 bg-gray-100 rounded w-4/5" />
            <div class="h-4 bg-gray-100 rounded w-full" />
          </div>
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="store.error && !store.currentArticle" class="pt-40 pb-16 text-center">
      <span class="text-5xl block mb-4">😕</span>
      <h2 class="text-2xl font-bold text-gray-700 mb-2">Artículo no encontrado</h2>
      <p class="text-gray-500 mb-6">Este artículo no existe o no se pudo cargar.</p>
      <RouterLink to="/blog" class="btn-primary">Volver al Blog</RouterLink>
    </div>

    <!-- Article -->
    <template v-else-if="store.currentArticle">
      <!-- Hero -->
      <section class="pt-24 bg-gradient-to-br from-primary-900 to-primary-700 pb-32 relative overflow-hidden">
        <div class="absolute inset-0">
          <div class="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary-600/30 blur-3xl" />
        </div>
        <div class="container-narrow relative max-w-3xl pt-8">
          <RouterLink to="/blog" class="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-8 transition-colors">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Blog
          </RouterLink>
          <h1 class="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {{ store.currentArticle.title }}
          </h1>
          <div class="flex flex-wrap items-center gap-4 text-white/60 text-sm">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">
                {{ authorName(store.currentArticle).charAt(0) }}
              </div>
              <span>{{ authorName(store.currentArticle) }}</span>
            </div>
            <span>&bull;</span>
            <span>{{ formatDate(store.currentArticle.published_at ?? store.currentArticle.created_at) }}</span>
            <span>&bull;</span>
            <span>{{ readTime(store.currentArticle.content) }} min de lectura</span>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
            <path d="M0 80H1440V40C1440 40 1080 0 720 0C360 0 0 40 0 40V80Z" fill="white"/>
          </svg>
        </div>
      </section>

      <!-- Content -->
      <section class="py-16 bg-white">
        <div class="container-narrow max-w-3xl">
          <article class="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
            <!-- Render plain text with preserved whitespace -->
            <div
              class="whitespace-pre-wrap text-gray-700 text-lg leading-relaxed"
              v-html="store.currentArticle.content"
            />
          </article>

          <!-- Tags / share -->
          <div class="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <span class="text-sm text-gray-500">Compartir artículo:</span>
              <button class="w-9 h-9 rounded-lg bg-gray-100 hover:bg-primary-100 flex items-center justify-center transition-colors text-gray-600 hover:text-primary-700" title="Copiar enlace">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            <RouterLink to="/blog" class="btn-secondary text-sm py-2">← Todos los Artículos</RouterLink>
          </div>
        </div>
      </section>

      <!-- Related articles -->
      <section v-if="relatedArticles.length > 0" class="py-16 bg-gray-50">
        <div class="container-narrow">
          <h2 class="text-2xl font-bold text-gray-900 mb-8">Más artículos</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <RouterLink
              v-for="article in relatedArticles"
              :key="article.id"
              :to="`/blog/${article.id}`"
              class="card group flex flex-col"
            >
              <div class="h-36 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <span class="text-5xl opacity-25">📝</span>
              </div>
              <div class="p-5 flex flex-col flex-1">
                <h3 class="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors text-sm leading-snug">
                  {{ article.title }}
                </h3>
                <p class="text-xs text-gray-500 flex-1">{{ excerpt(article.content, 80) }}</p>
                <span class="text-primary-600 text-xs font-semibold mt-3 flex items-center gap-1">
                  Leer más
                  <svg class="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </RouterLink>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
