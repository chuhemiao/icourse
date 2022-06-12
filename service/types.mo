module {

    public type Canister = Principal;

    public type Operation = {
        #installCode;
        #uninstallCode;
        #createCanister;
        #startCanister;
        #stopCanister;
        #deleteCanister;
        #addMember;
        #deleMember;
    };

    public type Proposal = { 
        id: Nat;
        proposer: Principal;
        code: ?Blob;
        operation: Operation;
        canister_id: ?Canister;
        member: ?Principal;
        approvers: [Principal];
        finished: Bool;
    };

    public type ProposeArg = {
        operation: Operation;
        code: ?Blob;
        canister_id: ?Canister;
        member: ?Principal;
    }
}