// sequential search or linear search
// assume for one compare we take 1s
    // best case   : 1s
    // avarge case : (arr.length / 2 ) s
    // worest case : (arr.length)s
function create_number_array(length , max){
    const arr = []
    for(let i =0 ; i < length ; i++){
        arr.push(Math.floor(Math.random()*max))
    }
    return arr;
}

const ex1 = [1,2,4,5,6,100,10,11,12,13,17]
const ex2 = [1,2,3,4,56,5,455,449,78,89,54,45451,4512,5784,5159,6325,147,85]
const ex3 = create_number_array(10000 , 221213)
function linear_search( arr , number){
    for(let i=0  ; i < arr.length ; i++ ){
        if(arr[i] == number){return true}
    }
    return false
}  
console.log(linear_search(ex3 , 10))
console.log(linear_search(ex2 , 45451))
console.log(linear_search(ex1 , 2))