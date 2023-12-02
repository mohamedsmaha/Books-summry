function ToboLogical(Goals){
    let nodes = new Set(Object.keys(Goals))
    let order = []
    while(nodes.size > 0){
        let cycle = true
        for(let node of nodes){
            if(Ready_To_go(node , Goals)){
                nodes.delete(node)
                order.push(node)
                cycle = false
            }
        }
        if(cycle == true){return "Found Cycle"}
    }
    function Ready_To_go(node , Graph){
        for(const Node of nodes){
            const index = Graph[Node].filter((item) => item == node)
            if(index.length != 0){return false}
        }
        return true
    }
    return order
}
const Goals = {
    0   : [1 , "A"]   , 
    2.0 : []    , 
    1.2 : [1.3,"F"] ,
    1.1 : [1.2] ,
    1.3 : [2]   ,
    1   : [1.1] ,
    "A" : ["B" , 1] ,
    "C" : ["D" ,  2] ,
    "B" : ["C"],
    "D" : ["F"],
    "F" : [1.3],
    "E" : ["F" , 1.1 ],

}
console.log(ToboLogical(Goals))