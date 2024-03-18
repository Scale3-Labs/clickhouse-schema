import { type ClickhouseSchema } from '@clickhouse-schema-core/clickhouse_schema'
import { type ChDataType, type MapChSchemaTypes } from '@clickhouse-schema-data-types/index'
import { type ChArray } from '@clickhouse-schema-data-types/ch_array'
import { type ChJSON } from '@clickhouse-schema-data-types/ch_json'
import { type ExtractInnerType, type ExtractOuterType } from '@clickhouse-schema-utils/type_inference'
import { type ChEnum } from '@clickhouse-schema-data-types/ch_enum'

/**  InferSchemaClickhouseSchemaType is a type that takes a ClickhouseSchema and returns the typescript that it represents */
export type InferClickhouseSchemaType<T extends ClickhouseSchema<any>> = { [K in keyof T['schema']]: InferType<T['schema'][K]['type']> }

/** InferTypeFromMap is a type that takes a string and returns the typescript that it represents */
type InferTypeFromMap<T extends string> = ExtractInnerType<T> extends keyof MapChSchemaTypes
  ? MapChSchemaTypes[ExtractInnerType<T>]
  : ExtractOuterType<T> extends keyof MapChSchemaTypes ?
    MapChSchemaTypes[ExtractOuterType<T>]
    : unknown

/** InferType is a type that takes a ChDataType and returns the typescript that it represents */
type InferType<T extends ChDataType> =
T extends ChArray<infer ArrayType>
  ? Array<InferType<ArrayType>>
  : T extends ChEnum<infer EnumType>
    ? keyof EnumType
    : T extends ChJSON<infer Schema>
      ? { [K in keyof T['dataType']]: InferType<Schema[K]['type']> }
      : T extends ChDataType
        ? InferTypeFromMap<T['typeStr']>
        : unknown
