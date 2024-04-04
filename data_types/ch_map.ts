import { type ChDataType } from '@clickhouse-schema-data-types/index'
import { type ChFixedString, type ChString } from '@clickhouse-schema-data-types/ch_string'
import { type ChLowCardinality, type ChEnum } from '@clickhouse-schema-data-types/ch_low_ cardinality'
import { type ChDate, type ChDate32, type ChDateTime } from '@clickhouse-schema-data-types/ch_date'
import { type ChUInt8, type ChUInt16, type ChUInt32, type ChUInt64, type ChUInt128, type ChUInt256, type ChInt8, type ChInt16, type ChInt32, type ChInt64, type ChInt128, type ChInt256 } from '@clickhouse-schema-data-types/ch_integer'
import { type ChUUID } from '@clickhouse-schema-data-types/ch_uuid'

/**
 * MapKey is a union type that represents all possible key types for a Clickhouse Map data type
 */
export type MapKey =
ChUInt8 | ChUInt16 | ChUInt32 | ChUInt64 | ChUInt128 | ChUInt256 |
ChInt8 | ChInt16 | ChInt32 | ChInt64 | ChInt128 | ChInt256 | ChDate |
ChDate32 | ChDateTime<string> | ChUUID | ChFixedString<number> | ChString |
ChEnum<Record<string, number>> | ChLowCardinality<ChDataType>

export class ChMap<K extends MapKey, V extends ChDataType> implements ChDataType {
  readonly typeStr: string
  readonly typeScriptType!: { [key in K['typeScriptType']]: V['typeScriptType'] }
  readonly default?: { [key in K['typeScriptType']]: V['typeScriptType'] }

  constructor (key: K, value: V, defaultValue?: { [key in K['typeScriptType']]: V['typeScriptType'] }) {
    this.typeStr = `Map(${key.typeStr}, ${value.typeStr})`
    if (defaultValue !== undefined) {
      this.default = defaultValue !== undefined ? `map(${Object.entries(defaultValue).map(([key, value]) => `'${key}',${value}`).join(',')})` : undefined
    }
  }

  toString (): string {
    return this.typeStr
  }
}
