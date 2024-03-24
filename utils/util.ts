import { type ChArray } from '@clickhouse-schema-data-types/ch_array'
import { type ChLowCardinality, type ChEnum } from '@clickhouse-schema-data-types/ch_low_ cardinality'
import { type ChJSON } from '@clickhouse-schema-data-types/ch_json'
import { type ChNullable } from '@clickhouse-schema-data-types/ch_nullable'
import { type MapChSchemaTypes, type ChDataType } from '@clickhouse-schema-data-types/index'

/* eslint-disable @typescript-eslint/no-unused-vars */
export type ExtractInnerType<T extends string> = T extends `${infer _BeforeBracket}(${infer Rest})`
  ? ExtractInnerType<Rest>
  : T
export type ExtractOuterType<T extends string> = T extends `${infer BeforeBracket}(${infer _Rest})`
  ? BeforeBracket
  : T

/** InferTypeFromMap is a type that takes a string and returns the typescript that it represents */
export type InferTypeFromMap<T extends string> = ExtractInnerType<T> extends keyof MapChSchemaTypes
  ? MapChSchemaTypes[ExtractInnerType<T>]
  : ExtractOuterType<T> extends keyof MapChSchemaTypes ?
    MapChSchemaTypes[ExtractOuterType<T>]
    : unknown

export type InferArray<T extends ChDataType> = T extends ChArray<infer ArrayType> ? Array<InferArray<ArrayType>> : InferTypeFromMap<T['typeStr']>

export type InferEnum<T extends ChDataType> = T extends ChEnum<infer EnumType> ? keyof EnumType : InferTypeFromMap<T['typeStr']>

export type InferJSON<T extends ChDataType> = T extends ChJSON<infer Schema> ? { [K in keyof T['innerType']]: InferJSON<Schema[K]['type']> } : InferTypeFromMap<T['typeStr']>

export type InferNullable<T extends ChDataType> = T extends ChNullable<infer NullableType> ? InferTypeFromMap<NullableType['typeStr']> | null : InferTypeFromMap<T['typeStr']>

export type InferLowCardinality<T extends ChDataType> = T extends ChLowCardinality<infer LowCardinalityType> ? InferTypeFromMap<LowCardinalityType['typeStr']> : InferTypeFromMap<T['typeStr']>
