// we use this algorthim in  small data size or if you can assume that most books are almost sorted
// The number of exchanges is (n.(n-1)) / 2 where n is arr.length for large Size = n**2

const createNumberArray = (length, max) => Array.from({ length }, () => Math.floor(Math.random() * max));
const ex1 = createNumberArray(100000 , 221213)
// sorted by compare and replace every time
function Insertion_SortV1(arr) {
    for(let i = 1 ; i < arr.length ; i++){
        j = i 
        while (j >= i && arr[j-1] > arr[j])
        {
            // replace
                Hand     = arr[j-1]
                arr[j-1] = arr[j]
                arr[j]   = Hand
            j = j - 1
        }
    }
    return arr
}
// sorted by shift and after finish replace
function Insertion_SortV2(arr){
    for(let i = 1 ; i < arr.length ; i++){
        Hand = arr[i]
        j    = i - 1
        while(j >= 0 && arr[j] > Hand){
            arr[j+1] = arr[j]
            j = j-1
        }
        arr[j+1] = Hand
    }
    return arr
}
console.time("create time v1")
Insertion_SortV1(ex1)
console.timeEnd("create time v1")
console.time("create time v2")
Insertion_SortV2(ex1)
console.timeEnd("create time v2")
