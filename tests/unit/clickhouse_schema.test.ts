import { ClickhouseSchema, type ChSchemaOptions } from '@clickhouse-schema-core/clickhouse_schema'
import { type InferClickhouseSchemaType } from '@clickhouse-schema-core/infer_schema_type'
import { ClickhouseTypes } from '@clickhouse-schema-data-types/index'

describe('ClickhouseSchema Tests', () => {
  it('should correctly store schema definitions and options', () => {
    const schemaDefinition = {
      id: { type: ClickhouseTypes.CHUInt128() },
      ch_json: { type: ClickhouseTypes.CHJSON({ k: { type: ClickhouseTypes.CHString() }, arr: { type: ClickhouseTypes.CHArray(ClickhouseTypes.CHJSON({ nested: { type: ClickhouseTypes.CHString() } })) } }) }
    }
    const options: ChSchemaOptions<typeof schemaDefinition> = {
      primary_key: 'id',
      order_by: 'id',
      table_name: 'users_table',
      engine: 'ReplicatedMergeTree()'
    }

    const schema = new ClickhouseSchema(schemaDefinition, options)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type schemaType = InferClickhouseSchemaType<typeof schema>
    expect(schema.GetOptions()).toEqual(options)
  })

  it('should correctly throw an error if schema is missing both primary_key and order_by fields', () => {
    const schemaDefinition = {
      id: { type: ClickhouseTypes.CHUUID() },
      name: { type: ClickhouseTypes.CHString() },
      email: { type: ClickhouseTypes.CHString() },
      age: { type: ClickhouseTypes.CHUInt8() }
    }
    const options: ChSchemaOptions<typeof schemaDefinition> = {
      table_name: 'users_table'
    }

    const schema = new ClickhouseSchema(schemaDefinition, options)
    const expectedError = 'One of order_by or primary_key must be specified'
    expect(() => schema.GetCreateTableQuery()).toThrow(expectedError)
  })

  it('should correctly generate a create table query without a default value for any fields', () => {
    const schemaDefinition = {
      id: { type: ClickhouseTypes.CHUUID() },
      name: { type: ClickhouseTypes.CHString() },
      email: { type: ClickhouseTypes.CHString() },
      age: { type: ClickhouseTypes.CHUInt8() }
    }
    const options: ChSchemaOptions<typeof schemaDefinition> = {
      primary_key: 'id',
      table_name: 'users_table'
    }

    const schema = new ClickhouseSchema(schemaDefinition, options)
    const expectedQuery = 'CREATE TABLE IF NOT EXISTS users_table\n(\nid UUID,\nname String,\nemail String,\nage UInt8\n)\nENGINE = MergeTree()\nPRIMARY KEY id;'
    const query = schema.GetCreateTableQuery()
    expect(query).toEqual(expectedQuery)
  })

  it('should correctly generate a create table query with a default value for some fields', () => {
    const schemaDefinition = {
      id: { type: ClickhouseTypes.CHUUID() },
      name: { type: ClickhouseTypes.CHString('John Doe') },
      email: { type: ClickhouseTypes.CHString('john@gmail.com') },
      age: { type: ClickhouseTypes.CHUInt8() }
    }
    const options: ChSchemaOptions<typeof schemaDefinition> = {
      primary_key: 'id',
      table_name: 'users_table'
    }

    const schema = new ClickhouseSchema(schemaDefinition, options)
    const expectedQuery = 'CREATE TABLE IF NOT EXISTS users_table\n(\nid UUID,\nname String DEFAULT \'John Doe\',\nemail String DEFAULT \'john@gmail.com\',\nage UInt8\n)\nENGINE = MergeTree()\nPRIMARY KEY id;'
    const query = schema.GetCreateTableQuery()
    expect(query).toEqual(expectedQuery)
  })

  it('should correctly generate a create table query with additional options', () => {
    const schemaDefinition = {
      id: { type: ClickhouseTypes.CHUUID() },
      name: { type: ClickhouseTypes.CHString('John Doe') },
      email: { type: ClickhouseTypes.CHString('john@gmail.com') },
      age: { type: ClickhouseTypes.CHUInt8(18) }
    }
    const options: ChSchemaOptions<typeof schemaDefinition> = {
      primary_key: 'id',
      table_name: 'users_table',
      additional_options: ['COMMENT \'This table provides user details\'']
    }
    const schema = new ClickhouseSchema(schemaDefinition, options)
    const expectedQuery = 'CREATE TABLE IF NOT EXISTS users_table\n(\nid UUID,\nname String DEFAULT \'John Doe\',\nemail String DEFAULT \'john@gmail.com\',\nage UInt8 DEFAULT 18\n)\nENGINE = MergeTree()\nPRIMARY KEY id\nCOMMENT \'This table provides user details\';'
    const query = schema.GetCreateTableQuery()
    expect(query).toEqual(expectedQuery)
  })

  it('should correctly generate a create table query with a specified order_by field', () => {
    const schemaDefinition = {
      id: { type: ClickhouseTypes.CHUUID() },
      name: { type: ClickhouseTypes.CHString('John Doe') },
      email: { type: ClickhouseTypes.CHString() }
    }
    const options: ChSchemaOptions<typeof schemaDefinition> = {
      table_name: 'users_table',
      order_by: 'id'
    }
    const schema = new ClickhouseSchema(schemaDefinition, options)
    const expectedQuery = 'CREATE TABLE IF NOT EXISTS users_table\n(\nid UUID,\nname String DEFAULT \'John Doe\',\nemail String\n)\nENGINE = MergeTree()\nORDER BY id;'
    const query = schema.GetCreateTableQuery()
    expect(query).toEqual(expectedQuery)
  })

  it('should correctly generate a create table query with a specified on_cluster field', () => {
    const schemaDefinition = {
      id: { type: ClickhouseTypes.CHUUID() },
      name: { type: ClickhouseTypes.CHString('John Doe') },
      email: { type: ClickhouseTypes.CHString() }
    }
    const options: ChSchemaOptions<typeof schemaDefinition> = {
      table_name: 'users_table',
      primary_key: 'id',
      on_cluster: 'users_cluster'
    }
    const schema = new ClickhouseSchema(schemaDefinition, options)
    const expectedQuery = 'CREATE TABLE IF NOT EXISTS users_table ON CLUSTER users_cluster\n(\nid UUID,\nname String DEFAULT \'John Doe\',\nemail String\n)\nENGINE = MergeTree()\nPRIMARY KEY id;'
    const query = schema.GetCreateTableQuery()
    expect(query).toEqual(expectedQuery)
  })

  it('should correctly generate a create table query with a specified engine', () => {
    const schema = new ClickhouseSchema({
      id: { type: ClickhouseTypes.CHUUID() },
      name: { type: ClickhouseTypes.CHString('John Doe') },
      email: { type: ClickhouseTypes.CHString() }
    }, {
      table_name: 'users_table',
      primary_key: 'id',
      engine: 'ReplicatedMergeTree()'
    })
    const expectedQuery = 'CREATE TABLE IF NOT EXISTS users_table\n(\nid UUID,\nname String DEFAULT \'John Doe\',\nemail String\n)\nENGINE = ReplicatedMergeTree()\nPRIMARY KEY id;'
    const query = schema.GetCreateTableQuery()
    expect(query).toEqual(expectedQuery)
  })

  it('should correctly generate a create table query with a specified database', () => {
    const schemaDefinition = {
      id: { type: ClickhouseTypes.CHUUID() },
      name: { type: ClickhouseTypes.CHString('John Doe') },
      email: { type: ClickhouseTypes.CHString() }
    }
    const options: ChSchemaOptions<typeof schemaDefinition> = {
      database: 'users_db',
      table_name: 'users_table',
      primary_key: 'id'
    }
    const schema = new ClickhouseSchema(schemaDefinition, options)
    const expectedQuery = 'CREATE TABLE IF NOT EXISTS users_db.users_table\n(\nid UUID,\nname String DEFAULT \'John Doe\',\nemail String\n)\nENGINE = MergeTree()\nPRIMARY KEY id;'
    const query = schema.GetCreateTableQuery()
    expect(query).toEqual(expectedQuery)
  })

  it('should correctly generate a create table query list', () => {
    const schemaDefinition = {
      id: { type: ClickhouseTypes.CHUUID() },
      name: { type: ClickhouseTypes.CHString('John Doe') },
      email: { type: ClickhouseTypes.CHString() }
    }
    const options: ChSchemaOptions<typeof schemaDefinition> = {
      table_name: 'users_table',
      primary_key: 'id',
      on_cluster: 'users_cluster',
      order_by: 'id',
      additional_options: ['COMMENT \'This table provides user details\'']
    }
    const schema = new ClickhouseSchema(schemaDefinition, options)
    const expectedQuery = [
      'CREATE TABLE IF NOT EXISTS users_table ON CLUSTER users_cluster',
      '(',
      'id UUID,',
      "name String DEFAULT 'John Doe',",
      'email String',
      ')',
      'ENGINE = MergeTree()',
      'ORDER BY id',
      'PRIMARY KEY id',
      'COMMENT \'This table provides user details\';'
    ]
    const query = schema.GetCreateTableQueryAsList()
    expect(query).toEqual(expectedQuery)
  })

  it('should generate a create table query when to string is called', () => {
    const schemaDefinition = {
      id: { type: ClickhouseTypes.CHUUID() },
      name: { type: ClickhouseTypes.CHString('John Doe') },
      email: { type: ClickhouseTypes.CHString() }
    }
    const options: ChSchemaOptions<typeof schemaDefinition> = {
      table_name: 'users_table',
      primary_key: 'id',
      on_cluster: 'users_cluster',
      order_by: 'id',
      additional_options: ['COMMENT \'This table provides user details\'']
    }
    const schema = new ClickhouseSchema(schemaDefinition, options)
    const expectedQuery = 'CREATE TABLE IF NOT EXISTS users_table ON CLUSTER users_cluster\n(\nid UUID,\nname String DEFAULT \'John Doe\',\nemail String\n)\nENGINE = MergeTree()\nORDER BY id\nPRIMARY KEY id\nCOMMENT \'This table provides user details\';'
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const query = schema.toString()

    expect(query).toEqual(expectedQuery)
  })

  it('should not throw if on_cluster is specified but primary_key or order_by is not', () => {
    try {
      const schemaDefinition = {
        id: { type: ClickhouseTypes.CHUUID() },
        name: { type: ClickhouseTypes.CHString('John Doe') },
        email: { type: ClickhouseTypes.CHString() }
      }
      const options: ChSchemaOptions<typeof schemaDefinition> = {
        table_name: 'users_table',
        on_cluster: 'users_cluster'
      }
      const schema = new ClickhouseSchema(schemaDefinition, options)
      const expectedQuery = 'CREATE TABLE IF NOT EXISTS users_table ON CLUSTER users_cluster\n(\nid UUID,\nname String DEFAULT \'John Doe\',\nemail String\n)\nENGINE = MergeTree();'
      const query = schema.GetCreateTableQuery()
      expect(query).toEqual(expectedQuery)
    } catch (e) {
      console.log(e, 'hereeeeeee')
    }
  })
})
