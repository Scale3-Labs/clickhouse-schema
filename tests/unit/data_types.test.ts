import { ChArray } from '@clickhouse-schema-data-types/ch_array'
import { ChBoolean } from '@clickhouse-schema-data-types/ch_boolean'
import { ChDate, ChDate32, ChDateTime, ChDateTime64 } from '@clickhouse-schema-data-types/ch_date'
import { ChEnum } from '@clickhouse-schema-data-types/ch_enum'
import { ChFloat32, ChFloat64 } from '@clickhouse-schema-data-types/ch_float'
import { ChUInt8, ChUInt16, ChUInt32, ChUInt64, ChInt8, ChInt16 } from '@clickhouse-schema-data-types/ch_integer'
import { ChJSON } from '@clickhouse-schema-data-types/ch_json'
import { ChFixedString, ChString } from '@clickhouse-schema-data-types/ch_string'
import { ChUUID } from '@clickhouse-schema-data-types/ch_uuid'
import { ClickhouseTypes } from '@clickhouse-schema-data-types/index'

describe('Data Types Tests', () => {
  it('should correctly create integer data types with the correct typeStr', () => {
    const uint8 = new ChUInt8()
    const uint16 = new ChUInt16()
    const uint32 = new ChUInt32()
    const uint64 = new ChUInt64()
    const int8 = new ChInt8()
    const int16 = new ChInt16()

    expect(uint8.toString()).toEqual('UInt8')
    expect(uint16.toString()).toEqual('UInt16')
    expect(uint32.toString()).toEqual('UInt32')

    expect(uint64.toString()).toEqual('UInt64')
    expect(int8.toString()).toEqual('Int8')
    expect(int16.toString()).toEqual('Int16')
  })

  it('should correctly create float data types with the correct typeStr', () => {
    const float32 = new ChFloat32()
    const float64 = new ChFloat64()

    expect(float32.toString()).toEqual('Float32')
    expect(float64.toString()).toEqual('Float64')
  })

  it('should correctly create boolean data type with the correct typeStr', () => {
    const bool = new ChBoolean()
    expect(bool.toString()).toEqual('Boolean')
  })

  it('should correctly create array data type with the correct typeStr', () => {
    const stringArray = new ChArray(new ChString())
    const nestedArray = new ChArray(new ChArray(new ChString()))

    expect(stringArray.toString()).toEqual('Array(String)')
    expect(nestedArray.toString()).toEqual('Array(Array(String))')
  })

  it('should correctly create date data types with the correct typeStr', () => {
    const date = new ChDate()
    const date32 = new ChDate32()
    const dateTime64 = new ChDateTime64(3, 'UTC')
    const dateTime = new ChDateTime('UTC')

    expect(dateTime.toString()).toEqual('DateTime(UTC)')
    expect(dateTime64.toString()).toEqual('DateTime64(3, UTC)')

    expect(date.toString()).toEqual('Date')
    expect(date32.toString()).toEqual('Date32')
  })

  it('should correctly create a string data types with the correct typeStr', () => {
    const string = new ChString()
    const fixedString = new ChFixedString(10)

    expect(string.toString()).toEqual('String')
    expect(fixedString.toString()).toEqual('FixedString(10)')
  })

  it('should correctly create a uuid data types with the correct typeStr', () => {
    const uuid = new ChUUID()
    expect(uuid.toString()).toEqual('UUID')
  })

  it('should correctly create a json data types with the correct typeStr', () => {
    const json = new ChJSON({
      dateTime64: { type: ClickhouseTypes.DateTime64(3, 'UTC') },
      dateTime: { type: ClickhouseTypes.DateTime('UTC') },
      enum: { type: ClickhouseTypes.Enum({ POST: 1, PUT: 2, DELETE: 3, GET: 4 }) },
      array: { type: ClickhouseTypes.Array(ClickhouseTypes.String) },
      fixedString: { type: ClickhouseTypes.FixedString(10) },
      json: { type: ClickhouseTypes.JSON({ k: { type: ClickhouseTypes.String } }) }
    })
    expect(json.toString()).toEqual('JSON')
  })

  it('should correctly create a enum data types with the correct typeStr', () => {
    const enumType = new ChEnum({ POST: 1, PUT: 2, DELETE: 3, GET: 4 })
    expect(enumType.toString()).toEqual('Enum(\'POST\' = 1,\'PUT\' = 2,\'DELETE\' = 3,\'GET\' = 4)')
  })
})
