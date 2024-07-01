window.onload = function() {

  //Pre-set de pontos de entrega usado pra testes
  /*let targets = [{
    latitude: '-19.852013',
    longitude: '-44.012110',
    },
  {
    latitude: '-19.941239',
    longitude: '-43.982718',
    },
  {
    latitude: '-20.000001',
    longitude: '-44.012110',
  },
   {
     latitude: '-19.912110',
     longitude: '-43.890139',
   }
  ];
  localStorage.setItem("targets", JSON.stringify(targets));*/

  var listaPontos = document.getElementById("listaPontos");
  var listaDatas = document.getElementById("listaDatas");
  let locaisCadastrados = JSON.parse(localStorage.getItem("targets"));

  if (locaisCadastrados) {
    exibePontosCadastrados(locaisCadastrados);
  }

  let datasCadastradas = localStorage.getItem("dates");

  if (datasCadastradas) {
    exibeDatasCadastradas(datasCadastradas);
  }
}

function cadastroPontoDeEntrega(event) {
  //event.preventDefault();
  let ruaAvenida = document.getElementById("ruaAvenida").value;
  let numero = document.getElementById("numero").value;
  let urlAPI = `https://geocode.maps.co/search?q=${"51+" + ruaAvenida.replaceAll(" ", "+") + "+" + numero + "+MG+BH+BR"}&api_key=6679ebf1819f1606414589yuvf4b3d7`;
  console.log(urlAPI);

  /*
  function success() {
    console.log(this.status);
    if (this.status !== 200) {
      console.log('Erro na requisição: ' + this.status);
      return;
    }*/

    fetch(urlAPI)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.length > 0) {
          let latitude = data[0].lat;
          let longitude = data[0].lon;

        let locaisCadastrados = JSON.parse(localStorage.getItem("targets"));

        if (locaisCadastrados) {
          locaisCadastrados.push({ latitude: latitude, longitude: longitude, endereco: ruaAvenida + ", " + numero });
          localStorage.setItem("targets", JSON.stringify(locaisCadastrados));
        }
        else {
          localStorage.setItem("targets", JSON.stringify([{ latitude: latitude, longitude: longitude, endereco: ruaAvenida + ", " + numero }]));
        }
        exibePontosCadastrados(locaisCadastrados);
        }
        else {
          alert("Endereço não encontrado em Belo Horizonte pela API.");
        }
  })

  /*
    if (resposta != []) {
      let latitude = resposta[0].lat;
      let longitude = resposta[0].lon;

      let locaisCadastrados = JSON.parse(localStorage.getItem("targets"));

      if (locaisCadastrados) {
        locaisCadastrados.push({ latitude: latitude, longitude: longitude, endereco: ruaAvenida + ", " + numero });
        localStorage.setItem("targets", JSON.stringify(locaisCadastrados));
      }
      else {
        localStorage.setItem("targets", JSON.stringify([{ latitude: latitude, longitude: longitude, endereco: ruaAvenida + ", " + numero }]));
      }
      exibePontosCadastrados(locaisCadastrados);
    }
    else {
      alert("Endereço não encontrado em Belo Horizonte pela API.");
    }
  }

  /*
  function error(err) {
    console.error('Erro na requisição:', err);
  }

  let xhr = new XMLHttpRequest();
  xhr.onload = success();
  xhr.onerror = error;
  xhr.open('GET', urlAPI);
  xhr.send();*/
}

function exibePontosCadastrados(locaisCadastrados) {
  for (i = 0; i < locaisCadastrados.length; i++) {
    let ponto = locaisCadastrados[i];
    let pontoDeEntrega = document.createElement("li");
    pontoDeEntrega.innerHTML = 'Latitude: ' + ponto.latitude + ' <br> Longitude: ' + ponto.longitude +  `<br> ${ponto.endereco} <br> <button type="button" class="btn btn-danger" onclick="deletaPontoDeEntrega(${i})">Deletar</button>`;
    listaPontos.appendChild(pontoDeEntrega);
  }
  listaPontos.style.display = "block";
}

function deletaPontoDeEntrega(id) {
  let locaisCadastrados = JSON.parse(localStorage.getItem("targets"));
  locaisCadastrados.splice(id, 1);
  if (locaisCadastrados.length) {
    localStorage.setItem("targets", JSON.stringify(locaisCadastrados));
  }
  else {
    localStorage.removeItem("targets");
  }
  location.reload();
}

function cadastroDataDeEntrega() {
  //event.preventDefault();
  let dataEntrega = document.getElementById("dataEntrega").value;
  let datasCadastradas = JSON.parse(localStorage.getItem("dates"));

  if (datasCadastradas) {
    datasCadastradas.push({ dataEntrega: dataEntrega });
    localStorage.setItem("dates", JSON.stringify(datasCadastradas));
  }
  else {
    localStorage.setItem("dates", JSON.stringify([{ dataEntrega: dataEntrega }]));
  }
  exibeDatasCadastradas();
}

function exibeDatasCadastradas() {
  let datasCadastradas = JSON.parse(localStorage.getItem("dates"));
  for (i = 0; i < datasCadastradas.length; i++) {
    let data = datasCadastradas[i];
    let dataDeEntrega = document.createElement("li");
    dataDeEntrega.innerHTML = 'Data: ' + data.dataEntrega.substring(8, 10) + "/" + data.dataEntrega.substring(5, 7) + "/" + data.dataEntrega.substring(0, 4) + `<br> <button type="button" class="btn btn-danger" onclick="deletaDataDeEntrega(${i})">Deletar</button>`;
    listaDatas.appendChild(dataDeEntrega);
  }
  listaDatas.style.display = "block";
}

function deletaDataDeEntrega(id) {
  console.log(id);
  let datasCadastradas = JSON.parse(localStorage.getItem("dates"));
  datasCadastradas.splice(id, 1);
  if (datasCadastradas.length) {
    localStorage.setItem("dates", JSON.stringify(datasCadastradas));
  }
  else {
    localStorage.removeItem("dates");
  }
  location.reload();
}