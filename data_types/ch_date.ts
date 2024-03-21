import { type ChDataType } from '@clickhouse-schema-data-types/index'

export class ChDate implements ChDataType {
  readonly typeStr: 'Date' = 'Date' as const
  readonly dataTypeMarker = 'Date' as const

  toString (): string {
    return this.typeStr
  }
}

export class ChDate32 implements ChDataType {
  readonly typeStr: 'Date32' = 'Date32' as const
  readonly dataTypeMarker = 'Date32' as const

  toString (): string {
    return this.typeStr
  }
}

export class ChDateTime<T extends string> implements ChDataType {
  readonly typeStr: `DateTime(${T})`
  readonly dataTypeMarker = 'DateTime' as const

  constructor (readonly timezone: T) {
    this.typeStr = `DateTime(${timezone})`
  }

  toString (): string {
    return this.typeStr
  }
}

export class ChDateTime64<T extends number, V extends string> implements ChDataType {
  readonly typeStr: `DateTime64(${T}, ${V})`
  readonly dataTypeMarker = 'DateTime64' as const

  constructor (readonly precision: T, readonly timezone: V) {
    this.typeStr = `DateTime64(${precision}, ${timezone})`
  }

  toString (): string {
    return this.typeStr
  }
}
