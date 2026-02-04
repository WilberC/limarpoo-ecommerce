# Storefront Use Cases

The **Storefront** is a **Next.js** application serving as the primary e-commerce platform. It provides a seamless experience for both public shopping (unauthenticated) and authenticated customer management.

## Actors

### 1. Guest
An unauthenticated user browsing the store. They can search for products, view details, and even make purchases using guest checkout.

### 2. Registered Customer
A logged-in user who has access to the full suite of features including order tracking, persistent profiles, and rewards.

## Use Cases Description

### Public Shopping (No Login Required)
* **Browse Products**: Navigate through categories and product listings.
* **Search Products**: Find specific items using keywords and filters.
* **View Product Details**: See images, descriptions, specs, and stock status.
* **Add to Cart**: Manage a temporary shopping cart.
* **Guest Checkout**: Complete a purchase without creating a permanent account.
* **View Reviews**: Read feedback from other customers.
* **Check Stock**: Verify product availability in real-time.

### Customer Portal (Login Required)
* **Login**: Authenticate securely to access private data.
* **View Dashboard**: Access a summary of account activity and recommendations.
* **Manage Orders**: View order history and detailed status of current orders.
* **Track Shipment**: Real-time tracking of active deliveries.
* **Download Invoice**: Access PDFs for past purchases.
* **Manage Addresses**: Create, edit, and delete shipping/billing addresses.
* **Manage Payment Methods**: Save credit cards safely for faster checkout.
* **Manage Wishlist**: Save items for future purchase.
* **Customer Checkout**: Accelerated checkout using saved details.

## Use Case Diagram

```plantuml
@startuml
left to right direction
actor "Guest" as guest
actor "Registered Customer" as customer

rectangle "Storefront (Next.js)" {
  package "Public Shopping" {
    usecase "Browse Products" as UC_Browse
    usecase "Search Products" as UC_Search
    usecase "View Product Details" as UC_ViewParams
    usecase "Add to Cart" as UC_Cart
    usecase "Guest Checkout" as UC_GuestCheckout
    usecase "View Reviews" as UC_Reviews
    usecase "Check Stock" as UC_Stock
  }

  package "Customer Portal" {
    usecase "Login" as UC_Login
    usecase "View Dashboard" as UC_Dash
    usecase "Manage Orders" as UC_Orders
    usecase "Track Shipment" as UC_Track
    usecase "Download Invoice" as UC_Invoice
    usecase "Manage Addresses" as UC_Addr
    usecase "Manage Payment Methods" as UC_Payment
    usecase "Manage Wishlist" as UC_Wish
    usecase "Customer Checkout" as UC_UserCheckout
  }
}

guest --> UC_Browse
guest --> UC_Search
guest --> UC_ViewParams
guest --> UC_Cart
guest --> UC_GuestCheckout
guest --> UC_Reviews

customer --> UC_Login
customer --> UC_Browse
customer --> UC_Search
customer --> UC_ViewParams
customer --> UC_Cart
customer --> UC_UserCheckout
customer --> UC_Dash
customer --> UC_Orders
customer --> UC_Track
customer --> UC_Invoice
customer --> UC_Addr
customer --> UC_Payment
customer --> UC_Wish

UC_UserCheckout ..> UC_Login : include
@enduml
```
