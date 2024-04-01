import { type ChDataType } from '@clickhouse-schema-data-types/index'

/**
 * ChDecimal is a class that represents a Clickhouse Decimal data type
 * @param P - The precision of the Decimal
 * @param S - The scale of the Decimal
 */
export class ChDecimal<P extends number, S extends number> implements ChDataType {
  readonly typeStr: `Decimal(${P},${S})`
  readonly typeScriptType!: number
  readonly default?: number

  constructor (readonly precision: P, readonly scale: S, defaultVal?: number) {
    this.typeStr = `Decimal(${precision},${scale})`
    this.default = defaultVal
  }

  toString (): string {
    return this.typeStr
  }
}
