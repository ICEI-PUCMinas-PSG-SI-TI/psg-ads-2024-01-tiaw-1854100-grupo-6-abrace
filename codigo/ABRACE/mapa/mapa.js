window.onload = function() {
    // Where you want to render the map.
    var elementoMapa = document.getElementById('map');
    
    // Height has to be set. You can do this in CSS too.
    elementoMapa.style.height = '300px';

    // Create Leaflet map on map element.
    var map = L.map(elementoMapa);

    // Add OSM tile layer to the Leaflet map.
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Target's GPS coordinates.
    let centroMapa = { latitude: '-19.912998', longitude: '-43.940933' };

  // Place a marker on the same location.
  // L.marker(target).addTo(map);

  localStorage.setItem("centroMapa", JSON.stringify(centroMapa));
    
  // Centaliza o mapa em BH com zoom de 11
  // target = L.latLng('-19.912998', '-43.940933');
  
  map.setView(L.latLng(JSON.parse(localStorage.getItem("centroMapa")).latitude, JSON.parse(localStorage.getItem("centroMapa")).longitude), 11);
  
  marcaLocais(map);

  carregaCalendario();
}

marcaLocais = function (map) {
  let targets = JSON.parse(localStorage.getItem("targets"));
  
  if(targets){
    for(let i = 0; i < targets.length; i++){
        L.marker(L.latLng(targets[i].latitude, targets[i].longitude)).addTo(map);
    }
  }
}

