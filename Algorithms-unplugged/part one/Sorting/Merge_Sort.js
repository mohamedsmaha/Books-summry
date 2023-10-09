// for all cases O(n log n)
const createNumberArray = (length, max) => Array.from({ length }, () => Math.floor(Math.random() * max));
const ex1               = createNumberArray(10000000 , 221211290283)
function merge_V1(arr1, arr2) {
    function Sort(arr1, start1, end1, arr2, start2, end2) {
        let arr = [];
        let i = start1, j = start2;

        for (let k = 0; k < (end1 - start1 + 1) + (end2 - start2 + 1); k++) {
        if (i > end1) {
            arr.push(arr2[j]);
            j = j + 1;
            continue;
        }
        if (j > end2) {
            arr.push(arr1[i]);
            i = i + 1;
            continue;
        }
        arr.push(arr1[i] < arr2[j] ? arr1[i++] : arr2[j++]);
        }

        return arr;
    }

    return Sort(arr1, 0, arr1.length - 1, arr2, 0, arr2.length - 1);
}
function merge_V2(arr1 , arr2){
    function Sort(arr1 , start1 , arr2 , start2 , arr){
        if(start1 <= arr1.length && start2 <= arr2.length){return arr}
        if (arr1[i] < arr2[j]) {
            return Sort(arr1,start1+1,arr2,  start2 ,arr.push(arr2[i]))
        }
        else {return Sort(arr1,start1,arr2,  start2+1 ,arr.push(arr2[j]));}
    }
    return Sort(arr1 , 0  , arr2 , 0 , [] )
}
function Merge_Sort(arr){
    function sort(arr , start , end){
        if(start < end){
            const middel = Math.floor((end + start) / 2)
            return merge_V2(sort(arr,start,middel) , sort(arr , middel + 1 ,end))
        }
        else if (start == end){
            return [arr[start]]
        }
        else{return []}
    }
    return sort(arr , 0 , arr.length - 1)
}

// console.time("create time v2")
// Merge_Sort(ex1)
// console.timeEnd("create time v2")
module.exports = Merge_Sort