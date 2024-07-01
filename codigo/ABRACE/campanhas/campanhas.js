var campanhas = [
  {
    "id": "1",
    "titulo": "Campanha Produto Solidário ",
    "descricao": "Marcas apoiadoras repassam um percentual dos produtos participantes, adquiridos pelos consumidores apoiadores do projeto ABRACE.",
    "dataInicio": "20/06/2024",
    "dataFim": "27/08/2024",
  },
  {
    "id": "2",
    "titulo": "Campanha Natal Solidário ",
    "descricao": "Doando alimentos e brinquedos você pode fazer o natal de alguém muito melhor. Dê este presente no Natal! Participe você também!",  
    "dataInicio": "20/06/2024",
    "dataFim": "27/08/2024",
  },
  {
    "id": "3",
    "titulo": "Campanha Volta às Aulas ",
    "descricao": "Todo ínicio de ano as crianças   necessitam de todo apoio para começarem bem o ano letivo. Doe e ajude o projeto a beneficiar o retorno às aulas das crianças.",
    "dataInicio": "20/06/2024",
    "dataFim": "27/08/2024",
  },
  
]


var tela = document.getElementById('tela');

var cards = '';

for(var i = 0; i < campanhas.length; i++){
  let card = campanhas[i];

  cards += `<div class="col">
          <div class="card campanha h-100">
            <div class="corTexto">
              <div class="card-body">
                <h5 class="card-title">${card.titulo}</h5>
                <p class="textoCampanha">${card.descricao}</p>
                <a href="../doacoes/doacoes.html" class="botaodacampanha">Doe Agora!</a>
                <a href="../cadastro/cadastro.html" class="botaodacampanha">Seja Voluntário</a>
              </div>
            </div>
          </div>
        </div>`
}
tela.innerHTML = cards;
localStorage.setItem('br', JSON.stringify(campanhas))



