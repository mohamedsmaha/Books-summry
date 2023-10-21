// give me the shortest path
// for big problems use a more memory
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
function Breadth_First_Search( graph , head){
    let queue = [head]
    let state = []
    while (queue.length != 0 ){
        const x = queue[0]
        if(state[x] == "Discoverd"){queue.shift() ; continue;}
        if( x == "END"){return "Found"}
        state[x] = "Discoverd"
        graph[x].forEach(element => {
            queue.push(element)
        });
    }
    return false
}
console.log(Breadth_First_Search(ex1 , 0))