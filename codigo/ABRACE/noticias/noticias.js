var noticias = [
  {
    "titulonoticia": "Campanha Produto Solidário",
    "descricao": "Marcas apoiadoras repassam um percentual dos produtos participantes, adquiridos pelos consumidores apoiadores do projeto ABRACE. Com esta campanha ja arrecadamos o suficiente para doar cestas básicas a mais de 60 famílias. Contamos com a sua doação para ajudarmos cada vez mais.",
    "dataInicio": "20/06/2024",
    "dataFim": "27/08/2024",
    "urlImagem": "/assets/imgs/caixaAlimentos.png"
  },

  {
    "titulonoticia": "Campanha Natal Solidário",
    "descricao": "Doando alimentos e brinquedos você pode fazer o natal de alguém muito melhor. Dê este presente no Natal! Participe você também! Doando na campanha Natal Solidário ajudamos crianças carentes a terem seus sonhos realizados, somente no último ano, mais de 200 crianças foram atendidas com doações de calçados , roupas e brinquedos.",
    "dataInicio": "20/06/2024",
    "dataFim": "25/12/2024",
    "urlImagem": "/assets/imgs/MaosSegurando.png"
  },
  {
    "titulonoticia": "Campanha Voltas Ás Aulas",
    "descricao": "Todo ínicio de ano as crianças necessitam de todo apoio para começarem bem o ano letivo. Doe e ajude o projeto a beneficiar o retorno às aulas das crianças. No início de 2024, arrecadamos com a sua ajuda mais de 40 Kits de materiais escolares para crianças que não tinham condições para compra-los.",
    "dataInicio": "20/01/2024",
    "dataFim": "20/06/2024",
    "urlImagem": "/assets/imgs/amigosescola.png"
  },
];

var JsonNoticias = JSON.stringify(noticias);


if(localStorage.getItem('noticias') == null){
  localStorage.setItem("noticias", JsonNoticias);
}


var noticiasSalvas = localStorage.getItem("noticias");

// Converter a string JSON de volta para um array de objetos
if (noticiasSalvas) {
  var noticias = JSON.parse(noticiasSalvas);
} else {
  
  var noticias = [];
}

function submitForm() {
  // Pega os valores dos campos do formulário
  let tituloNoticia = document.getElementById("tituloNoticia").value;
  let descricaoNoticia = document.getElementById("descricaoNoticia").value;
  let urlImagem = document.getElementById("urlImagem").value;
  let dataInicio = document.getElementById("dataInicio").value;
  let dataFim = document.getElementById("dataFim").value;

  if(tituloNoticia == "" || descricaoNoticia == "" || urlImagem == "" || dataInicio ==  "" || dataFim == ""){
    alert("Preencha todos os campos!");
    
  }

  else{
    var noticia = {
        titulonoticia: tituloNoticia,
        descricao: descricaoNoticia,
        dataInicio: dataInicio,
        dataFim: dataFim,
        urlImagem: urlImagem

      };

      noticias.push(noticia);

      localStorage.setItem("noticias", JSON.stringify(noticias));


    alert("Notícia cadastrada com sucesso!");
      mostrarNoticias();
    }
  }
  

function mostrarNoticias() {
  const tela = document.getElementById('tela');
  tela.innerHTML = ''; // Limpar o conteúdo anterior
   

  const noticiasSalvas = JSON.parse(localStorage.getItem("noticias"));
  noticiasSalvas.forEach(noticia => {
    const card = document.createElement('div');
    card.classList.add('col');

    card.innerHTML = `
      <div class="container">
        <div class="row">
          <div class="col-g-3">
            <img src="${noticia.urlImagem}" class="imagemNoticia">
            <h4 class="corTextoNoticia">${noticia.titulonoticia}</h4>
            <p class="pcenterNoticia">${noticia.descricao}</p>
            <p class="pcenterNoticiaData">Data de Início: ${noticia.dataInicio}</p>
            <p class="pcenterNoticiaData">Data de Fim: ${noticia.dataFim}</p>
          </div>
        </div>
      </div>
    `;

    tela.appendChild(card);
  });
}
//Quando for Admin , aparece o formulário na tela;
let cadastroNoticia = document.getElementById("formNoticia");
const admOnoticia = JSON.parse(localStorage.getItem('admOn'));
if (admOnoticia) {
  cadastroNoticia.style.display = 'block';
}

// Exibir as noticias na tela quando a página é carregada
document.addEventListener('DOMContentLoaded', mostrarNoticias);

