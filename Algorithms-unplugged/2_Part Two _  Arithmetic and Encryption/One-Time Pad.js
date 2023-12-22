
// in one time pad the key can only used once
function one_time_pad(arrvalue , arrkey){
    // key : 1 => flip , 0 => don`t flip 
    return arrvalue.map((item , index) => item ^ arrkey[index])
    
}

console.log(one_time_pad([1,0,1,0] , [0,1,1,1]))