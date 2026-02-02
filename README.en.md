# Limarpoo EIRL - E-commerce Platform

## Overview

Limarpoo EIRL is a comprehensive e-commerce platform designed to manage online retail operations, including store management, sales processing, inventory tracking, and customer interactions. The platform is built on a modular architecture consisting of four main applications.

---

## Applications

### 🏠 Landing (Marketing Website)

**Technology:** Vue.js

**Purpose:** Public marketing and content website

The Landing is the **main marketing website** that introduces visitors to Limarpoo EIRL. This is where people learn about the company, read content, and get interested in shopping. Key features include:

- **Homepage** - Company introduction and value proposition
- **About Us** - Company history, mission, values, team
- **Blog/Articles** - Content marketing, industry news, how-to guides
- **Contact page** - Get in touch with the company
- **FAQ section** - Common questions and answers
- **Company announcements** - News and updates
- **SEO content pages** - Educational content to attract organic traffic
- **Responsive design** - Works on all devices

**Target Users:**
- **New visitors** learning about Limarpoo EIRL
- **Content readers** interested in blog articles
- **People researching** before they decide to shop

**User Journey Example:**
1. User searches "best practices for online shopping"
2. Lands on Limarpoo EIRL blog article
3. Reads about the company
4. Clicks "Shop Now" → redirected to Storefront

**Why Vue.js?**
- **Progressive Framework**: Easy to create dynamic content pages and interactive elements
- **Lightweight**: Fast loading for content-heavy pages with blogs and articles
- **Component-Based**: Reusable components for blog posts, testimonials, FAQ sections
- **Gentle Learning Curve**: Easier for content managers and marketing team to work with
- **Great for SPAs**: Smooth navigation between pages without full reloads

**Key Technical Features:**
- Vue Router for page navigation
- Content management integration (headless CMS)
- Blog post rendering with markdown support
- Contact form with validation
- Newsletter subscription integration
- Social media feed integration

---

### 🛒 Storefront (E-commerce Shop + Customer Portal)

**Technology:** Next.js (React-based)

**Purpose:** Complete e-commerce platform for shopping and account management

The Storefront is the **comprehensive shopping and account management platform** that handles both public shopping and authenticated customer portal features in one unified application. Key features include:

**Public Shopping Features (No Login Required):**
- **Product catalog** - Browse all available products
- **Product search and filtering** - Find products by category, price, brand
- **Product detail pages** - Images, descriptions, specifications, reviews
- **Shopping cart** - Add items and manage quantities
- **Guest checkout** - Purchase without creating an account
- **Customer reviews and ratings** - Product feedback
- **Inventory availability** - Real-time stock status
- **Responsive design** - Mobile-friendly shopping experience

**Authenticated Portal Features (Login Required):**
- **Personal dashboard** - Overview of account and recent activity
- **Order history and tracking** - View all past purchases and track shipments
- **Order details and invoices** - Download receipts, view order status
- **Saved shipping addresses** - Manage multiple delivery locations
- **Saved payment methods** - Securely store cards for faster checkout
- **Wishlist management** - Save products for later purchase
- **Account settings** - Update profile, password, preferences
- **Support tickets** - Contact customer service about orders
- **Loyalty points/rewards** - Track accumulated points and benefits
- **Return and refund requests** - Initiate product returns

**Target Users:**
- **Anonymous visitors** browsing products
- **Guest buyers** making one-time purchases
- **Registered customers** shopping and managing accounts
- **Repeat buyers** with saved preferences and order history

**User Journey Examples:**

*Guest Shopping:*
1. Visitor browses product categories
2. Views product details, reads reviews
3. Adds items to cart
4. Checks out as guest
5. Completes purchase

*Registered Customer:*
1. Logs into account
2. Sees personalized recommendations and wishlist
3. Adds items to cart with saved payment info
4. Completes checkout faster with saved addresses
5. Tracks order from account dashboard

**Why Next.js?**
- **SEO Optimization**: Server-side rendering (SSR) ensures product pages rank well in search engines - critical for e-commerce
- **Unified Experience**: Single application handles both shopping and account management seamlessly
- **Performance**: Automatic code splitting loads only what's needed (shop pages vs account pages)
- **Built on React**: Large ecosystem of e-commerce and authentication libraries
- **API Routes**: Built-in backend for cart, checkout, and account operations
- **Authentication**: Easy integration with NextAuth.js for user sessions
- **Dynamic Routing**: Perfect for products (/product/[id]), categories, and account pages (/account/orders)

