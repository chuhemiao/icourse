import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Canister = Principal;
export interface ControllerCanister {
  'approve' : ActorMethod<[bigint], Proposal>,
  'get_owner' : ActorMethod<[], Array<Principal>>,
  'get_principal' : ActorMethod<[], Principal>,
  'get_propose' : ActorMethod<[bigint], [] | [Proposal]>,
  'get_propose_list' : ActorMethod<[], Array<Proposal>>,
  'propose' : ActorMethod<[ProposeArg], Proposal>,
}
export type Operation = { 'stopCanister' : null } |
  { 'deleMember' : null } |
  { 'installCode' : null } |
  { 'uninstallCode' : null } |
  { 'startCanister' : null } |
  { 'addMember' : null } |
  { 'createCanister' : null } |
  { 'deleteCanister' : null };
export interface Proposal {
  'id' : bigint,
  'member' : [] | [Principal],
  'code' : [] | [Array<number>],
  'canister_id' : [] | [Canister],
  'finished' : boolean,
  'operation' : Operation,
  'proposer' : Principal,
  'approvers' : Array<Principal>,
}
export interface ProposeArg {
  'member' : [] | [Principal],
  'code' : [] | [Array<number>],
  'canister_id' : [] | [Canister],
  'operation' : Operation,
}
export interface _SERVICE extends ControllerCanister {}
