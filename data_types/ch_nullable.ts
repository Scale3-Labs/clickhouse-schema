import { type ChPrimitiveType, type ChDataType } from '@clickhouse-schema-data-types/index'

/**
 * ChNullable is a class that represents a Clickhouse Nullable data type
 * @param T - The inner type of the Nullable. Must be a primitive type
 */
export class ChNullable<T extends ChPrimitiveType & ChDataType> implements ChDataType {
  readonly typeStr
  readonly innerType: T
  readonly typeScriptType!: T['typeScriptType'] | null
  readonly default?: T['typeScriptType'] | null

  constructor (t: T, defaultVal?: T['typeScriptType'] | null) {
    this.innerType = t
    this.typeStr = `Nullable(${this.innerType.toString()})`
    this.default = defaultVal !== undefined ? `${JSON.stringify(defaultVal).replace(/"/g, "'")}` : null
  }

  toString (): string {
    return this.typeStr
  }
}
