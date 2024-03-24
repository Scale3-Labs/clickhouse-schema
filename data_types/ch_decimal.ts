import { type ChDataType } from '@clickhouse-schema-data-types/index'

export class ChDecimal<P extends number, S extends number> implements ChDataType {
  readonly typeStr: `Decimal(${P},${S})`
  readonly dataTypeMarker = 'Decimal' as const
  constructor (readonly precision: P, readonly scale: S) {
    this.typeStr = `Decimal(${precision},${scale})`
  }

  toString (): string {
    return this.typeStr
  }
}
