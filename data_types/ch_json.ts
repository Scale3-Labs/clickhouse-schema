import { type SchemaValue } from '@clickhouse-schema-core/clickhouse_schema'
import { type ChDataType } from '@clickhouse-schema-data-types/index'

export class ChJSON<T extends Record<string, SchemaValue>> implements ChDataType {
  readonly typeStr: 'JSON'
  readonly innerType: T
  readonly dataTypeMarker = 'JSON' as const
  constructor (innerType: T) {
    this.typeStr = 'JSON'
    this.innerType = innerType
  }

  toString (): string {
    return this.typeStr
  }
}
