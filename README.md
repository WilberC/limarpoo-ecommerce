# Limarpoo EIRL - Plataforma de E-commerce

## Descripción General

Limarpoo EIRL es una plataforma integral de comercio electrónico diseñada para gestionar operaciones de venta minorista en línea, incluyendo gestión de tienda, procesamiento de ventas, seguimiento de inventario e interacciones con clientes. La plataforma está construida sobre una arquitectura modular que consta de cuatro aplicaciones principales.

---

## Aplicaciones

### 🏠 Landing (Sitio Web de Marketing)

**Tecnología:** Vue.js

**Propósito:** Sitio web público de marketing y contenido

El Landing es el **sitio web principal de marketing** que presenta a los visitantes a Limarpoo EIRL. Aquí es donde las personas aprenden sobre la empresa, leen contenido y se interesan en comprar. Las características clave incluyen:

- **Página de inicio** - Introducción a la empresa y propuesta de valor
- **Acerca de Nosotros** - Historia de la empresa, misión, valores, equipo
- **Blog/Artículos** - Marketing de contenido, noticias de la industria, guías prácticas
- **Página de contacto** - Ponerse en contacto con la empresa
- **Sección de preguntas frecuentes** - Preguntas y respuestas comunes
- **Anuncios de la empresa** - Noticias y actualizaciones
- **Páginas de contenido SEO** - Contenido educativo para atraer tráfico orgánico
- **Diseño responsivo** - Funciona en todos los dispositivos

**Usuarios Objetivo:**
- **Nuevos visitantes** que aprenden sobre Limarpoo EIRL
- **Lectores de contenido** interesados en artículos del blog
- **Personas investigando** antes de decidir comprar

**Ejemplo de Recorrido del Usuario:**
1. Usuario busca "mejores prácticas para compras en línea"
2. Llega a un artículo del blog de Limarpoo EIRL
3. Lee sobre la empresa
4. Hace clic en "Comprar Ahora" → redirigido a Storefront

**¿Por qué Vue.js?**
- **Framework Progresivo**: Fácil de crear páginas de contenido dinámico y elementos interactivos
- **Ligero**: Carga rápida para páginas con mucho contenido como blogs y artículos
- **Basado en Componentes**: Componentes reutilizables para publicaciones de blog, testimonios, secciones de FAQ
- **Curva de Aprendizaje Suave**: Más fácil para los gestores de contenido y el equipo de marketing
- **Excelente para SPAs**: Navegación fluida entre páginas sin recargas completas

**Características Técnicas Clave:**
- Vue Router para navegación de páginas
- Integración con gestión de contenido (headless CMS)
- Renderizado de publicaciones de blog con soporte markdown
- Formulario de contacto con validación
- Integración de suscripción a newsletter
- Integración de feeds de redes sociales

---

### 🛒 Storefront (Tienda de E-commerce + Portal de Clientes)

**Tecnología:** Next.js (Basado en React)

**Propósito:** Plataforma completa de e-commerce para compras y gestión de cuentas

El Storefront es la **plataforma integral de compras y gestión de cuentas** que maneja tanto las compras públicas como las características del portal de clientes autenticados en una aplicación unificada. Las características clave incluyen:

**Características de Compra Pública (No Requiere Login):**
- **Catálogo de productos** - Explorar todos los productos disponibles
- **Búsqueda y filtrado de productos** - Encontrar productos por categoría, precio, marca
- **Páginas de detalle de productos** - Imágenes, descripciones, especificaciones, reseñas
- **Carrito de compras** - Agregar artículos y gestionar cantidades
- **Checkout de invitado** - Comprar sin crear una cuenta
- **Reseñas y calificaciones de clientes** - Retroalimentación de productos
- **Disponibilidad de inventario** - Estado de stock en tiempo real
- **Diseño responsivo** - Experiencia de compra amigable para móviles

**Características del Portal Autenticado (Login Requerido):**
- **Panel personal** - Resumen de cuenta y actividad reciente
- **Historial y seguimiento de pedidos** - Ver todas las compras pasadas y rastrear envíos
- **Detalles de pedidos y facturas** - Descargar recibos, ver estado de pedidos
- **Direcciones de envío guardadas** - Gestionar múltiples ubicaciones de entrega
- **Métodos de pago guardados** - Almacenar tarjetas de forma segura para checkout más rápido
- **Gestión de lista de deseos** - Guardar productos para compra posterior
- **Configuración de cuenta** - Actualizar perfil, contraseña, preferencias
- **Tickets de soporte** - Contactar servicio al cliente sobre pedidos
- **Puntos de lealtad/recompensas** - Rastrear puntos acumulados y beneficios
- **Solicitudes de devolución y reembolso** - Iniciar devoluciones de productos