**Key Technical Features:**
- Server-side rendering for product listings (SEO boost)
- Static generation for category pages (extremely fast)
- Protected routes for account pages (authentication required)
- Shopping cart state management (guest and authenticated)
- User session management with JWT tokens
- Payment gateway integration (Stripe, PayPal)
- Order management system (view, track, download invoices)
- Wishlist and saved items functionality
- Address and payment method storage
- Email notifications for orders and account updates
- Image optimization for product photos
- SEO meta tags and structured data (Google Shopping)

---

### 👔 Admin (Internal Management)

**Technology:** Angular

**Purpose:** Internal management and operations dashboard

The Admin application is designed for Limarpoo EIRL's internal team to manage all aspects of the e-commerce business. Key features include:

- Product catalog management (add, edit, delete products)
- Inventory control and stock counting
- Order processing and fulfillment tracking
- Sales reporting and analytics
- Customer management and support
- Pricing and discount configuration
- Content management for the storefront
- User role and permission management
- Financial reporting and accounting integration

**Target Users:** Store managers, administrators, warehouse staff, and internal operations team

**Why Angular?**
- **Enterprise-Ready**: Opinionated structure ideal for complex internal dashboards
- **TypeScript Native**: Strong typing reduces bugs in complex business logic
- **Built-in Features**: Routing, forms, HTTP client, and dependency injection out of the box
- **RxJS Integration**: Excellent for handling complex data streams (inventory updates, real-time orders)
- **Scalability**: Perfect for large applications with many modules

**Key Technical Features:**
- Reactive forms for complex data entry
- Lazy loading modules for performance
- Angular Material for consistent UI components
- RxJS for real-time data updates
- Role-based access control (RBAC)

---

### ⚙️ Core (The Backend)

**Technology:** Express.js (Node.js)

**Purpose:** Central business logic and data management system

The Core serves as the backbone of the entire platform, providing APIs and services that power all other applications. Responsibilities include:

- RESTful API endpoints for all applications
- Business logic implementation
- Database management and data persistence
- Authentication and authorization services
- Payment processing integration
- Email and notification services
- Inventory synchronization
- Order processing workflows
- Integration with third-party services (shipping, payments, analytics)
- Security and data protection
- Performance optimization and caching

**Target Users:** All applications (Storefront, Admin, Portal) consume services from Core

**Why Express.js?**
- **Lightweight & Flexible**: Minimal overhead for building RESTful APIs
- **Middleware Ecosystem**: Extensive plugins for authentication, validation, logging
- **Node.js Runtime**: JavaScript across the entire stack for consistency
- **Scalable**: Easy to structure as microservices if needed
- **Performance**: Non-blocking I/O perfect for handling multiple concurrent requests

**Key Technical Features:**
- RESTful API endpoints for all applications
- JWT authentication middleware
- Database integration (MongoDB with Mongoose or PostgreSQL with Sequelize)
- Payment gateway integrations (Stripe, PayPal, etc.)
- Email service integration (SendGrid, AWS SES)
- Request validation and error handling
- Rate limiting and security middleware

---

## Application Comparison

Understanding how the three main applications work together:

| Aspect | 🏠 Landing (Vue.js) | 🛒 Storefront (Next.js) | 👔 Admin (Angular) |
|--------|---------------------|------------------------|---------------------|
| **Access** | Public - No login | Public + Authenticated | Private - Admin only |
| **Primary Purpose** | Marketing & Content | Shop + Account Management | Internal Operations |
| **Main Users** | New visitors, readers | Shoppers & customers | Staff & managers |
| **Key Actions** | Read blogs, learn | Browse, buy, manage orders | Manage inventory, orders |
| **SEO Important?** | YES - Content marketing | YES - Product pages | NO - Internal only |
| **Has Products?** | ❌ No products | ✅ Full catalog + cart | ✅ Manage products |
| **Has Shopping?** | ❌ No shopping | ✅ Full e-commerce | ❌ No shopping |
| **Has Blog/Content?** | ✅ Blog, news, articles | ❌ Product-focused | ❌ No content |
| **Account Management?** | ❌ No accounts | ✅ Customer portal built-in | ✅ Admin accounts |
| **Example URL** | `limarpoo.com/blog/article` | `shop.limarpoo.com/products` <br> `shop.limarpoo.com/account/orders` | `admin.limarpoo.com/inventory` |

