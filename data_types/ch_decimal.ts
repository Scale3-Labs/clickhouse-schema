import { type ChDataType } from '@clickhouse-schema-data-types/index'

/**
 * ChDecimal is a class that represents a Clickhouse Decimal data type
 * @param P - The precision of the Decimal
 * @param S - The scale of the Decimal
 */
export class ChDecimal<P extends number, S extends number> implements ChDataType {
  readonly typeStr: `Decimal(${P},${S})`

  constructor (readonly precision: P, readonly scale: S) {
    this.typeStr = `Decimal(${precision},${scale})`
  }

  toString (): string {
    return this.typeStr
  }
}
