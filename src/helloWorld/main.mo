// import Nat "mo:base/Nat";
// import Array "mo:base/Array";
// import Int "mo:base/Int";
// import Iter "mo:base/Iter";
// import Text "mo:base/Text";
// import List "mo:base/List";
import Principal "mo:base/Principal";
// import Microblog "mo:base/Principal";
// import Time "mo:base/Time";

import IC "./ic";

actor class () = self {


  // public type HeaderField = (Text, Text);

  // public type HttpRequest = {
  //   url : Text;
  //   method : Text;
  //   body : [Nat8];
  //   headers : [HeaderField];
  // };

  // public type HttpResponse = {
  //   body : Blob;
  //   headers : [HeaderField];
  //   streaming_strategy : ?HttpStreamingStrategy;
  //   status_code : Nat16;
  // };

  // public type HttpStreamingCallbackResponse = {
  //   token : ?HttpStreamingCallbackToken;
  //   body : [Nat8];
  // };

  // public type HttpStreamingCallbackToken = {
  //   key : Text;
  //   sha256 : ?[Nat8];
  //   index : Nat;
  //   content_encoding : Text;
  // };

  // public type HttpStreamingStrategy = {
  //   #Callback : {
  //     token : HttpStreamingCallbackToken;
  //     callback : shared query HttpStreamingCallbackToken -> async HttpStreamingCallbackResponse;
  //   };
  // };

  // func fib(n: Nat): Nat {
  //   let x = if(n <= 1) 1 else { 
  //     let y = fib(n-1) ; 
  //     fib(n-2) + y; 
  //     }
  // };

  // func quicksort(arr: [var Int]) { 
  //       let len = arr.size();
  //       if (len <= 1) {
  //           return;
  //       };
  //       for (i in Iter.range(0, len - 1)) { 
  //           for (j in Iter.range(i, len - 1)) { 
  //               if (arr[j] < arr[i]) { 
  //                   let temp = arr[i]; 
  //                   arr[i] := arr[j]; 
  //                   arr[j] := temp; 
  //               }; 
  //           };
  //       };
  // }; 
    
  // public query func qsort(arr: [Int]): async [Int] { 
  //     let temp = Array.thaw<Int>(arr); 
  //     quicksort(temp); 
  //     Array.freeze(temp) 
  // };



  // public func fibonacci(x:Nat): async Nat {
  //   fib(x)
  // };

 

  // stable var counter = 0;

  // // Get the value of the counter.
  // public query func get() : async Nat {
  //   counter;
  // };

  // // Set the value of the counter.
  // public func set(n : Nat) : async () {
  //   counter := n;
  // };

  // // Increment the value of the counter.
  // public func inc() : async () {
  //   counter += 1;
  // };

  // public shared query func http_request(request: HttpRequest) : async HttpResponse {
  //   var body = Text.encodeUtf8(Nat.toText(counter));
  //   var response_code: Nat16 = 200;
  //   {
  //     body = body;
  //     headers = [ 
  //       ("Content-Type", "text/plain"),
  //       ("Access-Control-Allow-Origin", "*"),
  //     ];
  //     streaming_strategy = null;
  //     status_code = response_code;
  //   };
  // };

  // // microblog

  // // public type Message = Text;

  // public type Message = {
  //     content : Text;
  //     time: Time.Time;
  // };

  // public type Microblog = actor {
  //   follow: shared(Principal) -> async (); // 关注对象
  //   follows: shared query () -> async [Principal] ; // 关注列表
  //   reset_follows: shared () -> async (); // 取消关注
  //   post: shared (Text) -> async (); // 发布消息
  //   posts: shared query (Int) -> async [Message]; // 返回发布的消息
  //   timeline : shared () -> async [Message]; // 返回所有关注对象发布的消息
  // };

  // private stable var followed : List.List<Principal> = List.nil();

  // public shared func follow(id : Principal ) : async (){
  //   followed := List.push(id,followed);
  // };

  // public shared query func follows() : async [Principal]{
  //   List.toArray(followed);
  // };

  // public shared func reset_follows() : async (){
  //   followed := List.nil();
  // };
  

  // private stable var messages : List.List<Message> = List.nil();

  // public shared(msg) func post(text:Text) : async (){
  //   let message : Message = { content=text; time = Time.now()};
  //   assert(Principal.toText(msg.caller) == "exp33-minxe-lqmzo-dh3fa-ostfz-tkaue-kn7ow-6cioh-gzfw7-px7yn-pqe");
  //   messages := List.push(message, messages) ;
  // };

  // public shared query func posts(since: Time.Time) : async [Message]{
  //   var filterMessage : List.List<Message> = List.nil();
  //   for(msg in Iter.fromList(messages)){
  //       if(msg.time > since){
  //           filterMessage := List.push(msg, filterMessage);
  //       };
  //   };
  //   List.toArray(filterMessage);
  // };

  // public shared(msg) func timeline(since: Time.Time) : async [Message]{
  //     var all : List.List<Message> = List.nil();

  //     for (id in Iter.fromList(followed)){
  //       let canister : Microblog = actor(Principal.toText(id));
  //       let msgs = await canister.posts(since);
  //       for(msg in Iter.fromArray(msgs)){
  //         all := List.push(msg,all);
  //       }
  //     };

  //     List.toArray(all)
  // };
  // 生成canister

  public func create_canister() : async IC.canister_id {
    let settings = {
        freezing_threshold =  null;
        controllers =  ?[Principal.fromActor(self)];
        memory_allocation =  null;
        compute_allocation =  null;
    };
    let ic : IC.Self = actor("aaaaa-aa");
    let result = await ic.create_canister({ settings = ?settings; });
    result.canister_id
  };

  // todo

  public func install_code() : async IC.install_code {

  };

  public func start_canister() : async IC.start_canister{

  };

  public func stop_canister() : async IC.stop_canister{

  };

  public func delete_canister() : async IC.delete_canister{

  };


}