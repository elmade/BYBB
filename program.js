var	nochZeit = true;	//globale Variablen für Timer-/Bybb-Funktion	
var imZiel = false;		

			
function Bybb(){
	
	CreateTimer("timer", 25);		//Countdown wird erstellt, Sekundenanzahl festgelegt
	zielSound = new sound("cheering.mp3");			//Sound beim Erreichen des Ziels, Datei wird verknüpft
	backgroundMusik = new sound("background.mp3"); 	//Hintergrundmusik, Verknüfung
    backgroundMusik.play();							//Hintergrundmusik wird abgespielt
	buchSound = new sound("ping.mp3");				//Sound beim Einsammeln des Buchs, Verknüpfung
	zielSoundOhne = new sound ("becken.mp3");		//Sound beim Erreichen des Ziels ohne Buch, Verknüpfung
	
	
	
	var canvas; 	//Variable für Spielfeld
	var board; 		//Variable für Labyrinth
	var player; 	//Variable für Spieler
	var Ziel;		//Variable für Ziel in 1. Runde
	var ZielZwei;	//Variable für Ziel in 2. Runde
	var Buch;		//Variable zur Bucherkennung
	var zielSound;	//Variable für den Zielsound
	var backgroundMusik;	//Variable für die Hintergrundmusik
	var buchSound;			//Variable für Sound, wenn Buch aufgesammelt wird
	var zielSoundOhne;		//Variable für Sound, wenn Ziel ohne Buch erreicht wird
	
	
//mehrere Spielrunden
	var Spielrunden = new Array (); //Arrays der verschiedenen Spielrunden (im Folgenden einzeln benannt mit board, board2)
	var aktuelleSpielrunde = 0; 	//1. Spielrunde entspricht 0
	var aktuellesBoard; 			//spricht derzeitiges board/derzeitigen Array der jeweiligen Spielrunde an

//Canvas
canvas = document.getElementById("GameBoardCanvas"); //holt Angaben zu Canvas aus HTML-Datei

//Labyrinth festlegen: m = Mauer, w = Weg, z = 1. Ziel, y = 2. Ziel, b = Buch, h = 2. Buch, d = 3. Buch

//Labyrinth der ersten Spielrunde
board = [

	[ "w", "m", "w", "w", "m", "w", "m", "m", "m", "w"],
    [ "w", "m", "m", "w", "m", "w", "w", "w", "w", "w"],
    [ "w", "w", "w", "w", "m", "m", "w", "m", "m", "w"],
    [ "m", "m", "w", "m", "m", "w", "w", "w", "m", "w"],
    [ "w", "m", "w", "m", "b", "w", "m", "w", "m", "w"],
    [ "w", "m", "w", "m", "w", "m", "m", "w", "m", "w"],
    [ "w", "m", "w", "m", "m", "m", "w", "w", "w", "w"],
    [ "w", "w", "w", "w", "w", "w", "w", "m", "w", "w"],
    [ "m", "m", "m", "w", "m", "m", "m", "m", "m", "w"],
    [ "m", "w", "w", "w", "w", "w", "w", "w", "m", "z"]
];

//Labyrinth der zweiten Spielrunde

var board2 = [

	[ "w", "w", "m", "h", "w", "w", "w", "w", "w", "w"],
    [ "m", "w", "m", "m", "m", "m", "m", "w", "m", "m"],
    [ "w", "w", "w", "w", "w", "w", "w", "w", "w", "m"],
    [ "w", "m", "m", "w", "m", "m", "w", "m", "w", "m"],
    [ "w", "m", "w", "w", "d", "m", "w", "m", "w", "w"],
    [ "w", "m", "w", "m", "w", "w", "w", "m", "w", "m"],
    [ "w", "w", "w", "m", "w", "m", "w", "w", "w", "m"],
    [ "m", "m", "w", "w", "w", "m", "m", "w", "m", "m"],
    [ "w", "m", "w", "m", "w", "w", "w", "w", "m", "w"],
    [ "w", "w", "w", "m", "w", "m", "m", "w", "w", "y"]
];


//Startposition des Spielers
player = {
    x: 0,
    y: 0,
	book: false, //Buch "b", Spieler hat Buch noch nicht berührt
	buch: false, //Buch "h"
	books: false //Buch "d"
};

//board wird durch "push" mit board2 in 2. Spielrunde ersetzt
	Spielrunden.push(board);
	Spielrunden.push(board2);
	
	
//Labyrinth zeichnen
function draw(){
	//console.log("Karte malen")
	aktuellesBoard = Spielrunden [aktuelleSpielrunde]; //board/Spielfeld wird je nach Spielrunde anders gestaltet
    var width = canvas.width; 				//Labyrinth passt sich der Breite des Canvas an
    var blockSize = width/board[0].length; 	//Blockgröße ist abhängig von board
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, width);
    ctx.fillStyle="maroon"; 				//Farbe für Mauer
	
	
//Schleife durch Array für das Zeichnen der Wände, Gegenstände und des Ziels
    for(var y = 0; y < board.length; y++){ 		//Schleife beginnt links oben im Spielfeld, läuft durch Array, Endposition ist unten rechts im Spielfeld
        for(var x = 0; x < board[y].length; x++){
            //Mauer
            if(aktuellesBoard[y][x] === "m"){ //da Gestaltung des Spielfeldes je nach Spielrunde varriert, werden board und board2 nicht extra angesprochen, 
												//sonden über die gemeinsame Variable "aktuellesBoard" angesprochen
				ctx.fillStyle = "maroon"
                ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
            }
			
			//Bücher
			else if(aktuellesBoard[y][x] === "b"){ 
			ctx.drawImage(document.getElementById('buch'), 250, 250, 50, 50)   //X- und Y-Koordinaten, sowie Angaben zur Bildgröße: Breite, Höhe
			}
		
			else if (aktuellesBoard[y][x] === "h"){ 
			ctx.drawImage(document.getElementById('buch2'), 200, 0, 50, 50) 
			}
			
			else if(aktuellesBoard[y][x] === "d"){ 
			ctx.drawImage(document.getElementById('buch'), 250, 250, 50, 50)  
			}
			
            //Ziel
            else if(aktuellesBoard[y][x] === "z"){
                ctx.drawImage(document.getElementById('library1'), 545, 530, 60, 75);
				 }
				 
			else if(aktuellesBoard[y][x] === "y"){
                ctx.drawImage(document.getElementById('library'), 530, 530, 75, 75);
				 };
        };
	};


   //Spieler wird gezeichnet (mit und ohne Büchern)

	if ((player.book == false) && (player.buch == false) && (player.books == false)) 	//Wenn der Spieler das Buch noch nicht aufgesammelt hat, dann wird ein Bild von Tom angezeigt
	{ctx.drawImage(document.getElementById('tom'), player.x*blockSize, player.y*blockSize, 55, 55);} 
	else if ((player.book == true) && (player.buch == false) && (player.books == false))	//Wenn das Buch b aufgesammelt wurde, wird ein Bild von Tom mit Büchern angezeigt
	{ctx.drawImage(document.getElementById('tomMitBuch'), player.x*blockSize, player.y*blockSize, 55, 55);}
	else if ((player.buch == true) && (player.book == false) && (player.books == false))	//Wenn das Buch h aufgesammelt wurde, wird ein Bild von Tom mit Büchern angezeigt
	{ctx.drawImage(document.getElementById('tomMitBuch'), player.x*blockSize, player.y*blockSize, 55, 55);}
	else if ((player.books == true) && (player.book == false) && (player.buch == false))	//Wenn das Buch d aufgesammelt wurde, wird ein Bild von Tom mit Büchern angezeigt
	{ctx.drawImage(document.getElementById('tomMitBuch'), player.x*blockSize, player.y*blockSize, 55, 55);}
	else if ((player.books == true) && (player.buch == true) && (player.book == false))
		{ctx.drawImage(document.getElementById('tomMitBuch'), player.x*blockSize, player.y*blockSize, 55, 55);}
};


