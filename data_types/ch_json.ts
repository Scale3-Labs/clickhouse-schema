import { type ChSchemaDefinition } from '@clickhouse-schema-core/clickhouse_schema'
import { type ChDataType } from '@clickhouse-schema-data-types/index'

/**
 * ChJSON is a class that represents a Clickhouse JSON data type
 */
export class ChJSON<T extends ChSchemaDefinition> implements ChDataType {
  readonly typeStr: 'JSON'
  readonly innerType: T

  constructor (innerType: T) {
    this.typeStr = 'JSON'
    this.innerType = innerType
  }

  toString (): string {
    return this.typeStr
  }
}
