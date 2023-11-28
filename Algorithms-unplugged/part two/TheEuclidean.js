let a = 10291287312313
let b = 1231
// Finiding the largest commen divisor
function First_Version(Num1 , Num2){
    while(Num1 != Num2){
        if(Num1 > Num2){Num1 = Num1 - Num2}
        if(Num2 > Num1){Num2 = Num2 - Num1}
    }
    return Num1
}
function Secound_Version(Num1 , Num2){
    let max = Math.max(Num1 , Num2)
    let min = Math.min(Num1 , Num2)
    while(min > 0){
        let q = Math.floor(max / min)
        let r = max - min * q
        max   = min
        min   = r
    }
    return max
}

console.time("create time V1");
First_Version(a , b)
console.timeEnd("create time V1");

console.time("create time V2");
Secound_Version(a,b)
console.timeEnd("create time V2");
