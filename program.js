//for (var i = 0; i < 8; i++) {
//for (var j = 0; j < 4; j++) {
// move(100);
 //turnRight(90);
//}
//turnRight(45);

//}

tab = "<table>"; //hier wird die tabelle göffnet

for(i=0;i<5;i++) 
{ 
tab = tab + "<tr>"; 

for(ii=0;ii<5;ii++){ 
id = i*5 + ii; 
tab = tab + "<td id=\""+id+"\">" + id + "</td>"; 
} 
tab = tab + "</tr>"; 
}

tab = tab + "</table>"; 
document.write(tab);

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
