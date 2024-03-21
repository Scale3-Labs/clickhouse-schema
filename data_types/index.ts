import { type SchemaValue } from '@clickhouse-schema-core/clickhouse_schema'
import { ChArray } from '@clickhouse-schema-data-types/ch_array'
import { ChBoolean } from '@clickhouse-schema-data-types/ch_boolean'
import { ChDate, ChDate32, ChDateTime, ChDateTime64 } from '@clickhouse-schema-data-types/ch_date'
import { ChEnum } from '@clickhouse-schema-data-types/ch_enum'
import { ChFloat32, ChFloat64 } from '@clickhouse-schema-data-types/ch_float'
import { ChUInt8, ChUInt16, ChUInt32, ChUInt64, ChInt8, ChInt16 } from '@clickhouse-schema-data-types/ch_integer'
import { ChJSON } from '@clickhouse-schema-data-types/ch_json'
import { ChString, ChFixedString } from '@clickhouse-schema-data-types/ch_string'
import { ChUUID } from '@clickhouse-schema-data-types/ch_uuid'
import { ChNullable } from '@clickhouse-schema-data-types/ch_nullable'

export interface ChDataType {
  typeStr: string
  dataTypeMarker: string
  toString: () => string
}

export const ClickhouseTypes = {
  UInt8: new ChUInt8(),
  UInt16: new ChUInt16(),
  UInt32: new ChUInt32(),
  UInt64: new ChUInt64(),
  Int8: new ChInt8(),
  Int16: new ChInt16(),
  Float32: new ChFloat32(),
  Float64: new ChFloat64(),
  Boolean: new ChBoolean(),
  String: new ChString(),
  UUID: new ChUUID(),
  Date: new ChDate(),
  Date32: new ChDate32(),
  DateTime: <TZ extends string>(timezone: TZ) => new ChDateTime(timezone),
  DateTime64: <P extends number, TZ extends string>(precision: P, timezone: TZ) => new ChDateTime64(precision, timezone),
  FixedString: <T extends number>(length: T) => new ChFixedString(length),
  JSON: <T extends Record<string, SchemaValue>>(schema: T) => new ChJSON(schema),
  Array: <T extends ChDataType>(t: T) => new ChArray(t),
  Enum: <T extends Record<string, number>>(enumObj: T) => new ChEnum(enumObj),
  Nullable: <T extends ChPrimitiveType>(type: T) => new ChNullable(type)
}

export interface MapChSchemaTypes {
  UInt8: number
  UInt16: number
  UInt32: number
  UInt64: number
  Int8: number
  Int16: number
  Int32: number
  Int64: number
  Float32: number
  Float64: number
  Boolean: boolean
  String: string
  UUID: string
  Date: Date
  Date32: Date
  DateTime: Date
  DateTime64: Date
  FixedString: string
}

export type ChPrimitiveType =
ChBoolean | ChUInt8 | ChUInt16 | ChUInt32 | ChUInt64 | ChInt8 | ChInt16 |
ChFloat32 | ChFloat64 | ChString | ChUUID | ChDate | ChDate32 | ChDateTime<string> |
ChDateTime64<number, string> | ChFixedString<number>

export type ChCompositeType = ChArray<ChArray<ChDataType> | ChDataType> | ChEnum<Record<string, number>> | ChNullable<ChPrimitiveType>
