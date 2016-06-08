					
function Bybb(){
	
	CreateTimer("timer", 25);		//Countdown wird erstellt, Sekundenanzahl festgelegt
	zielSound = new sound("cheering.mp3");		//Sound beim Erreichen des Ziels, Datei wird verknüpft
	backgroundMusik = new sound("background.wav"); 	//Hintergrundmusik, wird verknüpft
    backgroundMusik.play();							//Hintergrundmusik wird abgespielt
	buchSound = new sound("ping.mp3");				//Sound beim Einsammeln des Buchs, Verknüpfung
	
	
	var canvas; //Variable für Spielfeld
	var board; //Variable für Labyrinth
	var player; //Variable für Spieler
	var Ziel;
	var Buch;
	var zielSound;
	var backgroundMusik;
	var buchSound;
	

	
canvas = document.getElementById("GameBoardCanvas"); //holt Angaben zu Canvas aus HTML-Datei



//Labyrinth festlegen: m = Mauer, w = Weg, z = Ziel, b = Buch
board = [

	[ "w", "m", "w", "w", "m", "w", "m", "m", "m", "w"],
    [ "w", "m", "m", "w", "m", "w", "w", "w", "w", "w"],
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
    y: 0,
	book: false //Spieler hat Buch noch nicht berührt
};


//Labyrinth zeichnen
function draw(){
	console.log("Karte malen")
    var width = canvas.width; //Labyrinth passt sich der Breite des Canvas an
    var blockSize = width/board[0].length; //Blockgröße ist abhängig von board
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, width);
    ctx.fillStyle="maroon"; //Farbe für Mauer
	
	


    //Schleife durch Array für das Zeichnen der Wände und des Ziels
    for(var y = 0; y < board.length; y++){ //Schleife beginnt links oben im Spielfeld, läuft durch Array, Endposition ist unten rechts im Spielfeld
        for(var x = 0; x < board[y].length; x++){
            //Mauer wird gezeichnet
            if(board[y][x] === "m"){
				ctx.fillStyle = "maroon"
                ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
            }
			//Buch mit Bild
			else if(board[y][x] === "b"){ 
			ctx.drawImage(document.getElementById('buch'), 165, 165, 30, 30)   //X- und Y-Koordinaten, sowie Angaben zur Bildgröße: Breite, Höhe
			}
		
			
            //Ziel wird gezeichnet: goldenes X
            else if(board[y][x] === "z"){ //Code für X-Zeichen folgt
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = "gold";
                ctx.moveTo(x*blockSize, y*blockSize);
                ctx.lineTo((x+1)*blockSize, (y+1)*blockSize);
                ctx.moveTo(x*blockSize, (y+1)*blockSize);
                ctx.lineTo((x+1)*blockSize, y*blockSize);
                ctx.stroke();
				 };
        };
	
		//Bild von Buch
	
	//var image = new Image();
	//image.src = 'buch.JPG';
	//image.onload = function(){
	//ctx.drawImage(image,165,165, 30, 30)
	//}; //Variable image, gefolgt von X- und Y-Koordinate, sowie Angaben zur Bildgröße: Breite, Höhe
    
	};


   //Spieler wird gezeichnet

	if (player.book == false) 	//Wenn der Spieler das Buch noch nicht aufgesammelt hat, dann wird ein Bild von Tom angezeigt
	{ctx.drawImage(document.getElementById('tom'), player.x*blockSize, player.y*blockSize, 40, 40);} 
	else if (player.book == true)	//Wenn das Buch aufgesammelt wurde, wird ein Bild von Tom mit Büchern angezeigt
	{ctx.drawImage(document.getElementById('tomMitBuch'), player.x*blockSize, player.y*blockSize, 40, 40);}

	
	
	
}


//Überprüfung, ob Rand, Mauer oder außerhalb des Spielfelds
	function canMove(x,y){
		if (x<0){return false;} //x darf nicht kleiner als Null sein (weil Spieler sonst links oben außerhalb vom Spielfeld)
		else if (y<0){return false;} //y darf nicht kleiner als Null sein (weil Spieler sonst links oben außerhalb vom Spielfeld)
		else if (x>=board.length){return false;} //x darf nicht größer als die Länge des Labyrinth/board sein
		else if (y>=board.length){return false;} //y darf nicht größer als die Länge des Labyrinth/board sein
		else if (board[y][x] == "m"){return false;} // x und y dürfen nicht "m" (Mauer) sein
		//else if (board[y][x]) == "b") { Destroy();}
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
	Ziel();	//die Zielfunktion wird immer wieder neu angesprochen
	Buch();	//die Buchfunktion auch
    e.preventDefault(); //übliche Tastenfunktion wird verhindert z. B. scrollen mit Pfeiltasten 
	});



draw();

function Buch() {
	
	if(board[player.y][player.x] == "b") {
		board[player.y][player.x]="w"; //wenn Buch berührt wird, wird im Array "b" durch "w" ersetzt
		player.book=true; //Spieler wird Merkmal übermittelt, dass das Buch berührt wurde
		buchSound.play();
		console.log("Buch gefunden");
	};
};

function Ziel() {
	if(board[player.y][player.x] == "z") {
		//Spieler hat Buch eingesammelt
		if (player.book == true){
		zielSound.play();
		alert("Du hast es geschafft! Das Buch ist rechtzeitig in der Bibliothek.");
		}
		//Spieler hat Buch nicht eingesammelt
		else {
		//Sound einfügen
		alert("Leider hast du es nicht geschafft :( ");
		};
		
		console.log("Spiel stoppen 1");
		//Bybb.stop();
		//Tick.stop();
            //return;
	
	};
//return;
};

//Sound-Objekt, legt Eigenschaften der Sounds fest und ermöglicht dem Programm mit Sounds umzugehen
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
};

};



//Countdown
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
console.log("Spiel stoppen 2")
//return function Bybb();			//Bybb-Funktion sollte eigentlich auch enden
}
TotalSeconds -= 1; //Sekunden werden jede Sekunde um 1 heruntergezählt
UpdateTimer()
window.setTimeout("Tick()", 1000);
}

function UpdateTimer() {
Timer.innerHTML = TotalSeconds;
}

