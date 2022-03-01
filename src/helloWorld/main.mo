import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Text "mo:base/Text";

actor {


  public type HeaderField = (Text, Text);

  public type HttpRequest = {
    url : Text;
    method : Text;
    body : [Nat8];
    headers : [HeaderField];
  };

  public type HttpResponse = {
    body : Blob;
    headers : [HeaderField];
    streaming_strategy : ?HttpStreamingStrategy;
    status_code : Nat16;
  };

  public type HttpStreamingCallbackResponse = {
    token : ?HttpStreamingCallbackToken;
    body : [Nat8];
  };

  public type HttpStreamingCallbackToken = {
    key : Text;
    sha256 : ?[Nat8];
    index : Nat;
    content_encoding : Text;
  };

  public type HttpStreamingStrategy = {
    #Callback : {
      token : HttpStreamingCallbackToken;
      callback : shared query HttpStreamingCallbackToken -> async HttpStreamingCallbackResponse;
    };
  };

  func fib(n: Nat): Nat {
    let x = if(n <= 1) 1 else { 
      let y = fib(n-1) ; 
      fib(n-2) + y; 
      }
  };

  func quicksort(arr: [var Int]) { 
        let len = arr.size();
        if (len <= 1) {
            return;
        };
        for (i in Iter.range(0, len - 1)) { 
            for (j in Iter.range(i, len - 1)) { 
                if (arr[j] < arr[i]) { 
                    let temp = arr[i]; 
                    arr[i] := arr[j]; 
                    arr[j] := temp; 
                }; 
            };
        };
  }; 
    
  public query func qsort(arr: [Int]): async [Int] { 
      let temp = Array.thaw<Int>(arr); 
      quicksort(temp); 
      Array.freeze(temp) 
  };



  public func fibonacci(x:Nat): async Nat {
    fib(x)
  };

 

  stable var counter = 0;

  // Get the value of the counter.
  public query func get() : async Nat {
    counter;
  };

  // Set the value of the counter.
  public func set(n : Nat) : async () {
    counter := n;
  };

  // Increment the value of the counter.
  public func inc() : async () {
    counter += 1;
  };

  public shared query func http_request(request: HttpRequest) : async HttpResponse {
    var body = Text.encodeUtf8(Nat.toText(counter));
    var response_code: Nat16 = 200;
    {
      body = body;
      headers = [ 
        ("Content-Type", "text/plain"),
        ("Access-Control-Allow-Origin", "*"),
      ];
      streaming_strategy = null;
      status_code = response_code;
    };
  };
}