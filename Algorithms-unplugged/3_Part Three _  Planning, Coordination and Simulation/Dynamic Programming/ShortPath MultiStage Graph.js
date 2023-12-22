let Graph = {
    0 : [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,
    1 : [0 , 0 , 2 , 1 , 3 , 0 , 0 , 0 , 0 ] ,
    2 : [0 , 0 , 0 , 0 , 0 , 2 , 3 , 0 , 0 ] ,
    3 : [0 , 0 , 0 , 0 , 0 , 6 , 7 , 0 , 0 ] ,
    4 : [0 , 0 , 0 , 0 , 0 , 6 , 8 , 9 , 0 ] ,
    5 : [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 6 ] ,
    6 : [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 4 ] ,
    7 : [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 5 ] ,   
    8 : [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,   
}
function ShortPath(Graph , Form , To){
    let cost = Array(To+1).fill(0)
    let d    = Array(To+1).fill(-1)
    let path = []
    cost[To] = 0 , d[0] = 0 , d[To] = 0
    for(let i = To -1 ; i >= 1 ;i--){
        min = Infinity
        for(let k = i + 1 ; k <= To ; k++){
            if(Graph[i][k] !=0 && Graph[i][k] + cost[k] < min){
                min  = Graph[i][k] + cost[k]
                d[i] = k
            }
        cost[i] = min
        }
    }
    path.push(Form)
    let step = Form
    while(true){
        if(step == To){break}
        if(d[step] == -1){
            return "Not Found"
        }
        else{
            path.push(d[step])
            step = d[step]
        }
    }
    return path
}

console.log(ShortPath(Graph , 1 , 8))