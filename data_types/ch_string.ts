import { type ChDataType } from '@clickhouse-schema-data-types/index'

export class ChString implements ChDataType {
  readonly typeStr: 'String' = 'String' as const
  readonly dataTypeMarker = 'String' as const
  toString (): string {
    return this.typeStr
  }
}

export class ChFixedString<T extends number> implements ChDataType {
  readonly typeStr: `FixedString(${string})`
  readonly dataTypeMarker = 'FixedString' as const
  constructor (readonly length: T) {
    this.typeStr = `FixedString(${length})`
  }

  toString (): string {
    return this.typeStr
  }
}
