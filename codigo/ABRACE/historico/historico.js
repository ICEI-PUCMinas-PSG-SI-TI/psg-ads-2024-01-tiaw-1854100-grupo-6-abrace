//Função para ler os dados do localStorage e retornar as doações do usuário logado
function lerDados() {
    return new Promise((resolve, reject) => {
        //Recuperar usuário logado do localStorage
        var usuarioOn = JSON.parse(localStorage.getItem('usuarioOn'));

        //Determinar qual chave do localStorage acessar com base no tipo de usuário
        var chaveLocalStorage;
        switch (usuarioOn.tipo) {
            case 'Doador':
                chaveLocalStorage = 'doadores';
                break;
            case 'Voluntário':
                chaveLocalStorage = 'voluntarios';
                break;
            case 'Beneficiário':
                chaveLocalStorage = 'usuarios';
                break;
            default:
                reject(new Error('Tipo de usuário inválido.'));
                return;
        }

        //Recuperar dados do localStorage
        var dadosUsuarios = JSON.parse(localStorage.getItem(chaveLocalStorage));
        
        //Filtrar doações do usuário logado pelo email
        var usuarioLogado = dadosUsuarios.find(function(usuario) {
            return usuario.email === usuarioOn.email;
        });

        resolve(usuarioLogado.doacoes); //Devolve a promessa com as doações do usuário logado.
    });
}

