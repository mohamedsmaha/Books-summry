let a = 7638217821637176382178216371763821782163717638217821637176763821782163717638217821637176382178216371382178216371763821782163717638217821637176382178216371
let b = 3681456431657638217821637176382178216371763821782163717638217821637176382178216371763821782163717638763821782163712178216371

//
function convert_number_into_eqution(Number , k  = undefined){
    /* Number of digit n = p * 10 ^ n + q */
    // return p , q , k
    function hit(coff , Number){
        if(Number == 0) {return Number}
        return coff *Number
    }
    let coff = (Number >= 0 ) ?  1 : -1
    Number   = Math.abs(Number)
    let string = Number.toString()
    let tall = string.length
    k        = (k == undefined) ? Math.ceil(Math.log2(tall)) : k // n = 2^k
    let q    = Number%10**(2**k / 2)
    let p    = (Number - q) / 10 ** (2**k / 2)
    return [hit(coff , p) , hit(coff , q) , k ]
}
function Is_that_onedigit(Number){
    Number= Math.abs(Number)
    if(Number.toString().length == 1){return true}
    return false
}
function Is_those_one_digit(Number1 , Number2){
    if(Is_that_onedigit(Number1) && Is_that_onedigit(Number2)){return true}
    return false
}
function Karatsuba(Number1 , Number2){
    let biggest_number = Math.max(Math.abs(Number1) , Math.abs(Number2))
    let data1 = convert_number_into_eqution((biggest_number == Math.abs(Number1)) ? Number1 : Number2 ) // p * 10 ^ (2^k)/2 + q 
    let data2 = convert_number_into_eqution((biggest_number == Math.abs(Number1)) ? Number2 : Number1 , data1[2])// r * 10 ^ (2^k)/2 + s
    let p     = data1[0]
    let q     = data1[1]
    let r     = data2[0]
    let s     = data2[1]
    let n     = 2 ** data1[2]
    let u     = (!Is_those_one_digit(p , r)) ? Karatsuba(p , r) : p * r  // p * r
    let w     = (!Is_those_one_digit(q , s)) ? Karatsuba(q , s) : q * s  // q * s
    let v     = (!Is_those_one_digit((q-p) , (s-r))) ? Karatsuba((q-p) , (s-r)) : (q-p) * (s-r)  // (q-p) *(s-r)   
    return u*10**(n) + (u+w-v)*10**(n/2) + w
}

console.time("create time V1");
console.log(a*b)
console.timeEnd("create time V1");

console.time("create time V2");
console.log(Karatsuba(a,b))
console.timeEnd("create time V2");

