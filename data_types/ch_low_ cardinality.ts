import { type ChDataType } from '@clickhouse-schema-data-types/index'

/**
 * ChEnum is a class that represents a Clickhouse Enum data type
 * @param T - The enum object. The keys are the enum names and the values are the enum values
 */
export class ChEnum<T extends Record<string, number>> implements ChDataType {
  readonly typeStr: string
  readonly innerType: T

  constructor (enumObj: T) {
    this.innerType = enumObj
    this.typeStr = this.toString()
  }

  toString (): string {
    return `Enum(${Object.keys(this.innerType).map((key) => `'${key}' = ${this.innerType[key]}`).join(',')})`
  }
}

/**
 * ChLowCardinality is a class that represents a Clickhouse LowCardinality data type
 */
export class ChLowCardinality<T extends ChDataType> implements ChDataType {
  readonly typeStr

  constructor (readonly innerType: T) {
    this.typeStr = `LowCardinality(${innerType.typeStr})`
  }

  toString (): string {
    return this.typeStr
  }
}
