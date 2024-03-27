import { type MapChSchemaTypes } from '@clickhouse-schema-data-types/index'

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
    : any
