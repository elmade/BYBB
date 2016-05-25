
function Bybb(){
	var canvas; //Variable für Spielfeld
	var board; //Variable für Labyrinth
	var player; //Variable für Spieler
	var buch; //Variable für Buch

	
canvas = document.getElementById("GameBoardCanvas"); //holt Angaben zu Canvas aus HTML-Datei



//Labyrinth festlegen: m = Mauer, w = Weg, z = Ziel
board = [

	[ "w", "w", "w", "w", "m", "w", "m", "m", "m", "w"],
    [ "m", "m", "m", "w", "m", "w", "w", "w", "w", "w"],
    [ "w", "w", "w", "w", "m", "m", "w", "m", "m", "w"],
    [ "m", "m", "w", "m", "m", "w", "w", "w", "m", "w"],
    [ "w", "m", "w", "m", "w", "w", "m", "w", "m", "w"],
    [ "w", "m", "w", "m", "w", "m", "m", "w", "m", "w"],
    [ "w", "m", "w", "m", "m", "m", "w", "w", "m", "w"],
    [ "w", "w", "w", "w", "w", "w", "w", "m", "m", "w"],
    [ "m", "m", "m", "w", "m", "m", "m", "m", "m", "w"],
    [ "m", "w", "w", "w", "w", "w", "w", "w", "m", "z"]
];

//Startposition des Spielers
player = {
    x: 0,
    y: 0
};

buch = {
    x: 100,
    y: 50
};

//Labyrinth zeichnen
function draw(){
    var width = canvas.width; //Labyrinth passt sich der Breite des Canvas an
    var blockSize = width/board[0].length; //Blockgröße ist abhängig von board
    var ctx = canvas.getContext('2d');
    //ctx.setTransform(1, 0, 0, 1, 0, 0); //wird scheinbar nicht gebraucht
    ctx.clearRect(0, 0, width, width);
    ctx.fillStyle="maroon"; //Farbe für Mauer
	
    //Schleife durch Array für das Zeichnen der Wände und des Ziels
    for(var y = 0; y < board.length; y++){ //Schleife beginnt links oben im Spielfeld, läuft durch Array, Endposition ist unten rechts im Spielfeld
        for(var x = 0; x < board[y].length; x++){
            //Mauer wird gezeichnet
            if(board[y][x] === "m"){
                ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
            }
			
		
			
            //Ziel wird gezeichnet: bisher goldenes X
            else if(board[y][x] === "z"){ //Code für X-Zeichen folgt
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
    //Spieler wird gezeichnet
    ctx.beginPath();
    var half = blockSize/2; // Kreis wird mittig plaziert
    ctx.fillStyle = "blue";
    ctx.arc(player.x*blockSize+half, player.y*blockSize+half, half, 0, 2*Math.PI); //Kreis wird gezeichnet
    ctx.fill();

	// Buch wird gezeichnet
 //ctx.beginPath();
 //board: [100, 50];
    var viertel = blockSize/4; // Kreis wird mittig plaziert
    ctx.fillStyle = "red";
    ctx.arc(buch.x*blockSize+viertel, buch.y*blockSize+viertel, viertel, 0, 2*Math.PI); //Kreis wird gezeichnet
    ctx.fill();
}



//Überprüfung, ob Rand, Mauer oder außerhalb des Spielfelds
//x und y dürfen nicht kleiner als Null sein (weil Spieler sonst links oben außerhalb vom Spielfeld)
//x und y dürfen nicht größer als die Länge des Labyrinth/board sein
//x und y dürfen nicht "m" sein (board[y][x] != "m")

//mit if els neu schreiben
function canMove(x, y){
    return (y>=0) && (y<board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] != "m");
}

$(document).keyup(function(e){
    if((e.which == 38) && canMove(player.x, player.y-1))//Pfeiltaste nach oben
        player.y--; //y wird um eins verringert, Spieler bewegt sich nach oben
    else if((e.which == 40) && canMove(player.x, player.y+1)) //Pfeiltaste nach unten
        player.y++; // y wird um eins vergrößert, Spieler bewegt sich nach unten
    else if((e.which == 37) && canMove(player.x-1, player.y)) //Pfeiltaste links
        player.x--; //x wird um eins verringert, Spieler bewegt sich nach links
    else if((e.which == 39) && canMove(player.x+1, player.y)) //Pfeiltaste rechts
        player.x++; //x wird um eins vergrößert, Spieler bewegt sich nach rechts
    draw(); //nach jedem Tastenanschlag wird das Layrinth neu gezeichnet
    e.preventDefault(); //übliche Tastenfunktion wird verhindert z. B. scrollen mit Pfeiltasten 
	});

draw();
};