

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


function Bybb(){
	var canvas,
	board,
	player;
	
canvas = document.getElementById("GameBoardCanvas");


//var canvas = $('#GameBoardCanvas');

//The game board 1 = walls, 0 = free space, and -1 = the goal
board = {
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [ 0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
    [ 0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
    [ 0, 0, 1, 1, 1, 1, 1, 0, 1, 0],
    [ 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    [ 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
    [ 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
    [-1, 0, 1, 0, 1, 1, 0, 0, 0, 0]
};

player = {
    x: 0,
    y: 0
}
};

//Draw the game board
function draw(){
    var width = canvas.width();
    var blockSize = width/board.length;
    var ctx = canvas[0].getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, width);
    ctx.fillStyle="white";
    //Loop through the board array drawing the walls and the goal
    for(var y = 0; y < board.length; y++){
        for(var x = 0; x < board[y].length; x++){
            //Draw a wall
            if(board[y][x] === 1){
                ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
            }
            //Draw the goal
            else if(board[y][x] === -1){
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = "gold";
                ctx.moveTo(x*blockSize, y*blockSize);
                ctx.lineTo((x+1)*blockSize, (y+1)*blockSize);
                ctx.moveTo(x*blockSize, (y+1)*blockSize);
                ctx.lineTo((x+1)*blockSize, y*blockSize);
                ctx.stroke();
            }
        }
    }
    //Draw the player
    ctx.beginPath();
    var half = blockSize/2;
    ctx.fillStyle = "blue";
    ctx.arc(player.x*blockSize+half, player.y*blockSize+half, half, 0, 2*Math.PI);
    ctx.fill();
}

//Check to see if the new space is inside the board and not a wall
function canMove(x, y){
    return (y>=0) && (y<board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] != 1);
}

$(document).keyup(function(e){
    if((e.which == 38) && canMove(player.x, player.y-1))//Up arrow
        player.y--;
    else if((e.which == 40) && canMove(player.x, player.y+1)) // down arrow
        player.y++;
    else if((e.which == 37) && canMove(player.x-1, player.y))
        player.x--;
    else if((e.which == 39) && canMove(player.x+1, player.y))
        player.x++;
    draw();
    e.preventDefault();
});

draw();
};