**The Customer Journey:**
1. **Discover** (Landing) → Learn about Limarpoo EIRL through blog or homepage
2. **Shop** (Storefront - Public) → Browse products and add to cart
3. **Buy** (Storefront - Checkout) → Complete purchase
4. **Manage** (Storefront - Account Portal) → Track order, view history, update profile

**Why This Structure?**
1. **Separation of concerns**: Marketing (Landing) vs Commerce (Storefront) vs Operations (Admin)
2. **Optimal technologies**: Vue for content, Next.js for e-commerce, Angular for enterprise operations
3. **Better performance**: Each optimized for its specific use case
4. **Clear roles**: Marketing team (Landing), Product team (Storefront), Operations team (Admin)
5. **Independent scaling**: Different traffic patterns for each application

---

## Architecture

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│     Landing     │      │   Storefront    │      │     Admin       │
│    (Vue.js)     │      │   (Next.js)     │      │   (Angular)     │
│                 │      │                 │      │                 │
│ - Marketing     │      │ - E-commerce    │      │ - Operations    │
│ - Blog/Content  │      │ - Shopping Cart │      │ - Inventory     │
│ - SEO Content   │      │ - Customer      │      │ - Analytics     │
│                 │      │   Portal        │      │ - Management    │
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
                      │  - Authentication     │
                      │  - Business Logic     │
                      │  - Database ORM       │
                      │  - Payment Gateway    │
                      │  - Email Services     │
                      │  - Integrations       │
                      └──────────┬────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │    Database     │
                        │  (PostgreSQL/   │
                        │   MongoDB)      │
                        └─────────────────┘
