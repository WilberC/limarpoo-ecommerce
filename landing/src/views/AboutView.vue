<script setup lang="ts">
import { RouterLink } from 'vue-router'

const values = [
  { icon: '🎯', title: 'El Cliente Primero', desc: 'Cada decisión que tomamos parte de la pregunta: ¿cómo beneficia esto a nuestros clientes?' },
  { icon: '🤝', title: 'Confianza y Transparencia', desc: 'Creemos en la comunicación honesta — precios claros, sin cargos ocultos, políticas directas.' },
  { icon: '🌱', title: 'Mejora Continua', desc: 'Mejoramos constantemente nuestra plataforma, nuestra selección de productos y nosotros mismos.' },
  { icon: '🇵🇪', title: 'Orgullo Peruano', desc: "Somos una empresa peruana que apoya a proveedores locales y hace entregas en todo el país." },
]

const team = [
  { name: 'Ana García', role: 'Cofundadora y CEO', emoji: '👩‍💼', color: 'bg-primary-100' },
  { name: 'Carlos Mendoza', role: 'Cofundador y CTO', emoji: '👨‍💻', color: 'bg-green-100' },
  { name: 'Lucía Torres', role: 'Jefa de Operaciones', emoji: '👩‍💼', color: 'bg-purple-100' },
  { name: 'Diego Ríos', role: 'Jefe de Marketing', emoji: '👨‍🎨', color: 'bg-amber-100' },
]

const timeline = [
  { year: '2020', title: 'Fundados en Lima', desc: 'Limarpoo EIRL se constituyó con la visión de democratizar las compras online en el Perú.' },
  { year: '2021', title: 'Los primeros 1,000 clientes', desc: 'Celebramos alcanzar nuestros primeros mil clientes satisfechos en solo 8 meses.' },
  { year: '2022', title: 'Expansión nacional', desc: 'Extendimos las entregas a las 25 regiones del Perú, llegando a clientes de norte a sur.' },
  { year: '2023', title: 'Relanzamiento de plataforma', desc: 'Reconstrucción completa de la plataforma enfocada en velocidad, seguridad y experiencia de usuario.' },
  { year: '2024', title: 'Hito de 50k clientes', desc: 'Atendemos con orgullo a más de 50,000 clientes activos con un 98% de satisfacción.' },
]
</script>

