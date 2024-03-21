import * as http from 'http'
import { ClickhouseSchema } from '@clickhouse-schema-core/clickhouse_schema'
import { ClickhouseTypes } from '@clickhouse-schema-data-types/index'
import { type InferClickhouseSchemaType } from '@clickhouse-schema-core/infer_schema_type'

const hostname = '127.0.0.1'
const port = 3000

const requestFieldsTable = new ClickhouseSchema({
  id: { type: ClickhouseTypes.UUID },
  status_code: { type: ClickhouseTypes.UInt32 },
  url: { type: ClickhouseTypes.String },
  request_method: { type: ClickhouseTypes.Enum({ GET: 0, POST: 1, PUT: 2, DELETE: 3 }) },
  request_time: { type: ClickhouseTypes.Nullable(ClickhouseTypes.DateTime('UTC')) }
}, { table_name: 'request_data', primary_key: 'id' })

type RequestFields = InferClickhouseSchemaType<typeof requestFieldsTable>
const server = http.createServer((req, res) => {
  if (req.url === '/schema/query') {
    const createTableQuery = requestFieldsTable.GetCreateTableQuery()
    res.end(createTableQuery)
    return
  }
  if (req.url === '/schema/query/list') {
    res.end(requestFieldsTable.GetCreateTableQueryAsList())
    return
  }
  if (req.url === '/schema/fields') {
    const fields: RequestFields = {
      id: '123e456',
      status_code: 200,
      url: 'http://example.com',
      request_method: req.method as 'GET' | 'POST' | 'PUT' | 'DELETE',
      request_time: new Date()
    }
    res.statusCode = 200
    res.end(JSON.stringify(fields))
    res.setHeader('Content-Type', 'text/plain')
  }
})
export const runServerExample = (): void => {
  server.listen(port, hostname, () => {
    console.info(`Server running at http://${hostname}:${port}/`)
  })
}