//Função para imprimir os dados na tela de acordo com as doações do usuário logado
function imprimirDados() {
    let tela = document.getElementById("tela");
    let strHtml = "";

    lerDados()
        .then(doacoesUsuario => {
            if (doacoesUsuario.length !== 0) {
                //Itera sobre as doações em ordem decrescente de ordem inclusão no array de doacoes do usuário logado.
                for (let i = doacoesUsuario.length - 1; i >= 0; i--) {
                    let cor = "";
                    let imagem = "";
                    let cor_texto = "";

                    if (doacoesUsuario[i].status === "Pendente") {
                        cor = "orange-box";
                        imagem = "../assets/imgs/barra-pendente.png";
                    } else if (doacoesUsuario[i].status === "Cancelado") {
                        cor = "red-box";
                        imagem = "../assets/imgs/barra-cancelado.png";
                        cor_texto = "color: #B7BF10;"
                    } else { // status Concluído
                        cor = "green-box";
                        imagem = "../assets/imgs/barra-concluido.png";
                        cor_texto = "color: #FA7401;";
                    }

                  //Convertendo valor para número antes de formatar
                  let valorFormatado = parseFloat(doacoesUsuario[i].valor).toFixed(2);

                    strHtml += `
                        <div class="container-fluid mt-10">
                            <div class="row justify-content-center">
                                <div class="col-md-9">
                                    <div class="card-background card bg-dark mb-3" style="max-width: 50rem;">
                                        <div class="card-body ${cor}">
                                            <h5 class="text-center mt-1 lh-1" style="${cor_texto}"><span class="h3">${doacoesUsuario[i].campanha}</span></h5>
                                            <p class="card-text text-black fs-5 fw-bold mb-2">Data: <span class="text-muted">${doacoesUsuario[i].data}</span></p>
                                            <p class="card-text fs-5 fw-bold mb-2">Tipo de Doação: <span class="text-muted">${doacoesUsuario[i].tipo_doacao}</span></p>
                                            <p class="card-text fs-5 fw-bold mb-2">Valor: R$ <span class="text-muted">${valorFormatado}</span></p>
                                            <p class="card-text fs-5 fw-bold mb-2">Status: <span class="text-muted">${doacoesUsuario[i].status}</span></p>
                                            <img class="card-img-top" src="${imagem}" alt="Imagem de Status do Card">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                }
                tela.innerHTML = strHtml;
            } else {
                strHtml = "<h5>Não há Doação no seu histórico.</h5>";
                tela.innerHTML = strHtml;
            }
        })
        .catch(error => {
            console.error('Erro ao ler os dados:', error);
            strHtml = "<h5>Erro ao carregar dados do histórico.</h5>";
            tela.innerHTML = strHtml;
        });
}

// Atualiza dados na tela assim que a página é carregada
window.onload = () => {
    imprimirDados(); // Chama a função para imprimir os dados na tela de acordo com o usuário logado
};


//Forma antiga onde acessava os dados do arquivo historico.json
/*function lerDados() { //A função lerDados() retorna uma promessa que resolverá a função imprimirDados() com os dados da API ao chamar a função lerDados().
    var url = 'historico.json';

    return fetch(url) //API fetch no arquivo historico.json
        
      .then(response => { 
        //Condicional para verificar se a requisição foi bem sucedida.
        if (!response.ok) { //A propriedade ok indica se a resposta HTTP foi ou não bem-sucedida. Ela retorna true se o código de status da resposta estiver no intervalo de 200 a 299 (inclusive).
          throw new Error('Erro ao carregar o arquivo JSON'); //uma exceção do tipo Error é lançada com a mensagem, isso interromperá a execução do código dentro do bloco then e a execução passará para o bloco catch
        }
        return response.json(); //se response.ok for true, converte a resposta HTTP em formato JSON e retorna a promessa, o objeto JSON.
      })
      .catch(error => {
        console.error('Erro:', error);
      });
}

//Imprime os dados na tela de acordo com o usuário logado(userLogado:true/false) ou nenhum logado;
function imprimirDados() {
    let tela = document.getElementById("tela");
    let strHtml = "";

    lerDados()
      .then(objDados => { //A função lerDados() recebe o retorno da promessa anterior.
          
        //Verifica se há um usuário logado. Método find encontra o primeiro elemento/user que atende a condição especificada no callback com a propriedade usuarioLogado:true.
          const usuarioLogado = objDados.historico.find(function(user) {
              return user.usuarioLogado === true;
          });
        if (usuarioLogado) {
            //Usuário logado encontrado, atribui apenas seus dados a objDados, descartando todo o restante do objeto desnecessário pra análise de dados.
            objDados = usuarioLogado;
            if (objDados.doacoes.length !== 0) {

              //Varíavel para definir cor de fundo e imagem de acordo com o status da doação.
              let cor = "";
              let imagem = "";
              let cor_texto = "";

                //Doações apresentadas em ordem decrescente, com base na data de criação da doação.
                for (let i = objDados.doacoes.length - 1; i >= 0 ; i--) {

                    //Varíavel para definir cor de fundo e imagem de acordo com o status da doação.
                    cor = "green-box";
                    imagem = "../assets/imgs/barra-concluido.png";
                    cor_texto = "color: #FA7401;";
                    
                    if(objDados.doacoes[i].status === "Pendente"){
                        cor = "orange-box";
                        imagem = "../assets/imgs/barra-pendente.png";

                    }else if(objDados.doacoes[i].status === "Cancelado"){
                        cor = "red-box";
                        imagem = "../assets/imgs/barra-cancelado.png";
                        cor_texto = "color: #B7BF10;"
                    }
                    
                    strHtml += `
                <div class="container-fluid mt-10">
    <div class="row justify-content-center">
      <div class="col-md-9">
      
        <!-- Card Bootstrap -->
        <div class="card-background card bg-dark mb-3" style="max-width: 50rem;">
          <div class="card-body ${cor}">
            
            <h5 class="text-center mt-1 lh-1" style="${cor_texto}"><span class="h3">${objDados.doacoes[i].campanha}</span></h5>
            <p class="card-text text-black fs-5 fw-bold mb-2">Data: <span class="text-muted">${objDados.doacoes[i].data}</span></p>
            <p class="card-text fs-5 fw-bold mb-2">Tipo de Doação: <span class="text-muted">${objDados.doacoes[i].tipo_doacao}<span></p>
            <p class="card-text fs-5 fw-bold mb-2">Valor: R$ <span class="text-muted">${objDados.doacoes[i].valor}</span></p>
            <p class="card-text fs-5 fw-bold mb-2">Status: <span class="text-muted">${objDados.doacoes[i].status}</span></p>
            <img class="card-img-top" src="${imagem}" alt="Imagem de Status do Card">
          </div>
        </div>
        <!-- Fim do Card Bootstrap -->
      </div>
    </div>
  </div>`;
                }
                tela.innerHTML = strHtml;
                
            } else { //Usuário Logado mas sem histórico de doações. Exemplo no historico.json, id=3.
                strHtml = "<h5>Não há Doação no seu histórico.</h5>";
                tela.innerHTML = strHtml;
            }
        } else { //Não há usuário logado.
            strHtml = "<h5>Usuário não logado!</h5>";
            tela.innerHTML = strHtml;
        }
      });
}*/
