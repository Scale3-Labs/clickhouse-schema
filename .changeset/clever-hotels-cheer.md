---
"clickhouse-schema": major
---
# 2.0.0

- Added support for default value checking at compile time. This also means all datatypes are now functions so they need to be called unlike before. So `ClickhouseTypes.CHBoolean` becomes `ClickhouseTypes.CHBoolean()` and this is the same for all data types.
- Refactored type inference to reduce LOC and make it more modular
- Improved validation for `order_by` and `primary_key` options by checking for only compatible keys at compile time
