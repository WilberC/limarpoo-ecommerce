# Core Backend Entity Relationship Diagram (ERD)

This document outlines the database schema designed for the Core Backend. It supports the requirements of the Storefront, Admin, and Landing applications.

## Entities Description

### User & Authentication
* **User**: The central identity entity. Stores credentials, roles (Admin, Customer, Staff), and audit timestamps.
* **CustomerProfile**: Extended information for customers (name, phone) partially separated to support different user types.
* **Address**: Stores shipping and billing locations. Users can have multiple addresses with one being default.

### Catalog
* **Product**: The core item for sale. Contains pricing, stock, SKU, and descriptive metadata.
* **Category**: Hierarchical organization for products. Categories can have parent categories.
* **Review**: User-generated feedback and ratings linked to specific products.

### Orders & Sales
* **Order**: The header record for a transaction. Tracks status (Pending -> Delivered), totals, and user ownership.
* **OrderItem**: The specific line items within an order. Snapshots the price at purchase time to preserve history even if product prices change.
* **Payment**: Records financial transactions, provider references (Stripe ID), and status.

### Content
* **Article**: Blog posts or news items written by internal authors (Users) for the Landing page.

## Entity Relationship Diagram

```plantuml
@startuml
entity "User" {
  *id : UUID
  --
  email : String
  password_hash : String
  role : Enum (Admin, Customer, Staff)
  created_at : Timestamp
}

entity "CustomerProfile" {
  *user_id : UUID <<FK>>
  --
  first_name : String
  last_name : String
  phone : String
}

entity "Address" {
  *id : UUID
  --
  user_id : UUID <<FK>>
  street : String
  city : String
  country : String
  zip_code : String
  is_default : Boolean
}

entity "Product" {
  *id : UUID
  --
  name : String
  description : Text
  price : Decimal
  sku : String
  stock_quantity : Integer
  category_id : UUID <<FK>>
  created_at : Timestamp
}

entity "Category" {
  *id : UUID
  --
  name : String
  parent_id : UUID <<FK>>
}

entity "Order" {
  *id : UUID
  --
  user_id : UUID <<FK>>
  status : Enum (Pending, Paid, Shipped, Delivered)
  total_amount : Decimal
  shipping_address_id : UUID <<FK>>
  created_at : Timestamp
}

entity "OrderItem" {
  *id : UUID
  --
  order_id : UUID <<FK>>
  product_id : UUID <<FK>>
  quantity : Integer
  price_at_purchase : Decimal
}

entity "Payment" {
  *id : UUID
  --
  order_id : UUID <<FK>>
  provider : String (Stripe, Paypal)
  transaction_id : String
  status : String
  amount : Decimal
}

entity "Review" {
  *id : UUID
  --
  user_id : UUID <<FK>>
  product_id : UUID <<FK>>
  rating : Integer
  comment : Text
}

entity "Article" {
  *id : UUID
  --
  title : String
  content : Text
  author_id : UUID <<FK>>
  published_at : Timestamp
}

User ||--|| CustomerProfile
User ||--o{ Address
User ||--o{ Order
User ||--o{ Review

Order ||--o{ OrderItem
Product ||--o{ OrderItem
Product ||--o{ Review
Category ||--o{ Product

Order ||--|| Payment

User ||--o{ Article : "Author"

@enduml
```
