

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

var canvas;
var ctx;
var dx = 5;
var dy = 5;
var x = 200;
var y = 5;
var WIDTH = 482;
var HEIGHT = 482;
var img = new Image();
var collision = 0;

function rect(x,y,w,h) {
ctx.beginPath();
ctx.rect(x,y,w,h);
ctx.closePath();
ctx.fill();
}

function clear() {
ctx.clearRect(0, 0, WIDTH, HEIGHT);
ctx.drawImage(img, 0, 0);
}

function init() {
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
img.src = "maze.gif";
return setInterval(draw, 10);
}

function doKeyDown(evt){
switch (evt.keyCode) {
case 38:  /* Up arrow was pressed */
if (y - dy > 0){
y -= dy;
clear();
checkcollision();
if (collision == 1){
y += dy;
collision = 0;
}
}

break;
case 40:  /* Down arrow was pressed */
if (y + dy < HEIGHT ){
y += dy;
clear();
checkcollision();
if (collision == 1){
y -= dy;
collision = 0;
}
}

break;
case 37:  /* Left arrow was pressed */
if (x - dx > 0){
x -= dx;
clear();
checkcollision();
if (collision == 1){
x += dx;
collision = 0;
}
}
break;
case 39:  /* Right arrow was pressed */
if ((x + dx < WIDTH)){
x += dx;
clear();
checkcollision();
if (collision == 1){
x -= dx;
collision = 0;
}
}
break;
}
}

function checkcollision() {
var imgd = ctx.getImageData(x, y, 15, 15);
var pix = imgd.data;
for (var i = 0; n = pix.length, i < n; i += 4) {
if (pix[i] == 0) {
collision = 1;
}
}
}

function draw() {
clear();
ctx.fillStyle = "purple";
rect(x, y, 15,15);
}

init();
window.addEventListener('keydown',doKeyDown,true);
</script>
</section>
<aside> </aside>
<footer> </footer>
</body>
</html>

