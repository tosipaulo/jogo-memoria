(function(){
	'use strict'

	var card = document.querySelector('.card');
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
	}

})()