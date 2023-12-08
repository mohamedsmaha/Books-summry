/*
Let us now consider this scheduling problem from a more general point
of view: Given are an even number n of teams (or players) and n − 1 rounds
(days for matches). The objective is to determine a schedule such that each
team plays against each other team exactly once, and each team plays exactly
one match per round. Thus, for each even number n, we ask whether such
a schedule exists and how we can construct a corresponding schedule. In the
following we show that for each even n a solution exists (i.e., for n = 18 as
well as for n = 6, but also for n = 100 or n = 1024). Furthermore, we describe
an algorithm which constructs such a schedule for any even number n.
*/
function ColorEdges(n){
    let object = {}
    function calc( i , k){
        return check((( i % k) + k) % k)
    }
    function check(value){
        if(value == 0){return n-1}
        return value
    }
    for(let i =1 ; i < n; i++){
        object[`${i} , ${n} , Home: ${ i % 2 == 1 ? i : n} `] = i
        for(let k = 1 ; k < (n/2) ; k++){
            let x = calc(i+k , n-1)
            let y = calc(i-k , n-1)
            object[`${x} , ${y} , Home ${(k % 2 == 1 ? x : y )} ` ] = i
        }
    }
    return object
}
console.log(ColorEdges(18))