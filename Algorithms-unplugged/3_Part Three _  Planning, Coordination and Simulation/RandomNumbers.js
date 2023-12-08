// Linear Congruential Generator
// Take a look about The Mersenne Twister 
function RandomNumber(n){
    let a = 5 ,c=1 , m = 16 , x = 1
    function NextRandomNumber(x){
    
        return (a*x + c) % m
    }
    for(let i =0 ; i < n ; i++){
        x = NextRandomNumber(x)
    }
    return x
}

let arr = []
for(let i = 0 ; i < 18 ; i++){
    x = RandomNumber(i)
    arr.push(x)
}
console.log(arr)