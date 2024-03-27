import { type ChDataType } from '@clickhouse-schema-data-types/index'

/**
 * ChString is a class that represents a Clickhouse String data type
 */
export class ChString implements ChDataType {
  readonly typeStr: 'String' = 'String' as const

  toString (): string {
    return this.typeStr
  }
}

/**
 * ChFixedString is a class that represents a Clickhouse FixedString data type
 * @param T - The length of the FixedString
 */
export class ChFixedString<T extends number> implements ChDataType {
  readonly typeStr: `FixedString(${T})`

  constructor (readonly length: T) {
    this.typeStr = `FixedString(${length})`
  }

  toString (): string {
    return this.typeStr
  }
}
