//The Boyer–Moore–Horspool Algorithm
const Bigtext = `
    In a remote village nestled at the foot of a towering mountain range, there lived a young man whose name blended seamlessly with the world around him. His presence in the village was enigmatic, and he was known far and wide for his wisdom and kindness. The villagers often sought this individual's counsel, for he possessed a deep understanding of the world and a heart full of empathy. His humble abode was adorned with books and artifacts from distant lands, a testament to his insatiable curiosity about the world beyond the village.

    One crisp autumn morning, as the leaves fell in a symphony of colors, the enigmatic individual gathered the villagers in the town square. He spoke of unity, resilience, and the indomitable human spirit. His words resonated with the people, leaving an indelible mark on their hearts.

    As the years passed, the name of this remarkable individual became synonymous with hope, wisdom, and progress. He was a beacon of light in the village, reminding everyone that even in the most remote corners of the world, a single individual could change the course of history.
`
function Text_search(text , word){
    let D = {}
    for(let i =0 ; i < word.length ; i++){
        D[word[i]] = (word.length - 1) - i
    } 
    function shift(letter){
        if(D[letter] == undefined){return word.length }
        else{return D[letter]}
    }   
    let pos = 0
    while(pos < text.length - word.length  + 1){
        j = word.length - 1
        while(j > -1 && word[j] == text[pos + j]){
            j = j -1
        }
        if(j = -1){return true}
        pos = pos + shift(text[pos + j])
    }
    return false
}
console.log(Text_search(Bigtext , "mohamed"))