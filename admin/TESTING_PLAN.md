# Admin Panel Testing Plan

## Overview

This document outlines the testing strategy for the Limarpoo E-commerce Admin Panel MVP. It includes manual testing checklists and Playwright automation test structure for future implementation.

**Test Environment:**
- Admin App: `http://localhost:4200`
- Backend API: `http://localhost:3000/api/v1`

---

## 1. Environment Setup

### Prerequisites
```bash
# Terminal 1: Start Backend Service
cd core
npm run dev
# Expected: Server running on http://localhost:3000

# Terminal 2: Start Admin App
cd admin
npm start
# Expected: App running on http://localhost:4200
```

### Test Credentials
```
Email: admin@example.com
Password: admin123
Role: ADMIN
```

---

## 2. Manual Testing Checklist

### 2.1 Authentication & Security

#### Login Flow
- [ ] Navigate to `http://localhost:4200/login`
- [ ] See professional login form with email and password fields
- [ ] Test invalid credentials (wrong email/password)
  - [ ] Error toast appears: "Error: Invalid credentials"
  - [ ] Form remains active
  - [ ] Can retry login
- [ ] Test valid credentials
  - [ ] Success toast: "Login successful!"
  - [ ] Redirected to `/catalog` (default dashboard)
  - [ ] JWT token stored in localStorage
  - [ ] User email displayed in top navbar

#### Session Management
- [ ] Refresh page while logged in
  - [ ] Session persists
  - [ ] User still logged in
  - [ ] Token still valid
- [ ] Click logout button (user dropdown in navbar)
  - [ ] LocalStorage cleared
  - [ ] Redirected to `/login`
  - [ ] Cannot access protected routes
- [ ] Try to access `/catalog` without login
  - [ ] Redirected to `/login?returnUrl=/catalog`
  - [ ] After login, redirected back to `/catalog`

#### Route Protection
- [ ] All admin routes protected by authGuard
- [ ] Direct URL access without token redirects to login
- [ ] Trying to modify URL doesn't bypass authentication

---

### 2.2 Product Management (Catalog)

#### Product List (`/catalog`)
- [ ] Page loads with spinner initially
- [ ] Products load and display in table
- [ ] Table shows: #, ID, Name, SKU, Category, Price, Stock, Status, Actions
- [ ] Stock levels color-coded:
  - [ ] Green for stock > 10
  - [ ] Yellow for 0 < stock <= 10
  - [ ] Red for stock = 0
- [ ] Can click edit button → navigates to product detail
- [ ] Can click delete button → confirmation modal appears
- [ ] Confirm delete → success toast + product removed from list
- [ ] Click "Nuevo Producto" button → navigates to `/catalog/new`
- [ ] Empty state displays when no products exist
- [ ] Error state shows retry button on API failure

#### Product Detail (`/catalog/:id` or `/catalog/new`)
- [ ] Create Mode
  - [ ] Form empty with all fields required
  - [ ] Can fill in: Name, SKU, Price, Stock, Description, Category
  - [ ] Submit button disabled until form valid
  - [ ] On save: success toast + redirects to `/catalog`
  - [ ] New product appears in list
- [ ] Edit Mode
  - [ ] Form pre-populated with product data
  - [ ] Can modify all fields
  - [ ] On save: success toast + redirects to `/catalog`
  - [ ] Changes reflected in product list
- [ ] Form Validation
  - [ ] Required fields show error on blur
  - [ ] Price/Stock must be >= 0
  - [ ] SKU must be unique
  - [ ] Category selection required
- [ ] Category Dropdown
  - [ ] Shows all available categories
  - [ ] Can select category
- [ ] Error Handling
  - [ ] Duplicate SKU shows error toast
  - [ ] Invalid category shows error
  - [ ] API error shows error toast with retry

---

### 2.3 Order Management

#### Order List (`/orders`)
- [ ] Page loads with spinner
- [ ] Orders display in table with real data
- [ ] Table shows: Order ID, Customer Email, Date, Total, Status, Payment Status, Actions
- [ ] Status badges color-coded:
  - [ ] Yellow: PENDING
  - [ ] Blue: SHIPPED
  - [ ] Green: DELIVERED
  - [ ] Red: CANCELLED
