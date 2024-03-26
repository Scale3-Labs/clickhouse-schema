import { type ChDataType } from '@clickhouse-schema-data-types/index'

export class ChArray<T extends ChDataType | ChArray<ChDataType>> implements ChDataType {
  readonly innerType: T
  readonly typeStr: string

  constructor (t: T) {
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
