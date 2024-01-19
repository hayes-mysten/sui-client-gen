import {
  ReifiedTypeArgument,
  ToField,
  ToTypeArgument,
  TypeArgument,
  assertFieldsWithTypesArgsMatch,
  decodeFromFieldsGenericOrSpecial,
  decodeFromFieldsWithTypesGenericOrSpecial,
  extractType,
  reified,
  toBcs,
} from '../../_framework/types'
import { FieldsWithTypes, Type, compressSuiType, genericToJSON } from '../../_framework/util'
import { BcsType, bcs } from '@mysten/bcs'

/* ============================== VecSet =============================== */

export function isVecSet(type: Type): boolean {
  type = compressSuiType(type)
  return type.startsWith('0x2::vec_set::VecSet<')
}

export interface VecSetFields<T0 extends TypeArgument> {
  contents: Array<ToField<T0>>
}

export class VecSet<T0 extends TypeArgument> {
  static readonly $typeName = '0x2::vec_set::VecSet'
  static readonly $numTypeParams = 1

  readonly $typeName = VecSet.$typeName

  static get bcs() {
    return <T0 extends BcsType<any>>(T0: T0) =>
      bcs.struct(`VecSet<${T0.name}>`, {
        contents: bcs.vector(T0),
      })
  }

  readonly $typeArg: string

  readonly contents: Array<ToField<T0>>

  private constructor(typeArg: string, contents: Array<ToField<T0>>) {
    this.$typeArg = typeArg

    this.contents = contents
  }

  static new<T0 extends ReifiedTypeArgument>(
    typeArg: T0,
    contents: Array<ToField<ToTypeArgument<T0>>>
  ): VecSet<ToTypeArgument<T0>> {
    return new VecSet(extractType(typeArg), contents)
  }

  static reified<T0 extends ReifiedTypeArgument>(T0: T0) {
    return {
      typeName: VecSet.$typeName,
      typeArgs: [T0],
      fromFields: (fields: Record<string, any>) => VecSet.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) => VecSet.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => VecSet.fromBcs(T0, data),
      bcs: VecSet.bcs(toBcs(T0)),
      __class: null as unknown as ReturnType<typeof VecSet.new<ToTypeArgument<T0>>>,
    }
  }

  static fromFields<T0 extends ReifiedTypeArgument>(
    typeArg: T0,
    fields: Record<string, any>
  ): VecSet<ToTypeArgument<T0>> {
    return VecSet.new(
      typeArg,
      decodeFromFieldsGenericOrSpecial(reified.vector(typeArg), fields.contents)
    )
  }

  static fromFieldsWithTypes<T0 extends ReifiedTypeArgument>(
    typeArg: T0,
    item: FieldsWithTypes
  ): VecSet<ToTypeArgument<T0>> {
    if (!isVecSet(item.type)) {
      throw new Error('not a VecSet type')
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg])

    return VecSet.new(
      typeArg,
      decodeFromFieldsWithTypesGenericOrSpecial(reified.vector(typeArg), item.fields.contents)
    )
  }

  static fromBcs<T0 extends ReifiedTypeArgument>(
    typeArg: T0,
    data: Uint8Array
  ): VecSet<ToTypeArgument<T0>> {
    const typeArgs = [typeArg]

    return VecSet.fromFields(typeArg, VecSet.bcs(toBcs(typeArgs[0])).parse(data))
  }

  toJSON() {
    return {
      $typeArg: this.$typeArg,
      contents: genericToJSON(`vector<${this.$typeArg}>`, this.contents),
    }
  }
}
