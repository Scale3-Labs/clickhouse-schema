import { type ChDataType } from '@clickhouse-schema-data-types/index'

/**
 * ChIPv4 is a class that represents a Clickhouse IPv4 data type
 */
export class ChIPv4 implements ChDataType {
  readonly typeStr: 'IPv4' = 'IPv4' as const
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
 * ChIPv6 is a class that represents a Clickhouse IPv6 data type
 */
export class ChIPv6 implements ChDataType {
  readonly typeScriptType!: string
  readonly typeStr: 'IPv6' = 'IPv6' as const
  readonly default?: string

  constructor (defaultValue?: string) {
    this.default = this.default = defaultValue !== undefined ? `'${defaultValue}'` : undefined
  }

  toString (): string {
    return this.typeStr
  }
}
