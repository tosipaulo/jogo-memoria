let Card = (function(){
	'use strict'

	const api = new Api();

	/* função para selecão */	
	const $ = (el) => document.querySelector(el);
	const cards = []

	/*****************************************************/
	/* Variaveis */
	/*****************************************************/
	const containerCard = $('.game__card');
	const urlApi = 'http://localhost:1111/db'

	/*****************************************************/
	/* Templates */
  /*****************************************************/
	const markupCard = (data) => {
		return data.map(item => `
			<div class="card" data-id="${item.data}">
				<div class="face back"></div>
				<div class="face front" style="background: url(${item.image}) no-repeat;"></div>
			</div>
		`).join('')
	}

	/*****************************************************/
	/* REQUESICAO */
  /*****************************************************/
	const buscarCards = () => {
		api.get(`${urlApi}`)
			.then((card) => {
				card.data.map((item) => cards.push(item))
				if(cards.length <= 12) cards.map((item) => cards.push(item))
				shuffle(cards);
			})
			.then(initRenderCards)
			.then(flipCard);
	}

	
	/*****************************************************/
	/* FNs */
	/*****************************************************/
	const shuffle = (a) => {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
	}	

  const renderTemplate = (data, element, templateMarkup) => {
    const markup = templateMarkup(data)
    element.innerHTML = markup;
	}
	
	const initRenderCards = () => {
		renderTemplate(cards, containerCard, markupCard)
	}
	

	const flipCard = () => {
		let card = document.querySelectorAll('.card');

		card.forEach((el) => {
			el.addEventListener('click', function(){
				selectCard(el)
			})
		})
		
	}

	const selectCard = (el) => {
		let select = document.querySelectorAll('.flipped');

		if(select.length < 2) toogleClassFlip(el);
		
		if(select.length == 1) setTimeout(checkPattern,1000);

	}

	const toogleClassFlip = (el) => {
		el.classList.toggle('flipped');
		el.classList.toggle('active');
	}

	const checkPattern = () => {
		let select = document.querySelectorAll('.flipped');
		let cardAll = document.querySelectorAll('.card');

		

		if(isMatchPattern(select)){
			select.forEach((el) => {
				//el.style.opacity = '0.0'
				el.classList.add('remove');
				el.classList.remove('flipped');
				el.classList.remove('active');
				countClassRemove()
			})

		}else{
			cardAll.forEach((el) => {
				el.classList.remove('flipped');
				el.classList.remove('active');
			})
		}
		
	}

	const isMatchPattern = (select) => select[0].getAttribute('data-id') == select[1].getAttribute('data-id')
	
	const countClassRemove  = () => {
		let cardRemove = document.querySelectorAll('.card.remove')
		if(cardRemove.length >= 24) 
			console.log('final')
	}

/* 	function selectCard() {
		if ($(".card-flipped").size() > 1) {
			return;
		}
		$(this).addClass("card-flipped");

		if ($(".card-flipped").size() == 2) {
			setTimeout(checkPattern,1000);
		}
	} */

	/*var card = document.querySelector('.card');
	var contentCard = document.querySelector('.game__card');

	card.addEventListener('click', flipCard, false)

	function flipCard() {
		card.classList.toggle('flipped');
	}

	var templateCard = [
		'<div class="card">',
          '<div class="face back"></div>',
          '<div class="face front"></div>',
        '</div>',
	].join('');

	for(var i = 0; i <= 24; i++ ) {
		contentCard.appendChild(templateCard);
	}*/

	/* var card = $('.card');
	var containerCard = $('.game__card');

	var templateCard = [
		'<div class="card">',
          '<div class="face back"></div>',
          '<div class="face front"></div>',
        '</div>',
	].join('');

	for(var i = 0; i < 24; i++ ) {
		containerCard.append(templateCard);
	}

	containerCard.on('click', '.card', function(){
		console.log("clicou")
		$(this).toggleClass('flipped active');
	}) */

	const init = () => {
		initRenderCards();
		buscarCards();
	}

	return {
		init: init
	}

})();

Card.init()