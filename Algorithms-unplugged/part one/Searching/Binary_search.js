// the array must be sorted
// assume for one compare we take 1s
    // best case   : 1s
    // avarge case : (2 base log (arr.length / 2) ) s
    // worest case : (2 base log (arr.length) ) s


const ex1 = [1,2,3,4,5,6,7,8,9,10,100,1000,10000]


// By using while 
function Binary_search_V1(arr , Number){
    function Search(arr , number , start , end){
        while(start <= end){
            const middel   = Math.floor((start + end) / 2)
            if(arr[middel] == number){return true}
            if(arr[middel] > number ){end   = middel - 1}
            if(arr[middel] < number ){start = middel + 1}
        }
        return false
    }
    return Search(arr , Number , 0 , arr.length-1)
}
// By using Recursive   
function Binary_search_V2(arr , Number){
    function Search(arr , number , start , end){
        if(start > end){return false}
        const middel   = Math.floor((start + end) / 2)
        if(arr[middel] == number){return true}
        if(arr[middel] > number ){return Search(arr , number , start , middel - 1)}
        if(arr[middel] < number ){return Search(arr , number , middel + 1 , end )}

    }
    return Search(arr , Number , 0 , arr.length-1)
}
console.time("create time V1");
console.log(Binary_search_V1(ex1, 90000));
console.timeEnd("create time V1");

console.time("create time V2");
console.log(Binary_search_V2(ex1, 90000));
console.timeEnd("create time V2");

