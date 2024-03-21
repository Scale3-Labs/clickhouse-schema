import { type ChPrimitiveType, type ChDataType } from '@clickhouse-schema-data-types/index'

export class ChNullable<T extends ChPrimitiveType> implements ChDataType {
  readonly typeStr
  readonly innerType: T
  readonly dataTypeMarker = 'Nullable' as const

  constructor (t: T) {
    this.innerType = t
    this.typeStr = `Nullable(${this.innerType})`
  }

  toString (): string {
    return this.typeStr
  }
}
