// 0  : both directions
// 1  : Forward form Main to Child
// -1 : Backward to Main from Child
// [Max Capacity , Dir]
// write the eadge once in any node you want source or destination
let Graph = {
    "A" : {"E" : [1 , 1] } ,
    "B" : {"D" : [1 , 1] } ,
    "C" : {"E" : [1 , 0] , "F" : [4 , 0] , "S" : [2 , 0] },
    "D" : {"F" : [1 , 1] } ,
    "E" : {"G": [2 , 1] } ,
    "F" : {"Z" : [2 , 0] } ,
    "G" : {"Z" : [2 , 1] } ,
    "S" : {"A" : [3 , 1] , "B"  : [3 , 1]},
    "Z" : {}
}
function Maximum_Flows(Graph , start_point , End_point){
    let Main_Data = {}
    Prepare_MainData()
    first_move()
    let test = Find_Junction()
    while(test){
        let order     = find_Order(test)
        let check_test = check(test)
        let find_start = 0
        for(let i = 0 ; i < order.length ; i++){
                if(check_test == 0){break}
                if(order[i][0] == start_point){find_start = order[i] ; continue}
                operation(test , order[i][0] , check_test , order[i][2])
                check_test = check(test)
            if(check_test == 0){break}
        }
        if(check_test != 0){operation(test , find_start[0] , check_test , find_start[2])}
        test = Find_Junction()
    }
    function operation(Head , Child , Main_step , operation){
        if(operation == "Leaving"){Leaving(Head , Child , Main_step)}
        else if (operation == "Leading"){Leading(Head , Child , Main_step)}
        else{Both(Head , Child , Main_step)}
    }
    function check(item){
        return Main_Data[item]['input'] - Main_Data[item]['output']
    }
    function find_Order(item){
        let arr = []

        let data        = Main_Data[item]['edges']
        for(const node in data){
            if(data[node]['dir'] == 1){arr.push([node , Main_Data[node]['height'] , "Leaving"])}
            else if (data[node]['dir'] == -1){arr.push([node , Main_Data[node]['height'] , "Leading"])}
            else{arr.push([node , Main_Data[node]['height'] , "Both"])}
        }
    function QuickSort(arr){
        function Sort(arr){
            if(arr.length == 1){return arr}
            if(arr.length == 0){return arr}
            let index = Math.floor(Math.random() * arr.length);
            let pivot = arr[index]
            let left  = []
            let right = []
            
            for(let i = 0 ; i < arr.length  ; i++ ){
                if(i == index){continue}
                if(pivot[1] >= arr[i][1]){
                    left.push(arr[i])
                }
                else{
                    right.push(arr[i])
                }
            }
            left  = QuickSort(left)
            right = QuickSort(right)

            return [...left , pivot , ...right]
        }  
        return Sort(arr)
}
        return QuickSort(arr)
    }
    function Find_Junction(){
        for(const item in Main_Data){
            if(Main_Data[item]['input'] != Main_Data[item]['output']){return item}
        }
        return null
    }
    function first_move(){
        Leaving("S" , "A" , Infinity)
        Leaving("S" , "B" , Infinity)
        Both("S" , "C" , Infinity)
    }
    function Both(Head , Child , Main_step){
        Make_Height_Bigger(Head , Child)
        let   Edge       = Main_Data[Head]['edges'][Child]
        const DefaultDir = 1 ; const carry_dir = Edge['carry_dir']
        if(DefaultDir == carry_dir){
            Leaving(Head , Child , Main_step)
        }
        else{
            let step = Math.min(Edge['carry'] + Edge['weight'] , Main_step)
            if(step < Edge['carry']){Leading(Head , Child , step)}
            else{
                Leading(Head , Child , Edge['carry'])
                Edge['carry_dir'] *= -1
                Main_Data[Child]['edges'][Head]['carry_dir'] *= -1
                Leaving(Head , Child , step - Edge['carry'])
            }
        }
    }
    function Leading(Head , Child , Main_step){
        Make_Height_Bigger(Head , Child)
        let Edge = Main_Data[Head]['edges'][Child]
        let step = Math.min(Edge["carry"] , Main_step)

        Main_Data[Head]['input']   -= step
        Main_Data[Child]['output'] -= step

        Main_Data[Head]['edges'][Child]['carry'] -= step
        Main_Data[Child]['edges'][Head]['carry'] -= step

        Make_Check(Head , Child , step , "Leading")
    }
    function Leaving(Head , Child , Main_step){
        Make_Height_Bigger(Head , Child)
        let Edge = Main_Data[Head]['edges'][Child]
        let step = Math.min(Edge['weight'] - Edge['carry'] , Main_step)

        Main_Data[Head]['output'] += step
        Main_Data[Child]['input'] += step

        Main_Data[Head]['edges'][Child]['carry'] += step
        Main_Data[Child]['edges'][Head]['carry'] += step

        Make_Check(Head , Child , step , "Leaving")
    }
    function Make_Check(Head , Child , step , operation){
        if(operation == "Leaving"){
            if(Head == start_point){Main_Data[start_point]['input'] += step}
            if(Child == End_point){Main_Data[End_point]['output']   += step}
        }
        else if(operation == 'Leading'){
            if(Child == start_point){Main_Data[start_point]['input'] -= step}
            if(Head  == End_point){Main_Data[End_point]['output']    -= step}
        }
    }
    function Make_Height_Bigger(Head , Child){
        let Big   = Main_Data[Head]
        let small = Main_Data[Child]['height']
        if(Big['height'] <= small){  Big['height'] = small + 1}
        return;
    }
    function Prepare_MainData(){
        for(const item in Graph){
            if(Main_Data[item] == undefined){Main_Data[item] = Create()}
            for(const Edge in Graph[item]){Deal_WithEdges(item , Edge ,Graph[item][Edge])}
        }
        function Deal_WithEdges(Head , Child , Edge){
            if(Main_Data[Child] == undefined){Main_Data[Child] = Create()}
            const weight = Edge[0]
            const dir    = Edge[1]
            Main_Data[Head]['edges'][Child] =  Deal_WithEdge(weight , dir , 0)
            Main_Data[Child]['edges'][Head] = Deal_WithEdge(weight , dir , -1)

            function Deal_WithEdge( weight , dir , Reverse = 0){
                let data = {
                    weight,
                    dir   ,
                    carry : 0 ,
                    carry_dir : (dir == 0) ? 1 : dir
                }
                if(Reverse == 0){
                    return data
                }
                else{
                    data["dir"] *= (dir == 0) ? 1 : -1
                    data['carry_dir'] *= -1
                    return data
                }
            }
        }
        function Create(){
            let data = {
                input   : 0 , 
                output  : 0 , 
                height  : 0 ,
                edges   : {}
            }
            return data
        }
        return;
    }
    function return_Data(){
        let data = {}
        for(const item in Graph){
            data[item] = {}
            for(const node in Graph[item]){
                data[item][node] = [Main_Data[item]["edges"][node]['carry'] , Main_Data[item]['edges'][node]['carry_dir']]
            }
        }
        return data
    }
    return return_Data()
}
console.log(Maximum_Flows(Graph , "S"  , "Z"))