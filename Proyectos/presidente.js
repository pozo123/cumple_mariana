//dinamica de completar, boton siempre activo y así
//Checar que los culos sí pasen las mejores OR ELSE
//Empieza 3 diamantes o presidente?
//Update player status (en el label)
//culo juega todas sus cartas automáticamente

//if true: pass only does one turn, if false passes until clean_pot()
var regla_pass_solo_un_turno = false;
var regla_min_2_completar = false;
var regla_empieza_presi = false;

var turno = 0;
var deck;
var last_played = -1;
var reference_deck = {"cards":[
    {"cid":0 ,"numero":0, "nombre":"_", "palo":"n", "simbolo":''},
    {"cid":1 ,"numero":12, "nombre":"A", "palo":"d","simbolo":'\u2666'},
    {"cid":2 ,"numero":13, "nombre":"2", "palo":"d","simbolo":'\u2666'},
    {"cid":3 ,"numero":1, "nombre":"3", "palo":"d","simbolo":'\u2666'},
    {"cid":4 ,"numero":2, "nombre":"4", "palo":"d","simbolo":'\u2666'},
    {"cid":5 ,"numero":3, "nombre":"5", "palo":"d","simbolo":'\u2666'},
    {"cid":6 ,"numero":4, "nombre":"6", "palo":"d","simbolo":'\u2666'},
    {"cid":7 ,"numero":5, "nombre":"7", "palo":"d","simbolo":'\u2666'},
    {"cid":8 ,"numero":6, "nombre":"8", "palo":"d","simbolo":'\u2666'},
    {"cid":9 ,"numero":7, "nombre":"9", "palo":"d","simbolo":'\u2666'},
    {"cid":10 ,"numero":8, "nombre":"10", "palo":"d","simbolo":'\u2666'},
    {"cid":11 ,"numero":9, "nombre":"J", "palo":"d","simbolo":'\u2666'},
    {"cid":12 ,"numero":10, "nombre":"Q", "palo":"d","simbolo":'\u2666'},
    {"cid":13 ,"numero":11, "nombre":"K", "palo":"d","simbolo":'\u2666'},
    {"cid":14 ,"numero":12, "nombre":"A", "palo":"e", "simbolo":'\u2660'},
    {"cid":15 ,"numero":13, "nombre":"2", "palo":"e", "simbolo":'\u2660'},
    {"cid":16 ,"numero":1, "nombre":"3", "palo":"e", "simbolo":'\u2660'},
    {"cid":17 ,"numero":2, "nombre":"4", "palo":"e", "simbolo":'\u2660'},
    {"cid":18 ,"numero":3, "nombre":"5", "palo":"e", "simbolo":'\u2660'},
    {"cid":19 ,"numero":4, "nombre":"6", "palo":"e", "simbolo":'\u2660'},
    {"cid":20 ,"numero":5, "nombre":"7", "palo":"e", "simbolo":'\u2660'},
    {"cid":21 ,"numero":6, "nombre":"8", "palo":"e", "simbolo":'\u2660'},
    {"cid":22 ,"numero":7, "nombre":"9", "palo":"e", "simbolo":'\u2660'},
    {"cid":23 ,"numero":8, "nombre":"10", "palo":"e", "simbolo":'\u2660'},
    {"cid":24 ,"numero":9, "nombre":"J", "palo":"e", "simbolo":'\u2660'},
    {"cid":25 ,"numero":10, "nombre":"Q", "palo":"e", "simbolo":'\u2660'},
    {"cid":26 ,"numero":11, "nombre":"K", "palo":"e", "simbolo":'\u2660'},
    {"cid":27 ,"numero":12, "nombre":"A", "palo":"c", "simbolo":'\u2665'},
    {"cid":28 ,"numero":13, "nombre":"2", "palo":"c", "simbolo":'\u2665'},
    {"cid":29 ,"numero":1, "nombre":"3", "palo":"c", "simbolo":'\u2665'},
    {"cid":30 ,"numero":2, "nombre":"4", "palo":"c", "simbolo":'\u2665'},
    {"cid":31 ,"numero":3, "nombre":"5", "palo":"c", "simbolo":'\u2665'},
    {"cid":32 ,"numero":4, "nombre":"6", "palo":"c", "simbolo":'\u2665'},
    {"cid":33 ,"numero":5, "nombre":"7", "palo":"c", "simbolo":'\u2665'},
    {"cid":34 ,"numero":6, "nombre":"8", "palo":"c", "simbolo":'\u2665'},
    {"cid":35 ,"numero":7, "nombre":"9", "palo":"c", "simbolo":'\u2665'},
    {"cid":36 ,"numero":8, "nombre":"10", "palo":"c", "simbolo":'\u2665'},
    {"cid":37 ,"numero":9, "nombre":"J", "palo":"c", "simbolo":'\u2665'},
    {"cid":38 ,"numero":10, "nombre":"Q", "palo":"c", "simbolo":'\u2665'},
    {"cid":39 ,"numero":11, "nombre":"K", "palo":"c", "simbolo":'\u2665'},
    {"cid":40 ,"numero":12, "nombre":"A", "palo":"t", "simbolo":'\u2663'},
    {"cid":41 ,"numero":13, "nombre":"2", "palo":"t", "simbolo":'\u2663'},
    {"cid":42 ,"numero":1, "nombre":"3", "palo":"t", "simbolo":'\u2663'},
    {"cid":43 ,"numero":2, "nombre":"4", "palo":"t", "simbolo":'\u2663'},
    {"cid":44 ,"numero":3, "nombre":"5", "palo":"t", "simbolo":'\u2663'},
    {"cid":45 ,"numero":4, "nombre":"6", "palo":"t", "simbolo":'\u2663'},
    {"cid":46 ,"numero":5, "nombre":"7", "palo":"t", "simbolo":'\u2663'},
    {"cid":47 ,"numero":6, "nombre":"8", "palo":"t", "simbolo":'\u2663'},
    {"cid":48 ,"numero":7, "nombre":"9", "palo":"t", "simbolo":'\u2663'},
    {"cid":49 ,"numero":8, "nombre":"10", "palo":"t", "simbolo":'\u2663'},
    {"cid":50 ,"numero":9, "nombre":"J", "palo":"t", "simbolo":'\u2663'},
    {"cid":51 ,"numero":10, "nombre":"Q", "palo":"t", "simbolo":'\u2663'},
    {"cid":52 ,"numero":11, "nombre":"K", "palo":"t", "simbolo":'\u2663'}
    ]};
    
