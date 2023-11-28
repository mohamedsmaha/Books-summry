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
function Fifth_Version(number){
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
        for(let j =number/2 ; j > -1 ; j--){
            if([obj[j] == undefined]){continue}
            delete obj[i*j]
        }
    }
    return obj
}
let number = 1000000
console.time("First Version")
first_Version(number)
console.timeEnd("First Version")

console.time("Secound Version")
secound_Version(number)
console.timeEnd("Secound Version")

console.time("Thired Version")
Thired_Version(number)
console.timeEnd("Thired Version")

console.time("Fourth Version")
Fourth_Version(number)
console.timeEnd("Fourth Version")

console.time("Fifth Version")
Fifth_Version(number)
console.timeEnd("Fifth Version")