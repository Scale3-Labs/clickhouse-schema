import { type ChSchemaDefinition } from '@clickhouse-schema-core/clickhouse_schema'
import { type ChDataType } from '@clickhouse-schema-data-types/index'

/**
 * ChJSON is a class that represents a Clickhouse JSON data type
 */
export class ChJSON<T extends ChSchemaDefinition> implements ChDataType {
  readonly typeStr: 'Object(\'JSON\')'
  readonly innerType: T
  readonly typeScriptType!: { [K in keyof T]: T[K]['type']['typeScriptType'] }
  readonly default?: string

  constructor (innerType: T, defaultValue?: { [K in keyof T]: T[K]['type']['typeScriptType'] }) {
    this.typeStr = 'Object(\'JSON\')'
    this.innerType = innerType
    this.default = defaultValue !== undefined ? `'${JSON.stringify(defaultValue)}'` : undefined
  }

  toString (): string {
    return this.typeStr
  }
}