var dadas = {"presidente":"0","vicepresidente":"0","viceculo":"0","culo":"0"};
var pot = [];
var winners = [];
var amount_played = -1;
var passed = 0;

var players = [
    {"id":"0","name":"Pozo","hand":[],"score":0,"passed": false, "status":"peasant"},
    {"id":"1","name":"Luis","hand":[],"score":0,"passed": false, "status":"peasant"},
    {"id":"2","name":"Mariana","hand":[],"score":0,"passed": false, "status":"peasant"},
    {"id":"3","name":"Polo","hand":[],"score":0,"passed": false, "status":"peasant"},
    /*{"id":"4","name":"Adri","hand":[],"score":0,"passed": false, "status":"peasant","score":"0"},*/
    ];

function inicio(){
    console.log("Probando2 que loco");
    firebase.database().ref().once('value').then(function(snapshot){
      console.log(snapshot);
    });
    document.getElementById("rule_pass").disabled = false;
    document.getElementById("rule_min_completar").disabled = false;
    document.getElementById("rule_empieza_presi").disabled = false;
    document.getElementById("deal").disabled = false;
    for(i=0;i<players.length;i++){
        create_player(i);
    }
}

function create_player(i){
    var p_name = document.createElement("p");
    p_name.setAttribute("id", "nombre_p" + i);
    p_name.innerHTML = players[i].name + " (" + players[i].status + ": " + players[i].score +")";
    var b_play = document.createElement("button");
    b_play.setAttribute("id","butt_p" + i);
    b_play.setAttribute("disabled","true");
    b_play.setAttribute("onclick","play()");
    b_play.innerHTML = "Jugar";
    var b_comp = document.createElement("button");
    b_comp.setAttribute("id","butt_poker_p" + i);
    b_comp.setAttribute("disabled","true");
    b_comp.setAttribute("onclick","play_poker("+i+")");
    b_comp.innerHTML = "Completa!";
    var b_pass = document.createElement("button");
    b_pass.setAttribute("id","butt_pass_p" + i);
    b_pass.setAttribute("disabled","true");
    b_pass.setAttribute("onclick","pass()");
    b_pass.innerHTML = "Pasar";
    var b_dar = document.createElement("button");
    b_dar.setAttribute("id","butt_dar_p" + i);
    b_dar.setAttribute("disabled","true");
    b_dar.setAttribute("onclick","dar("+i+")");
    b_dar.setAttribute("style","display:none");
    b_dar.innerHTML = "Dar";
    var form = document.createElement("form");
    var select = document.createElement("select");
    select.setAttribute("id","ddl_p" + i);
    var op1 = document.createElement("option");
    op1.setAttribute("value","1");
    op1.innerHTML = "Carta";
    var op2 = document.createElement("option");
    op2.setAttribute("value","2");
    op2.innerHTML = "Pares";
    var op3 = document.createElement("option");
    op3.setAttribute("value","3");
    op3.innerHTML = "Tercias";
    select.appendChild(op1);
    select.appendChild(op2);
    select.appendChild(op3);
    select.setAttribute("style","display:none");
    form.appendChild(select);
    var p_cards = document.createElement("p");
    p_cards.setAttribute("id", "p" + i);
    document.getElementById("board").appendChild(p_name);
    document.getElementById("board").appendChild(b_play);
    document.getElementById("board").appendChild(b_comp);
    document.getElementById("board").appendChild(b_pass);
    document.getElementById("board").appendChild(b_dar);
    document.getElementById("board").appendChild(form);
    document.getElementById("board").appendChild(p_cards);
}

