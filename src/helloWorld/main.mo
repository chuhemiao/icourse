import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Iter "mo:base/Iter";

actor {

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
  }

}