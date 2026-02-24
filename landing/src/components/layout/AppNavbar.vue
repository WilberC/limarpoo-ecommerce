<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const mobileOpen = ref(false)
const scrolled = ref(false)

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/about', label: 'Nosotros' },
  { to: '/blog', label: 'Blog' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contacto' },
]

function handleScroll() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'"
  >
    <nav class="container-narrow">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 group">
          <div class="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <span class="text-white font-bold text-lg">L</span>
          </div>
          <span
            class="font-bold text-xl transition-colors"
            :class="scrolled ? 'text-gray-900' : 'text-white'"
          >Limarpoo</span>
        </RouterLink>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="[
              scrolled ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100' : 'text-white/80 hover:text-white hover:bg-white/10',
              route.path === link.to ? (scrolled ? 'text-primary-600 bg-primary-50' : 'text-white bg-white/20') : ''
            ]"
          >{{ link.label }}</RouterLink>
        </div>

        <!-- CTA -->
        <div class="hidden md:flex items-center gap-3">
          <a
            href="http://localhost:3001"
            class="btn-primary text-sm py-2 px-5"
          >Ir a la Tienda</a>
        </div>

        <!-- Mobile hamburger -->
        <button
          class="md:hidden p-2 rounded-lg transition-colors"
          :class="scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'"
          @click="mobileOpen = !mobileOpen"
          aria-label="Toggle menu"
        >
          <svg v-if="!mobileOpen" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="mobileOpen" class="md:hidden bg-white rounded-2xl shadow-xl border border-gray-100 mx-0 mb-4 overflow-hidden">
          <div class="p-3 space-y-1">
            <RouterLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="block px-4 py-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
              :class="route.path === link.to ? 'text-primary-600 bg-primary-50' : ''"
              @click="mobileOpen = false"
            >{{ link.label }}</RouterLink>
            <div class="pt-2 pb-1">
              <a href="http://localhost:3001" class="btn-primary w-full text-sm justify-center">Ir a la Tienda</a>
            </div>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>
