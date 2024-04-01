import { type ChDataType } from '@clickhouse-schema-data-types/index'

/**
 * ChArray is a class that represents an array of a Clickhouse data type
 * @param T - The type of the array elements (can be a ChDataType or another ChArray)
 */
export class ChArray<T extends ChDataType | ChArray<ChDataType>> implements ChDataType {
  readonly innerType: T
  readonly typeStr: string
  readonly typeScriptType!: Array<T['typeScriptType']>
  readonly default?: Array<T['typeScriptType']>

  constructor (t: T, defaultVal?: Array<T['typeScriptType']>) {
    this.default = defaultVal
    if (t instanceof ChArray) {
      this.innerType = new ChArray(t.innerType) as T
    } else {
      this.innerType = t
    }
    this.typeStr = this.toString()
  }

  toString (): string {
    if (this.innerType instanceof ChArray) return `Array(${this.innerType.toString()})`
    return `Array(${this.innerType})`
  }
}
