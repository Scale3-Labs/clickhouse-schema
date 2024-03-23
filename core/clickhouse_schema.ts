import { type ChDataType } from '@clickhouse-schema-data-types/index'

export interface SchemaValue { type: ChDataType, default?: unknown } // Note that default is a string because we can't guarantee that it will be a valid value
/**
 * ChSchemaOptions is used to define the options for a clickhouse table schema.
 *
 * @param database is the database to use for the table
 * @param table_name is the name of the table in clickhouse
 * @param on_cluster is the name of the cluster to use for the table
 * @param primary_key is the primary key for the table. if not specified, order_by must be specified
 * @param order_by is the order by clause for the table. if not specified, primary_key must be specified
 * @param engine is the engine to use for the table, default is MergeTree()
 * @param additional_options is an string array of options that are appended to the end of the create table query
 */
export interface ChSchemaOptions<T extends ChSchemaDefinition> {
  database?: string
  table_name: string
  on_cluster?: string
  primary_key?: keyof T
  order_by?: keyof T
  engine?: string
  additional_options?: string[]
}

interface IClickhouseSchema<T extends ChSchemaDefinition> {
  GetOptions: () => ChSchemaOptions<T>
  GetCreateTableQuery: () => string
  GetCreateTableQueryAsList: () => string[]
}

export type ChSchemaDefinition = Record<string, SchemaValue>

/* This class is used to represent a clickhouse table schema */
export class ClickhouseSchema<SchemaDefinition extends ChSchemaDefinition> implements IClickhouseSchema<SchemaDefinition> {
  readonly schema: SchemaDefinition
  private readonly options: ChSchemaOptions<SchemaDefinition>

  constructor (schema: SchemaDefinition, options: ChSchemaOptions<SchemaDefinition>) {
    this.schema = schema
    this.options = options
  }

  GetOptions (): ChSchemaOptions<SchemaDefinition> {
    return this.options
  }

  GetCreateTableQuery (): string {
    if (this.options.primary_key === undefined && this.options.order_by === undefined) {
      throw new Error('One of order_by or primary_key must be specified')
    }

    const columns = Object.entries(this.schema as ChSchemaDefinition)
      .map(([name, field]) => {
        // Check if default is defined and a string, add single quotes; otherwise, just use the value
        const defaultValue = field.default !== undefined
          ? (typeof field.default === 'string' ? `'${field.default}'` : field.default)
          : ''
        return `${name} ${field.type}${field.default !== undefined ? ` DEFAULT ${defaultValue}` : ''}`
      }
      )
      .join(',\n')

    let additionalOptions = ''
    if (this.options.additional_options !== undefined) {
      additionalOptions = `${this.options.additional_options.join('\n')}`
    }
    const createTableQuery = [
      `CREATE TABLE IF NOT EXISTS ${this.options.database !== undefined ? `${this.options.database}.` : ''}${this.options.table_name}${this.options.on_cluster !== undefined ? ` ON CLUSTER ${this.options.on_cluster}` : ''}`,
      `(\n${columns}\n)`,
      `ENGINE = ${this.options.engine ?? 'MergeTree()'}`,
      this.options.order_by !== undefined ? `ORDER BY ${String(this.options.order_by)}` : '',
      this.options.primary_key !== undefined ? `PRIMARY KEY ${String(this.options.primary_key)}` : '',
      additionalOptions
    ].filter(part => part.trim().length > 0).join('\n')

    return createTableQuery
  }

  GetCreateTableQueryAsList (): string[] {
    return this.GetCreateTableQuery().split('\n')
  }

  toString (): string {
    return this.GetCreateTableQuery()
  }
}
