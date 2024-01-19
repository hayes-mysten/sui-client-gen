import {
  ToField,
  decodeFromFieldsGenericOrSpecial,
  decodeFromFieldsWithTypesGenericOrSpecial,
} from '../../_framework/types'
import { FieldsWithTypes, Type, compressSuiType } from '../../_framework/util'
import { bcs, fromHEX, toHEX } from '@mysten/bcs'

/* ============================== ID =============================== */

export function isID(type: Type): boolean {
  type = compressSuiType(type)
  return type === '0x2::object::ID'
}

export interface IDFields {
  bytes: ToField<'address'>
}

export class ID {
  static readonly $typeName = '0x2::object::ID'
  static readonly $numTypeParams = 0

  readonly $typeName = ID.$typeName

  static get bcs() {
    return bcs.struct('ID', {
      bytes: bcs.bytes(32).transform({
        input: (val: string) => fromHEX(val),
        output: (val: Uint8Array) => toHEX(val),
      }),
    })
  }

  readonly bytes: ToField<'address'>

  private constructor(bytes: ToField<'address'>) {
    this.bytes = bytes
  }

  static new(bytes: ToField<'address'>): ID {
    return new ID(bytes)
  }

  static reified() {
    return {
      typeName: ID.$typeName,
      typeArgs: [],
      fromFields: (fields: Record<string, any>) => ID.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => ID.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ID.fromBcs(data),
      bcs: ID.bcs,
      __class: null as unknown as ReturnType<typeof ID.new>,
    }
  }

  static fromFields(fields: Record<string, any>): ID {
    return ID.new(decodeFromFieldsGenericOrSpecial('address', fields.bytes))
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ID {
    if (!isID(item.type)) {
      throw new Error('not a ID type')
    }

    return ID.new(decodeFromFieldsWithTypesGenericOrSpecial('address', item.fields.bytes))
  }

  static fromBcs(data: Uint8Array): ID {
    return ID.fromFields(ID.bcs.parse(data))
  }

  toJSON() {
    return {
      bytes: this.bytes,
    }
  }
}

/* ============================== UID =============================== */

export function isUID(type: Type): boolean {
  type = compressSuiType(type)
  return type === '0x2::object::UID'
}

export interface UIDFields {
  id: ToField<ID>
}

export class UID {
  static readonly $typeName = '0x2::object::UID'
  static readonly $numTypeParams = 0

  readonly $typeName = UID.$typeName

  static get bcs() {
    return bcs.struct('UID', {
      id: ID.bcs,
    })
  }

  readonly id: ToField<ID>

  private constructor(id: ToField<ID>) {
    this.id = id
  }

  static new(id: ToField<ID>): UID {
    return new UID(id)
  }

  static reified() {
    return {
      typeName: UID.$typeName,
      typeArgs: [],
      fromFields: (fields: Record<string, any>) => UID.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => UID.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => UID.fromBcs(data),
      bcs: UID.bcs,
      __class: null as unknown as ReturnType<typeof UID.new>,
    }
  }

  static fromFields(fields: Record<string, any>): UID {
    return UID.new(decodeFromFieldsGenericOrSpecial(ID.reified(), fields.id))
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): UID {
    if (!isUID(item.type)) {
      throw new Error('not a UID type')
    }

    return UID.new(decodeFromFieldsWithTypesGenericOrSpecial(ID.reified(), item.fields.id))
  }

  static fromBcs(data: Uint8Array): UID {
    return UID.fromFields(UID.bcs.parse(data))
  }

  toJSON() {
    return {
      id: this.id,
    }
  }
}