- [ ] Payment status shows:
  - [ ] Green badge if payment received
  - [ ] Gray badge if pending
- [ ] Click "Ver" button → navigates to order detail
- [ ] Customer email displays (not just ID)
- [ ] Dates formatted as DD/MM/YYYY
- [ ] Empty state if no orders

#### Order Detail (`/orders/:id`)
- [ ] Page loads with spinner
- [ ] Shows order ID and creation date
- [ ] Customer Section
  - [ ] Shows customer email
  - [ ] Shows customer ID
- [ ] Order Items Section
  - [ ] Real order items display (not mock data!)
  - [ ] Shows product name, SKU, quantity, unit price
  - [ ] Subtotal calculated correctly (qty × price)
  - [ ] Total sum matches order total_amount
- [ ] Shipping Address Section
  - [ ] Shows street, city, zip code, country
  - [ ] All address fields populated
- [ ] Payment Information Section
  - [ ] Shows payment provider (STRIPE/PAYPAL)
  - [ ] Shows transaction ID
  - [ ] Shows payment status (PAID/PENDING)
  - [ ] Shows payment amount
- [ ] Status Update
  - [ ] Can select new status from dropdown
  - [ ] Update button works with loading indicator
  - [ ] Status updates on save
- [ ] Back button returns to order list

---

### 2.4 User Management

#### User List (`/users`)
- [ ] Page loads with spinner
- [ ] Users display in table
- [ ] Table shows: User Avatar, Name, Email, Role, Status, Actions
- [ ] Edit and Delete buttons present
- [ ] Real user data from backend
- [ ] Empty state if no users

#### Role Management (`/users/role-management`)
- [ ] Page loads with spinner
- [ ] Users display in table with their current roles
- [ ] Can select new role from dropdown for each user
- [ ] On role change: success toast "Role updated to [ROLE]"
- [ ] Role badges color-coded:
  - [ ] Red: ADMIN
  - [ ] Yellow: STAFF
  - [ ] Blue: CUSTOMER
- [ ] Role descriptions display at bottom
- [ ] Can update multiple users' roles

---

### 2.5 Customer Management

#### Customer List (`/customers`)
- [ ] Page loads with spinner
- [ ] Customers display in table
- [ ] Table shows: ID, Name, Email, Phone, Orders count, Join Date, Actions
- [ ] Click "Perfil" button → navigates to customer profile

#### Customer Profile (`/customers/:id`)
- [ ] Page loads with spinner
- [ ] Customer avatar with initial
- [ ] Shows customer name and join date
- [ ] Contact Information
  - [ ] Email displays
  - [ ] Phone displays (or N/A)
  - [ ] Total orders count
- [ ] Profile Information Card
  - [ ] Shows first name, last name
  - [ ] Shows phone number
- [ ] Addresses Section
  - [ ] Lists all user addresses
  - [ ] Default address highlighted with blue border
  - [ ] Shows: street, city, zip code, country
  - [ ] Empty state if no addresses
- [ ] Order History Table
  - [ ] Shows all customer orders
  - [ ] Can click order ID to view order detail
  - [ ] Shows date, total, status for each order

---

### 2.6 Content Management (Articles)

#### Content Dashboard (`/content`)
- [ ] Page loads with spinner
- [ ] Articles display in table with real data
- [ ] Table shows: Title, Author Email, Published Date, Actions
- [ ] Can edit articles (pencil button)
- [ ] Can delete articles (trash button)
  - [ ] Confirmation dialog appears
  - [ ] On delete: success toast + removed from list
- [ ] Click "Nuevo Artículo" → navigates to `/content/new`
- [ ] Empty state if no articles

#### Content Editor (`/content/new` or `/content/:id/edit`)
- [ ] Create Mode
  - [ ] Title field required, min 3 chars
  - [ ] Content field required, min 10 chars
  - [ ] Submit disabled until valid
  - [ ] On save: success toast + redirects to `/content`