<template>
  <!-- Hero -->
  <section class="pt-32 pb-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 relative overflow-hidden">
    <div class="absolute inset-0">
      <div class="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary-600/30 blur-3xl" />
      <div class="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-accent-500/15 blur-3xl" />
    </div>
    <div class="container-narrow relative text-center">
      <span class="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4 border border-white/10">Nuestra Historia</span>
      <h1 class="text-5xl lg:text-6xl font-bold text-white mb-6">Sobre Limarpoo EIRL</h1>
      <p class="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
        Somos una empresa peruana de comercio electrónico con la misión de hacer accesibles los productos de calidad para todos, en cualquier lugar del Perú.
      </p>
    </div>
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
        <path d="M0 60H1440V30C1440 30 1080 0 720 0C360 0 0 30 0 30V60Z" fill="white"/>
      </svg>
    </div>
  </section>

  <!-- Mission -->
  <section class="py-24 bg-white">
    <div class="container-narrow">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">Nuestra Misión</span>
          <h2 class="text-4xl font-bold text-gray-900 mt-2 mb-6">Hacer las compras de calidad accesibles para todos los peruanos</h2>
          <p class="text-gray-500 leading-relaxed mb-4">
            Fundamos Limarpoo EIRL tras experimentar en carne propia lo difícil que era encontrar productos de calidad a precios justos en el Perú. El mercado estaba fragmentado, la confianza era difícil de establecer y las entregas eran poco confiables.
          </p>
          <p class="text-gray-500 leading-relaxed mb-8">
            Nos propusimos construir algo diferente — una plataforma donde los clientes puedan comprar con total confianza, sabiendo que recibirán productos genuinos, precios transparentes y entrega confiable en su puerta.
          </p>
          <div class="grid grid-cols-2 gap-6">
            <div class="p-5 rounded-2xl bg-primary-50">
              <p class="text-3xl font-bold text-primary-700">50k+</p>
              <p class="text-sm text-gray-600 mt-1">Clientes satisfechos</p>
            </div>
            <div class="p-5 rounded-2xl bg-accent-50">
              <p class="text-3xl font-bold text-accent-700">10k+</p>
              <p class="text-sm text-gray-600 mt-1">Productos disponibles</p>
            </div>
            <div class="p-5 rounded-2xl bg-green-50">
              <p class="text-3xl font-bold text-green-700">25</p>
              <p class="text-sm text-gray-600 mt-1">Regiones atendidas</p>
            </div>
            <div class="p-5 rounded-2xl bg-purple-50">
              <p class="text-3xl font-bold text-purple-700">98%</p>
              <p class="text-sm text-gray-600 mt-1">Tasa de satisfacción</p>
            </div>
          </div>
        </div>
        <div class="relative">
          <div class="aspect-square rounded-3xl bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center overflow-hidden shadow-2xl">
            <span class="text-[200px] opacity-15">🏪</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Values -->
  <section class="py-24 bg-gray-50">
    <div class="container-narrow">
      <div class="text-center mb-14">
        <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">Lo que nos mueve</span>
        <h2 class="section-title mt-2">Nuestros valores</h2>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="v in values" :key="v.title" class="card p-6">
          <div class="text-4xl mb-4">{{ v.icon }}</div>
          <h3 class="font-bold text-gray-900 mb-2">{{ v.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed">{{ v.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Timeline -->
  <section class="py-24 bg-white">
    <div class="container-narrow">
      <div class="text-center mb-14">
        <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">Nuestro recorrido</span>
        <h2 class="section-title mt-2">De la idea al impacto</h2>
      </div>
      <div class="max-w-2xl mx-auto">
        <div class="relative">
          <div class="absolute left-8 top-0 bottom-0 w-px bg-primary-100" />
          <div class="space-y-8">
            <div v-for="(item, i) in timeline" :key="item.year" class="relative flex gap-6">
              <div class="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-sm z-10"
                :class="i === timeline.length - 1 ? 'bg-primary-600 text-white' : 'bg-primary-50 text-primary-700 border border-primary-200'">
                {{ item.year }}
              </div>
              <div class="pt-3 pb-8">
                <h3 class="font-bold text-gray-900">{{ item.title }}</h3>
                <p class="text-sm text-gray-500 mt-1 leading-relaxed">{{ item.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Team -->
  <section class="py-24 bg-gray-50">
    <div class="container-narrow">
      <div class="text-center mb-14">
        <span class="text-primary-600 font-semibold text-sm uppercase tracking-wider">Las personas</span>
        <h2 class="section-title mt-2">Conoce a nuestro equipo</h2>
        <p class="section-subtitle">Un grupo apasionado de peruanos trabajando para cambiar la forma en que compras online.</p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="member in team" :key="member.name" class="card p-6 text-center group">
          <div class="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl" :class="member.color">
            {{ member.emoji }}
          </div>
          <h3 class="font-bold text-gray-900">{{ member.name }}</h3>
          <p class="text-sm text-primary-600 mt-1">{{ member.role }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-24 bg-primary-900">
    <div class="container-narrow text-center">
      <h2 class="text-4xl font-bold text-white mb-4">¿Quieres trabajar con nosotros?</h2>
      <p class="text-white/60 text-lg mb-8 max-w-xl mx-auto">
        Siempre buscamos personas apasionadas para unirse al equipo de Limarpoo.
      </p>
      <div class="flex flex-wrap justify-center gap-4">
        <RouterLink to="/contact" class="btn-primary bg-accent-500 hover:bg-accent-600 text-gray-900 font-bold">Contáctanos</RouterLink>
        <a href="http://localhost:3001" class="btn-outline">Visita la Tienda</a>
      </div>
    </div>
  </section>
</template>