**Usuarios Objetivo:**
- **Visitantes anónimos** navegando productos
- **Compradores invitados** realizando compras únicas
- **Clientes registrados** comprando y gestionando cuentas
- **Compradores recurrentes** con preferencias guardadas e historial de pedidos

**Ejemplos de Recorrido del Usuario:**

*Compra como Invitado:*
1. Visitante navega categorías de productos
2. Ve detalles de productos, lee reseñas
3. Agrega artículos al carrito
4. Hace checkout como invitado
5. Completa la compra

*Cliente Registrado:*
1. Inicia sesión en su cuenta
2. Ve recomendaciones personalizadas y lista de deseos
3. Agrega artículos al carrito con información de pago guardada
4. Completa el checkout más rápido con direcciones guardadas
5. Rastrea el pedido desde el panel de la cuenta

**¿Por qué Next.js?**
- **Optimización SEO**: Server-side rendering (SSR) asegura que las páginas de productos se posicionen bien en motores de búsqueda - crítico para e-commerce
- **Experiencia Unificada**: Una sola aplicación maneja tanto las compras como la gestión de cuentas sin problemas
- **Rendimiento**: Code splitting automático carga solo lo necesario (páginas de tienda vs páginas de cuenta)
- **Basado en React**: Gran ecosistema de bibliotecas de e-commerce y autenticación
- **API Routes**: Backend integrado para operaciones de carrito, checkout y cuenta
- **Autenticación**: Fácil integración con NextAuth.js para sesiones de usuario
- **Enrutamiento Dinámico**: Perfecto para productos (/product/[id]), categorías y páginas de cuenta (/account/orders)

**Características Técnicas Clave:**
- Server-side rendering para listados de productos (impulso SEO)
- Generación estática para páginas de categorías (extremadamente rápido)
- Rutas protegidas para páginas de cuenta (autenticación requerida)
- Gestión de estado del carrito de compras (invitado y autenticado)
- Gestión de sesión de usuario con tokens JWT
- Integración con pasarela de pagos (Stripe, PayPal)
- Sistema de gestión de pedidos (ver, rastrear, descargar facturas)
- Funcionalidad de lista de deseos y artículos guardados
- Almacenamiento de direcciones y métodos de pago
- Notificaciones por correo electrónico para pedidos y actualizaciones de cuenta
- Optimización de imágenes para fotos de productos
- Etiquetas meta SEO y datos estructurados (Google Shopping)

---

### 👔 Admin (Gestión Interna)

**Tecnología:** Angular

**Propósito:** Panel de gestión y operaciones internas

La aplicación Admin está diseñada para el equipo interno de Limarpoo EIRL para gestionar todos los aspectos del negocio de e-commerce. Las características clave incluyen:

- Gestión de catálogo de productos (agregar, editar, eliminar productos)
- Control de inventario y conteo de stock
- Procesamiento de pedidos y seguimiento de cumplimiento
- Reportes de ventas y análisis
- Gestión de clientes y soporte
- Configuración de precios y descuentos
- Gestión de contenido para el storefront
- Gestión de roles y permisos de usuario
- Reportes financieros e integración contable

**Usuarios Objetivo:** Gerentes de tienda, administradores, personal de almacén y equipo de operaciones internas

**¿Por qué Angular?**
- **Listo para Empresas**: Estructura con opinión ideal para paneles internos complejos
- **TypeScript Nativo**: Tipado fuerte reduce errores en lógica de negocio compleja
- **Características Integradas**: Enrutamiento, formularios, cliente HTTP e inyección de dependencias de fábrica
- **Integración RxJS**: Excelente para manejar flujos de datos complejos (actualizaciones de inventario, pedidos en tiempo real)
- **Escalabilidad**: Perfecto para aplicaciones grandes con muchos módulos

**Características Técnicas Clave:**
- Formularios reactivos para entrada de datos compleja
- Lazy loading de módulos para rendimiento
- Angular Material para componentes UI consistentes
- RxJS para actualizaciones de datos en tiempo real
- Control de acceso basado en roles (RBAC)

---

### ⚙️ Core (El Backend)

**Tecnología:** Express.js (Node.js)

**Propósito:** Sistema central de lógica de negocio y gestión de datos

El Core sirve como la columna vertebral de toda la plataforma, proporcionando APIs y servicios que impulsan todas las demás aplicaciones. Las responsabilidades incluyen:

