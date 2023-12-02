let ex1 = {
    0 : [1, 2, 3, 4],
    1 : [5, 6, 7, 8, 9],
    2 : [3],
    3 : [4],
    4 : [],
    5 : [7],
    6 : [20],
    7 : [],
    8 : [10],
    9 : [],
    10: [1],
    11: [12],
    12: [7],
    20: [21],
    21: [23],
    22: [],
    23: [24],
    24: [0, 25, 26, 27],
    25: [],
    26: ["END"],
    27: [],
}

function Depth_First_Search_V1(ex1 , head ){
    function for_one_path(ex1 , head , state){
        if(state[head] == "discoverd"){return false}
        if(head == "END"){return true}
        else{
            state[head] = "discoverd"
            return  search(ex1 , ex1[head] , state)
        }
    }
    function search(ex1 , arr , state){
        for(let i = 0 ; i < arr.length ; i++){
            if(state[arr[i]]  ==  "discoverd"){continue}
            if(for_one_path(ex1 , arr[i] , state)){return "Found Goal"}
        }
        return false
    }
    return for_one_path(ex1 , head , [])
}
function Depth_First_Search_V2(ex1 , head){
    let mode   = "Forwards"
    let state  = {}
    let stack  = []
    let main   = head
    while(true)
    {
        if(mode == "Forwards"){
            if(state[main] == "discoverd"){
                mode = "Backward"
            }
            else{
                if(main == "END"){return show_paths()}
                state[main] = "discoverd"
                stack.push({path : main , exit : 0})
                if(ex1[main].length > 0 ){
                    main = ex1[main][0]
                }
            }
        }
        else{
            if(stack.length == 0){return false}
            if( stack[stack.length - 1]["exit"] < ex1[stack[stack.length - 1 ]['path']].length - 1){
                stack[stack.length - 1]["exit"] += 1
                main = ex1[stack[stack.length - 1]["path"]][stack[stack.length - 1]["exit"]]
                mode = "Forwards"
            }
            else{stack.pop(-1)}
        }
    }
    function show_paths(){
        let paths = [head]
        for(const item in stack){
            const x = stack[item]
            paths.push(ex1[x['path']][x['exit']])
        }
        return paths
    }
}
console.log(Depth_First_Search_V2(ex1 , 0))