import { type ChDataType } from '@clickhouse-schema-data-types/index'

export class ChUUID implements ChDataType {
  readonly typeStr: 'UUID' = 'UUID' as const
  toString (): string {
    return this.typeStr
  }
}
