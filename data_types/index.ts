import { type ChSchemaDefinition } from '@clickhouse-schema-core/clickhouse_schema'
import { ChArray } from '@clickhouse-schema-data-types/ch_array'
import { ChBoolean } from '@clickhouse-schema-data-types/ch_boolean'
import { ChDate, ChDate32, ChDateTime, ChDateTime64 } from '@clickhouse-schema-data-types/ch_date'
import { ChDecimal } from '@clickhouse-schema-data-types/ch_decimal'
import { ChFloat32, ChFloat64 } from '@clickhouse-schema-data-types/ch_float'
import { ChInt128, ChInt16, ChInt256, ChInt32, ChInt64, ChInt8, ChUInt128, ChUInt16, ChUInt256, ChUInt32, ChUInt64, ChUInt8 } from '@clickhouse-schema-data-types/ch_integer'
import { ChIPv4, ChIPv6 } from '@clickhouse-schema-data-types/ch_ip_address'
import { ChJSON } from '@clickhouse-schema-data-types/ch_json'

import { ChEnum, ChLowCardinality } from '@clickhouse-schema-data-types/ch_low_ cardinality'
import { ChNullable } from '@clickhouse-schema-data-types/ch_nullable'
import { ChFixedString, ChString } from '@clickhouse-schema-data-types/ch_string'
import { ChUUID } from '@clickhouse-schema-data-types/ch_uuid'

/**
 * ChDataType is an interface that represents a Clickhouse data type
 */
export interface ChDataType {
  typeStr: string
  toString: () => string
}

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
// String type
export const CHString = new ChString()
// UUID type
export const CHUUID = new ChUUID()
// Date types
export const CHDate = new ChDate()
export const CHDate32 = new ChDate32()

// IP Address types
export const CHIPv4 = new ChIPv4()
export const CHIPv6 = new ChIPv6()

/**
 *
 * @param precision precision of the decimal
 * @param scale scale of the decimal
 * @returns a new ChDecimal object
 */
export const CHDecimal = <P extends number, S extends number>(precision: P, scale: S): ChDecimal<P, S> => new ChDecimal(precision, scale)

/**
 *
 * @param length length of the fixed string
 * @returns a new ChFixedString object
 */
export const CHFixedString = <T extends number>(length: T): ChFixedString<T> => new ChFixedString(length)

/**
 *
 * @param timezone timezone of the DateTime
 * @returns a new ChDateTime object
 */
export const CHDateTime = <TZ extends string>(timezone: TZ): ChDateTime<TZ> => new ChDateTime(timezone)
/**
 *
 * @param precision precision of the DateTime64
 * @param timezone timezone of the DateTime64
 * @returns a new ChDateTime64 object
 */
export const CHDateTime64 = <P extends number, TZ extends string>(precision: P, timezone: TZ): ChDateTime64<P, TZ> => new ChDateTime64(precision, timezone)
/**
 *
 * @param schema schema definition for the JSON
 * @returns a new ChJSON object
 */
export const CHJSON = <T extends ChSchemaDefinition>(schema: T): ChJSON<T> => new ChJSON(schema)
/**
 *
 * @param t type of the array
 * @returns a new ChArray object
 */
export const CHArray = <T extends ChDataType>(t: T): ChArray<T> => new ChArray(t)
/**
 *
 * @param enumObj enum object. The keys are the enum names and the values are the enum values
 * @returns a new ChEnum object
 */
export const CHEnum = <T extends Record<string, number>>(enumObj: T): ChEnum<T> => new ChEnum(enumObj)
/**
 *
 * @param type type of the low cardinality. Must be a string or fixed string
 * @returns a new ChLowCardinality object
 */
export const CHLowCardinality = <T extends ChString | ChFixedString<number>>(type: T): ChLowCardinality<T> => new ChLowCardinality(type)
/**
 *
 * @param type type of the nullable. Must be a primitive type
 * @returns a new ChNullable object
 */
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
  CHDecimal,
  CHBoolean,
  CHString,
  CHUUID,
  CHDate,
  CHDate32,
  CHDateTime,
  CHDateTime64,
  CHFixedString,
  CHIPv4,
  CHIPv6,
  CHJSON,
  CHArray,
  CHEnum,
  CHLowCardinality,
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
  Decimal: number
  Boolean: boolean
  String: string
  UUID: string
  Date: Date
  Date32: Date
  DateTime: Date
  DateTime64: Date
  FixedString: string
  IPv4: string
  IPv6: string
}

export type ChPrimitiveType =
  ChUInt8 | ChUInt16 | ChUInt32 | ChUInt64 | ChUInt128 | ChUInt256 |
  ChInt8 | ChInt16 | ChInt32 | ChInt64 | ChInt128 | ChInt256 |
  ChFloat32 | ChFloat64 | ChDecimal<number, number> | ChBoolean |
  ChDate | ChDate32 | ChDateTime<string> | ChDateTime64<number, string> |
  ChUUID | ChFixedString<number> | ChString | ChIPv4 | ChIPv6

export type ChCompositeType = ChArray<ChArray<ChDataType> | ChDataType> | ChEnum<Record<string, number>> | ChNullable<ChPrimitiveType> | ChJSON<ChSchemaDefinition> | ChLowCardinality<ChString | ChFixedString<number>>
