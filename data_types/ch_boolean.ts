import { type ChDataType } from '@clickhouse-schema-data-types/index'

/**
 * ChBoolean is a class that represents a Clickhouse Boolean data type
 */
export class ChBoolean implements ChDataType {
  readonly typeStr: 'Boolean' = 'Boolean' as const
  readonly typeScriptType!: boolean
  readonly default?: boolean

  constructor (defaultValue?: boolean) {
    this.default = defaultValue
  }

  toString (): string {
    return this.typeStr
  }
}
