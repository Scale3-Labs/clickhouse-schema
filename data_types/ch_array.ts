import { type ChDataType } from '@clickhouse-schema-data-types/index'

export class ChArray<T extends ChDataType | ChArray<ChDataType>> implements ChDataType {
  readonly dataType: T
  readonly typeStr: string

  constructor (t: T) {
    if (t instanceof ChArray) {
      this.dataType = new ChArray(t.dataType) as T
    } else {
      this.dataType = t
    }
    this.typeStr = this.toString()
  }

  toString (): string {
    if (this.dataType instanceof ChArray) return `Array(${this.dataType.toString()})`
    return `Array(${this.dataType})`
  }
}
