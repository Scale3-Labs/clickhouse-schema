import { type ChDataType } from '@clickhouse-schema-data-types/index'

export class ChBoolean implements ChDataType {
  readonly typeStr: 'Boolean' = 'Boolean' as const
  readonly dataTypeMarker = 'Boolean' as const

  toString (): string {
    return this.typeStr
  }
}
