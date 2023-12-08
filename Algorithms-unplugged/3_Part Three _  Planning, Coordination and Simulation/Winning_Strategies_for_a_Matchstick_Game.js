function WinningStrategy(x){
    let arr = ["N" , "Y" , "Y"]
    let i   = 2
    while(i < x){
        i++
        if(arr[i-3] == "Y" && arr[i-2] == "Y" && arr[i-1] == "Y"){
            arr.push("N")
        }
        else{
            arr.push("Y")
        }
    }
    return arr[x - 1]
}

console.log(WinningStrategy(29274))