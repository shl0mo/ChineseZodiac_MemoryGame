let globais = {
	j: 1,
	cartas_viradas: document.getElementsByClassName('virada'),
};

let imagens_internas = [];
imagens_internas.push("0");


for (let i = 1; i <= 24; i++) {
	if (i == 13) {
		globais.j = 1;
	}
	let img = {
		src: "img/" + i + ".png",
		id: globais.j,
	};
	globais.j++;
	imagens_internas.push(img);
}

function embaralha_cartas(cartas_ordenadas) {
	let cartas_embaralhadas = [];
	cartas_embaralhadas.push("0");
	while (cartas_embaralhadas.length != 25) {
		let i = Math.floor(Math.random()*cartas_ordenadas.length);
		let tem_card = false;
		for (let j = 0; j < cartas_embaralhadas.length; j++) {
			if (cartas_embaralhadas[j].src == cartas_ordenadas[i].src) {
				tem_card = true;
			}
		}
		if (tem_card == false) {
			cartas_embaralhadas.push(cartas_ordenadas[i]);
		}
	}
	return cartas_embaralhadas;
}

function adiciona_evento_clique() {
	let cartas = document.getElementsByClassName('carta');
	for (let i = 0; i < cartas.length; i++) {
		cartas[i].addEventListener('click', vira_carta, false);
		cartas[i].setAttribute('draggable','false');
		cartas[i].children[0].setAttribute('draggable','false');
	}
}

function cria_meu_principal() {
	let  img_back_inicio = document.createElement('img');
	img_back_inicio.setAttribute('src', 'img/back.png');
	img_back_inicio.id = 'img-back-inicio';
	document.getElementById('tela').appendChild(img_back_inicio);
	let box_inicio = document.createElement('div');
	box_inicio.className = 'box-inicio';
	box_inicio.id = 'inicio';
	document.getElementById('tela').appendChild(box_inicio);
	let img_titulo = document.createElement('img');
	let container_botoes = document.createElement('div');
	container_botoes.className = 'container-botoes';
	container_botoes.id = 'botoes';
	box_inicio.appendChild(container_botoes);
	let botao_jogar = document.createElement('button');
	botao_jogar.className = 'botao-jogar botao';
	botao_jogar.setAttribute('onclick', 'jogar()');
	botao_jogar.innerHTML = 'Jogar';
	container_botoes.appendChild(botao_jogar);
}

function verifica_cartas() {
	globais.cartas_viradas = document.getElementsByClassName('virada');
	if (globais.cartas_viradas.length == 4) {
		let id = globais.cartas_viradas[1].id;
		if (globais.cartas_viradas[1].id == globais.cartas_viradas[3].id ) {
			$('#tela').removeAttr('onclick');
			let carta_1_costas = globais.cartas_viradas[0];
			let carta_1_frente = globais.cartas_viradas[1];
			let carta_2_costas = globais.cartas_viradas[2];
			let carta_2_frente = globais.cartas_viradas[3];
			carta_1_frente.parentNode.removeEventListener('click',vira_carta,false);
			carta_2_frente.parentNode.removeEventListener('click',vira_carta,false);
			let id = globais.cartas_viradas[1].id;
			setTimeout(function() {
				carta_1_frente.parentNode.style.visibility = 'hidden';
				carta_2_frente.parentNode.style.visibility = 'hidden';
				carta_1_frente.parentNode.setAttribute('class', 'carta ok');
				carta_2_frente.parentNode.setAttribute('class', 'carta ok');
				carta_1_costas.setAttribute('class', 'lado');
				carta_1_frente.setAttribute('class', 'lado');
				carta_2_costas.setAttribute('class', 'lado');
				carta_2_frente.setAttribute('class', 'lado');
				globais.cartas_viradas = document.getElementsByClassName("nao_existe");
				document.getElementById('tela').setAttribute('onclick', 'verifica_cartas()');
				let encontrados = document.getElementsByClassName("ok");
				if (encontrados.length == 24) {
					let fundo_fim_jogo = document.createElement('img');
					fundo_fim_jogo.id = 'img-back-fim';
					fundo_fim_jogo.src = 'img/back_endgame.png';
					document.getElementById('tela').appendChild(fundo_fim_jogo);
					let div_fim_jogo = document.createElement('div');
					div_fim_jogo.id = 'container-fim-jogo';
					div_fim_jogo.className = 'container-fim-jogo';
					document.getElementById('tela').appendChild(div_fim_jogo);
					mensagem_final = document.createElement('h1');
					mensagem_final.id = 'mensagem_final';
					div_fim_jogo.appendChild(mensagem_final);
					document.getElementById('mensagem_final').innerHTML = "Fim de jogo";
					let botao_menu = document.createElement('button');
					botao_menu.className = 'botao-volta-menu botao';
					botao_menu.id = 'botao-volta-menu';
					botao_menu.setAttribute('onclick', 'volta_menu()');
					div_fim_jogo.appendChild(botao_menu);
					document.getElementById('botao-volta-menu').innerHTML = "Início";
				}
			}, 1250);
		} else {
			function desvira_cartas() {
				while (globais.cartas_viradas.length != 0) {
					globais.cartas_viradas[0].parentNode.addEventListener('click',vira_carta,false);
					globais.cartas_viradas[0].classList.toggle('virada');
				}
			}
			setTimeout(desvira_cartas, 1450);
		}
	}
}

function eventos_cartas() {
	imagens_internas = embaralha_cartas(imagens_internas);
	let frente_cards = document.getElementsByClassName('frente');
	let j = 0;
	for (let i = 1; i <= 24; i++) {
		frente_cards[j].style.backgroundImage = "url('" + imagens_internas[i].src + "')";
		frente_cards[j].setAttribute('draggable','false');
		frente_cards[j].setAttribute('id', imagens_internas[i].id);
		j++;
	}
	adiciona_evento_clique();
}

function vira_carta() {
	let lados = this.getElementsByClassName('lado');
	id = lados[0].parentNode.id;
	num_id = id.split('-')[1];
	if (globais.cartas_viradas.length < 4) {
		lados[0].classList.toggle('virada');
		lados[1].classList.toggle('virada');
		document.getElementById(id).removeEventListener('click',vira_carta,false);
	}
}

function jogar() {
	document.getElementById('tela').style.backgroundColor = 'white';
	$('#inicio').hide(150);
	$('.tela img').hide(150);
	setTimeout(function() {
		$('#inicio').remove();
		let box_jogo = document.createElement('div');
		box_jogo.className = 'box-jogo';
		box_jogo.id = 'jogo';
		document.getElementById('tela').appendChild(box_jogo);
		for (let i = 1; i <= 24; i++) {
			let carta = document.createElement('div');
			carta.className = 'carta';
			carta.id = 'carta-' + i;
			box_jogo.appendChild(carta);
			let costas = document.createElement('div');
			costas.className = 'lado costas';
			carta.appendChild(costas);
			let frente = document.createElement('div');
			frente.className = 'lado frente';
			carta.appendChild(frente);
		}
		eventos_cartas();
	}, 100);
}

function volta_menu() {
	$('.box-jogo').hide();
	$('.box-jogo').remove();
	cria_meu_principal();
	$('.container-fim-jogo').remove();
}