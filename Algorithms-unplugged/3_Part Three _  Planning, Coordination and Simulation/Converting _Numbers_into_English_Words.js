function Converting_Numbers_into_English_Words(Number){
    let Groups       = Splitting_Numbers_into_Three_Digit_Groups(Number) 
    let text         = "" 
    const lessThan20 = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
                        "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const times10    = ["" , "" , "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    const weight     = [ "", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion" ]

    for(let i = Groups.length - 1 ; i > -1 ; i--){
        text = text + GenerateGroup(Groups[i])
        text = text + GenerateWeight(i)
    }

    function Splitting_Numbers_into_Three_Digit_Groups(Number){
        let arr = [];
        while(Number > 0){
            arr.push(Number % 1000)
            Number = Math.trunc(Number / 1000)
        }
        return arr
    }
    function GenerateGroup (Number){
        let h = Math.trunc(Number / 100) // hundreds
        let r = Number % 100 // Tens Ones
        let t = Math.trunc(r / 10) // Tens
        let o = r % 10 // ones
        let words = ""
        if(h > 0){words +=  lessThan20[h] + " hundred "}
        if(h > 0 && r > 0){words += "and "}
        if(r < 20){words += lessThan20[r]}
        else{
            if(t > 0){words += times10[t]}
            if(t > 0 && o > 0){words += "-"}
            if(o > 0){words += lessThan20[o]}
        }
        return words
    }
    function GenerateWeight(index){
        let words = ""
        if(Groups[index] > 0){words = " " + weight[index] + " "}
        if(index == 1 && Groups[0] < 100 && Groups[0] > 0){words += "and "}
        return words
    }
    return text
}
console.log(Converting_Numbers_into_English_Words(90000102))