function Compute_Modular_Exponentiation(a , b , c){
    // calc  (a ** b) mode c
    if(b == 0){return 1 }
    if(b == 1){return a % c}
    if(b % 2 == 1){
        let h = Compute_Modular_Exponentiation(a , b-1 , c)
        return (h * a) % c
    }
    if(b %2 == 0 ){
        let h = Compute_Modular_Exponentiation(a , b/2 , c)
        return (h * h) % c
    } // i know that is the only case and there is no need for if i just did it to rember
}
function Is_That__generator(n , c){
    // check if n ** b mod c can give me all values form 1 to c-1 
    function creat_object(number){
        let obj = {}
        for(let  i= 1 ; i < number ; i++){
            obj[i] = true
        }
        return obj
    }
    let obj = creat_object(c)
    for(let i =0 ; i < c ; i++){
        let value = Compute_Modular_Exponentiation(n , i , c)
        delete obj[value]
    }
    if(Object.keys(obj).length == 0){return true}
    return false
}

console.log(Compute_Modular_Exponentiation(4 * 15 , 1 , 59))

console.log(Is_That__generator(2,59))