- [ ] Edit Mode
  - [ ] Form pre-populated with article data
  - [ ] Can modify title and content
  - [ ] On save: success toast + redirects to `/content`
- [ ] Form Validation
  - [ ] Error messages on invalid fields
  - [ ] Cannot submit if invalid
- [ ] Cancel button returns to content dashboard
- [ ] Author automatically set to current user

---

### 2.7 Stock/Inventory

#### Stock List (`/inventory`)
- [ ] Page loads with spinner
- [ ] Products display with stock levels
- [ ] Table shows: Product, SKU, Category, Stock Quantity, Stock Status, Actions
- [ ] Stock Status badges:
  - [ ] Green: "En Stock" (> 10 units)
  - [ ] Yellow: "Stock Bajo" (1-10 units)
  - [ ] Red: "Sin Stock" (0 units)
- [ ] Real product data from ProductService

---

### 2.8 Reports & Analytics

#### Sales Analytics (`/reports`)
- [ ] Page loads with spinner
- [ ] Shows 5 stat cards:
  - [ ] Total Revenue (Monthly)
  - [ ] Total Orders
  - [ ] Total Customers
  - [ ] Average Order Value
  - [ ] Pending Orders
- [ ] All numbers calculate from real backend data
- [ ] Refresh button updates stats
- [ ] Charts placeholder visible

---

### 2.9 UI/UX & Notifications

#### Loading States
- [ ] Every list page shows spinner while loading
- [ ] Buttons disabled during API calls
- [ ] "Nuevo/Crear" buttons disabled while loading

#### Success Notifications (Toasts)
- [ ] Product created: "Product created successfully"
- [ ] Product updated: "Product updated successfully"
- [ ] Product deleted: "Product deleted successfully"
- [ ] Article created: "Article created successfully"
- [ ] Article updated: "Article updated successfully"
- [ ] Article deleted: "Article deleted successfully"
- [ ] Role updated: "Role updated to [ROLE]"
- [ ] Toasts auto-dismiss after 3-5 seconds

#### Error Notifications (Toasts)
- [ ] Invalid login: Error message displayed
- [ ] Network error: "Network error. Please check your connection."
- [ ] 500 error: "Server error. Please try again later."
- [ ] 403 error: "Access denied"
- [ ] 401 error: "Session expired. Please login again." + redirects to login
- [ ] API validation errors display specific message

#### Empty States
- [ ] All list pages show icon + message when empty
- [ ] "No [items] found" message for each module

#### Error States
- [ ] Retry button appears on API errors
- [ ] Clicking retry re-fetches data

---

### 2.10 Navigation & Routing

#### Sidebar Navigation
- [ ] Catalog link works
- [ ] Orders link works
- [ ] Users & Roles link works
- [ ] Customers link works
- [ ] Inventory link works
- [ ] Content link works
- [ ] Reports link works
- [ ] Current page highlighted in nav
- [ ] Support & Warehouse links NOT visible (hidden for MVP)

#### User Menu (Top Right)
- [ ] User email displays
- [ ] Dropdown menu opens
- [ ] Logout button visible
- [ ] Click logout → redirects to login

---

## 3. Playwright Test Structure (Future Implementation)

### Test File Organization
```
admin/e2e/
├── auth.spec.ts
├── products.spec.ts
├── orders.spec.ts
├── users.spec.ts
├── customers.spec.ts
├── content.spec.ts
├── inventory.spec.ts
├── reports.spec.ts
└── ui.spec.ts
```

