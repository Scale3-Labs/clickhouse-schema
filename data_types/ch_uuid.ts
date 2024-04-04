import { type ChDataType } from '@clickhouse-schema-data-types/index'

/**
 * ChUUID is a class that represents a Clickhouse UUID data type
 */
export class ChUUID implements ChDataType {
  typeScriptType!: string
  readonly typeStr: 'UUID' = 'UUID' as const
  readonly default?: string

  constructor (defaultValue?: string) {
    this.default = defaultValue !== undefined ? `'${defaultValue}'` : undefined
  }

  toString (): string {
    return this.typeStr
  }
}
