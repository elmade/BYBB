var	nochZeit = true;		
var imZiel = false;		

			
function Bybb(){
	

	
	CreateTimer("timer", 25);		//Countdown wird erstellt, Sekundenanzahl festgelegt
	zielSound = new sound("cheering.mp3");		//Sound beim Erreichen des Ziels, Datei wird verknüpft
	backgroundMusik = new sound("background.mp3"); 	//Hintergrundmusik, wird verknüpft
    backgroundMusik.play();							//Hintergrundmusik wird abgespielt
	buchSound = new sound("ping.mp3");				//Sound beim Einsammeln des Buchs, Verknüpfung
	zielSoundOhne = new sound ("becken.mp3");		//Sound beim Erreichen des Ziels ohne Buch, Verknüpfung
	
	
	
	var canvas; //Variable für Spielfeld
	var board; //Variable für Labyrinth
	var player; //Variable für Spieler
	var Ziel;
	var ZielZwei;
	var Buch;
	var zielSound;
	var backgroundMusik;
	var buchSound;
	var zielSoundOhne;
	
	
//mehrere Spielrunden
	var Spielrunden = new Array (); //Arrays der verschiedenen Spielrunden (im Folgenden einzeln benannt mit board, board2)
	var aktuelleSpielrunde = 0; //1. Spielrunde entspricht 0
	var aktuellesBoard; //spricht derzeitiges board der jeweiligen Spielrunde an

canvas = document.getElementById("GameBoardCanvas"); //holt Angaben zu Canvas aus HTML-Datei


//Labyrinth festlegen: m = Mauer, w = Weg, z = 1. Ziel, y = 2. Ziel, b = Buch, h = 2. Buch, d = 3. Buch
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
    [ "w", "w", "w", "m", "w", "m", "w", "w", "w", "y"]
];



//Startposition des Spielers
player = {
    x: 0,
    y: 0,
	book: false, //Buch "b", Spieler hat Buch noch nicht berührt
	buch: false, //Buch "h"
	books: false // Buch "d"
};

//board wird durch "push" mit board2 in 2. Spielrunde ersetzt
	Spielrunden.push(board);
	Spielrunden.push(board2);

