let length_of_array = 1000
let Friends_List = Array(length_of_array).fill(0)
let r1                   = 19
let numberOfUnreliable  = 200 // Should be Smaller or equal to Friends List.length
const R_Range           = [19,19] // The Range of R that you want see in Statistics 
const numberOfScenarios = 1000; // Number of scenarios to check every possibility for r
                                // As the number of scenarios increases, the accuracy of the result improves
function addRandomUnreliable(num, numberOfUnreliable , friendsList) {
    const indices = Array.from({ length: friendsList.length }, (_, index) => index);
    for (let i = 0; i < numberOfUnreliable; i++) {
        const randomIndex = Math.floor(Math.random() * indices.length);
        friendsList[indices[randomIndex]] = -1 * num - 1;
        indices.splice(randomIndex, 1);
    }
    return friendsList
}
function Broadcasting(arr, r) {
    let friendsList = [...arr];


    function initialCall() {
        const n = friendsList.length;
        for (let i = 0; i < r * 2; i++) {
            if (i < n) {
                friendsList[i] += 1;
            }
        }
    }
    
    friendsList = addRandomUnreliable(r , numberOfUnreliable , friendsList);
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
function Check2 (arr1 , method){
    let object = {}
    for(let i =R_Range[0]; i < R_Range[1]+1 ; i++){
        object[i] = {Ideal_case : 0 , UnReachedreliable:[0 , 0] , Max_Min : [0 , Infinity] }
    }
    for(let i = R_Range[0] ; i < R_Range[1] + 1; i++){
        for(let j = 0 ; j< numberOfScenarios ;j++){
            let friendlist = [...arr1]
            let arr    = (method == 1) ? Broadcasting(friendlist , i) : Random_Broadcasting(friendlist , i)
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
        object[i]["UnReachedreliable"]   = (object[i]["UnReachedreliable"][0]*100/(length_of_array *object[i]["UnReachedreliable"][1] )).toFixed(1) +" %"
        object[i] = {"ideal_Case" : object[i]["Ideal_case"]}
    }
    // for(let i =R_Range[0] ; i < R_Range[1] + 1; i++){
    //     if(parseInt(object[i]["Ideal_case"]) == 0 ){
    //         delete object[i]
    //     }
    // }
    return object
}

function Random_Broadcasting(friendsList , r){
    let N            = friendsList.length
    let Random_Array = create_Random_array()
    let continue1    = true
    friendsList = addRandomUnreliable(r , numberOfUnreliable,friendsList )
    initialCall()
    while(continue1){
        continue1 = false
        for(let i=0; i < N ; i++){
            if(friendsList[i] == 1){
                continue1 = true
                friendsList[i] = 2
                for(let j=0 ; j < r ; j++){
                    if(friendsList[Random_Array[i][j]] == 0)
                    {
                        friendsList[Random_Array[i][j]] += 1;
                    }
                }

            }   
        }
    } 
    function initialCall() {    
        for (let i = 0; i < r ; i++) {
            if(friendsList[Random_Array[0][i]] == 0)
            {
                friendsList[Random_Array[0][i]] += 1;
            }
        }
    }
    function create_Random_array(){
        let arr = Array(N)
        for(let i =0 ;i<N ; i++){
            let arr1 = []
            for(let j =0 ; j < r ;j++){
                let j =  Math.floor(Math.random()*(N) + 0)
                arr1.push(j)
            }
            arr[i] = arr1
        }
        return arr
    }
    return friendsList
}
console.log("Random")
console.log(Check2([...Friends_List] , 2))
console.log(Check1(Random_Broadcasting([...Friends_List] , r1)))
console.log("Broadcasting")
console.log(Check2([...Friends_List], 1))
console.log(Check1(Broadcasting([...Friends_List] , r1)))