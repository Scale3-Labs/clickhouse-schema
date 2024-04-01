import { type ChDataType } from '@clickhouse-schema-data-types/index'

/**
 * ChFloat32 is a class that represents a Clickhouse Float32 data type
 */
export class ChFloat32 implements ChDataType {
  readonly typeStr: 'Float32' = 'Float32' as const
  readonly typeScriptType!: number
  readonly default?: number

  constructor (defaultValue?: number) {
    this.default = defaultValue
  }

  toString (): string {
    return this.typeStr
  }
}
/**
 * ChFloat64 is a class that represents a Clickhouse Float64 data type
 */
export class ChFloat64 implements ChDataType {
  readonly typeStr: 'Float64' = 'Float64' as const
  readonly typeScriptType!: number
  readonly default?: number

  constructor (defaultValue?: number) {
    this.default = defaultValue
  }

  toString (): string {
    return this.typeStr
  }
}
