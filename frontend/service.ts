import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as microblogIDL } from './idl/microblog/index';
import { ControllerCanister as serviceActor } from './idl/microblog/microblog.did';

const cid = 'dwtm2-vqaaa-aaaal-qadxq-cai';

export const $agent: HttpAgent = new HttpAgent();

export const demianActor: serviceActor = Actor.createActor(microblogIDL, {
  agent: $agent,
  canisterId: cid
});