```

---

## Technology Decision Rationale

### Why Next.js for Storefront? Why Angular for Admin?

Both applications have complex functionality, but they serve fundamentally different purposes. Here's why we chose these specific technologies:

#### 🛒 Storefront = Next.js ✅

**Primary Reason: SEO is Critical**
- E-commerce sites **MUST** rank in Google search results
- Customers find products through search engines ("buy wireless headphones", "best laptops 2026")
- Next.js provides **best-in-class SEO** with Server-Side Rendering (SSR) and Static Site Generation (SSG)
- Angular CAN do SEO (with Angular Universal), but requires extra configuration and complexity
- **This alone is the deciding factor for customer-facing e-commerce**

**Additional Advantages:**
- ✅ **Performance**: Automatic code splitting = faster page loads = better conversion rates
- ✅ **E-commerce Ecosystem**: Large library of integrations (Stripe, Shopify, payment gateways)
- ✅ **Image Optimization**: Built-in optimization for product photos (critical for e-commerce)
- ✅ **Authentication**: Easy integration with NextAuth.js for customer accounts
- ✅ **API Routes**: Built-in backend for cart and checkout logic
- ✅ **Hybrid Pages**: Can mix static pages (categories) with dynamic pages (products)
- ✅ **React Ecosystem**: Massive community and component libraries

**What About Complexity?**
- Yes, Storefront has many features (shop + portal combined)
- But Next.js excels at this type of complexity: public + authenticated pages in one app
- The framework is **designed** for exactly this use case

---

#### 👔 Admin = Angular ✅

**Primary Reason: Enterprise-Grade Internal Operations**
- Admin tools are **internal only** - SEO doesn't matter
- Focus is on **complex workflows**, **data management**, and **scalability**
- Angular's opinionated structure is perfect for large, maintainable internal applications

**Additional Advantages:**
- ✅ **TypeScript Native**: Strong typing reduces bugs in complex business logic (inventory, orders, accounting)
- ✅ **Dependency Injection**: Built-in DI makes large applications more maintainable
- ✅ **RxJS Integration**: Perfect for real-time data streams (inventory updates, order notifications)
- ✅ **Modular Architecture**: Easy to organize by feature (products module, orders module, analytics module)
- ✅ **Lazy Loading**: Load only needed modules (improves performance for staff)
- ✅ **Angular Material**: Consistent, professional UI components for internal tools
- ✅ **Form Handling**: Powerful reactive forms for complex data entry
- ✅ **Testing**: Excellent testing tools built-in (important for business-critical operations)

**What About Complexity?**
- Admin has many internal features (inventory, orders, analytics, user management)
- Angular was literally **designed** for this type of enterprise application
- Companies like Google use Angular for internal tools for good reason

---

### Could We Swap Them?

**Alternative: Storefront = Angular, Admin = Next.js**

**Why This Would Be Wrong:**
- ❌ **SEO Disaster**: Angular requires Angular Universal for SEO - extra complexity
- ❌ **Performance**: Slower initial loads for customers (bad for sales)
- ❌ **Wasted Strengths**: Next.js's main strength (SEO) wasted on internal tools that don't need it
- ❌ **Unnatural Fit**: Next.js is designed for public sites, not complex internal dashboards
- ❌ **Smaller Ecosystem**: Fewer admin dashboard libraries for Next.js vs Angular

---

### Summary: Right Tool for the Right Job

| Criteria | Storefront (Next.js) | Admin (Angular) |
|----------|---------------------|-----------------|
| **SEO Required?** | ✅ YES - Critical | ❌ NO - Internal only |
| **Public Facing?** | ✅ YES | ❌ NO |
| **User Type** | Customers (anyone) | Staff (trained users) |
| **Primary Goal** | Convert visitors to buyers | Efficient operations |
| **Performance Priority** | Fast page loads | Rich interactions |
| **Best Framework** | Next.js | Angular |

**The decision is based on the fundamental difference between these applications:**
- **Storefront** = Public, SEO-critical, customer-facing e-commerce
- **Admin** = Private, internal, complex enterprise operations

Each framework is being used for **exactly** what it was designed for.

---

## Technology Summary

### All Technologies Utilized ✓
- **Vue.js**: Landing (marketing & content site)
- **Next.js**: Storefront (e-commerce shop + customer portal)
- **Angular**: Admin (internal operations)
- **React**: Included via Next.js (Storefront)
- **Express.js**: Core (unified backend API)

### Technology Distribution

| Application | Technology | Rationale |
|------------|-----------|-----------|
| **Landing** | Vue.js | Lightweight, perfect for content-heavy marketing site with blogs |
| **Storefront** | Next.js | Best-in-class SEO and performance for product pages + built-in auth for customer portal |
| **Admin** | Angular | Enterprise-grade structure for complex internal operations |
| **Core** | Express.js | Flexible, performant backend serving all applications |

### Benefits of This Approach
1. **Clear Separation**:
   - Landing = Marketing & content
   - Storefront = Shopping + customer accounts (all-in-one)
   - Admin = Internal operations
   - Core = Unified backend
2. **Optimal Technology Selection**: Each app uses the framework best suited for its purpose
3. **Independent Scaling**: Marketing, shopping, and admin traffic scale separately
4. **Team Specialization**: Marketing team (Landing), product team (Storefront), ops team (Admin)
5. **Unified Customer Experience**: Storefront combines shopping and account management seamlessly
6. **Shared Backend**: Express.js Core provides consistent API for all applications

### Why Storefront Combines Shopping + Portal
- **Seamless UX**: Users don't have to switch between separate sites
- **Shared Cart**: Cart persists whether logged in or not
- **Faster Checkout**: Logged-in users have saved info ready
- **Single Codebase**: Easier to maintain one Next.js app than separate shop and portal
- **Better SEO**: All product and account pages under one domain
- **Next.js Strengths**: Perfect for both public pages (SSR) and authenticated pages (protected routes)

### Potential Considerations
- **Multiple Frameworks**: Team needs knowledge across Vue, React/Next, and Angular
- **Code Reusability**: Limited component sharing between different frameworks
- **Maintenance**: Broader expertise required across the tech stack
- **Solution**: Use monorepo structure (like Nx or Turborepo) and shared TypeScript types/interfaces for consistency

---

## Getting Started

_(Documentation for setting up and running each application)_

---

## Support

For technical support or business inquiries, please contact Limarpoo EIRL's development team.

---

**© 2026 Limarpoo EIRL. All rights reserved.**
