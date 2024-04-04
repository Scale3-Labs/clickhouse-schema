import { type ChDataType } from '@clickhouse-schema-data-types/index'

/**
 * ChString is a class that represents a Clickhouse String data type
 */
export class ChString implements ChDataType {
  readonly typeStr: 'String' = 'String' as const
  readonly typeScriptType!: string
  readonly default?: string

  constructor (defaultValue?: string) {
    this.default = defaultValue !== undefined ? `'${defaultValue}'` : undefined
  }

  toString (): string {
    return this.typeStr
  }
}

/**
 * ChFixedString is a class that represents a Clickhouse FixedString data type
 * @param T - The length of the FixedString
 */
export class ChFixedString<T extends number> implements ChDataType {
  readonly typeStr: `FixedString(${T})`
  readonly typeScriptType!: string
  readonly default?: string

  constructor (readonly length: T, defaultVal?: string) {
    this.typeStr = `FixedString(${length})`
    this.default = `'${defaultVal}'`
  }

  toString (): string {
    return this.typeStr
  }
}
