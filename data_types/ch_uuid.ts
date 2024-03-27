import { type ChDataType } from '@clickhouse-schema-data-types/index'

/**
 * ChUUID is a class that represents a Clickhouse UUID data type
 */
export class ChUUID implements ChDataType {
  readonly typeStr: 'UUID' = 'UUID' as const

  toString (): string {
    return this.typeStr
  }
}
