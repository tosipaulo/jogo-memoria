function Api (){

  this.get = (url) => {

		return new Promise((resolve, reject) => {

			// instancia o objeto para requisição HTTP
			let xhr = new XMLHttpRequest();

			// requisição GET na lista de negociacoes da semana
			xhr.open('GET', url);

			// quando o estato do XMLHttpRequest mudar
			xhr.onreadystatechange = () => {
				/**
				 * STATUS DA REQUISIÇÃO
				 * 0: Requisição ainda não iniciada
				 * 1: conexão com o servidor estabelecida
				 * 2: requisição recebida
				 * 3: processando requisição
				 * 4: requisição concluida, e resposa pronta
				 */

				 // se a resposta do servidor
				 if (xhr.readyState == 4) {

				 	if (xhr.status == 200) {
				 		resolve(JSON.parse(xhr.responseText));
				 	} else {
				 		reject(xhr.responseText);
				 	}
				 }
			};

			// envia a requisição
			xhr.send();
		});
	}

}

