### 3.1 Authentication Tests (`auth.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/login');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[id="email"]')).toBeVisible();
    await expect(page.locator('input[id="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should reject invalid credentials', async ({ page }) => {
    await page.fill('input[id="email"]', 'invalid@example.com');
    await page.fill('input[id="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('.alert-danger')).toBeVisible();
    expect(page.url()).toContain('/login');
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.fill('input[id="email"]', 'admin@example.com');
    await page.fill('input[id="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await expect(page.locator('[class*="spinner"]')).toBeHidden();
    expect(page.url()).toContain('/catalog');
  });

  test('should logout successfully', async ({ page }) => {
    // Login first
    await page.fill('input[id="email"]', 'admin@example.com');
    await page.fill('input[id="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/catalog');

    // Logout
    await page.click('button.dropdown-toggle'); // User menu
    await page.click('text=Logout');

    expect(page.url()).toContain('/login');
  });

  test('should persist session on page refresh', async ({ page, context }) => {
    // Login
    await page.fill('input[id="email"]', 'admin@example.com');
    await page.fill('input[id="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/catalog');

    // Refresh page
    await page.reload();

    // Should still be logged in
    expect(page.url()).toContain('/catalog');
  });

  test('should redirect unauthenticated users to login', async ({ page }) => {
    await page.goto('http://localhost:4200/catalog');

    expect(page.url()).toContain('/login');
  });
});
```

### 3.2 Product Management Tests (`products.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';

test.describe('Product Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('http://localhost:4200/login');
    await page.fill('input[id="email"]', 'admin@example.com');
    await page.fill('input[id="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/catalog');
  });

  test('should display product list with loading state', async ({ page }) => {
    // Should have loading spinner initially
    await expect(page.locator('[role="status"]')).toBeVisible();

    // Wait for products to load
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('[role="status"]')).toBeHidden();
  });

  test('should create a new product', async ({ page }) => {
    await page.click('text=Nuevo Producto');
    await page.waitForURL('**/catalog/new');

    // Fill form
    await page.fill('input[id="name"]', 'Test Product');
    await page.fill('input[id="sku"]', 'TEST-001');
    await page.fill('input[id="price"]', '99.99');
    await page.fill('input[id="stock_quantity"]', '100');
    await page.fill('textarea[id="description"]', 'Test product description');

    // Select category
    await page.selectOption('select[id="category_id"]', { index: 0 });

    // Submit
    await page.click('button[type="submit"]');

    // Verify success
    await expect(page.locator('text=Product created successfully')).toBeVisible();
    await page.waitForURL('**/catalog');
  });

  test('should update an existing product', async ({ page }) => {
    // Click edit on first product
    await page.click('button[title="Editar"]', { index: 0 });

    // Modify field
    await page.fill('input[id="name"]', 'Updated Product Name');

    // Submit
    await page.click('button[type="submit"]');

    // Verify success
    await expect(page.locator('text=Product updated successfully')).toBeVisible();
  });

  test('should delete a product', async ({ page }) => {
    // Click delete on first product
    await page.click('button[title="Eliminar"]', { index: 0 });

    // Confirm in modal
    await page.click('.modal button:has-text("Eliminar")');

    // Verify success
    await expect(page.locator('text=Product deleted successfully')).toBeVisible();
  });

  test('should show validation errors', async ({ page }) => {
    await page.click('text=Nuevo Producto');
    await page.waitForURL('**/catalog/new');

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Should not submit
    expect(page.url()).toContain('/catalog/new');
  });
});
```

### 3.3 Order Management Tests (`orders.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';

test.describe('Order Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('http://localhost:4200/login');
    await page.fill('input[id="email"]', 'admin@example.com');
    await page.fill('input[id="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/catalog');

    // Navigate to orders
    await page.click('text=Orders');
    await page.waitForURL('**/orders');
  });

  test('should display order list', async ({ page }) => {
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('tbody tr')).toBeTruthy();
  });

  test('should view order details with real data', async ({ page }) => {
    // Click first order
    await page.click('a:has-text("Ver")', { index: 0 });

    // Verify order detail page
    await expect(page.locator('h2')).toContainText('Pedido');

    // Verify order items section
    await expect(page.locator('h5:has-text("Artículos")')).toBeVisible();

    // Verify shipping address
    await expect(page.locator('h5:has-text("Dirección de Envío")')).toBeVisible();

    // Verify payment info
    await expect(page.locator('h5:has-text("Información de Pago")')).toBeVisible();
  });

  test('should display real order items', async ({ page }) => {
    // Navigate to first order
    await page.click('a:has-text("Ver")', { index: 0 });

    // Check for real product data (not mock)
    const items = await page.locator('tbody tr');
    const count = await items.count();

    expect(count).toBeGreaterThan(0);

    // Verify items have product names and prices
    const productName = await page.locator('td').first().textContent();
    expect(productName).toBeTruthy();
  });
});
```

### 3.4 User Management Tests (`users.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';

