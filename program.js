

tabelle = "<table>"; //hier beginnt die Tabelle für das Labyrinth

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
document.getElementById("24").style.backgroundColor = 'brown';

//canvas erstellen:

/*var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);*/