function Buch() {
	
	if (aktuellesBoard[player.y][player.x] == "b") {
		aktuellesBoard[player.y][player.x] = "w"; //wenn der Spieler das Buch berührt, wird im Array "b" durch "w" ersetzt
		player.book=true; 	//Spieler wird Merkmal übermittelt, dass das Buch b berührt wurde
		buchSound.play();
		//console.log("Buch b gefunden");
	}
	
	else if (aktuellesBoard[player.y][player.x] == "h") {
		aktuellesBoard[player.y][player.x] = "w"; //wenn Buch berührt wird, wird im Array "h" durch "w" ersetzt
		player.buch=true;	//Spieler wird Merkmal übermittelt, dass das Buch h berührt wurde
		buchSound.play();
		//console.log("Buch h gefunden");
	}
	
	else if (aktuellesBoard[player.y][player.x] == "d") {
		aktuellesBoard[player.y][player.x] = "w"; //wenn Buch berührt wird, wird im Array "d" durch "w" ersetzt
		player.books=true;//Spieler wird Merkmal übermittelt, dass das Buch d berührt wurde
		buchSound.play();
		//console.log("Buch d gefunden");
	}
};


function Ziel() {
	if(aktuellesBoard[player.y][player.x] == "z") {
		//Spieler hat Buch eingesammelt
		if (player.book == true){
		zielSound.play();
		nochZeit = false;
		}
		//Spieler hat Buch nicht eingesammelt
		else {
		zielSoundOhne.play();
		alert("Wo ist das Buch?");
		};
	};
};


