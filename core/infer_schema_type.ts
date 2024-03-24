import { type ClickhouseSchema } from '@clickhouse-schema-core/clickhouse_schema'
import { type ChDataType } from '@clickhouse-schema-data-types/index'
import { type InferLowCardinality, type InferArray, type InferEnum, type InferJSON, type InferNullable, type InferTypeFromMap } from '@clickhouse-schema-utils/util'

/**  InferSchemaClickhouseSchemaType is a type that takes a ClickhouseSchema and returns the typescript that it represents */
export type InferClickhouseSchemaType<T extends ClickhouseSchema<any>> = { [K in keyof T['schema']]: InferType<T['schema'][K]['type']> }

/** InferType is a type that takes a ChDataType and returns the typescript that it represents */
export type InferType<T extends ChDataType> = T['dataTypeMarker'] extends 'Array'
  ? InferArray<T>
  : T['dataTypeMarker'] extends 'Enum'
    ? InferEnum<T> : T['dataTypeMarker'] extends 'JSON'
      ? InferJSON<T> : T['dataTypeMarker'] extends 'Nullable'
        ? InferNullable<T> : T['dataTypeMarker'] extends 'LowCardinality'
          ? InferLowCardinality<T>
          : InferTypeFromMap<T['typeStr']>
