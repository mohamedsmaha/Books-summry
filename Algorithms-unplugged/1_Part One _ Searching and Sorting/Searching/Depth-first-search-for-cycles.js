let ex2 = {
    "A" : ["B" , "C" , "F"],
    "B" : ["D"],
    "C" : ["D" , "G"],
    "D" : ["E"],
    "E" : ["B"],
    "F" : ["C"],
    "G" : ["F" , "D"]

}

function Depth_first_search_for_cycles(graph , head){
    let state = {}
    let number_of_cycles = 0
    let path         = [] 
    let cycle_pathes_ = [] 
    function search(graph , head ){
        if(state[head] == "in progress"){
            cycle_pathes(head)
            number_of_cycles += 1 ; return;}
        if(state[head] == undefined){
            state[head] = "in progress"
            path.push(head)
            graph[head].forEach(element => {
                search(graph , element)
            });
            state[head] = "done"
            path.pop(path.indexOf(head))
        }
    }
    function cycle_pathes(head)
    {
        let dir  = "-->"
        let cycle = `${head} `
        let index= path.indexOf(head) + 1
        while(path[index] != undefined){
            cycle = cycle + dir +` ${path[index]} `
            index += 1
        }
        cycle_pathes_.push(cycle)

    }
    search(graph , head )
    return cycle_pathes_
}
function Strongly_connected_components(graph , head){
    let state   = {}
    let  DFS     = {}
    let CN      = {}
    counter = 1
    function search(graph , head){
        if(state[head] == "in progress"){return 'a cycle has been found'}
        else if(state[head] == undefined){
            state[head]= "in progress"
            DFS[head]   = counter
            CN[head]   = counter
            counter += 1
            graph[head].forEach(element => {
                if(state[element] != 'done'){
                    search(graph , element)
                    if(CN[element] < CN[head]){
                        CN[head] = CN[element]
                    }
                }
            });
            if(DFS[head] == CN[head]){
                graph[head].forEach(element => {
                    state[element] = 'done'
                })
            }
        }
        
    }
    function show_CN(){
        CN1 = {}
        for(let item in CN){
            if(CN1[CN[item]] == undefined){
                CN1[CN[item]] = []
            }
            CN1[CN[item]].push(item)
        }
        return CN1
    }
    search(graph , head)
    return {
        "Componetns" : show_CN() ,
        "Realtions_Between_Componetns" : Realations_Between_Strongly_Connected_componetns(graph , CN)
    }

}
function Realations_Between_Strongly_Connected_componetns( graph , old_graph){
    let New_graph = {}
    for(let item in old_graph){
        let component = old_graph[item]
        if(New_graph[component] == undefined){
            New_graph[old_graph[item]] = []
        }
        graph[item].forEach(element => {
            let element_component = old_graph[element]
            if(!New_graph[component].includes(element_component) && element_component != component){
                New_graph[component].push(element_component)
            }
        })
    }
    return New_graph
}
console.log(Depth_first_search_for_cycles(ex2 , "A"))
console.log(Strongly_connected_components(ex2,"A"))
