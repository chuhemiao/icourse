import Buffer "mo:base/Buffer";
import Option "mo:base/Option";
import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Principal "mo:base/Principal";

import IC "./ic";
import Types "./types";

actor class ControllerCanister(owner_list: [Principal]) = this {

  stable var ownerList : [Principal] = owner_list;
  stable var canister_list : [Principal] = [];
  stable var proposal_id : Nat = 0;

  let M : Nat = owner_list.size() / 2;
  var proposal_list: Buffer.Buffer<Types.Proposal> = Buffer.Buffer<Types.Proposal>(0);

  public shared({caller}) func propose(arg: Types.ProposeArg) : async Types.Proposal {
    assert(is_owner(caller));
    assert(check_propose(arg));

    let propose = {
      id = proposal_list.size() + 1;
      proposer= caller;
      code = arg.code;
      operation= arg.operation;
      canister_id= arg.canister_id;
      approvers= [];
      finished= false;
    };

    proposal_list.add(propose);
    propose
  };

  public func get_propose(id: Nat) : async ?Types.Proposal {
    proposal_list.getOpt(id)
  };

  public shared({caller}) func approve(proposal_id: Nat): async Types.Proposal {
    assert(is_owner(caller));

    assert(proposal_id <= proposal_list.size());

    var proposal : Types.Proposal = proposal_list.get(proposal_id);

    assert(not proposal.finished);

    assert(Option.isNull(Array.find(proposal.approvers, func(approver: Principal) : Bool { approver == caller})));

    proposal := add_approver(proposal, caller);

    if (proposal.approvers.size() >= M) { 
      let ic : IC.Self = actor("aaaaa-aa");

      switch (proposal.operation) {
        case (#createCanister) {
          let settings : IC.canister_settings = 
          {
            freezing_threshold = null;
            controllers = ?[Principal.fromActor(this)];
            memory_allocation = null;
            compute_allocation = null;
          };

          let result = await ic.create_canister({settings = ?settings});

          canister_list := Array.append(canister_list, [result.canister_id]);

          proposal := update_canister_id(proposal, result.canister_id);
        };
        case (#installCode) {
          await ic.install_code({
            arg = [];
            wasm_module = Blob.toArray(Option.unwrap(proposal.code));
            mode = #install;
            canister_id = Option.unwrap(proposal.canister_id);
          });
        };
        case (#uninstallCode) {
          await ic.uninstall_code({
            canister_id = Option.unwrap(proposal.canister_id);
          });
        };
        case (#startCanister) {
          await ic.start_canister({
            canister_id = Option.unwrap(proposal.canister_id);
          });
        };
        case (#stopCanister) {
          await ic.stop_canister({
            canister_id = Option.unwrap(proposal.canister_id);
          });
        };
        case (#deleteCanister) {
          await ic.delete_canister({
            canister_id = Option.unwrap(proposal.canister_id);
          });
        };
      }; 

      proposal := finish_proposer(proposal);
    };

    proposal_list.put(proposal_id, proposal);
    proposal_list.get(proposal_id)
  };




  private func is_owner(owner : Principal) : Bool {
    Option.isSome(Array.find(ownerList, func (caller: Principal) : Bool { Principal.equal(caller, owner) }))
  };

  private func check_propose(arg: Types.ProposeArg) : Bool {
    if (arg.operation == #installCode and Option.isNull(arg.code)) {
      return false;
    };

    if (arg.operation != #createCanister and Option.isNull(arg.canister_id)) {
      return false;
    };

    switch (arg.canister_id) {
      case (?canister_id) assert(check_canister_id(canister_id));
      case (null) {};
    };

    true
  };

  private func check_canister_id(canister : Principal) : Bool {
    Option.isSome(Array.find(canister_list, func (canister_id: Principal) : Bool { Principal.equal(canister_id, canister) }))
  };


  private func finish_proposer(p: Types.Proposal) : Types.Proposal {
		{
			id = p.id;
			proposer = p.proposer;
			code = p.code;
			operation = p.operation;
			canister_id = p.canister_id;
			approvers = p.approvers;
			finished = true;
  		}
	};

  private func add_approver(p: Types.Proposal, approver: Principal) : Types.Proposal {
		{
			id = p.id;
			proposer = p.proposer;
			code = p.code;
			operation = p.operation;
			canister_id = p.canister_id;
			approvers = Array.append(p.approvers, [approver]);
			finished = p.finished;
  		}
	};

  	private func update_canister_id(p: Types.Proposal, canister_id: Principal) : Types.Proposal {
		{
			id = p.id;
			proposer = p.proposer;
			code = p.code;
			operation = p.operation;
			canister_id = ?canister_id;
			approvers = p.approvers;
			finished = p.finished;
		}
	};


}