test.describe('User Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login and navigate to users
    await page.goto('http://localhost:4200/login');
    await page.fill('input[id="email"]', 'admin@example.com');
    await page.fill('input[id="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/catalog');

    await page.click('text=Users & Roles');
    await page.waitForURL('**/users');
  });

  test('should display users list', async ({ page }) => {
    await expect(page.locator('table')).toBeVisible();
  });

  test('should update user role', async ({ page }) => {
    await page.click('text=role-management');
    await page.waitForURL('**/role-management');

    // Select new role
    const roleSelect = page.locator('select').first();
    await roleSelect.selectOption('STAFF');

    // Verify success
    await expect(page.locator('text=Role updated')).toBeVisible();
  });
});
```

### 3.5 Content Management Tests (`content.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';

test.describe('Content Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('http://localhost:4200/login');
    await page.fill('input[id="email"]', 'admin@example.com');
    await page.fill('input[id="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/catalog');

    // Navigate to content
    await page.click('text=Content');
    await page.waitForURL('**/content');
  });

  test('should display articles list', async ({ page }) => {
    await expect(page.locator('table')).toBeVisible();
  });

  test('should create a new article', async ({ page }) => {
    await page.click('text=Nuevo Artículo');
    await page.waitForURL('**/content/new');

    // Fill form
    await page.fill('input[id="title"]', 'Test Article');
    await page.fill('textarea[id="content"]', 'Test article content with minimum 10 characters');

    // Submit
    await page.click('button:has-text("Crear Artículo")');

    // Verify success
    await expect(page.locator('text=Article created successfully')).toBeVisible();
    await page.waitForURL('**/content');
  });

  test('should edit an article', async ({ page }) => {
    // Click edit on first article
    await page.click('button i.bi-pencil', { index: 0 });

    // Modify content
    await page.fill('input[id="title"]', 'Updated Title');

    // Submit
    await page.click('button[type="submit"]');

    // Verify success
    await expect(page.locator('text=Article updated successfully')).toBeVisible();
  });

  test('should delete an article', async ({ page }) => {
    // Click delete
    await page.click('button i.bi-trash', { index: 0 });

    // Confirm in dialog
    await page.click('button:has-text("Eliminar")');

    // Verify success
    await expect(page.locator('text=Article deleted successfully')).toBeVisible();
  });
});
```

### 3.6 Customer Management Tests (`customers.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';

test.describe('Customer Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login and navigate to customers
    await page.goto('http://localhost:4200/login');
    await page.fill('input[id="email"]', 'admin@example.com');
    await page.fill('input[id="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/catalog');

    await page.click('text=Customers');
    await page.waitForURL('**/customers');
  });

  test('should display customers list', async ({ page }) => {
    await expect(page.locator('table')).toBeVisible();
  });

  test('should view customer profile with addresses', async ({ page }) => {
    // Click on first customer profile
    await page.click('a:has-text("Perfil")', { index: 0 });

    // Verify profile loaded
    await expect(page.locator('h2')).toBeVisible();

    // Verify addresses section
    await expect(page.locator('h5:has-text("Direcciones")')).toBeVisible();

    // Verify profile information
    await expect(page.locator('h5:has-text("Información del Perfil")')).toBeVisible();
  });

  test('should display customer orders', async ({ page }) => {
    // Navigate to customer profile
    await page.click('a:has-text("Perfil")', { index: 0 });

    // Verify orders table
    await expect(page.locator('h5:has-text("Historial de Pedidos")')).toBeVisible();
  });
});
```

### 3.7 UI/UX Tests (`ui.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';