carregaCalendario = function() {
  let data = new Date();
  let primeiroDiaMesAtual = new Date(data.getFullYear(), data.getMonth(), 1);
  let primeiroDiaProxMes = new Date(data.getFullYear(), data.getMonth() + 1, 1);
  let ultimoDiaMesAtual = new Date(data.getFullYear(), data.getMonth() + 1, 0);
  let ultimoDiaProxMes = new Date(ultimoDiaMesAtual.getFullYear(), ultimoDiaMesAtual.getMonth() + 2, 0);
  let elementoCalendario = document.getElementById('calendario');
  let diasEntregas = JSON.parse(localStorage.getItem("dates"));
  let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho","Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  // Cria o calendário do mês atual
  let calendarioHTML = `<table>
                          <thead> <tr> <th> Dom </th> 
                                       <th> Seg </th> 
                                       <th> Ter </th> 
                                       <th> Qua </th> 
                                       <th> Qui </th> 
                                       <th> Sex </th> 
                                       <th> Sáb </th> </tr> </thead>`;

  let dias;
  switch(primeiroDiaMesAtual.getDay()){
    case 0:
      calendarioHTML += `<tbody> <tr> <td> 1 </td> 
                                      <td> 2 </td> 
                                      <td> 3 </td> 
                                      <td> 4 </td> 
                                      <td> 5 </td> 
                                      <td> 6 </td>
                                      <td> 7 </td> </tr>`;
      dias = 8;
      break;
    case 1:
      calendarioHTML += `<tbody> <tr> <td> </td> 
                                      <td> 1 </td> 
                                      <td> 2 </td> 
                                      <td> 3 </td> 
                                      <td> 4 </td> 
                                      <td> 5 </td>
                                      <td> 6 </td> </tr>`;
      dias = 7;
      break;
    case 2:
      calendarioHTML += `<tbody> <tr> <td> </td> 
                                      <td> </td> 
                                      <td> 1 </td> 
                                      <td> 2 </td> 
                                      <td> 3 </td> 
                                      <td> 4 </td>
                                      <td> 5 </td> </tr>`;
      dias = 6;
      break;
    case 3:
      calendarioHTML += `<tbody> <tr> <td> </td> 
                                      <td> </td> 
                                      <td> </td> 
                                      <td> 1 </td> 
                                      <td> 2 </td> 
                                      <td> 3 </td>
                                      <td> 4 </td> </tr>`;
      dias = 5;
      break;
    case 4:
      calendarioHTML += `<tbody> <tr> <td> </td> 
                                      <td> </td> 
                                      <td> </td> 
                                      <td> </td> 
                                      <td> 1 </td> 
                                      <td> 2 </td>
                                      <td> 3 </td> </tr>`;
      dias = 4;
      break;
    case 5:
      calendarioHTML += `<tbody> <tr> <td> </td> 
                                      <td> </td> 
                                      <td> </td> 
                                      <td> </td> 
                                      <td> </td> 
                                      <td> 1 </td>
                                      <td> 2 </td> </tr>`;
      dias = 3;
      break;
    case 6:
      calendarioHTML += `<tbody> <tr> <td> </td> 
                                      <td> </td> 
                                      <td> </td> 
                                      <td> </td> 
                                      <td> </td> 
                                      <td> </td>
                                      <td> 1 </td> </tr>`;
      dias = 2;
      break;
  }


  while(dias <= ultimoDiaMesAtual.getDate()){
    calendarioHTML += `<tr>`;
    for(let i = 0; i < 7; i++){
      if(dias <= ultimoDiaMesAtual.getDate()){
        calendarioHTML += `<td> ${dias} </td>`;
      }
      else{
        calendarioHTML += `<td> </td>`;
      }
      dias++;
    }
    calendarioHTML += `</tr>`;
  }

  calendarioHTML += `</tbody> </table>
                      <br>
                      <div class="carousel-caption d-md-block">
                        <h5> ${meses[ultimoDiaMesAtual.getMonth()]} - ${ultimoDiaMesAtual.getFullYear()} </h5>
                      </div>`;

  elementoCalendario.innerHTML = calendarioHTML;
  
  diasDoMes = document.querySelectorAll("#calendario td");
  
  for(let i = 0; i < diasDoMes.length; i++){
    if(diasEntregas){
      for(let j = 0; j < diasEntregas.length; j++){
        if(diasDoMes[i].firstChild.nodeValue == Number.parseFloat(diasEntregas[j].dataEntrega.substring(8, 10)) && (ultimoDiaMesAtual.getMonth() + 1) == Number.parseFloat(diasEntregas[j].dataEntrega.substring(5, 7)) && !(isNaN(diasDoMes[i].firstChild.nodeValue)) && diasDoMes[i].firstChild.nodeValue != " "){
            diasDoMes[i].classList.add("marcado");
          }
        }
    }
  }
  
  // Cria o calendário do mês seguinte
  elementoCalendarioProx = document.getElementById("calendarioProx");
  calendarioHTML = `<table>
                          <thead> <tr> <th> Dom </th> 
                                       <th> Seg </th> 
                                       <th> Ter </th> 
                                       <th> Qua </th> 
                                       <th> Qui </th> 
                                       <th> Sex </th> 
                                       <th> Sáb </th> </tr> </thead>`;

  switch(primeiroDiaProxMes.getDay()){
    case 0:
      calendarioHTML += `<tbody> <tr> <td> 1 </td> 
                                      <td> 2 </td> 
                                      <td> 3 </td> 
                                      <td> 4 </td> 
                                      <td> 5 </td> 
                                      <td> 6 </td>
                                      <td> 7 </td> </tr>`;
      dias = 8;
      break;
    case 1:
      calendarioHTML += `<tbody> <tr> <td> </td> 
                                      <td> 1 </td> 
                                      <td> 2 </td> 
                                      <td> 3 </td> 
                                      <td> 4 </td> 
                                      <td> 5 </td>
                                      <td> 6 </td> </tr>`;
      dias = 7;
      break;
    case 2:
      calendarioHTML += `<tbody> <tr> <td> </td> 
                                      <td> </td> 
                                      <td> 1 </td> 
                                      <td> 2 </td> 
                                      <td> 3 </td> 
                                      <td> 4 </td>
                                      <td> 5 </td> </tr>`;
      dias = 6;
      break;
    case 3:
      calendarioHTML += `<tbody> <tr> <td> </td> 
                                      <td> </td> 
                                      <td> </td> 
                                      <td> 1 </td> 
                                      <td> 2 </td> 
                                      <td> 3 </td>
                                      <td> 4 </td> </tr>`;
      dias = 5;
      break;
    case 4:
      calendarioHTML += `<tbody> <tr> <td> </td> 
                                      <td> </td> 
                                      <td> </td> 
                                      <td> </td> 
                                      <td> 1 </td> 
                                      <td> 2 </td>
                                      <td> 3 </td> </tr>`;
      dias = 4;
      break;
    case 5:
      calendarioHTML += `<tbody> <tr> <td> </td> 
                                      <td> </td> 
                                      <td> </td> 
                                      <td> </td> 
                                      <td> </td> 
                                      <td> 1 </td>
                                      <td> 2 </td> </tr>`;
      dias = 3;
      break;
    case 6:
      calendarioHTML += `<tbody> <tr> <td> </td> 
                                      <td> </td> 
                                      <td> </td> 
                                      <td> </td> 
                                      <td> </td> 
                                      <td> </td>
                                      <td> 1 </td> </tr>`;
      dias = 2;
      break;
  }


  while(dias <= ultimoDiaProxMes.getDate()){
    calendarioHTML += `<tr>`;
    for(let i = 0; i < 7; i++){
      if(dias <= ultimoDiaMesAtual.getDate()){
        calendarioHTML += `<td> ${dias} </td>`;
      }
      else{
        calendarioHTML += `<td> </td>`;
      }
      dias++;
    }
    calendarioHTML += `</tr>`;
  }

  calendarioHTML += `</tbody> </table>
                      <br>
                      <div class="carousel-caption d-md-block">
                        <h5> ${meses[ultimoDiaProxMes.getMonth()]} - ${ultimoDiaProxMes.getFullYear()} </h5>
                      </div>`;
  
  elementoCalendarioProx.innerHTML = calendarioHTML;

  diasDoProxMes = document.querySelectorAll("#calendarioProx td");
  
  for(let i = 0; i < diasDoProxMes.length; i++){
    if(diasEntregas){
      for(let j = 0; j < diasEntregas.length; j++){
        if(diasDoProxMes[i].firstChild.nodeValue == Number.parseFloat(diasEntregas[j].dataEntrega.substring(8, 10)) && (ultimoDiaProxMes.getMonth() + 1) == Number.parseFloat(diasEntregas[j].dataEntrega.substring(5, 7)) && !(isNaN(diasDoProxMes[i].firstChild.nodeValue)) && diasDoProxMes[i].firstChild.nodeValue != " "){
              diasDoProxMes[i].classList.add("marcado");
        }
      }
    }
  } 

  let botoesCarrossel = document.getElementsByClassName("botaoCarrossel");
  for(let i = 0; i < botoesCarrossel.length; i++){
    botoesCarrossel[i].addEventListener("click", function() {
      elementoCalendario.classList.toggle("visivel");
      elementoCalendarioProx.classList.toggle("visivel");
      elementoCalendario.classList.toggle("invisivel");
      elementoCalendarioProx.classList.toggle("invisivel");
    });
  }
}