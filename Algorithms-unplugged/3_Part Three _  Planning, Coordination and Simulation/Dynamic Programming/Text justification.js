function Text_Justification(word_one , word_two){
    let cost_Table = []
    let real_cost  = {"D" : 2 , "i" : 2 , "S" : 3}
    word_one = word_one.toLowerCase()
    word_two = word_two.toLowerCase()
    for(let i = 0 , W1 = word_one.length ; i <= W1 ; i++){
        cost_Table.push([])
        function test(){
        for(let j = 0 , W2 = word_two.length ; j <= W2 ; j++ ){
            let deletee = [i-1 , j  ]
            let insert  = [i   , j-1]
            let sub     = [i-1 , j-1]
            let values  = {"d" : Infinity , "i" : Infinity , "S" : Infinity}
            find_values()
            let min     = Math.min(values['d'] , Math.min(values['S'] , values['i']))
            if(min == Infinity){cost_Table[i].push(0)}
            else{cost_Table[i].push(min)} 
            function find_values(){
                if(deletee[0] != -1 ){values['d']      = cost_Table[deletee[0]][deletee[1]] + real_cost["D"]}
                if(insert [1] != -1){values['i']  = cost_Table[insert[0] ][insert[1] ] + real_cost["i"]}
                if(sub[0]     != -1 && sub [1]   != -1)
                {
                    let subcost = (word_two[j-1] == word_one[i-1]) ? 0 : real_cost["S"]
                    values['S'] =cost_Table[sub[0]][sub[1]] + subcost
                }
            }

        }}
        test()
    }
    return cost_Table[word_one.length][word_two.length]

}
let compare_words = 
[
    ["Wall" , "All"] ,
    ["Null" , "All"] ,
    ["Full" , "All"] ,
    ["SUM"  , 'GUM'] ,
    ["MOHAMED" , "mohamed"] ,
    ["plane" , "plan"] ,
    ["My nam es  moahned" , "my name is mohamed"],
    ["AGGTCT" , "ATTCGA"],
    ["محمد صابر" , "محمد صبري"]
]  
for(let i =0 ;  i < compare_words.length; i++){
    console.log( compare_words[i] , Text_Justification(compare_words[i][0] , compare_words[i][1]))
}
