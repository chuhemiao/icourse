import type { Principal } from '@dfinity/principal';
export type Canister = Principal;
export interface ControllerCanister {
  'approve' : (arg_0: bigint) => Promise<Proposal>,
  'get_propose' : (arg_0: bigint) => Promise<[] | [Proposal]>,
  'propose' : (arg_0: ProposeArg) => Promise<Proposal>,
}
export type Operation = { 'stopCanister' : null } |
  { 'installCode' : null } |
  { 'uninstallCode' : null } |
  { 'startCanister' : null } |
  { 'createCanister' : null } |
  { 'deleteCanister' : null };
export interface Proposal {
  'id' : bigint,
  'code' : [] | [Array<number>],
  'canister_id' : [] | [Canister],
  'finished' : boolean,
  'operation' : Operation,
  'proposer' : Principal,
  'approvers' : Array<Principal>,
}
export interface ProposeArg {
  'code' : [] | [Array<number>],
  'canister_id' : [] | [Canister],
  'operation' : Operation,
}
export interface _SERVICE extends ControllerCanister {}
