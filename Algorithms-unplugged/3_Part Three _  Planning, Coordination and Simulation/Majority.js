let arr =CreateBigarray(1000000)
function Majority(Arr_OF_Vots){
    let stack1 = []
    let stack2 = []
    let leis1  = 0 // Last element in stack 1
    let leis2  = 0 // Last element in stack 
    function Phase1(X){
        if(leis2 != 0 && stack2[leis2 - 1] == X){stack1.push(X) ; leis1++}
        else{
            stack2.push(X)
            leis2++
            if(leis1 != 0 ){
                stack2.push(stack1.pop())
                leis1--
                leis2++
            }
        }
    }
    function Phase2(Y){
        while(leis2 != 0){
            if(stack2[leis2 - 1] == Y){
                stack1.push(stack2.pop()) ; leis1++ ; leis2--
                if(leis2 != 0){stack1.push(stack2.pop()) ; leis1++ ; leis2--}
            }
            else{
                if(leis1 != 0 ){stack1.pop() ; leis1--}
                else{return false}
                stack2.pop() ; leis2--
            }
        }
        if(leis1 != 0){return true}
        return false
    }
    for(let i =0 , N = Arr_OF_Vots.length ; i < N ; i++){
        Phase1(Arr_OF_Vots[i])
    }
    let last_element = stack2[leis2-1]
    if(Phase2(last_element)){return last_element}
    else{return "No Majority"}
}
function Check(Arr_OF_Vots){
    let object = {} 
    let total  = Arr_OF_Vots.length
    function insert_into_opbject(X){
            if(object[X] != undefined){object[X] += 1}
            else{
                object[X] = 1
            }
    }
    for(let i =0 ; i < total ; i++){
        insert_into_opbject(Arr_OF_Vots[i])
    }
    return [object , total]

}
function CreateBigarray(N){
    let names = ["A", "B" , "C"]
    let arr   = []
    let Names_length = names.length
    for(let i = 0 ; i < N ; i++){
        let j = Math.floor(Math.random()*(Names_length))
        arr.push(names[j])
    }  
    return arr
}
console.log(Majority(arr))
console.log(Check(arr))