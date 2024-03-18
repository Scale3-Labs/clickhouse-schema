import { type SchemaValue } from '@clickhouse-schema-core/clickhouse_schema'
import { type ChDataType } from '@clickhouse-schema-data-types/index'

export class ChJSON<T extends Record<string, SchemaValue>> implements ChDataType {
  readonly typeStr: 'JSON'
  constructor (readonly dataType: T) {
    this.typeStr = 'JSON'
  }

  toString (): string {
    return this.typeStr
  }
}
