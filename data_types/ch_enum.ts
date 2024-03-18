import { type ChDataType } from '@clickhouse-schema-data-types/index'

export class ChEnum<T extends Record<string, number>> implements ChDataType {
  readonly typeStr: string
  readonly dataType: T

  constructor (enumObj: T) {
    this.dataType = enumObj
    this.typeStr = this.toString()
  }

  toString (): string {
    return `Enum(${Object.keys(this.dataType).map((key) => `'${key}' = ${this.dataType[key]}`).join(',')})`
  }
}
