

/*tabelle = "<table>"; //hier beginnt die Tabelle für das Labyrinth

for(i=0;i<5;i++) //Zahl hinter i< bzw. ii< zeigt an, wie viele Zellen es geben soll
{ 
tabelle = tabelle + "<tr>"; 

for(ii=0;ii<5;ii++){ 
id = i*5 + ii; 
tabelle = tabelle + "<td width = 50px height = 50px id=\""+id+"\">" + id + "</td>"; 
} 
tabelle = tabelle + "</tr>"; 
}

tabelle = tabelle + "</table>"; 
document.write(tabelle);

//Festlegung der Mauer


document.getElementById("0").style.backgroundColor = 'brown';
document.getElementById("1").style.backgroundColor = 'brown';
document.getElementById("8").style.backgroundColor = 'brown';
document.getElementById("10").style.backgroundColor = 'brown';
document.getElementById("11").style.backgroundColor = 'brown';
document.getElementById("13").style.backgroundColor = 'brown';
document.getElementById("15").style.backgroundColor = 'brown';
document.getElementById("20").style.backgroundColor = 'brown';
document.getElementById("22").style.backgroundColor = 'brown';
document.getElementById("23").style.backgroundColor = 'brown';
document.getElementById("24").style.backgroundColor = 'brown';*/



//Knopf für Bewegung nach rechts
//funktioniert noch nicht
//goToXY(0,0);
//function myFunction(move 100) {
//document.getElementById("mytitle").innerHTML = "Dieser Text wurde vom Skript geschrieben";
//}


      function Spiel(){
	  
	  var canvas, 
        context,
        bounce = -1;
	
	canvas = document.getElementById("canvas");
        
    
    context = canvas.getContext("2d");
    var w = canvas.width;
    var h = canvas.height; 
//d:delimiter
var delimiter = 10;
var size = w/delimiter;


for(var i = 0;i<10;i++){
        for(var j = 0;j<10;j++){       
            rect(size*i,size*j,size,size,randomcolor());

    };
};




 var Maze = new Array(
                      new Array(1,1,1,1,1,1,1,1,1,1),
                      new Array(1,0,0,0,1,1,1,0,0,0),
                      new Array(1,1,1,0,0,0,0,0,1,1),
                      new Array(1,0,0,0,1,1,1,0,1,1),
                      new Array(1,0,1,1,1,1,0,1,1,1),
                      new Array(1,0,0,1,1,1,0,0,0,1),
                      new Array(1,1,0,0,0,1,0,1,0,1),
                      new Array(1,1,1,1,0,1,0,1,0,1),
                      new Array(1,0,0,0,0,0,0,1,0,1),
                      new Array(1,0,1,1,1,1,1,1,1,1)
                      ); 


function BlackOrWhite(something){
    if(something == 1){return "black";}else{return "white";};
};


            

for(var i = 0;i<10;i++){
        for(var j = 0;j<10;j++){       
            rect(size*j,size*i,size,size,BlackOrWhite((Maze[i][j])));

    };
};






//+++++++++++++++++++++++++++++++++++++++++
//     CANVVAS UTILITIEZ
//+++++++++++++++++++++++++++++++++++++++++

function rect(x,y,w,h,color){
    context.fillStyle = color;  
    context.fillRect (x,y,w,h);  
};

function randomcolor(){
    var r=Math.floor(Math.random()*255),
        g=Math.floor(Math.random()*255),
        b=Math.floor(Math.random()*255),
        a=Math.random(),
        rgba='rgba('+r+','+g+','+b+','+a+')';
    return rgba;

};

function rnd(num){
    return Math.random()*num;
};

 $("#canvas").dblclick(function(){
    context.clearRect(0, 0, 800, 800);    
});

function Line(x1,y1,x2,y2){
    //context.lineWidth = 0.1;
    context.beginPath();
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
};


function Circle(x,y,radius,startAngle,endAngle,clockwise){

    context.beginPath();
    context.arc(x,y,radius,startAngle,endAngle,clockwise);
    context.closePath();
    context.fill();     
};

	  };