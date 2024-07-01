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


var db_Campanhas = {};

var campanhasCorrente = {};

// função para gerar códigos randômicos a serem utilizados como código de usuário
function generateUUID() {
  var d = new Date().getTime();
  var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

const campanhasIniciais = {
  campanhas: [
    { "id": generateUUID(), 
      "titulo": "Produto Solidário ", 
      "dataInicio": "20/06", 
      "dataFim": "27/08", 
      "descricao": "Marcas apoiadoras repassam um percentual dos produtos participantes, adquiridos pelos consumidores apoiadores do projeto ABRACE." },
    { "id": generateUUID(), 
      "titulo": "Natal Solidário", 
      "dataInicio": "20/06", 
      "dataFim": "27/07", 
      "descricao": "Doando alimentos e brinquedos você pode fazer o natal de alguém muito melhor. Dê este presente no Natal! Participe você também!" },
    { "id": generateUUID(), 
      "titulo": "Volta às Aulas", 
      "dataInicio": "20/06", 
      "dataFim": "27/07", 
      "descricao": "Todo ínicio de ano as crianças necessitam de todo apoio para começarem bem o ano letivo. Doe e ajude o projeto a beneficiar o retorno às aulas das crianças." },
  ]
};

function initLoginCampanha() {

  campanhasCorrenteJSON = sessionStorage.getItem('campanhasCorrente');
  if (campanhasCorrenteJSON) {
    campanhasCorrenteJSON = JSON.parse(campanhasCorrenteJSON);
  }

  var campanhasCorrenteJSON = localStorage.getItem('db_Campanhas');

  if (!campanhasCorrenteJSON) { 

    alert('Dados de usuários não encontrados no localStorage. \n -----> Fazendo carga inicial.');

    db_Campanhas = campanhasIniciais;

    localStorage.setItem('db_Campanhas', JSON.stringify(campanhasIniciais));
  }
  else { 
    db_Campanhas = JSON.parse(campanhasCorrenteJSON);
  }
};

function cadastroCampanha(titulo, dataInicio, dataFim, descricao) {
  for (var i = 0; i < db_Campanhas.campanhas.length; i++) {

    var campanha = db_Campanhas.campanhas[i];

    if (titulo == campanha.titulo && dataInicio == campanha.dataInicio && dataFim == campanha.dataFim && descricao == campanha.descricao) {
      campanhasCorrente.id = campanha.id;
      campanhasCorrente.titulo = campanha.titulo;
      campanhasCorrente.dataInicio = campanha.dataInicio;
      campanhasCorrente.dataFim = campanha.dataFim;
      campanhasCorrente.descricao = campanha.descricao;

      sessionStorage.setItem('campanhasCorrente', JSON.stringify(campanhasCorrente));
    }
  }
}
initLoginCampanha();