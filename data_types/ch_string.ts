import { type ChDataType } from '@clickhouse-schema-data-types/index'

export class ChString implements ChDataType {
  readonly typeStr: 'String' = 'String' as const

  toString (): string {
    return this.typeStr
  }
}

export class ChFixedString<T extends number> implements ChDataType {
  readonly typeStr: `FixedString(${T})`

  constructor (readonly length: T) {
    this.typeStr = `FixedString(${length})`
  }

  toString (): string {
    return this.typeStr
  }
}
