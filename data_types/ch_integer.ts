import { type ChDataType } from '@clickhouse-schema-data-types/index'

/**
 * ChUInt8 is a class that represents a Clickhouse UInt8 data type
 */
export class ChUInt8 implements ChDataType {
  readonly typeStr: 'UInt8' = 'UInt8' as const

  constructor () {
    this.typeStr = 'UInt8'
  }

  toString (): string {
    return this.typeStr
  }
}

/**
 * ChUInt16 is a class that represents a Clickhouse UInt16 data type
 */
export class ChUInt16 implements ChDataType {
  readonly typeStr: 'UInt16' = 'UInt16' as const

  constructor () {
    this.typeStr = 'UInt16'
  }

  toString (): string {
    return this.typeStr
  }
}

/**
 * ChUInt32 is a class that represents a Clickhouse UInt32 data type
 */
export class ChUInt32 implements ChDataType {
  readonly typeStr: 'UInt32' = 'UInt32' as const

  toString (): string {
    return this.typeStr
  }
}

/**
 * ChUInt64 is a class that represents a Clickhouse UInt64 data type
 */
export class ChUInt64 implements ChDataType {
  readonly typeStr: 'UInt64' = 'UInt64' as const

  toString (): string {
    return this.typeStr
  }
}

/**
 * ChUInt128 is a class that represents a Clickhouse UInt128 data type
 */
export class ChUInt128 implements ChDataType {
  readonly typeStr: 'UInt128' = 'UInt128' as const

  toString (): string {
    return this.typeStr
  }
}

/**
 * ChUInt256 is a class that represents a Clickhouse UInt256 data type
 */
export class ChUInt256 implements ChDataType {
  readonly typeStr: 'UInt256' = 'UInt256' as const

  toString (): string {
    return this.typeStr
  }
}

/**
 * ChInt8 is a class that represents a Clickhouse Int8 data type
 */
export class ChInt8 implements ChDataType {
  readonly typeStr: 'Int8' = 'Int8' as const

  toString (): string {
    return this.typeStr
  }
}

/**
 * ChInt16 is a class that represents a Clickhouse Int16 data type

 */
export class ChInt16 implements ChDataType {
  readonly typeStr: 'Int16' = 'Int16' as const

  toString (): string {
    return this.typeStr
  }
}

/**
 * ChInt32 is a class that represents a Clickhouse Int32 data type
 */
export class ChInt32 implements ChDataType {
  readonly typeStr: 'Int32' = 'Int32' as const

  toString (): string {
    return this.typeStr
  }
}

/**
 * ChInt64 is a class that represents a Clickhouse Int64 data type
 */
export class ChInt64 implements ChDataType {
  readonly typeStr: 'Int64' = 'Int64' as const

  toString (): string {
    return this.typeStr
  }
}

/**
 * ChInt128 is a class that represents a Clickhouse Int128 data type
 */
export class ChInt128 implements ChDataType {
  readonly typeStr: 'Int128' = 'Int128' as const

  toString (): string {
    return this.typeStr
  }
}

/**
 * ChInt256 is a class that represents a Clickhouse Int256 data type
 */
export class ChInt256 implements ChDataType {
  readonly typeStr: 'Int256' = 'Int256' as const

  toString (): string {
    return this.typeStr
  }
}
