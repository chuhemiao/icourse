module {

    public type Canister = Principal;

    public type Operation = {
        #installCode;
        #uninstallCode;
        #createCanister;
        #startCanister;
        #stopCanister;
        #deleteCanister;
    };

    public type Proposal = { 
        id: Nat;
        proposer: Principal;
        code: ?Blob;
        operation: Operation;
        canister_id: ?Canister;
        approvers: [Principal];
        finished: Bool;
    };

    public type ProposeArg = {
        operation: Operation;
        code: ?Blob;
        canister_id: ?Canister;
    }
}