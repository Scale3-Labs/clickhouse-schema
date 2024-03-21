import { type ChDataType } from '@clickhouse-schema-data-types/index'

export class ChEnum<T extends Record<string, number>> implements ChDataType {
  readonly typeStr: string
  readonly innerType: T
  readonly dataTypeMarker = 'Enum' as const

  constructor (enumObj: T) {
    this.innerType = enumObj
    this.typeStr = this.toString()
  }

  toString (): string {
    return `Enum(${Object.keys(this.innerType).map((key) => `'${key}' = ${this.innerType[key]}`).join(',')})`
  }
}
