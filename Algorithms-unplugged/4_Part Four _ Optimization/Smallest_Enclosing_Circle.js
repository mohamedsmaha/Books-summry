const numeric = require('numeric');
let points = [[10,2] , [12,3] , [20,7] ,[13,4] , [12,6] , [-3,-1] , [-7,8] , [9,1] , [12,10]]
function find_radius_with_3_Points(point1 , point2 , point3){
// first equation 
let couple_1 = prepare_constants(point1 , point2)
let couple_2 = prepare_constants(point1 , point3)

var A = [[couple_1[0], couple_1[1]], [couple_2[0], couple_2[1]]];
var b = [couple_1[2], couple_2[2]];

// Solve the system of equations
var solution = numeric.solve(A, b);
// The solution will be an array containing the values of x and y
var x = solution[0].toFixed(2)
var y = solution[1].toFixed(3)
var radius = Math.sqrt(  (x - point1[0])**2 + (y - point1[1])**2).toFixed(2)
function prepare_constants(point1 , point2){
    let point3 = [(point1[0] + point2[0]) / 2 , (point1[1] + point2[1]) / 2]
    let perpendicular_ٍSlope = (1 / (  (point1[1] - point2[1]) / (point1[0] - point2[0])) ) * -1
    // fx+y = c
    let c = -1 * perpendicular_ٍSlope * point3[0] + point3[1]
    let f = -perpendicular_ٍSlope
    return [f , 1 , c]
}
    return [[parseFloat(x) , parseFloat(y)] , parseFloat(radius)]
}
function find_radius_with_2_Points(point1 , point2){
    let x =   parseFloat(( (point1[0] + point2[0]) / 2 ).toFixed(2) )
    let y =   parseFloat(( (point1[1] + point2[1]) / 2 ).toFixed(2) )
    let r = Math.sqrt( (point1[0] - x) ** 2 + (point1[1] - y)**2 ).toFixed(2)
    return [ [parseFloat(x) , parseFloat(y) ] , parseFloat(r)]
}
function Smallest_Enclosing_Circle(points_data){
    let Circle = {"X" : 0 , "Y" : 0 , "R" : 0}
    
    MinBoundaryCircle(0 , points_data.length - 1 )
    return Circle
    function MinBoundaryCircle(start , end , pin1 = undefined , pin2 = undefined){
        let index = 0
        if(pin1 && pin2){
            let data = find_radius_with_2_Points(points_data[pin1] , points_data[pin2] )
            Circle   = {"X" : data[0][0] , "Y" : data[0][1] , "R" : data[1]} 
        }
        else if(pin1 ){
            let data = find_radius_with_2_Points(points_data[start] , points_data[pin1] )
            Circle   = {"X" : data[0][0] , "Y" : data[0][1] , "R" : data[1]} 
        }
        else{
            let data = find_radius_with_2_Points(points_data[start] , points_data[start+1]  )
            Circle   = {"X" : data[0][0] , "Y" : data[0][1] , "R" : data[1]} 
            index += 2
        }
        while(end+1 > index){
            if(!Check([Circle["X"] , Circle["Y"]] , points_data[index] , Circle["R"])){
                if(pin1  && pin2){
                    let data = find_radius_with_3_Points(points_data[pin1] , points_data[pin2] , points_data[index])
                    Circle   = {"X" : data[0][0] , "Y" : data[0][1] , "R" : data[1]} 
                }
                else if (pin1){
                    MinBoundaryCircle(start , index, pin1 , index)
                }
                else{
                    MinBoundaryCircle(start , index , index)
                }
            }
            index += 1
        }
    }
    function Check(point1 , point2 , radius){
        let x = Math.sqrt((point1[0] - point2[0])**2  + (point1[1] - point2[1]) ** 2)
        if(radius >= parseFloat(x.toFixed(2))){return true}
        return false
    }
}
console.log(Smallest_Enclosing_Circle(points))
