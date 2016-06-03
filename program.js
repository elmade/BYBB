					
function Bybb(){
	
	CreateTimer("timer", 25);
	
	
	var canvas; //Variable für Spielfeld
	var board; //Variable für Labyrinth
	var player; //Variable für Spieler
	var Ziel;
	var Buch;
	

	
canvas = document.getElementById("GameBoardCanvas"); //holt Angaben zu Canvas aus HTML-Datei



//Labyrinth festlegen: m = Mauer, w = Weg, z = Ziel, b = Buch
board = [

	[ "w", "w", "w", "w", "m", "w", "m", "m", "m", "w"],
    [ "m", "m", "m", "w", "m", "w", "w", "w", "w", "w"],
    [ "w", "w", "w", "w", "m", "m", "w", "m", "m", "w"],
    [ "m", "m", "w", "m", "m", "w", "w", "w", "m", "w"],
    [ "w", "m", "w", "m", "b", "w", "m", "w", "m", "w"],
    [ "w", "m", "w", "m", "w", "m", "m", "w", "m", "w"],
    [ "w", "m", "w", "m", "m", "m", "w", "w", "w", "w"],
    [ "w", "w", "w", "w", "w", "w", "w", "m", "m", "w"],
    [ "m", "m", "m", "w", "m", "m", "m", "m", "m", "w"],
    [ "m", "w", "w", "w", "w", "w", "w", "w", "m", "z"]
];

//Startposition des Spielers
player = {
    x: 0,
    y: 0
};


//Labyrinth zeichnen
function draw(){
    var width = canvas.width; //Labyrinth passt sich der Breite des Canvas an
    var blockSize = width/board[0].length; //Blockgröße ist abhängig von board
    var ctx = canvas.getContext('2d');
    //ctx.setTransform(1, 0, 0, 1, 0, 0); //wird scheinbar nicht gebraucht
    ctx.clearRect(0, 0, width, width);
    ctx.fillStyle="maroon"; //Farbe für Mauer
	
	
//Bild von Buch
	//Problem: wird erst nach 1. Tastendruck angezeigt
	var image = new Image();
	image.src = 'buch.JPG';
	ctx.drawImage(image,165,165, 30, 30); //Variable image, gefolgt von X- und Y-Koordinate, sowie Angaben zur Bildgröße: Breite, Höhe

    //Schleife durch Array für das Zeichnen der Wände und des Ziels
    for(var y = 0; y < board.length; y++){ //Schleife beginnt links oben im Spielfeld, läuft durch Array, Endposition ist unten rechts im Spielfeld
        for(var x = 0; x < board[y].length; x++){
            //Mauer wird gezeichnet
            if(board[y][x] === "m"){
                ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
            }
			//grünes Quadrat als Buch wird gezeichnet
			//else if(board[y][x] === "b"){ 
			//Viereck und Mauer wird ab gewisser Stelle grün
			//ctx.fillStyle = "green";
			//ctx.fillRect(165,165,30,30);
			//}
		
			
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
	
	
	//Spieler durch Bild ersetzen:		wird nicht angezeigt, hängt vermutlich damit zusammen, dass das Bild erst nach Tastendruck erscheint...
/*  var player = new Image();
	image.src = 'tom.JPG';
	ctx.drawImage(player,0,0, 30, 30);  */
}


//Überprüfung, ob Rand, Mauer oder außerhalb des Spielfelds
	function canMove(x,y){
		if (x<0){return false;} //x darf nicht kleiner als Null sein (weil Spieler sonst links oben außerhalb vom Spielfeld)
		else if (y<0){return false;} //y darf nicht kleiner als Null sein (weil Spieler sonst links oben außerhalb vom Spielfeld)
		else if (x>=board.length){return false;} //x darf nicht größer als die Länge des Labyrinth/board sein
		else if (y>=board.length){return false;} //y darf nicht größer als die Länge des Labyrinth/board sein
		else if (board[y][x] == "m"){return false;} // x und y dürfen nicht "m" (Mauer) sein
		//else if (board[y][x]) == "b") { Destroy();}
		// oder hier alert für gewonnen
		//else if (board[y][x] == "z"){alert('Gewonnen!');}
		else {return true;}	
	};


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
	Ziel();
    e.preventDefault(); //übliche Tastenfunktion wird verhindert z. B. scrollen mit Pfeiltasten 
	});



draw();

function Buch() {
	if(board[player.y][player.x] == "b") {
		//Buch ausblenden - funktioniert noch nicht (3 Möglichkeiten)
		
		//document.getElementById("image.src").style.visibility = "hidden";
		
		//function hideImage() { 
		//document.getElementById('image').style.visibility = 'hidden';};
		
		//ctx.clear(image);
		alert("Buch gefunden");
	};
};

function Ziel() {
	if(board[player.y][player.x] == "z") {
		alert("Du hast es geschafft! Das Buch ist rechtzeitig in der Bibliothek.");
	};
};



};



//Countdown:

var Timer;
var TotalSeconds;

function CreateTimer(TimerID, Time) {
Timer = document.getElementById(TimerID);
TotalSeconds = Time;

UpdateTimer()
window.setTimeout("Tick()", 1000); //1000 Millisekunden = 1 Sekunde -> die Funktion wird jede Sekunde einmal aufgerufen
}

function Tick() {
	if (TotalSeconds <= 0) {				//Wenn der Countdown bei 0 angelangt ist, stoppt die Funktion und liefert ein Popup-Fenster
alert("Oh nein! Die Leihfrist ist abgelaufen!")
return; 
//return function Bybb();			//Bybb-Funktion sollte eigentlich auch enden
}
TotalSeconds -= 1; //Sekunden werden jede Sekunde um 1 heruntergezählt
UpdateTimer()
window.setTimeout("Tick()", 1000);
}

function UpdateTimer() {
Timer.innerHTML = TotalSeconds;
}