function set_rule_pass() {
  var checkBox = document.getElementById("rule_pass");
  regla_pass_solo_un_turno = checkBox.checked;
}

function set_rule_min_completar() {
  var checkBox = document.getElementById("rule_min_completar");
  regla_min_2_completar = checkBox.checked;
}

function set_rule_empieza_presi() {
  var checkBox = document.getElementById("rule_empieza_presi");
  regla_empieza_presi = checkBox.checked;
}

function deal(){
    document.getElementById("rule_pass").disabled = true;
    document.getElementById("rule_min_completar").disabled = true;
    document.getElementById("rule_empieza_presi").disabled = true;
    document.getElementById("deal").disabled = true;

    deck = JSON.parse(JSON.stringify(reference_deck));
    deck.cards.splice(0,1);
    for(k=0;k<players.length;k++){
        players[k].hand = [];
    }
    i = 0;
    while(deck.cards.length > 0){
        card = draw();
        if(card.cid == 3){ //3 de diamantes
            turno = i;
        }
        players[i].hand.push(card);
        i = ((i+1) == players.length) ? 0: i+1;
    }
    generate_cards_html();
    if(winners.length > 0){
        turno = regla_empieza_presi ? winners[0].id : turno;
        to_each_their_own();
    } else {
        clean_pot();
    }
}

function generate_cards_html(){
    for(i=0;i<players.length;i++){
        document.getElementById("p"+i).textContent = "";
        players[i].hand.sort(sortByProperty('numero'));
        for(j=0;j<players[i].hand.length;j++){
            var rb = document.createElement("INPUT");
            rb.setAttribute("type", "radio");
            rb.setAttribute("id", "rb_" + players[i].hand[j].cid);
            rb.setAttribute("name", "rb_p"+i);
            rb.setAttribute("numero", players[i].hand[j].numero);
            rb.setAttribute("value", players[i].hand[j].cid);
            rb.setAttribute("disabled", true);
            var lb = document.createElement("LABEL")
            lb.setAttribute("for", "rb_p"+i);
            lb.setAttribute("id", "lb_" + players[i].hand[j].cid);
            var t = document.createTextNode(players[i].hand[j].nombre +players[i].hand[j].simbolo + "   ");
            lb.appendChild(t);
            document.getElementById("p"+i).appendChild(rb);
            document.getElementById("p"+i).appendChild(lb);
        }
        //Aqui ponerla escondida si player != user
    }
}

