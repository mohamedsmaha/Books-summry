let Graph = {
    0 : [ 0 , 3 , 0 , 7 , 10 , 0],
    1 : [ 8 , 0 , 2 , 0 , 2  , 0],
    2 : [ 5 , 0 , 0 , 6 , 0  , 0],
    3 : [ 2 , 0 , 0 , 0 , 2  , 0],
    4 : [ 0 , 0 , 0 , 0 , 0  , 1],
    5 : [ 0 , 2 , 4 , 0 , 0  , 0]
}
function Shortestpath(Graph , Form , To){
    let Number_of_vertix = 6
    let initialHead      = Draw()
    let Head             = [...initialHead]
    let Next = []
    for(let  i = 0 ; i < Number_of_vertix; i++){
        fill_next(i)
        Secound_Draw(i)
        Head = Next
        Next = []
    }
    function fill_next(index){
        for(let i =0 ; i < Number_of_vertix ; i++ ){
            Next.push([])
            for(let k = 0 ; k < Number_of_vertix ; k++){
                let value = -1
                if(i == k){value = 0}
                else if(i == index || k == index){value = Head[i][k]}
                else{value = 0}
                Next[i].push(value)
            }
        }
    }
    function Draw(){
        let array = []
        for(let i = 0 ; i < Number_of_vertix ; i++ ){
            array.push([])
            for(let k = 0 ; k < Number_of_vertix ; k++){
                value = -1
                if(k == i ){value = 0}
                else if(Graph[i][k] == 0){value = Infinity}
                else{value = Graph[i][k]}
                array[i].push(value)
            }
        }
        return array
    }
    function Secound_Draw(index){
        for(let i = 0 ; i < Number_of_vertix ; i++){
            for(let k = 0 ; k < Number_of_vertix ; k++){
                let  min = Head[i][k]
                if(i == k){continue}
                if(i == index || k == index){continue}
                if(Head[i][index] + Head[index][k] < min){
                    min = Head[i][index] + Head[index][k]
                }
                Next[i][k] = min
            }
        }    
    }
    // This function is Small DFS to find the path that his cost is stored in Head min
    function find_The_Path(){
        let main = Form
        let mode = "Forwards"
        let Cost = 0
        let min  = Head[Form][To]
        let stack= []
        let state= {}
        while(min != Infinity){
            if(mode == "Forwards"){
                if(main in state){mode = "Backwards"}
                if(main == To){break}
                state[main] = "Discoverd"
                let exit = 0
                let check = false
                if( exit == main && exit + 1 > Number_of_vertix){mode = "Backwards"}
                else{
                    if(exit == main){exit += 1}
                    stack.push({path : main , exit : exit})
                    if(initialHead[main][exit] == Infinity){check = true}
                    else{Cost += initialHead[main][exit]}
                    if(Cost > min || check){
                        mode = "Backwards"
                    }
                    else{
                        main =  exit
                    }
                }
            }
            else{
                let exit = stack[stack.length - 1 ]['exit']
                let path = stack[stack.length - 1 ]['path'] 
                let found = false
                if(initialHead[path][exit]!= Infinity){Cost -= initialHead[path][exit]}
                if(exit < Number_of_vertix - 1){
                    while(exit < Number_of_vertix - 1){
                        stack[stack.length - 1 ]['exit'] += 1
                        exit = stack[stack.length - 1 ]['exit']
                        if(Cost + initialHead[path][exit] <= min && exit != path){
                            main = exit , found= true
                            Cost += initialHead[path][exit]
                            mode = "Forwards" ; break
                        }
                    }
                    if(!found){
                        delete state[path]
                        stack.pop()
                    }
                }
                else{
                    stack.pop()
                }
                
            }
        }
        stack = stack.map(item => item['path'])
        stack.push(To)
        return stack
    }
    return find_The_Path()
}
console.log(Shortestpath(Graph , 4 , 1))
