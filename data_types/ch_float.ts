import { type ChDataType } from '@clickhouse-schema-data-types/index'

export class ChFloat32 implements ChDataType {
  readonly typeStr: 'Float32' = 'Float32' as const

  toString (): string {
    return this.typeStr
  }
}

export class ChFloat64 implements ChDataType {
  readonly typeStr: 'Float64' = 'Float64' as const

  toString (): string {
    return this.typeStr
  }
}
