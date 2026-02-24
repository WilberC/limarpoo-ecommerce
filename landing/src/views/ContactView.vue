<script setup lang="ts">
import { ref, reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const submitted = ref(false)
const submitting = ref(false)
const error = ref('')

async function handleSubmit() {
  if (!form.name || !form.email || !form.message) {
    error.value = 'Por favor completa todos los campos obligatorios.'
    return
  }
  error.value = ''
  submitting.value = true
  // Simulate async submission
  await new Promise((r) => setTimeout(r, 1000))
  submitted.value = true
  submitting.value = false
}

const contactInfo = [
  { icon: '📧', label: 'Email', value: 'hola@limarpoo.com', href: 'mailto:hola@limarpoo.com' },
  { icon: '📞', label: 'Teléfono', value: '+51 1 234 5678', href: 'tel:+5112345678' },
  { icon: '📍', label: 'Dirección', value: 'Lima, Perú', href: '#' },
  { icon: '🕒', label: 'Horario', value: 'Lun–Vie, 9 AM – 6 PM', href: '#' },
]
</script>

<template>
  <!-- Header -->
  <section class="pt-32 pb-20 bg-gradient-to-br from-primary-900 to-primary-700 relative overflow-hidden">
    <div class="absolute inset-0">
      <div class="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary-600/30 blur-3xl" />
    </div>
    <div class="container-narrow relative text-center">
      <span class="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4 border border-white/10">Contacto</span>
      <h1 class="text-5xl font-bold text-white mb-4">Escríbenos</h1>
      <p class="text-xl text-white/70 max-w-xl mx-auto">
        ¿Tienes alguna pregunta o necesitas ayuda? Estamos aquí para ti. Envíanos un mensaje y te responderemos en menos de 24 horas.
      </p>
    </div>
    <div class="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full">
        <path d="M0 60H1440V30C1440 30 1080 0 720 0C360 0 0 30 0 30V60Z" fill="white"/>
      </svg>
    </div>
  </section>

  <!-- Content -->
  <section class="py-24 bg-white">
    <div class="container-narrow">
      <div class="grid lg:grid-cols-5 gap-12">
        <!-- Info sidebar -->
        <div class="lg:col-span-2 space-y-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-2">Información de contacto</h2>
            <p class="text-gray-500 text-sm leading-relaxed">
              Nos encantaría saber de ti. Comunícate con nosotros por cualquiera de los canales a continuación.
            </p>
          </div>
          <div class="space-y-4">
            <a
              v-for="info in contactInfo"
              :key="info.label"
              :href="info.href"
              class="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-primary-50 transition-colors group"
            >
              <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                {{ info.icon }}
              </div>
              <div>
                <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide">{{ info.label }}</p>
                <p class="text-sm font-medium text-gray-800 group-hover:text-primary-600 transition-colors mt-0.5">{{ info.value }}</p>
              </div>
            </a>
          </div>
        </div>

        <!-- Form -->
        <div class="lg:col-span-3">
          <div class="card p-8">
            <!-- Success -->
            <div v-if="submitted" class="text-center py-8">
              <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl mx-auto mb-4">✅</div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">¡Mensaje enviado!</h3>
              <p class="text-gray-500">Gracias por escribirnos. Te responderemos en menos de 24 horas.</p>
              <button @click="submitted = false; Object.assign(form, { name: '', email: '', subject: '', message: '' })" class="btn-secondary mt-6 text-sm">
                Enviar otro mensaje
              </button>
            </div>

            <!-- Form -->
            <form v-else @submit.prevent="handleSubmit" class="space-y-5">
              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Nombre <span class="text-red-400">*</span></label>
                  <input
                    v-model="form.name"
                    type="text"
                    placeholder="Tu nombre completo"
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-gray-800 placeholder-gray-400 text-sm"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Email <span class="text-red-400">*</span></label>
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="you@example.com"
                    class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-gray-800 placeholder-gray-400 text-sm"
                  />
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Asunto</label>
                <input
                  v-model="form.subject"
                  type="text"
                  placeholder="¿De qué trata tu mensaje?"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-gray-800 placeholder-gray-400 text-sm"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5">Mensaje <span class="text-red-400">*</span></label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  placeholder="Cuéntanos cómo podemos ayudarte…"
                  class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition text-gray-800 placeholder-gray-400 text-sm resize-none"
                />
              </div>
              <div v-if="error" class="flex items-center gap-2 text-red-600 text-sm bg-red-50 px-4 py-3 rounded-xl">
                <svg class="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.07 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                {{ error }}
              </div>
              <button type="submit" class="btn-primary w-full" :disabled="submitting">
                <svg v-if="submitting" class="w-5 h-5 animate-spin mr-2" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                {{ submitting ? 'Enviando…' : 'Enviar Mensaje' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
