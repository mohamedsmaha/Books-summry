function first_Version(number){
    function give_me_ObjectNumbers(to){
        let obj = {}
        for(let i =1 ; i < to + 1 ; i++ ){
            obj[i] = true
        }
        return obj
    }
    let obj = give_me_ObjectNumbers(number)
    for(let i = 2 ; i <= number ; i++ ){
        for(let j =2  ; j <= number ; j++){
            delete obj[i*j]
        }
    }
    return obj
}
function secound_Version(number){
    function give_me_ObjectNumbers(to){
        let obj = {}
        for(let i =1 ; i < to + 1 ; i++ ){
            obj[i] = true
        }
        return obj
    }
    let obj = give_me_ObjectNumbers(number)
    for(let i = 2 ; i <= number ; i++ ){
        for(let j =i  ; j <= number ; j++){
            delete obj[i*j]
        }
    }
    return obj
}
function Thired_Version(number){
    function give_me_ObjectNumbers(to){
        let obj = {}
        for(let i =1 ; i < to + 1 ; i++ ){
            obj[i] = true
        }
        return obj
    }
    let obj = give_me_ObjectNumbers(number)
    for(let i = 2 ; i <= (number)**0.5 ; i++ ){
        for(let j =i  ; j <= number/2 ; j++){
            delete obj[i*j]
        }
    }
    return obj
}
function Fourth_Version(number){
    function give_me_ObjectNumbers(to){
        let obj = {}
        for(let i =1 ; i < to + 1 ; i++ ){
            obj[i] = true
        }
        return obj
    }
    let obj = give_me_ObjectNumbers(number)
    for(let i = 2 ; i <= (number)**0.5 ; i++ ){
        if(obj[i] == undefined){continue}
        for(let j =i  ; j <= number/2 ; j++){
            delete obj[i*j]
        }
    }
    return obj
}
function Fifth_Version(n) {
    // Step 3: Write down all numbers between 2 and n into a list
    let numbers = {};
    for (let i = 2; i <= n; i++) {
        numbers[i] = true;
    }

    // Step 4: Iterate for i from 2 to √n
    for (let i = 2; i <= Math.sqrt(n); i++) {
        // Step 5: If i is present in the list
        if (numbers[i]) {
            // Step 6: Iterate for k from ⌈n/i⌉ to i step -1
            for (let k = Math.ceil(n / i); k >= i; k--) {
                // Step 7: If k is present in the list
                if (numbers[k]) {
                    // Step 8: Remove the number i * k from the list
                    delete numbers[i * k];
                }
            }
        }
    }

    // The keys of the 'numbers' object now contain the prime numbers between 2 and n
    return Object.keys(numbers).map(Number);
}


// let number = 10000
// console.time("First Version")
// first_Version(number)
// console.timeEnd("First Version")

// console.time("Secound Version")
// secound_Version(number)
// console.timeEnd("Secound Version")

// console.time("Thired Version")
// Thired_Version(number)
// console.timeEnd("Thired Version")

// console.time("Fourth Version")
// console.log(Fourth_Version(242))
// console.timeEnd("Fourth Version")

// console.time("Fifth Version")
// Fifth_Version(242)
// console.timeEnd("Fifth Version")
module.exports = { Fifth_Version };
