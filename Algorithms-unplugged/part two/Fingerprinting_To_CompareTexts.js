
const { Fifth_Version } = require('./PrimeNumbers');
const {text1 , Change_in_text1} = require('./Images/Longtext')
function FingerPrinting(T , r , m){
    // T : Array of Numbers
    // r : Random Number Between 1 to m - 1
    // m : Prime Numebr
    let value = T.reduce((acc , item) => ((item + acc) * r) % m , 0)
    return value
}
function Transform_text_To_Numbers(T) {
    let arr = [];
    for (let i = 0; i < T.length; i++) {
        const character = T[i];
        arr.push(character.charCodeAt(0));
    }
    return arr;
}
function Compare(T1 , T2){
    let n1 = T1.length
    let n2 = T2.length
    if(n1 != n2 ){return false}
    let k  = 10 // Number of repetitions
    let m       = Fifth_Version(10 * n1).pop() // for bigger values for m make the error small
    let R_Vales = Array(k).fill(0).map(item => Math.floor(Math.random() * (m-1)) + 1) 
    let TN1     = Transform_text_To_Numbers(T1)
    let TN2     = Transform_text_To_Numbers(T2)
    let FB1Values = Array(k).fill(0).map((item , index) => FingerPrinting(TN1 , R_Vales[index] , m))
    let FB2Values = Array(k).fill(0).map((item , index) => FingerPrinting(TN2 , R_Vales[index] , m))
    let Check     = true
    for(let i =0 ; i < FB1Values.length ; i++){if(FB1Values[i] != FB2Values[i]){Check = false}}

    return {Check , error_precentage : ((n1/m)**k * 100).toFixed(4)}


}

console.log(Compare("mohamed" , "mohamed"))
console.log(Compare(text1 , Change_in_text1))
console.log(Compare(text1 , text1))