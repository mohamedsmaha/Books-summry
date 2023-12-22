//degrees of the node must be even 
let arr = {
    1 : [3,2] ,
    2 : [1,3,4,5] ,
    3 : [1,2,4,6] ,
    4 : [2,3,5,6] ,
    5 : [2,4,6,7] ,
    6 : [3,4,5,7] ,
    7 : [6,5],

}
function Eulerian_Circuit(Graph){
    let Main    = Find_Next_Node()
    let Circuit = [Main]

    while(Main){
        let v = Main
        while(true){
            let w = Graph[v].pop()
            removefrom(w , v)
            Circuit.push(w)
            v = w
            if(w == Main){break}
        }
        Main = Find_Next_Node()
    }
    function Find_Next_Node(){
        for(let item in Graph){
            if(Graph[item].length != 0){
                return parseInt(item)
            }
        }
        return false
    }
    function removefrom(w, v){
        let index = Graph[w].indexOf(v)
        Graph[w].splice(index , 1)
    }
    return Circuit
}
console.log(Eulerian_Circuit(arr))