import { type ClickhouseSchema } from '@clickhouse-schema-core/clickhouse_schema'
import { type ChArray } from '@clickhouse-schema-data-types/ch_array'
import { type ChJSON } from '@clickhouse-schema-data-types/ch_json'
import { type ChEnum, type ChLowCardinality } from '@clickhouse-schema-data-types/ch_low_ cardinality'
import { type ChNullable } from '@clickhouse-schema-data-types/ch_nullable'
import { type ChDataType } from '@clickhouse-schema-data-types/index'
import { type InferTypeFromMap } from '@clickhouse-schema-utils/util'

/**  InferSchemaClickhouseSchemaType is a type that takes a ClickhouseSchema and returns the typescript that it represents */
export type InferClickhouseSchemaType<T extends ClickhouseSchema<any>> = { [K in keyof T['schema']]: InferType<T['schema'][K]['type']> }

/** InferType is a type that takes a ChDataType and returns the typescript that it represents */
export type InferType<T extends ChDataType> =
 T extends ChNullable<infer NullableType>
   ? InferTypeFromMap<NullableType['typeStr']> | null
   : T extends ChArray<infer ArrayType>
     ? Array<InferType<ArrayType>>
     : T extends ChEnum<infer EnumType>
       ? keyof EnumType
       : T extends ChJSON<infer Schema>
         ? { [K in keyof Schema]: InferType<Schema[K]['type']> }
         : T extends ChLowCardinality<infer LowCardinalityType>
           ? InferTypeFromMap<LowCardinalityType['typeStr']>
           : InferTypeFromMap<T['typeStr']>
