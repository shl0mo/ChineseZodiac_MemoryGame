let globals = {
	j: 1,
	face_up_cards: document.getElementsByClassName('face_up'),
};

let imgs_faces = [];
imgs_faces.push('0');


for (let i = 1; i <= 24; i++) {
	if (i == 13) {
		globals.j = 1;
	}
	let img = {
		src: 'img/' + i + '.png',
		id: globals.j,
	};
	globals.j++;
	imgs_faces.push(img);
}

function shuffle(unshuffled_cards) {
	let shuffled_cards = [];
	shuffled_cards.push("0");
	while (shuffled_cards.length != 25) {
		let i = Math.floor(Math.random()*unshuffled_cards.length);
		let have_card = false;
		for (let j = 0; j < shuffled_cards.length; j++) {
			if (shuffled_cards[j].src == unshuffled_cards[i].src) {
				have_card = true;
			}
		}
		if (have_card == false) {
			shuffled_cards.push(unshuffled_cards[i]);
		}
	}
	return shuffled_cards;
}

function add_click_event() {
	let cards = document.getElementsByClassName('card');
	for (let i = 0; i < cards.length; i++) {
		cards[i].addEventListener('click', turn_card, false);
		cards[i].setAttribute('draggable','false');
		cards[i].children[0].setAttribute('draggable','false');
	}
}

function create_main_menu() {
	let  img_back_menu = document.createElement('img');
	img_back_menu.setAttribute('src', 'img/back.png');
	img_back_menu.id = 'img-back-menu';
	document.getElementById('canva').appendChild(img_back_menu);
	let box_menu = document.createElement('div');
	box_menu.className = 'box-menu';
	box_menu.id = 'id-box-menu';
	document.getElementById('canva').appendChild(box_menu);
	let container_buttons = document.createElement('div');
	container_buttons.className = 'container-buttons';
	container_buttons.id = 'id-container-buttons';
	box_menu.appendChild(container_buttons);
	let play_button = document.createElement('button');
	play_button.className = 'play-button button';
	play_button.setAttribute('onclick', 'play()');
	play_button.innerHTML = 'Play';
	container_buttons.appendChild(play_button);
}

function verify_cards() {
	globals.face_up_cards = document.getElementsByClassName('face_up');
	if (globals.face_up_cards.length == 4) {
		let id = globals.face_up_cards[1].id;
		if (globals.face_up_cards[1].id == globals.face_up_cards[3].id) {
			$('#canva').removeAttr('onclick');
			let card_1_back = globals.face_up_cards[0];
			let card_1_front = globals.face_up_cards[1];
			let card_2_back = globals.face_up_cards[2];
			let card_2_front = globals.face_up_cards[3];
			card_1_front.parentNode.removeEventListener('click',turn_card,false);
			card_2_front.parentNode.removeEventListener('click',turn_card,false);
			//let id = globals.face_up_cards[1].id;
			setTimeout(function() {
				card_1_front.parentNode.style.visibility = 'hidden';
				card_2_front.parentNode.style.visibility = 'hidden';
				card_1_front.parentNode.setAttribute('class', 'card ok');
				card_2_front.parentNode.setAttribute('class', 'card ok');
				card_1_back.setAttribute('class', 'side');
				card_1_front.setAttribute('class', 'side');
				card_2_back.setAttribute('class', 'side');
				card_2_front.setAttribute('class', 'side');
				globals.face_up_cards = document.getElementsByClassName('doesnt_exists');
				document.getElementById('canva').setAttribute('onclick', 'verify_cards()');
				let found = document.getElementsByClassName('ok');
				if (found.length == 24) {
					let back_end_game = document.createElement('img');
					back_end_game.id = 'img-back-fim';
					back_end_game.src = 'img/back_endgame.png';
					document.getElementById('canva').appendChild(back_end_game);
					let div_end_game = document.createElement('div');
					div_end_game.id = 'container-end-game';
					div_end_game.className = 'container-end-game';
					document.getElementById('canva').appendChild(div_end_game);
					final_message = document.createElement('h1');
					final_message.id = 'final-message';
					div_end_game.appendChild(final_message);
					document.getElementById('final-message').innerHTML = 'Game Over';
					let menu_button = document.createElement('button');
					menu_button.className = 'button-back-menu button';
					menu_button.id = 'button-back-menu';
					menu_button.setAttribute('onclick', 'back_to_menu()');
					div_end_game.appendChild(menu_button);
					document.getElementById('button-back-menu').innerHTML = 'Main Menu';
				}
			}, 1250);
		} else {
			function turn_over_cards() {
				while (globals.face_up_cards.length != 0) {
					globals.face_up_cards[0].parentNode.addEventListener('click',turn_card,false);
					globals.face_up_cards[0].classList.toggle('face_up');
				}
			}
			setTimeout(turn_over_cards, 1450);
		}
	}
}

function cards_events() {
	imgs_faces = shuffle(imgs_faces);
	let front_cards = document.getElementsByClassName('front');
	let j = 0;
	for (let i = 1; i <= 24; i++) {
		front_cards[j].style.backgroundImage = "url('" + imgs_faces[i].src + "')";
		front_cards[j].setAttribute('draggable','false');
		front_cards[j].setAttribute('id', imgs_faces[i].id);
		j++;
	}
	add_click_event();
}

function turn_card() {
	let sides = this.getElementsByClassName('side');
	id = sides[0].parentNode.id;
	num_id = id.split('-')[1];
	if (globals.face_up_cards.length < 4) {
		sides[0].classList.toggle('face_up');
		sides[1].classList.toggle('face_up');
		document.getElementById(id).removeEventListener('click',turn_card,false);
	}
}

function play() {
	document.getElementById('canva').style.backgroundColor = 'white';
	$('#id-box-menu').hide(150);
	$('.canva img').hide(150);
	setTimeout(function() {
		$('#start').remove();
		let box_game = document.createElement('div');
		box_game.className = 'box-game';
		box_game.id = 'game';
		document.getElementById('canva').appendChild(box_game);
		for (let i = 1; i <= 24; i++) {
			let card = document.createElement('div');
			card.className = 'card';
			card.id = 'card-' + i;
			box_game.appendChild(card);
			let back = document.createElement('div');
			back.className = 'side back';
			card.appendChild(back);
			let front = document.createElement('div');
			front.className = 'side front';
			card.appendChild(front);
		}
		cards_events();
	}, 100);
}

function back_to_menu() {
	$('.box-game').hide();
	$('.box-game').remove();
	create_main_menu();
	$('.container-end-game').remove();
}