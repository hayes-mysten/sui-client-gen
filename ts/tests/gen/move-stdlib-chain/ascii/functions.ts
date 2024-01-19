import { PUBLISHED_AT } from '..'
import { ObjectArg, obj, pure } from '../../_framework/util'
import { TransactionArgument, TransactionBlock } from '@mysten/sui.js/transactions'

export function length(txb: TransactionBlock, string: string | TransactionArgument) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::ascii::length`,
    arguments: [pure(txb, string, `0x1::ascii::String`)],
  })
}

export function char_(txb: TransactionBlock, u8: number | TransactionArgument) {
  return txb.moveCall({ target: `${PUBLISHED_AT}::ascii::char`, arguments: [pure(txb, u8, `u8`)] })
}

export function string(
  txb: TransactionBlock,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::ascii::string`,
    arguments: [pure(txb, vecU8, `vector<u8>`)],
  })
}

export function tryString(
  txb: TransactionBlock,
  vecU8: Array<number | TransactionArgument> | TransactionArgument
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::ascii::try_string`,
    arguments: [pure(txb, vecU8, `vector<u8>`)],
  })
}

export function allCharactersPrintable(
  txb: TransactionBlock,
  string: string | TransactionArgument
) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::ascii::all_characters_printable`,
    arguments: [pure(txb, string, `0x1::ascii::String`)],
  })
}

export interface PushCharArgs {
  string: string | TransactionArgument
  char: ObjectArg
}

export function pushChar(txb: TransactionBlock, args: PushCharArgs) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::ascii::push_char`,
    arguments: [pure(txb, args.string, `0x1::ascii::String`), obj(txb, args.char)],
  })
}

export function popChar(txb: TransactionBlock, string: string | TransactionArgument) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::ascii::pop_char`,
    arguments: [pure(txb, string, `0x1::ascii::String`)],
  })
}

export function asBytes(txb: TransactionBlock, string: string | TransactionArgument) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::ascii::as_bytes`,
    arguments: [pure(txb, string, `0x1::ascii::String`)],
  })
}

export function intoBytes(txb: TransactionBlock, string: string | TransactionArgument) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::ascii::into_bytes`,
    arguments: [pure(txb, string, `0x1::ascii::String`)],
  })
}

export function byte_(txb: TransactionBlock, char: ObjectArg) {
  return txb.moveCall({ target: `${PUBLISHED_AT}::ascii::byte`, arguments: [obj(txb, char)] })
}

export function isValidChar(txb: TransactionBlock, u8: number | TransactionArgument) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::ascii::is_valid_char`,
    arguments: [pure(txb, u8, `u8`)],
  })
}

export function isPrintableChar(txb: TransactionBlock, u8: number | TransactionArgument) {
  return txb.moveCall({
    target: `${PUBLISHED_AT}::ascii::is_printable_char`,
    arguments: [pure(txb, u8, `u8`)],
  })
}
