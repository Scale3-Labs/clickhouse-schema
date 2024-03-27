import { type ChDataType } from '@clickhouse-schema-data-types/index'

/**
 * ChDate is a class that represents a Clickhouse Date data type
 */
export class ChDate implements ChDataType {
  readonly typeStr: 'Date' = 'Date' as const

  toString (): string {
    return this.typeStr
  }
}

/**
 * ChDate32 is a class that represents a Clickhouse Date32 data type
 */
export class ChDate32 implements ChDataType {
  readonly typeStr: 'Date32' = 'Date32' as const

  toString (): string {
    return this.typeStr
  }
}

/**
 * ChDate64 is a class that represents a Clickhouse Date64 data type
 */
export class ChDateTime<T extends string> implements ChDataType {
  readonly typeStr: `DateTime('${T}')`

  constructor (readonly timezone: T) {
    this.typeStr = `DateTime('${timezone}')`
  }

  toString (): string {
    return this.typeStr
  }
}

/**
 * ChDateTime64 is a class that represents a Clickhouse DateTime64 data type
 * @param T - The precision of the DateTime64
 * @param V - The timezone of the DateTime64
 */
export class ChDateTime64<T extends number, V extends string> implements ChDataType {
  readonly typeStr: `DateTime64(${T}, '${V}')`

  constructor (readonly precision: T, readonly timezone: V) {
    this.typeStr = `DateTime64(${precision}, '${timezone}')`
  }

  toString (): string {
    return this.typeStr
  }
}