function ZielZwei() {
	if(aktuellesBoard[player.y][player.x] == "y") {
		//Spieler hat Buch eingesammelt
		if (player.books == true && player.buch == true){
		zielSound.play();
		nochZeit = false;
		imZiel = true;
		console.log(nochZeit);
		}
		//Spieler hat Buch nicht eingesammelt oder eines fehlt
		else {
		zielSoundOhne.play();
		alert("Es fehlen noch Bücher!");
		};
	};
}


//Überprüfung, ob Rand, Mauer, Ziel oder außerhalb des Spielfelds
function canMove(x,y){
		if (x<0){return false;} //x darf nicht kleiner als Null sein (weil Spieler sonst links oben außerhalb vom Spielfeld)
		else if (y<0){return false;} //y darf nicht kleiner als Null sein (weil Spieler sonst links oben außerhalb vom Spielfeld)
		else if (!nochZeit){return false;}
		else if (imZiel) {return false;}
		else if (x>=board.length){return false;} //x darf nicht größer als die Länge des Labyrinth/board sein
		else if (y>=board.length){return false;} //y darf nicht größer als die Länge des Labyrinth/board sein
		else if (aktuellesBoard[y][x] == "m"){return false;} // x und y dürfen nicht "m" (Mauer) sein

		//Ziel Runde 1
		else if ((board[y][x] == "z") && (player.book == true))
				{zielSound.play();
				alert("Du hast es geschafft! Das Buch ist rechtzeitig in der Bibliothek. Weiter geht es mit der nächsten Runde!");
				//Ziel wird erkannt und neue Spielrunde geladen
				aktuelleSpielrunde++, player.x = 0; player.y = 0; player.book = false; TotalSeconds = 30;}
		//Ziel Runde 2
		else if ((board2[y][x] == "y") && (player.books == true) && (player.buch == true))
				{zielSound.play();
				alert("Du hast es geschafft! Alle Bücher sind in der Bibliothek!"); 
				backgroundMusik.stop();
				
				//Variante Spielende 1
				aktuelleSpielrunde++; nochZeit= false; 
				console.log("Ende");
				//Varinate 2
				nochZeit = false;
				console.log(nochZeit);
				} //Ziel wird erkannt

		else {return true;};	
		Buch();
		
	};

	//Tastensteuerung
$(document).keyup(function(e){
    if((e.which == 38) && canMove(player.x, player.y-1))//Pfeiltaste nach oben
        player.y--; //y wird um eins verringert, Spieler bewegt sich nach oben
    else if((e.which == 40) && canMove(player.x, player.y+1)) //Pfeiltaste nach unten
        player.y++; // y wird um eins vergrößert, Spieler bewegt sich nach unten
    else if((e.which == 37) && canMove(player.x-1, player.y)) //Pfeiltaste links
        player.x--; //x wird um eins verringert, Spieler bewegt sich nach links
    else if((e.which == 39) && canMove(player.x+1, player.y)) //Pfeiltaste rechts
        player.x++; //x wird um eins vergrößert, Spieler bewegt sich nach rechts
		
	//nach jedem Tastenschlag werden folgende Funktionen neu gezeichnet:
    draw(); //Layrinth zeichnen
	Ziel();	//Zielfunktion
	Buch();	//Buchfunktion
	ZielZwei(); //Zielfunktion für die zweite Spielrunde
    e.preventDefault(); //übliche Tastenfunktion wird verhindert z. B. scrollen mit Pfeiltasten 
	});


draw();


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
// Ende der Bybb-Funktion


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
	loseSound = new sound ("ohhh.mp3");		//Sound beim Ablauf der Zeit, Verknüpfung
	var loseSound;


	if (TotalSeconds <= 0) {		//Wenn der Countdown bei 0 angelangt ist, stoppt die Funktion und liefert ein Popup-Fenster und einen Sound
	loseSound.play();						
	alert("Oh nein! Die Leihfrist ist abgelaufen!");
	nochZeit = false;
	console.log(nochZeit);
	return;  
}

TotalSeconds -= 1; //Sekunden werden jede Sekunde um 1 heruntergezählt
UpdateTimer();
window.setTimeout("Tick()", 1000);

//2. Soundobjekt für die Timer-Funktion
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

}

function UpdateTimer() {
Timer.innerHTML = TotalSeconds;
}