//Labyrinth zeichnen
function draw(){
	aktuellesBoard = Spielrunden [aktuelleSpielrunde]; //board mit Gestaltung des Spielfeldes wird je nach Spielrunde anders gestaltet
	//console.log("Karte malen")
    var width = canvas.width; 				//Labyrinth passt sich der Breite des Canvas an
    var blockSize = width/board[0].length; 	//Blockgröße ist abhängig von board
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, width);
    ctx.fillStyle="maroon"; 				//Farbe für Mauer
	


 //Schleife durch Array für das Zeichnen der Wände, Gegenstände und des Ziels
    for(var y = 0; y < board.length; y++){ //Schleife beginnt links oben im Spielfeld, läuft durch Array, Endposition ist unten rechts im Spielfeld
        for(var x = 0; x < board[y].length; x++){
            //Mauer wird gezeichnet
            if(aktuellesBoard[y][x] === "m"){ //da Gestaltung des Spielfeldes je nach Spielrunde werden board und board2 nicht extra angesprochen, 
												//sonden über die gemeinsame Variabel "aktuellesBoard"
				ctx.fillStyle = "maroon"
                ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
            }
			//Buch mit Bild
			else if(aktuellesBoard[y][x] === "b"){ 
			ctx.drawImage(document.getElementById('buch'), 250, 250, 50, 50)   //X- und Y-Koordinaten, sowie Angaben zur Bildgröße: Breite, Höhe
			}
			
			//weitere Gegenstände zum Aufsammeln in Spielrunde 2
			else if (aktuellesBoard[y][x] === "h"){ 
			ctx.drawImage(document.getElementById('buch2'), 200, 0, 50, 50) 
			}
			
			else if(aktuellesBoard[y][x] === "d"){ 
			ctx.drawImage(document.getElementById('buch'), 250, 250, 50, 50)  
			}
			
            //Ziel mit Bild (für beide Spielrunden)
            else if(aktuellesBoard[y][x] === "z"){
                ctx.drawImage(document.getElementById('library1'), 530, 530, 60, 75);
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
		aktuellesBoard[player.y][player.x]="w"; //wenn Buch berührt wird, wird im Array "b" durch "w" ersetzt
		player.book=true; //Spieler wird Merkmal übermittelt, dass das Buch b berührt wurde
		buchSound.play();
		console.log("Buch b gefunden");
	}
	
	else if (aktuellesBoard[player.y][player.x] == "h") {
		aktuellesBoard[player.y][player.x]="w"; //wenn Buch berührt wird, wird im Array "h" durch "w" ersetzt
		player.buch=true;//Spieler wird Merkmal übermittelt, dass das Buch h berührt wurde
		buchSound.play();
		console.log("Buch h gefunden");
	}
	
	else if (aktuellesBoard[player.y][player.x] == "d") {
		aktuellesBoard[player.y][player.x]="w"; //wenn Buch berührt wird, wird im Array "d" durch "w" ersetzt
		player.books=true;//Spieler wird Merkmal übermittelt, dass das Buch d berührt wurde
		buchSound.play();
		console.log("Buch d gefunden");
	}
	
};


function Ziel() {
	if(aktuellesBoard[player.y][player.x] == "z") {
		//Spieler hat Buch eingesammelt
		if (player.book == true){
		zielSound.play();
		alert("Du hast es geschafft! Das Buch ist rechtzeitig in der Bibliothek.");
		nochZeit = false;
		console.log(nochZeit);
		}
		//Spieler hat Buch nicht eingesammelt
		else {
		zielSoundOhne.play();
		alert("Wo ist das Buch?");
		};
		

		//Bybb.stop();
		//Tick.stop();
        //return;
		//break;
	
	};

};

function ZielZwei() {
	if(aktuellesBoard[player.y][player.x] == "y") {
		//Spieler hat Buch eingesammelt
		if (player.books == true && player.buch == true){
		zielSound.play();
		alert("Du hast es geschafft! Die Bücher sind rechtzeitig in der Bibliothek.");
		imZiel = true;
		//nochZeit = false;
		//console.log(nochZeit);
		
		}
		//Spieler hat Buch nicht eingesammelt oder eines fehlt
		else {
		zielSoundOhne.play();
		alert("Es fehlen noch Bücher!");
		};
		
	
	};
	
}

//Überprüfung, ob Rand, Mauer oder außerhalb des Spielfelds
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
				ZielZwei();
				nochZeit = false;
				console.log(nochZeit);
				} //Ziel wird erkannt

		
			//Ziel Runde 1
		else if ((board[y][x] == "z") && (player.book == true)){alert("Du hast es geschafft! Das Buch ist rechtzeitig in der Bibliothek. Weiter geht es mit der nächsten Runde!");
		//for (aktuelleSpielrunde<=1; aktuelleSpielrunde++){ player.x = 0; player.y = 0; player.book = false; TotalSeconds = 30;}} //Ziel wird erkannt und neue Spielrunde geladen
		zielSound.play(); aktuelleSpielrunde++, player.x = 0; player.y = 0; player.book = false; TotalSeconds = 30;}
			//Ziel Runde 2
		else if ((board2[y][x] == "y") && (player.books == true) && (player.buch == true)){alert("Du hast es geschafft! Alle Bücher sind in der Bibliothek!"); ZielZwei();
		zielSound.play(); aktuelleSpielrunde++; nochZeit= false; alert("Ende");} //Ziel wird erkannt und neue Spielrunde geladen

		else {return true;};	
		Buch();
		
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
	ZielZwei(); //die Zielfunktion für das zweite Level wird aufgerufen
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



//Countdown
var Timer;
var TotalSeconds;
//var nochZeit = true;

function CreateTimer(TimerID, Time) {
Timer = document.getElementById(TimerID);
TotalSeconds = Time;

UpdateTimer()
window.setTimeout("Tick()", 1000); //1000 Millisekunden = 1 Sekunde -> die Funktion wird jede Sekunde einmal aufgerufen
}





function Tick() {
	loseSound = new sound ("ohhh.mp3");						//Sound beim Ablauf der Zeit, Verknüpfung
	var loseSound;

	//prüfen, ob Spiel noch läuft
	//if (imZiel = false) {


	if (TotalSeconds <= 0) {				//Wenn der Countdown bei 0 angelangt ist, stoppt die Funktion und liefert ein Popup-Fenster und einen Sound
	loseSound.play();						
	alert("Oh nein! Die Leihfrist ist abgelaufen!");
	nochZeit = false;
	console.log(nochZeit);	
	return; 
	//}

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

function stopTimer(){
clearTimeout();

};