# Quản lý kho hàng

Category (category_id PK, category)
   │
   └───< Product (product_id PK, category_id FK, product_name, import_price, sell_price, ...)
            │
            ├───< ImportDetail (id PK, import_id FK, product_id FK, quantity, import_price, ...)
            │            │
            │            └─── ImportOrder (import_id PK, supplier_id FK, total_amount, status, ...)
            │                             │
            │                             └───< Supplier (supplier_id PK, supplier_name, ...)
            │
            └───< ExportDetail (id PK, export_id FK, product_id FK, quantity, sell_price, subtotal, ...)
                         │
                         └─── ExportOrder (export_id PK, customer_name, export_date, status, ...)