test.describe('UI/UX', () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('http://localhost:4200/login');
    await page.fill('input[id="email"]', 'admin@example.com');
    await page.fill('input[id="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/catalog');
  });

  test('should display toast notifications on success', async ({ page }) => {
    await page.click('text=Nuevo Producto');
    await page.waitForURL('**/catalog/new');

    // Fill and submit form
    await page.fill('input[id="name"]', 'Test');
    await page.fill('input[id="sku"]', 'TEST-' + Date.now());
    await page.fill('input[id="price"]', '99');
    await page.fill('input[id="stock_quantity"]', '10');
    await page.fill('textarea[id="description"]', 'Description');
    await page.selectOption('select[id="category_id"]', { index: 0 });
    await page.click('button[type="submit"]');

    // Toast should appear
    await expect(page.locator('.toast')).toBeVisible();
    await expect(page.locator('text=successfully')).toBeVisible();
  });

  test('should navigate sidebar links', async ({ page }) => {
    // Test all navigation links
    await page.click('text=Orders');
    await expect(page.url()).toContain('/orders');

    await page.click('text=Customers');
    await expect(page.url()).toContain('/customers');

    await page.click('text=Users');
    await expect(page.url()).toContain('/users');

    await page.click('text=Content');
    await expect(page.url()).toContain('/content');

    await page.click('text=Catalog');
    await expect(page.url()).toContain('/catalog');
  });

  test('should show loading spinners', async ({ page }) => {
    // Navigate to page (spinner should appear briefly)
    await page.goto('http://localhost:4200/orders');

    // Spinner should be visible initially
    await expect(page.locator('[role="status"]')).toBeVisible();

    // Should disappear after loading
    await expect(page.locator('[role="status"]')).toBeHidden({ timeout: 5000 });
  });

  test('should show error states with retry', async ({ page }) => {
    // Simulate network error by going offline (requires Playwright context)
    // This is a placeholder - actual implementation would use offline simulation

    await page.goto('http://localhost:4200/orders');
    // Error handling would need to be tested with actual error scenarios
  });
});
```

---

## 4. Running Tests

### Manual Testing
Follow the manual testing checklist above in sequence.

### Automated Testing (Future)
```bash
# Install Playwright
npm install -D @playwright/test

# Create playwright.config.ts
# Run tests
npx playwright test

# Run specific test file
npx playwright test e2e/auth.spec.ts

# Run with UI
npx playwright test --ui

# Run in headed mode (see browser)
npx playwright test --headed
```

---

## 5. Test Results Template

```markdown
# MVP Test Results

Date: YYYY-MM-DD
Tester: [Name]
Test Environment: Local

## Summary
- Total Tests: 50+
- Passed: ✅
- Failed: ❌
- Skipped: ⏭️

## Issues Found
1. Issue #1: [Description]
   - Severity: High/Medium/Low
   - Reproduction Steps: [Steps]
   - Expected: [Result]
   - Actual: [Result]

## Sign-off
- [x] Authentication works
- [x] CRUD operations work
- [x] Error handling works
- [x] Notifications appear
- [x] Navigation works
- [x] Ready for production

```

---

## 6. Performance Testing Considerations

- Page load times < 3 seconds
- API response times < 500ms
- No memory leaks on page refresh
- Smooth animations (60fps)

---

## 7. Accessibility Testing Checklist

- [ ] All form inputs have labels
- [ ] Focus states visible
- [ ] Keyboard navigation works (Tab)
- [ ] Error messages associated with inputs
- [ ] Color not only indicator (also text/icons)
- [ ] Images have alt text (if any)

---

## 8. Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## 9. Sign-off Criteria

MVP is ready for presentation when:
✅ All authentication tests pass
✅ All CRUD operations work
✅ All error states show correctly
✅ All toasts appear
✅ All navigation works
✅ No console errors
✅ No network errors
✅ All real data displays (not mock)

---

## 10. Known Limitations for MVP

- [ ] Support module hidden (no backend API)
- [ ] Warehouse module hidden (no backend API)
- [ ] Financial reports limited (no backend API)
- [ ] No search functionality
- [ ] No pagination (using full dataset)
- [ ] No bulk operations
- [ ] Charts placeholder only

---

**Last Updated:** 2026-02-05
**Test Plan Version:** 1.0
**Status:** Ready for Testing
