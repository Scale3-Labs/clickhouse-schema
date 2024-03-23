import { type ChDataType } from '@clickhouse-schema-data-types/index'

export class ChUInt8 implements ChDataType {
  readonly typeStr: 'UInt8' = 'UInt8' as const
  readonly dataTypeMarker = 'UInt8' as const
  constructor () {
    this.typeStr = 'UInt8'
  }

  toString (): string {
    return this.typeStr
  }
}

export class ChUInt16 implements ChDataType {
  readonly typeStr: 'UInt16' = 'UInt16' as const
  readonly dataTypeMarker = 'UInt16' as const
  constructor () {
    this.typeStr = 'UInt16'
  }

  toString (): string {
    return this.typeStr
  }
}

export class ChUInt32 implements ChDataType {
  readonly typeStr: 'UInt32' = 'UInt32' as const
  readonly dataTypeMarker = 'UInt32' as const

  toString (): string {
    return this.typeStr
  }
}

export class ChUInt64 implements ChDataType {
  readonly typeStr: 'UInt64' = 'UInt64' as const
  readonly dataTypeMarker = 'UInt64' as const

  toString (): string {
    return this.typeStr
  }
}

export class ChUInt128 implements ChDataType {
  readonly typeStr: 'UInt128' = 'UInt128' as const
  readonly dataTypeMarker = 'UInt128' as const

  toString (): string {
    return this.typeStr
  }
}

export class ChUInt256 implements ChDataType {
  readonly typeStr: 'UInt256' = 'UInt256' as const
  readonly dataTypeMarker = 'UInt256' as const

  toString (): string {
    return this.typeStr
  }
}

export class ChInt8 implements ChDataType {
  readonly typeStr: 'Int8' = 'Int8' as const
  readonly dataTypeMarker = 'Int8' as const

  toString (): string {
    return this.typeStr
  }
}

export class ChInt16 implements ChDataType {
  readonly typeStr: 'Int16' = 'Int16' as const
  readonly dataTypeMarker = 'Int16' as const

  toString (): string {
    return this.typeStr
  }
}

export class ChInt32 implements ChDataType {
  readonly typeStr: 'Int32' = 'Int32' as const
  readonly dataTypeMarker = 'Int32' as const

  toString (): string {
    return this.typeStr
  }
}

export class ChInt64 implements ChDataType {
  readonly typeStr: 'Int64' = 'Int64' as const
  readonly dataTypeMarker = 'Int64' as const

  toString (): string {
    return this.typeStr
  }
}

export class ChInt128 implements ChDataType {
  readonly typeStr: 'Int128' = 'Int128' as const
  readonly dataTypeMarker = 'Int128' as const

  toString (): string {
    return this.typeStr
  }
}

export class ChInt256 implements ChDataType {
  readonly typeStr: 'Int256' = 'Int256' as const
  readonly dataTypeMarker = 'Int256' as const

  toString (): string {
    return this.typeStr
  }
}
