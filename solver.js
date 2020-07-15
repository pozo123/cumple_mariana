var id_casillas = ["yo_6","yo_5","yo_4","yo_3","yo_2","yo_1","yo_0","tu_6","tu_5","tu_4","tu_3","tu_2","tu_1","tu_0"];
//var total_casillas = casillas.length;
var board_size = 6;
var pot_yo = board_size;
var pot_tu = 2 * board_size + 1;

var avalanche = true;
var sol = [];
var st = 0;
var victory = 24;

function solve(){
	var yo = [parseInt(document.getElementById("yo_0").innerText)||0,parseInt(document.getElementById("yo_1").innerText)||0,parseInt(document.getElementById("yo_2").innerText)||0,parseInt(document.getElementById("yo_3").innerText)||0,parseInt(document.getElementById("yo_4").innerText)||0,parseInt(document.getElementById("yo_5").innerText)||0,parseInt(document.getElementById("yo_6").innerText)||0];
	var tu = [parseInt(document.getElementById("tu_0").innerText)||0,parseInt(document.getElementById("tu_1").innerText)||0,parseInt(document.getElementById("tu_2").innerText)||0,parseInt(document.getElementById("tu_3").innerText)||0,parseInt(document.getElementById("tu_4").innerText)||0,parseInt(document.getElementById("tu_5").innerText)||0,parseInt(document.getElementById("tu_6").innerText)||0];
	//console.log(casillas[total_casillas-1]);
	var casillas = [yo[6],yo[5],yo[4],yo[3],yo[2],yo[1],yo[0],tu[6],tu[5],tu[4],tu[3],tu[2],tu[1],tu[0]];
	victory = 0;
	for(k=0;k<(2*board_size + 2);k++){
		victory += casillas[k];
	}
	var solu = attempt(casillas,true,[],0);
	//casillas = move(casillas,10,false)[0];
	document.getElementById("score").innerText = solu[1];
	sol = solu[0];
	console.log(sol);
}

function step(){
	var yo = [parseInt(document.getElementById("yo_0").innerText)||0,parseInt(document.getElementById("yo_1").innerText)||0,parseInt(document.getElementById("yo_2").innerText)||0,parseInt(document.getElementById("yo_3").innerText)||0,parseInt(document.getElementById("yo_4").innerText)||0,parseInt(document.getElementById("yo_5").innerText)||0,parseInt(document.getElementById("yo_6").innerText)||0];
	var tu = [parseInt(document.getElementById("tu_0").innerText)||0,parseInt(document.getElementById("tu_1").innerText)||0,parseInt(document.getElementById("tu_2").innerText)||0,parseInt(document.getElementById("tu_3").innerText)||0,parseInt(document.getElementById("tu_4").innerText)||0,parseInt(document.getElementById("tu_5").innerText)||0,parseInt(document.getElementById("tu_6").innerText)||0];
	//console.log(casillas[total_casillas-1]);
	var casillas = [yo[6],yo[5],yo[4],yo[3],yo[2],yo[1],yo[0],tu[6],tu[5],tu[4],tu[3],tu[2],tu[1],tu[0]];
	var newcas = move(casillas, sol[st],sol[st]<6)[0];
	st++;
	print(newcas);
}

function attempt(casillas,voy,path,nivel){
	var best = [-1,-1000*(Math.pow(-1,!voy))];
	//console.log("nivel: " + nivel);
	// if(nivel > 11){
	// 	//console.log("wops");
	// 	return [-10,-10000];
	// } else {
		var i = 0;
		for(i=0;i<board_size;i++){
			//console.log(i);
			var newpath = [...path];
			var offset = (board_size+1)*(!voy);
			newpath.push(i+offset);
			var jugada = move(casillas,i + offset,voy);
			if(jugada[1]){
				var score;
				var cas = jugada[0];
				if(cas[6]>victory || cas[13]>victory){
					return [newpath, cas[6] - cas[13]];
				} else {	
					if(nivel>9||((cas[0]==0&&cas[1]==0&&cas[2]==0&&cas[3]==0&&cas[4]==0&&cas[5]==0)||(cas[7]==0&&cas[8]==0&&cas[9]==0&&cas[10]==0&&cas[11]==0&&cas[12]==0))){
						score = [newpath, cas[6] - cas[13]];
					} else {
						if(jugada[2]){
							score = attempt(jugada[0],voy,newpath,nivel+1);
						} else {
							score = attempt(jugada[0],!voy,newpath,nivel+1);
						}
					}
					//console.log(score);
					if(voy){
						if(score[1] > best[1]){
							//console.log(best);
							best = score;
						}
					} else {
						if(score[1] < best[1]){
							//console.log(best);
							best = score;
						}
					}
				}
			}	
		}
		//console.log(best[0]);
		return best;
	//}
}

function move(casill,casilla,voy){
	var valid = true;
	var repite_turno = false;
	var casillas = [...casill];
	if(casilla == pot_yo || casilla == pot_tu){
		valid = false;
	} else {
		canicas = casillas[casilla];
		if(canicas > 0){
			casillas[casilla] = 0;
			while(canicas > 0){
				casilla++;
				if((casilla == pot_tu && voy) || (casilla == pot_yo && !voy)){
					casilla++;
				} else {
					if(casilla >= casillas.length){
						casilla = 0;
					}
					casillas[casilla]++;
					canicas--;
				}
			}
			if(casilla == pot_yo || casilla == pot_tu){
				repite_turno = true;
			} else if(casillas[casilla] > 1){
				return move(casillas,casilla,voy);
			}
		} else {
			valid = false;
		}
	}
	if(!valid){
		//console.log("No se puede mover esa casilla");
	} else {
		//console.log(casillas);
	}
	//print(casillas);
	return [casillas, valid, repite_turno];
}

function print(casillas){
	//console.log(casillas);
	for(j=0;j<casillas.length;j++){
		document.getElementById(id_casillas[j]).innerText = casillas[j];
	}
}