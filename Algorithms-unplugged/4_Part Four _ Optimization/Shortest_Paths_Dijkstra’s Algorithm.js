let order  = ["A" , "B" , "C" , "D" , "E" ]
let Graph = {
    "A" : [0 , 6 , Infinity , 1 , Infinity] ,
    "B" : [6 , 0 , 5 , 2 , 2] ,
    "C" : [Infinity , 5 , 0 , Infinity , 5],
    "D" : [1 , 2 , Infinity , 0 , 1] ,
    "E" : [Infinity , 2 , 5 , 1 , 0 ]
}
function Dijkstra(start_point , Graph , order , end_point){
    let Vertex  = {}
    let waiting = []
    let path    = []
    prepare_Data()
    Vertex[start_point] = [0 , ""]
    while (waiting.length != 0){
        let min = min_distanse()
        Check(min[0])
        waiting.splice(min[1] , 1)
    }
    function prepare_Data(){
        for(item in Graph){
            Vertex[item] = [Infinity , ""]
            waiting.push(item)
        }
        return ;
    }
    function min_distanse(index){
        let min = [Infinity , "" , index]
        for(let i =0 ; i < waiting.length ; i++){
            let data = Vertex[waiting[i]]
            if(data[0] < min[0] ){min[0] = data[0] , min[1] = waiting[i] , min[2] = i}
        }
        return [min[1] , min[2]]
    }
    function Check(index){
        for(let i =0  ; i < Graph[index].length ; i++){
            let certain = order[i]
            let value   = Graph[index][i]
            if(Vertex[index][0] + value < Vertex[certain][0]){
                Vertex[certain] = [Vertex[index][0] +value, index]
            }
        }
    }
    function prepare_path(next){
        if(next == start_point){path.unshift(start_point);return}
        else{
            path.unshift(next)
            return prepare_path(Vertex[next][1])
        }
    }
    prepare_path(end_point)
    return path

}
console.log(Dijkstra("A" , Graph , order , "C"))