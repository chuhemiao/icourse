export const idlFactory = ({ IDL }) => {
  const Canister = IDL.Principal;
  const Operation = IDL.Variant({
    'stopCanister' : IDL.Null,
    'installCode' : IDL.Null,
    'uninstallCode' : IDL.Null,
    'startCanister' : IDL.Null,
    'createCanister' : IDL.Null,
    'deleteCanister' : IDL.Null,
  });
  const Proposal = IDL.Record({
    'id' : IDL.Nat,
    'code' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'canister_id' : IDL.Opt(Canister),
    'finished' : IDL.Bool,
    'operation' : Operation,
    'proposer' : IDL.Principal,
    'approvers' : IDL.Vec(IDL.Principal),
  });
  const ProposeArg = IDL.Record({
    'code' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'canister_id' : IDL.Opt(Canister),
    'operation' : Operation,
  });
  const ControllerCanister = IDL.Service({
    'approve' : IDL.Func([IDL.Nat], [Proposal], []),
    'get_propose' : IDL.Func([IDL.Nat], [IDL.Opt(Proposal)], []),
    'propose' : IDL.Func([ProposeArg], [Proposal], []),
  });
  return ControllerCanister;
};
export const init = ({ IDL }) => { return [IDL.Vec(IDL.Principal)]; };
