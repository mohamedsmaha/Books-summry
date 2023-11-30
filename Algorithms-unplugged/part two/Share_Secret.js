/*We're creating passwords that won't reveal 
the main secret unless you have all the specific passwords with you..*/

function Create_Partial_Secrets(S , N , P){
    // S : Secret
    // N : Max Random Numeber 
    // P : Number of Partial Secrets
    // Greater values of N result in increased security for the secret
    let arr  = Array(P).fill(0)
    let total= 0
    for(let i=0 ;i < P- 1 ; i++){
        let num = Math.floor(Math.random() * (N-1)) + 0;
        arr[i] = num
        total += num
    }
    let R = total % N
    if(S - R > 0 ){arr[P-1] = S-R }
    else {arr[P-1] = S-R+N}
    return arr
}
console.log(Create_Partial_Secrets(1,10 ** 20,10))
