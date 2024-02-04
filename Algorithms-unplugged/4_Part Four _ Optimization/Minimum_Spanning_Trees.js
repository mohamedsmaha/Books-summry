let Graph = {
    "A" : [0  , 14 , Infinity , 13 , 10 , 20  ] ,
    "B" : [14 , 0  , 5 , Infinity , Infinity , 6  ] ,
    "C" : [Infinity , 5 , 0 , 20 , 13 , Infinity ] ,
    "D" : [13 , Infinity , 20 , 0 , 10 , Infinity] ,
    "E" : [10 , Infinity , 13 , 10 , 0 , 24] ,
    "F" : [20 , 6 , Infinity , Infinity , 24 , 0]  
}
let Order = {
    0 : "A" , 
    1 : "B" , 
    2 : "C" ,
    3 : "D" ,
    4 : "E" ,
    5 : "F"
}

function Prim(start_point , Graph , Order){
    let visted   = {}
    let path     = []
    visted[start_point] = true
    // assume that the whole graph is connected
    while(Object.keys(visted).length < Object.keys(Graph).length){
        let min = findmin()
        path.push(min)
        visted[min[1]] = true
    }
    function findmin(){
        let min = [ "" , "" , Infinity]
        for(const VistedNode in visted){
            let main_index = reverse_Order(VistedNode)
            for(let i =0 , n = Graph[VistedNode].length ; i < n ; i++){
                if(i == main_index){continue}
                if(visted[Order[i]] != undefined){continue}
                if(min[2] > Graph[VistedNode][i]){min = [ VistedNode , Order[i] , Graph[VistedNode][i]]}
            }
        }
        return min
    }
    function reverse_Order(Lang){
        for(const item in Order){
            if(Order[item] == Lang){return item}
        }
    }
    return path
}
console.log(Prim("A" , Graph , Order))