- Endpoints de API RESTful para todas las aplicaciones
- Implementación de lógica de negocio
- Gestión de base de datos y persistencia de datos
- Servicios de autenticación y autorización
- Integración de procesamiento de pagos
- Servicios de correo electrónico y notificaciones
- Sincronización de inventario
- Flujos de trabajo de procesamiento de pedidos
- Integración con servicios de terceros (envío, pagos, análisis)
- Seguridad y protección de datos
- Optimización de rendimiento y caché

**Usuarios Objetivo:** Todas las aplicaciones (Storefront, Admin, Landing) consumen servicios del Core

**¿Por qué Express.js?**
- **Ligero y Flexible**: Sobrecarga mínima para construir APIs RESTful
- **Ecosistema de Middleware**: Plugins extensos para autenticación, validación, logging
- **Runtime Node.js**: JavaScript en toda la pila para consistencia
- **Escalable**: Fácil de estructurar como microservicios si es necesario
- **Rendimiento**: I/O no bloqueante perfecto para manejar múltiples solicitudes concurrentes

**Características Técnicas Clave:**
- Endpoints de API RESTful para todas las aplicaciones
- Middleware de autenticación JWT
- Integración de base de datos (MongoDB con Mongoose o PostgreSQL con Sequelize)
- Integraciones de pasarela de pagos (Stripe, PayPal, etc.)
- Integración de servicio de correo electrónico (SendGrid, AWS SES)
- Validación de solicitudes y manejo de errores
- Middleware de limitación de tasa y seguridad

---

## Comparación de Aplicaciones

Entendiendo cómo funcionan juntas las tres aplicaciones principales:

| Aspecto | 🏠 Landing (Vue.js) | 🛒 Storefront (Next.js) | 👔 Admin (Angular) |
|--------|---------------------|------------------------|---------------------|
| **Acceso** | Público - Sin login | Público + Autenticado | Privado - Solo admin |
| **Propósito Principal** | Marketing y Contenido | Tienda + Gestión de Cuenta | Operaciones Internas |
| **Usuarios Principales** | Nuevos visitantes, lectores | Compradores y clientes | Personal y gerentes |
| **Acciones Clave** | Leer blogs, aprender | Navegar, comprar, gestionar pedidos | Gestionar inventario, pedidos |
| **¿SEO Importante?** | SÍ - Marketing de contenido | SÍ - Páginas de productos | NO - Solo interno |
| **¿Tiene Productos?** | ❌ No hay productos | ✅ Catálogo completo + carrito | ✅ Gestionar productos |
| **¿Tiene Compras?** | ❌ No hay compras | ✅ E-commerce completo | ❌ No hay compras |
| **¿Tiene Blog/Contenido?** | ✅ Blog, noticias, artículos | ❌ Enfocado en productos | ❌ No hay contenido |
| **¿Gestión de Cuentas?** | ❌ No hay cuentas | ✅ Portal de clientes integrado | ✅ Cuentas de admin |
| **URL de Ejemplo** | `limarpoo.com/blog/articulo` | `shop.limarpoo.com/productos` <br> `shop.limarpoo.com/account/pedidos` | `admin.limarpoo.com/inventario` |

**El Recorrido del Cliente:**
1. **Descubrir** (Landing) → Aprender sobre Limarpoo EIRL a través del blog o página de inicio
2. **Comprar** (Storefront - Público) → Navegar productos y agregar al carrito
3. **Comprar** (Storefront - Checkout) → Completar la compra
4. **Gestionar** (Storefront - Portal de Cuenta) → Rastrear pedido, ver historial, actualizar perfil

**¿Por qué Esta Estructura?**
1. **Separación de responsabilidades**: Marketing (Landing) vs Comercio (Storefront) vs Operaciones (Admin)
2. **Tecnologías óptimas**: Vue para contenido, Next.js para e-commerce, Angular para operaciones empresariales
3. **Mejor rendimiento**: Cada uno optimizado para su caso de uso específico
4. **Roles claros**: Equipo de marketing (Landing), equipo de producto (Storefront), equipo de operaciones (Admin)
5. **Escalado independiente**: Diferentes patrones de tráfico para cada aplicación

---

## Justificación de Decisiones Tecnológicas

### ¿Por qué Next.js para Storefront? ¿Por qué Angular para Admin?

Ambas aplicaciones tienen funcionalidad compleja, pero sirven propósitos fundamentalmente diferentes. He aquí por qué elegimos estas tecnologías específicas:

#### 🛒 Storefront = Next.js ✅

