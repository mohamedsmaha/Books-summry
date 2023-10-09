//solve a large problem by decomposing it into smaller subproblems
//divide-and-conquer
// for best case or avearge O(n log n)
// for worst case O(n ** 2)



const createNumberArray = (length, max) => Array.from({ length }, () => Math.floor(Math.random() * max));
const ex1 = createNumberArray(100000 , 100000)
function QuickSort(arr){
    function Sort(arr){
        if(arr.length <= 1){return []}
        let index = Math.floor(Math.random() * arr.length);
        let pivot = arr[index]
        let left  = []
        let right = []
        for(let i = 0 ; i < arr.length  ; i++ ){
            if(i == index){continue}
            if(pivot >= arr[i]){
                left.push(arr[i])
            }
            else{
                right.push(arr[i])
            }
        }
        left  = QuickSort(left)
        right = QuickSort(right)

        return [left , pivot , right]
    }  
    return Sort(arr)
}

console.time("create time V1")
QuickSort(ex1)
console.timeEnd("create time V1")
