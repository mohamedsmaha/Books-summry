let length_of_array = 500
let Friends_List = Array(length_of_array).fill(0)
let r            = 10
let numberOfUnreliable  = 70 // Should be Smaller or equal to Friends List.length
const R_Range           = [1,3] // The Range of R that you want see in Statistics 
const numberOfScenarios = 10000; // Number of scenarios to check every possibility for r
                                // As the number of scenarios increases, the accuracy of the result improves

function Broadcasting(arr, r) {
    let friendsList = [...arr];

    function addRandomUnreliable(num, numberOfUnreliable) {
        const indices = Array.from({ length: friendsList.length }, (_, index) => index);
        for (let i = 0; i < numberOfUnreliable; i++) {
            const randomIndex = Math.floor(Math.random() * indices.length);
            friendsList[indices[randomIndex]] = -1 * num - 1;
            indices.splice(randomIndex, 1);
        }
    }
    function initialCall() {
        const n = friendsList.length;
        for (let i = 0; i < r * 2; i++) {
            if (i < n) {
                friendsList[i] += 1;
            }
        }
    }
    
    addRandomUnreliable(r , numberOfUnreliable);
    initialCall();

    const N = Math.ceil(friendsList.length / 2);
    for (let i = 1, nn = friendsList.length; i < N + 1; i++) {
        if (friendsList[i - 1] > 0) {
            for (let j = 2 * i + 1; j < 2 * i + 2 * r; j++) {
                if (j < nn + 1) {
                    friendsList[j - 1] += 1;
                } else {
                    break;
                }
            }
        }
    }

    return friendsList;
}
function Check1 (arr){
    let count = 0 
    for(let i =0 ; i < arr.length ; i++){
        if(arr[i] == 0 ){
            count += 1
        }
    }
    return count
}
function Check2 (arr1){
    let object = {}
    for(let i =R_Range[0]; i < R_Range[1]+1 ; i++){
        object[i] = {Ideal_case : 0 , UnReachedreliable:[0 , 0] , Max_Min : [0 , Infinity] }
    }
    for(let i = R_Range[0] ; i < R_Range[1] + 1; i++){
        for(let j = 0 ; j< numberOfScenarios ;j++){
            let arr    = Broadcasting(arr1,i)
            let count  = Check1(arr)
            if(count > 0){
                object[i]["Ideal_case"] += 1
                object[i]["UnReachedreliable"][0]  += count
                object[i]["UnReachedreliable"][1]  += 1
                object[i]["Max_Min"][0]= Math.max(object[i]["Max_Min"][0] , count )
                object[i]["Max_Min"][1]= Math.min(object[i]["Max_Min"][1] , count )
            }
        }
        object[i]["Ideal_case"]          = (object[i]["Ideal_case"]*100 / numberOfScenarios).toFixed(1) + " %"
        object[i]["UnReachedreliable"]   = (object[i]["UnReachedreliable"][0]*100/(object[i]["UnReachedreliable"][1]*length_of_array)).toFixed(1) +" %"
    }
    // for(let i =R_Range[0] ; i < R_Range[1] + 1; i++){
    //     if(parseInt(object[i]) == 0 ){
    //         // delete object[i]
    //     }
    // }
    return object
}
let arr = Broadcasting(Friends_List,r)
console.log(Check2(Friends_List)) // The Statistics object provides the percentage by which the error deviates from
                                  // the ideal case when choosing R
                                  // Ideal Case Mean All Reliable Students Called
console.log(Check1(arr)) // Number of Reliable Students but no body call them