function dar(i){
    var element_rb = document.querySelector('input[name="rb_p' + i + '"]:checked');
    var card_id = element_rb.value;
    element_rb.parentNode.removeChild(element_rb);
    var element_lb = document.getElementById("lb_"+card_id);
    element_lb.parentNode.removeChild(element_lb);
    var card = getCardFromId(card_id);
    var done = false;
    dadas[players[i].status]++;
    switch(players[i].status){
        case "presidente":
            winners[winners.length-1].hand.push(card);
            done = dadas[players[i].status] == 2;
            break;
        case "vicepresidente":
            winners[winners.length-2].hand.push(card);
            done = dadas[players[i].status] == 1;
            break;
        case "viceculo":
            winners[1].hand.push(card);
            done = dadas[players[i].status] == 1;
            break;
        case "culo":
            winners[0].hand.push(card);
            done = dadas[players[i].status] == 2;
            break;
        default:
            console.log("wtf? you're giving when you're a " + players[i].status);
            done = true;
            break;
    }
    if(done){
        document.getElementById("butt_dar_p"+i).disabled = true;
        document.getElementById("butt_dar_p"+i).setAttribute("style","display:none");
    }
    if(dadas.presidente == 2 && dadas.vicepresidente == 1 && dadas.viceculo == 1 && dadas.culo == 2){
        generate_cards_html();
        winners = [];
        dadas = {"presidente":"0","vicepresidente":"0","viceculo":"0","culo":"0"};
        clean_pot();
    }
}

function to_each_their_own(){
    console.log(winners);
    for(j=0;j<winners.length;j++){
        hand = document.getElementById("p"+j).children;
        if(winners[j].status != "peasant"){
            document.getElementById("butt_dar_p"+j).disabled = false;
            document.getElementById("butt_dar_p"+j).setAttribute("style","display:block");
            for(i=0;i<hand.length;i++){
                if(hand[i].type == "radio"){                
                    hand[i].disabled = false;    
                }
            }
        } else {
            document.getElementById("butt_dar_p"+j).disabled = true;
            document.getElementById("butt_dar_p"+j).setAttribute("style","display:none");
            for(i=0;i<hand.length;i++){
                if(hand[i].type == "radio"){                
                    hand[i].disabled = true;    
                }
            }
        }
        document.getElementById("butt_pass_p"+j).disabled = true;
        document.getElementById("butt_pass_p"+j).disabled = true;    
    }
}

function draw() {
    r = Math.floor(Math.random() * deck.cards.length);
    card = deck.cards.splice(r,1)[0];
    return card;
}
var sortByProperty = function (property) {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
};

function activate_turn(){
    var sin_opcion = true;
    var juego_muerto = true;
    var finished = true;
    for(j=0;j<players.length;j++){
        var show_ddl = pot[pot.length-1].cid == 0 && j == turno ? "block" : "none";
        document.getElementById("ddl_p" + j).style.display = show_ddl;
        hand = document.getElementById("p"+j).children;
        for(i=0;i<hand.length;i++){
            finished = false;
            if(hand[i].type == "radio" && players[j].passed == false){
                var card_number = getCardNumberFromId(hand[i].value);
                if(card_number >= pot[pot.length-1].numero){
                    juego_muerto = false;
                    if(j == turno ){
                        sin_opcion = false;
                        hand[i].disabled = false;
                    } else {
                        hand[i].disabled = true;
                    }
                } else {
                    hand[i].disabled = true;
                }
            }
        }
        //AQUI dependiente de cambios_terminados
        document.getElementById("butt_p"+j).disabled = (j!=turno);
        document.getElementById("butt_pass_p"+j).disabled = (j!=turno || players[j].passed);
    }
    activa_completa_poker();
    if(finished){
        console.log("Finished!");
        //inicio() tiene que ser != a deal, para configurar jugadores dinamicos y reglas
        deal();   
    } else if(last_played == turno){
        console.log("Pasaron todos");
        clean_pot();
    } else if(juego_muerto){
        console.log("Juego muerto");
        turno = (turno == 0) ? players.length - 1 : turno-1;
        clean_pot();
    } else if(sin_opcion){
        console.log("Sin opcion");
        pass_turn();
        activate_turn();
    }
}

