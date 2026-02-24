<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const openIndex = ref<number | null>(null)

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i
}

const categories = [
  {
    icon: '🛒',
    name: 'Compras',
    faqs: [
      {
        q: '¿Necesito una cuenta para comprar?',
        a: '¡No! Puedes navegar y comprar como invitado sin crear una cuenta. Sin embargo, tener una cuenta te permite rastrear pedidos, guardar direcciones y ver tu historial de compras.',
      },
      {
        q: '¿Cómo encuentro el producto que busco?',
        a: 'Usa nuestra barra de búsqueda o navega por categorías. Puedes filtrar por precio, marca, valoración y más en la página de productos para encontrar exactamente lo que necesitas.',
      },
      {
        q: '¿Todos los productos son originales?',
        a: 'Por supuesto. Cada producto en Limarpoo pasa por un proceso de verificación de calidad antes de ser publicado. Trabajamos directamente con proveedores y marcas de confianza.',
      },
    ],
  },
  {
    icon: '🚚',
    name: 'Delivery',
    faqs: [
      {
        q: '¿Cuánto tarda la entrega?',
        a: 'Los tiempos de entrega varían según la región. Lima generalmente tarda 1–2 días hábiles. Otras regiones suelen tardar 3–5 días hábiles. Las opciones de entrega express están disponibles al finalizar la compra.',
      },
      {
        q: '¿Hacen entregas a nivel nacional?',
        a: '¡Sí! Hacemos entregas a las 25 regiones del Perú. Algunas zonas remotas pueden requerir tiempo adicional, lo cual se indicará al momento de pagar.',
      },
      {
        q: '¿Cómo rastro mi pedido?',
        a: 'Una vez enviado tu pedido, recibirás un enlace de seguimiento por correo electrónico. También puedes rastrear tus pedidos en tiempo real desde el panel de tu cuenta.',
      },
    ],
  },
  {
    icon: '💳',
    name: 'Pagos',
    faqs: [
      {
        q: '¿Qué métodos de pago aceptan?',
        a: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard), PayPal y otras opciones de pago locales. Todos los pagos están cifrados y son seguros.',
      },
      {
        q: '¿Es seguro pagar en línea?',
        a: 'Sí, completamente. Nuestro proceso de pago usa cifrado SSL estándar de la industria y nunca almacenamos los datos completos de tu tarjeta. Todas las transacciones cumplen con PCI-DSS.',
      },
      {
        q: '¿Puedo pagar en cuotas?',
        a: 'Sí, las opciones de pago en cuotas están disponibles para ciertas tarjetas y montos de compra al momento de pagar. Selecciona tu plan preferido durante el pago.',
      },
    ],
  },
  {
    icon: '🔄',
    name: 'Devoluciones',
    faqs: [
      {
        q: '¿Cuál es la política de devoluciones?',
        a: 'Ofrecemos un plazo de devolución de 30 días para la mayoría de los productos. Los artículos deben estar en su condición y embalaje originales. Algunas categorías (perecederos, productos digitales) están excluidas.',
      },
      {
        q: '¿Cómo inicio una devolución?',
        a: 'Inicia sesión en tu cuenta, ve a "Mis Pedidos", selecciona el pedido y haz clic en "Solicitar Devolución". Recibirás instrucciones por correo electrónico en 24 horas.',
      },
      {
        q: '¿Cuándo recibiré mi reembolso?',
        a: 'Una vez que recibamos y verifiquemos tu devolución, el reembolso se procesa en 3–5 días hábiles a tu método de pago original.',
      },
    ],
  },
]

// Flat list for open/close tracking
let indexCounter = 0
const flatFaqs = categories.flatMap((cat) =>
  cat.faqs.map((faq) => ({ ...faq, idx: indexCounter++ })),
)
</script>

<template>
  <!-- Header -->
  <section class="pt-32 pb-20 bg-gradient-to-br from-primary-900 to-primary-700 relative overflow-hidden">
    <div class="absolute inset-0">
      <div class="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary-600/30 blur-3xl" />
    </div>
    <div class="container-narrow relative text-center">
      <span class="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4 border border-white/10">Centro de Ayuda</span>
      <h1 class="text-5xl font-bold text-white mb-4">Preguntas Frecuentes</h1>
      <p class="text-xl text-white/70 max-w-xl mx-auto">
        Respuestas rápidas a las preguntas que más nos hacen. ¿No encuentras lo que buscas? ¡Contáctanos!
      </p>
    </div>
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
        <path d="M0 60H1440V30C1440 30 1080 0 720 0C360 0 0 30 0 30V60Z" fill="white"/>
      </svg>
    </div>
  </section>

  <!-- FAQ Content -->
  <section class="py-24 bg-white">
    <div class="container-narrow max-w-4xl">
      <div class="space-y-12">
        <div v-for="(cat, ci) in categories" :key="cat.name">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-xl">{{ cat.icon }}</div>
            <h2 class="text-xl font-bold text-gray-900">{{ cat.name }}</h2>
          </div>
          <div class="space-y-3">
            <div
              v-for="(faq, fi) in cat.faqs"
              :key="faq.q"
              class="rounded-2xl border border-gray-100 overflow-hidden"
              :class="openIndex === ci * 10 + fi ? 'border-primary-200 shadow-sm' : 'hover:border-gray-200'"
            >
              <button
                class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors"
                :class="openIndex === ci * 10 + fi ? 'bg-primary-50' : 'bg-white hover:bg-gray-50'"
                @click="toggle(ci * 10 + fi)"
              >
                <span class="font-semibold text-gray-900 text-sm">{{ faq.q }}</span>
                <div
                  class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
                  :class="openIndex === ci * 10 + fi ? 'bg-primary-600 rotate-45' : 'bg-gray-100'"
                >
                  <svg class="w-4 h-4" :class="openIndex === ci * 10 + fi ? 'text-white' : 'text-gray-500'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 5v14M5 12h14" />
                  </svg>
                </div>
              </button>
              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-96"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 max-h-96"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="openIndex === ci * 10 + fi" class="px-6 pb-5">
                  <p class="text-sm text-gray-500 leading-relaxed">{{ faq.a }}</p>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>

      <!-- Still need help? -->
      <div class="mt-16 p-8 rounded-3xl bg-gradient-to-r from-primary-600 to-primary-800 text-center">
        <h3 class="text-2xl font-bold text-white mb-2">¿Aún tienes preguntas?</h3>
        <p class="text-white/70 mb-6">Nuestro equipo está feliz de ayudarte. Escríbenos y te responderemos rápidamente.</p>
        <RouterLink to="/contact" class="btn-primary bg-white text-primary-700 hover:bg-gray-100">Contactar Soporte</RouterLink>
      </div>
    </div>
  </section>
</template>