**Razón Principal: El SEO es Crítico**
- Los sitios de e-commerce **DEBEN** posicionarse en los resultados de búsqueda de Google
- Los clientes encuentran productos a través de motores de búsqueda ("comprar auriculares inalámbricos", "mejores laptops 2026")
- Next.js proporciona **SEO de mejor clase** con Server-Side Rendering (SSR) y Static Site Generation (SSG)
- Angular PUEDE hacer SEO (con Angular Universal), pero requiere configuración extra y complejidad
- **Este solo factor es el decisivo para e-commerce de cara al cliente**

**Ventajas Adicionales:**
- ✅ **Rendimiento**: Code splitting automático = cargas de página más rápidas = mejores tasas de conversión
- ✅ **Ecosistema de E-commerce**: Gran biblioteca de integraciones (Stripe, Shopify, pasarelas de pago)
- ✅ **Optimización de Imágenes**: Optimización integrada para fotos de productos (crítico para e-commerce)
- ✅ **Autenticación**: Fácil integración con NextAuth.js para cuentas de clientes
- ✅ **API Routes**: Backend integrado para lógica de carrito y checkout
- ✅ **Páginas Híbridas**: Puede mezclar páginas estáticas (categorías) con páginas dinámicas (productos)
- ✅ **Ecosistema React**: Comunidad masiva y bibliotecas de componentes

**¿Qué Pasa con la Complejidad?**
- Sí, Storefront tiene muchas características (tienda + portal combinados)
- Pero Next.js sobresale en este tipo de complejidad: páginas públicas + autenticadas en una app
- El framework está **diseñado** exactamente para este caso de uso

---

#### 👔 Admin = Angular ✅

**Razón Principal: Operaciones Internas de Grado Empresarial**
- Las herramientas Admin son **solo internas** - el SEO no importa
- El enfoque está en **flujos de trabajo complejos**, **gestión de datos** y **escalabilidad**
- La estructura con opinión de Angular es perfecta para aplicaciones internas grandes y mantenibles

**Ventajas Adicionales:**
- ✅ **TypeScript Nativo**: Tipado fuerte reduce errores en lógica de negocio compleja (inventario, pedidos, contabilidad)
- ✅ **Inyección de Dependencias**: DI integrado hace aplicaciones grandes más mantenibles
- ✅ **Integración RxJS**: Perfecto para flujos de datos en tiempo real (actualizaciones de inventario, notificaciones de pedidos)
- ✅ **Arquitectura Modular**: Fácil de organizar por característica (módulo de productos, módulo de pedidos, módulo de análisis)
- ✅ **Lazy Loading**: Cargar solo módulos necesarios (mejora rendimiento para el personal)
- ✅ **Angular Material**: Componentes UI consistentes y profesionales para herramientas internas
- ✅ **Manejo de Formularios**: Potentes formularios reactivos para entrada de datos compleja
- ✅ **Testing**: Excelentes herramientas de testing integradas (importante para operaciones críticas del negocio)

**¿Qué Pasa con la Complejidad?**
- Admin tiene muchas características internas (inventario, pedidos, análisis, gestión de usuarios)
- Angular fue literalmente **diseñado** para este tipo de aplicación empresarial
- Empresas como Google usan Angular para herramientas internas por una buena razón

---

### ¿Podríamos Intercambiarlas?

**Alternativa: Storefront = Angular, Admin = Next.js**

**Por Qué Esto Estaría Mal:**
- ❌ **Desastre de SEO**: Angular requiere Angular Universal para SEO - complejidad extra
- ❌ **Rendimiento**: Cargas iniciales más lentas para clientes (malo para ventas)
- ❌ **Fortalezas Desperdiciadas**: La fortaleza principal de Next.js (SEO) desperdiciada en herramientas internas que no lo necesitan
- ❌ **Ajuste no Natural**: Next.js está diseñado para sitios públicos, no paneles internos complejos
- ❌ **Ecosistema Más Pequeño**: Menos bibliotecas de panel admin para Next.js vs Angular

---

### Resumen: Herramienta Correcta para el Trabajo Correcto

| Criterio | Storefront (Next.js) | Admin (Angular) |
|----------|---------------------|-----------------|
| **¿SEO Requerido?** | ✅ SÍ - Crítico | ❌ NO - Solo interno |
| **¿De Cara al Público?** | ✅ SÍ | ❌ NO |
| **Tipo de Usuario** | Clientes (cualquiera) | Personal (usuarios entrenados) |
| **Objetivo Principal** | Convertir visitantes en compradores | Operaciones eficientes |
| **Prioridad de Rendimiento** | Cargas de página rápidas | Interacciones ricas |
| **Mejor Framework** | Next.js | Angular |

