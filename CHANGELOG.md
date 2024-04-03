# clickhouse-schema

## 2.0.1

### Patch Changes

- 843fc2f: Update readme to reflect release changes

## 2.0.0

### Major Changes

- 6dbce6f: # 2.0.0

  - Added support for default value checking at compile time. This also means all datatypes are now functions so they need to be called unlike before. So `ClickhouseTypes.CHBoolean` becomes `ClickhouseTypes.CHBoolean()` and this is the true for all data types.
  - Refactored type inference to reduce LOC and make it more modular
  - Improved validation for `order_by` and `primary_key` options by checking for only compatible keys at compile time

## 1.0.4

### Patch Changes

- Fix bug causing error when on_cluser option is specified and primary_key or order_by is not

## 1.0.3

### Patch Changes

- Add repository to readme

## 1.0.2

### Patch Changes

- Update package json to add keywords

## 1.0.1

### Patch Changes

- b4eb756: Update readme instructions import so that users can copy paste
