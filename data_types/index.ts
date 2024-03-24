import { type ChSchemaDefinition } from '@clickhouse-schema-core/clickhouse_schema'
import { ChArray } from '@clickhouse-schema-data-types/ch_array'
import { ChBoolean } from '@clickhouse-schema-data-types/ch_boolean'
import { ChDate, ChDate32, ChDateTime, ChDateTime64 } from '@clickhouse-schema-data-types/ch_date'
import { ChEnum } from '@clickhouse-schema-data-types/ch_enum'
import { ChFloat32, ChFloat64 } from '@clickhouse-schema-data-types/ch_float'
import { ChUInt8, ChUInt16, ChUInt32, ChUInt64, ChInt8, ChInt16, ChInt128, ChInt256, ChUInt128, ChUInt256, ChInt32, ChInt64 } from '@clickhouse-schema-data-types/ch_integer'
import { ChJSON } from '@clickhouse-schema-data-types/ch_json'
import { ChString, ChFixedString } from '@clickhouse-schema-data-types/ch_string'
import { ChUUID } from '@clickhouse-schema-data-types/ch_uuid'
import { ChNullable } from '@clickhouse-schema-data-types/ch_nullable'

export interface ChDataType {
  typeStr: string
  dataTypeMarker: string
  toString: () => string
}

// Individual type definitions
// Integer types unsigned
export const CHUInt8 = new ChUInt8()
export const CHUInt16 = new ChUInt16()
export const CHUInt32 = new ChUInt32()
export const CHUInt64 = new ChUInt64()
export const CHUInt128 = new ChUInt128()
export const CHUInt256 = new ChUInt256()
// Integer types signed
export const CHInt8 = new ChInt8()
export const CHInt16 = new ChInt16()
export const CHInt32 = new ChInt32()
export const CHInt64 = new ChInt64()
export const CHInt128 = new ChInt128()
export const CHInt256 = new ChInt256()
// Float types
export const CHFloat32 = new ChFloat32()
export const CHFloat64 = new ChFloat64()
// Boolean type
export const CHBoolean = new ChBoolean()
// String types
export const CHString = new ChString()
export const CHFixedString = <T extends number>(length: T): ChFixedString<T> => new ChFixedString(length)
export const CHUUID = new ChUUID()
// Date types
export const CHDate = new ChDate()
export const CHDate32 = new ChDate32()
export const CHDateTime = <TZ extends string>(timezone: TZ): ChDateTime<TZ> => new ChDateTime(timezone)
export const CHDateTime64 = <P extends number, TZ extends string>(precision: P, timezone: TZ): ChDateTime64<P, TZ> => new ChDateTime64(precision, timezone)
// JSON type
export const CHJSON = <T extends ChSchemaDefinition>(schema: T): ChJSON<T> => new ChJSON(schema)
// Array, Enum, Nullable types
export const CHArray = <T extends ChDataType>(t: T): ChArray<T> => new ChArray(t)
export const CHEnum = <T extends Record<string, number>>(enumObj: T): ChEnum<T> => new ChEnum(enumObj)
export const CHNullable = <T extends ChPrimitiveType>(type: T): ChNullable<T> => new ChNullable(type)

export const ClickhouseTypes = {
  CHUInt8,
  CHUInt16,
  CHUInt32,
  CHUInt64,
  CHUInt128,
  CHUInt256,
  CHInt8,
  CHInt16,
  CHInt32,
  CHInt64,
  CHInt128,
  CHInt256,
  CHFloat32,
  CHFloat64,
  CHBoolean,
  CHString,
  CHUUID,
  CHDate,
  CHDate32,
  CHDateTime,
  CHDateTime64,
  CHFixedString,
  CHJSON,
  CHArray,
  CHEnum,
  CHNullable
}
export interface MapChSchemaTypes {
  UInt8: number
  UInt16: number
  UInt32: number
  UInt64: number
  UInt128: number
  UInt256: number
  Int8: number
  Int16: number
  Int32: number
  Int64: number
  Int128: number
  Int256: number
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
ChUInt8 | ChUInt16 | ChUInt32 | ChUInt64 | ChUInt128 | ChUInt256 |
ChInt8 | ChInt16 | ChInt32 | ChInt64 | ChInt128 | ChInt256 |
ChFloat32 | ChFloat64 | ChBoolean |
ChDate | ChDate32 | ChDateTime<string> | ChDateTime64<number, string> |
ChUUID | ChFixedString<number> | ChString

export type ChCompositeType = ChArray<ChArray<ChDataType> | ChDataType> | ChEnum<Record<string, number>> | ChNullable<ChPrimitiveType> | ChJSON<ChSchemaDefinition>