function activa_completa_poker(){
    //AQUI mínimo poner 2, no?
    var c = pot.length - 1;
    var current_card = pot[c].numero;
    var amount = 0;
    while(c >= 0){
        if(pot[c].numero == current_card){
            amount++;
            c--;
        } else {
            c = -1;
        }
    }
    if(amount < 4){
        for(j=0;j<players.length;j++){
            var am_player = 0;
            for(i=0;i<players[j].hand.length;i++){
                if(players[j].hand[i].numero == current_card){
                    am_player++;
                }
            }
            //AQUI am_player chance <1 / <2 (si puedes completar poker con la ultima del poker)
            //AQUI condicion de no estar jugando con tercias
            document.getElementById("butt_poker_p"+j).disabled = (am_player + amount != 4 || am_player < (1+regla_min_2_completar) || players[j].passed);
        }
    }
}

function getCardFromId(card_id){
    for(i=0;i<players.length;i++){
        for(j=0;j<players[i].hand.length;j++){
            if(players[i].hand[j].cid == card_id){
                card = players[i].hand.splice(j,1)[0];
                return card
            }
        }
    }
}

function getCardNumberFromId(card_id){
    var num;// = 8;
    for(n=0;n<reference_deck.cards.length;n++){
        if(reference_deck.cards[n].cid == card_id){
            num = reference_deck.cards[n].numero;
        }
    }
    return num;
}

function pass_turn(){
    turno = ((turno+1)%players.length == 0) ? 0: turno+1;
    console.log("Sigue: " + turno);
}

function play(){
    if(amount_played == -1){
        amount_played = document.getElementById("ddl_p" + turno).value;
    }
    last_played = turno;
    var element_rb = document.querySelector('input[name="rb_p' + turno + '"]:checked');
    var card_id = element_rb.value;
    element_rb.parentNode.removeChild(element_rb);
    var element_lb = document.getElementById("lb_"+card_id);
    element_lb.parentNode.removeChild(element_lb);
    var card = getCardFromId(card_id);
    pot.push(card);
    if(players[turno].hand.length == 0){
        win(turno);
    }
    if(card.nombre == "2"){
        clean_pot();
    } else {
        document.getElementById("pot").innerHTML = card.nombre + card.simbolo;
        pass_turn();
        activate_turn();
    }
}

function clean_pot(){
    amount_played = -1;
    pot = [];
    pot.push(reference_deck.cards[0]);
    document.getElementById("pot").innerHTML = "_";
    for(i=0;i<players.length;i++){
        players[i].passed = false;
    }
    last_played = -1;
    activate_turn();
}

function getStatus(i){
    var status;
    switch(i) {
        case 0:
            status = "presidente";
            break;
        case 1:
            status = "vicepresidente";
            break;
        case players.length - 2:
            status = "viceculo";
            break;
        case players.length - 1:
            status = "culo";
            break;
        default:
            status = "peasant";
            break;
    }
    return status;
}

function win(play_num){
    players[play_num].status = getStatus(winners.length);
    winners.push(players[play_num]);
    players[play_num].score += (players.length-winners.length-1);
    console.log("Felicidades, " + players[play_num].name + "! Ahora eres " + players[play_num].status + " :D");
}

function play_poker(player_num){
    var current_card = pot[pot.length - 1].numero;
    for(i=players[player_num].hand.length-1;i>=0;i--){
        if(players[player_num].hand[i].numero == current_card){
            card = players[player_num].hand.splice(i,1)[0];
            pot.push(card);
            var card_id = card.cid;
            var element_rb = document.getElementById("rb_"+card_id);
            element_rb.parentNode.removeChild(element_rb);
            var element_lb = document.getElementById("lb_"+card_id);
            element_lb.parentNode.removeChild(element_lb);
        }
    }
    if(players[player_num].hand.length == 0){
        win(player_num);
    }
    turno = player_num;
    clean_pot();
}

function pass(){
    players[turno].passed = !regla_pass_solo_un_turno;
    pass_turn();
    activate_turn();
}
