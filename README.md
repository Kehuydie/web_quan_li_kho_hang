# Quản lý kho hàng

```mermaid
erDiagram
    CATEGORY ||--o{ PRODUCT : contains
    SUPPLIER ||--o{ IMPORT_ORDER : provides
    IMPORT_ORDER ||--o{ IMPORT_DETAIL : has
    PRODUCT ||--o{ IMPORT_DETAIL : listed_in
    EXPORT_ORDER ||--o{ EXPORT_DETAIL : has
    PRODUCT ||--o{ EXPORT_DETAIL : included_in





