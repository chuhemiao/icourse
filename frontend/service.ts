import { Actor, HttpAgent } from '@dfinity/agent';
import { ControllerCanister as serviceActor } from './idl/controllerCanister/controllerCanister.did';
import { idlFactory as controllerCanisterIDL } from './idl/controllerCanister/index';
const cid = 'dwtm2-vqaaa-aaaal-qadxq-cai';

export const $agent: HttpAgent = new HttpAgent();

export const demianActor: serviceActor = Actor.createActor(
  controllerCanisterIDL,
  {
    agent: $agent,
    canisterId: cid
  }
);