**La decisión se basa en la diferencia fundamental entre estas aplicaciones:**
- **Storefront** = Público, crítico para SEO, e-commerce de cara al cliente
- **Admin** = Privado, interno, operaciones empresariales complejas

Cada framework se está usando para **exactamente** lo que fue diseñado.

---

## Resumen Tecnológico

### Todas las Tecnologías Utilizadas ✓
- **Vue.js**: Landing (sitio de marketing y contenido)
- **Next.js**: Storefront (tienda de e-commerce + portal de clientes)
- **Angular**: Admin (operaciones internas)
- **React**: Incluido vía Next.js (Storefront)
- **Express.js**: Core (API backend unificada)

### Distribución de Tecnologías

| Aplicación | Tecnología | Justificación |
|------------|-----------|-----------|
| **Landing** | Vue.js | Ligero, perfecto para sitio de marketing con mucho contenido y blogs |
| **Storefront** | Next.js | SEO y rendimiento de mejor clase para páginas de productos + autenticación integrada para portal de clientes |
| **Admin** | Angular | Estructura de grado empresarial para operaciones internas complejas |
| **Core** | Express.js | Backend flexible y de alto rendimiento que sirve a todas las aplicaciones |

### Beneficios de Este Enfoque
1. **Separación Clara**:
   - Landing = Marketing y contenido
   - Storefront = Compras + cuentas de clientes (todo en uno)
   - Admin = Operaciones internas
   - Core = Backend unificado
2. **Selección Óptima de Tecnología**: Cada app usa el framework más adecuado para su propósito
3. **Escalado Independiente**: Marketing, compras y tráfico de admin escalan por separado
4. **Especialización de Equipo**: Equipo de marketing (Landing), equipo de producto (Storefront), equipo de ops (Admin)
5. **Experiencia Unificada del Cliente**: Storefront combina compras y gestión de cuenta sin problemas
6. **Backend Compartido**: Express.js Core proporciona API consistente para todas las aplicaciones

### Por Qué Storefront Combina Compras + Portal
- **UX Sin Fisuras**: Los usuarios no tienen que cambiar entre sitios separados
- **Carrito Compartido**: El carrito persiste estés o no conectado
- **Checkout Más Rápido**: Los usuarios conectados tienen información guardada lista
- **Código Base Único**: Más fácil mantener una app Next.js que tienda y portal separados
- **Mejor SEO**: Todas las páginas de productos y cuenta bajo un dominio
- **Fortalezas de Next.js**: Perfecto tanto para páginas públicas (SSR) como páginas autenticadas (rutas protegidas)

### Consideraciones Potenciales
- **Múltiples Frameworks**: El equipo necesita conocimiento en Vue, React/Next y Angular
- **Reusabilidad de Código**: Compartir componentes limitado entre diferentes frameworks
- **Mantenimiento**: Se requiere experiencia más amplia en toda la pila tecnológica
- **Solución**: Usar estructura monorepo (como Nx o Turborepo) y tipos/interfaces TypeScript compartidos para consistencia

---

## Arquitectura

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│     Landing     │      │   Storefront    │      │     Admin       │
│    (Vue.js)     │      │   (Next.js)     │      │   (Angular)     │
│                 │      │                 │      │                 │
│ - Marketing     │      │ - E-commerce    │      │ - Operaciones   │
│ - Blog/Contenido│      │ - Carrito       │      │ - Inventario    │
│ - Contenido SEO │      │ - Portal de     │      │ - Análisis      │
│                 │      │   Clientes      │      │ - Gestión       │
└────────┬────────┘      └────────┬────────┘      └────────┬────────┘
         │                        │                         │
         │         HTTP/REST API (JSON)                     │
         │                        │                         │
         └────────────────────────┼─────────────────────────┘
                                  │
                                  ▼
                      ┌───────────────────────┐
                      │        Core           │
                      │     (Express.js)      │
                      │                       │
                      │  - REST APIs          │
                      │  - Autenticación      │
                      │  - Lógica de Negocio  │
                      │  - Database ORM       │
                      │  - Pasarela de Pagos  │
                      │  - Servicios Email    │
                      │  - Integraciones      │
                      └──────────┬────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │  Base de Datos  │
                        │  (PostgreSQL/   │
                        │   MongoDB)      │
                        └─────────────────┘
```

---

## Comenzando

_(Documentación para configurar y ejecutar cada aplicación)_

---

## Soporte

Para soporte técnico o consultas comerciales, por favor contacte al equipo de desarrollo de Limarpoo EIRL.

---

**© 2026 Limarpoo EIRL. Todos los derechos reservados.**
