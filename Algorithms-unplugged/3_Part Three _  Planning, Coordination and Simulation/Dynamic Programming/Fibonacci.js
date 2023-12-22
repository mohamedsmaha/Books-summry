function Naive(n){
    let f = 0
    if(n <= 2 && n > 0){f = 1}
    else if (n != 0){f =  Naive(n-1) + Naive(n-2)}
    return f
}
function DB(n){
    let memo = {}
    function Naive(n){
    if(n in memo){return memo[n]}
    let f = 0
    if(n <= 2 && n > 0){f = 1}
    else if (n != 0){f =  Naive(n-1) + Naive(n-2)}
    memo[n] = f
    return f
}
    return Naive(n)
}
function DB2(n){
    let memo = {}
    for(let i = 0 ; i < n+1 ; i++ ){
        let f = 0
        if(i <= 2 && i > 0){f = 1}
        else if (i != 0){f = memo[i-1] + memo[i-2]}
        memo[i] = f
        
    }
    return memo[n]
}
console.time("Naive")
console.log(Naive(5))
console.timeEnd("Naive")
console.time("DB")
console.log(DB(1000))
console.timeEnd("DB")
console.time("DB2")
console.log(DB2(1000))
console.timeEnd("DB2")