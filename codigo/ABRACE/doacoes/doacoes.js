let entrarConta = document.getElementById('entrarConta');
entrarConta.onclick = function() {
    let TelaLogin = document.getElementById('login');
    TelaLogin.style.display = "block";
};

//Quando for um usuário logado, desaparecer card login e anônino 
let entrarnaconta = document.getElementById("entrarnaconta");
let anonimo = document.getElementById("anonimo");
const admOndoacao = JSON.parse(localStorage.getItem("admOn"));
const usuarioOndoacao = JSON.parse(localStorage.getItem("usuarioOn"));
if (admOndoacao || usuarioOndoacao) {
    entrarnaconta.style.display = "none";
    anonimo.style.display = "none";
}


//INCLUIR DADOS DE DOAÇÃO NA LOCALSTORAGE
// Adicionar um ouvinte de evento ao select para chamar a função botaoDoacao quando o valor for alterado
document.getElementById("botaoDoacao").addEventListener('click', incluirDadosDoacao);

function incluirDadosDoacao() {

    //Recuperar o tipo de usuário do localStorage, verificando usuário online
    var usuarioOn = JSON.parse(localStorage.getItem('usuarioOn'));
    var tipoUsuario = usuarioOn.tipo;

    //Recuperar dados de doação do formulário
    var nomeCampanha = document.getElementById("campanha").value;
    var periododoacao = document.getElementById("periodo-doacao").value;
    var valorDoacao;

    //Verificar se foi selecionado "Outro Valor" e obter o valor correspondente
    var opcaoSelecionada = document.querySelector('input[name="opcao"]:checked').value;
    if (opcaoSelecionada === "outro") {
        valorDoacao = document.getElementById("outro-valor").value;
    } else {
        valorDoacao = opcaoSelecionada;
    }

    //Criar objeto de doação com os novos atributos. Data do sistema no formato de string
    var dataSistema = new Date().toLocaleDateString();
    var novaDoacao = {
        campanha: nomeCampanha,
        data: dataSistema,
        tipo_doacao: periododoacao,
        valor: parseFloat(valorDoacao).toFixed(2), //Converter para número e formatar para 2 casas decimais
        status: "Pendente"
    };

    //Determinar o array de doações a ser atualizado com base no tipo de usuário
    var arrayDoacoes;
    switch (tipoUsuario) {
        case 'Doador':
            arrayDoacoes = JSON.parse(localStorage.getItem('doadores'));
            break;
        case 'Voluntário':
            arrayDoacoes = JSON.parse(localStorage.getItem('voluntarios'));
            break;
        case 'Beneficiário':
            arrayDoacoes = JSON.parse(localStorage.getItem('usuarios'));
            break;
        default:
            console.error('Tipo de usuário não reconhecido.');
            return;
    }

    //Verificar se há doações existentes e atualizar status automaticamente para Concluído
    arrayDoacoes.forEach(function(usuario) {
        if (usuario.email === usuarioOn.email) {
            //Verificar se há doações pendentes e atualizar para concluído
            usuario.doacoes.forEach(function(doacao) {
                if (doacao.status === "Pendente") {
                    doacao.status = "Concluído";
                    existeDoacaoPendente = true;
                }
            });
            //Adicionar nova doação como pendente, se houve pendente anterior transformada em concluída
            usuario.doacoes.push(novaDoacao);
        }
    });

    
    //Salvar o array de doações atualizado de volta no localStorage
    switch (tipoUsuario) {
        case 'Doador':
            localStorage.setItem('doadores', JSON.stringify(arrayDoacoes));
            break;
        case 'Voluntário':
            localStorage.setItem('voluntarios', JSON.stringify(arrayDoacoes));
            break;
        case 'Beneficiário':
            localStorage.setItem('usuarios', JSON.stringify(arrayDoacoes));
            break;
        default:
            console.error('Tipo de usuário não reconhecido. Não foi possível atualizar o array de doações.');
            return;
    }

}


// Ouvinte de evento para mostrar/esconder o input de outro valor
document.querySelectorAll('input[name="opcao"]').forEach(function(input) {
    input.addEventListener('change', function() {
        if (this.value === "outro") {
            document.getElementById("outroValor").style.display = "block";
        } else {
            document.getElementById("outroValor").style.display = "none";
        }
    });
});


/* //VERIFICA O LOGIN DE USUÁRIO COM O ARQUIVO perfilUsuario.JSON pois não temos um arquivo de logins
// Função para lidar com o envio do formulário
function loginUsuario(event) {
    // Evitar o comportamento padrão do formulário de enviar a página
    event.preventDefault();

    // Pegar os valores do e-mail e senha dos campos de entrada
    var email = document.getElementById("inputEmailUsuario").value;
    var senha = JSON.parse(document.getElementById("inputPassword").value);

    //console.log(typeof email, email); //string admin@abrace.com.br
    //console.log(typeof senha, senha); //string 12345

    // URL do arquivo JSON que contém os dados do usuário
    var url = 'perfilUsuario.json';

    //console.log(typeof url, url); //string perfilUsuario.json

    // Fetch para buscar os dados do usuário
    fetch(url)
        .then(resposta => resposta.json()) // Converter a resposta para JSON
        .then(dados => {
            console.log(typeof dados.user, typeof dados.password) //string number
            // Verificar se o e-mail e senha correspondem aos dados do usuário
            if (dados.user === email && dados.password === senha) {
                alert('Login bem-sucedido!');
                // Redirecionar o usuário para a página de entrada, pois ainda não temos a página de perfil
                window.location.href = '/index.html';
            } else {
                alert('E-mail ou senha incorretos. Por favor, tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados do usuário:', error);
            alert('Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
        });
}

// Adicionar um ouvinte de evento para lidar com o envio do formulário, anteriormente criado com perfilUsuario.json.
document.querySelector('form').addEventListener('submit', loginUsuario);
*/


//INCLUIR DADOS DA DOAÇÃO ANÔNIMA NA LOCALSTORAGE
function incluirDoacaoAnonima() {

    const nomeUsuario = document.getElementById('inputNome').value;
    const emailUsuario = document.getElementById('inputEmailAnonimo').value;
    const telefoneUsuario = document.getElementById('inputTelefone').value;
    const nascimentoUsuario = document.getElementById('inputDataNascimento').value;
    const sexoUsuario = document.getElementById('selecionaSexo').value;

    //Verificar se data de nascimento é anterior a data atual
    var inputDataNascimento = document.getElementById("inputDataNascimento").value;
    var dataNascimento = new Date(inputDataNascimento);
    var dataAtual = new Date();

    if (dataNascimento >= dataAtual) {
        alert("Por favor, insira uma data de nascimento válida (anterior à data atual).");
        document.getElementById("inputDataNascimento").value = '';

    }

    if (nomeUsuario === '' || emailUsuario === '' || telefoneUsuario === '' || sexoUsuario === '' || nascimentoUsuario === '') {
        alert('Nenhum campo pode estar vazio!');
    } else {

        var doacaoAnonima = {
            nome: nomeUsuario,
            email: emailUsuario,
            telefone: telefoneUsuario,
            dataNascimento: nascimentoUsuario,
            sexo: sexoUsuario,
            receberNotificacoes: document.getElementById("checkNotificacoes").checked,
            receberWhatsApp: document.getElementById("checkWhatsApp").checked

        };

        localStorage.setItem('dadosDoacao', JSON.stringify(doacaoAnonima));

        alert("Dados gravados com sucesso!");

    }

}
document.getElementById("botaoDoacaoAnonima").addEventListener('click', incluirDoacaoAnonima);


/*
//DESATIVA A DIV LOGIN E DOAÇÃO ANÔNIMA CASO O USUÁRIO ESTEJA LOGADO. Atributo conferido a partir de um arquivo externo JSON.
//Requisição interna, de um arquivo local na pasta.
window.onload = function() {
    // Função para carregar e processar o arquivo perfilUsuario.json
    function carregarUsuario() {
        fetch('perfilUsuario.json') //método fetch para fazer uma requisição HTTP GET para o arquivo `perfilUsuario.json` no mesmo diretório que o arquivo HTML. Requisição assíncrona.
            .then(respostaFetch => respostaFetch.json()) //Encadeia uma chamada .then à promessa retornada pelo `fetch`. Quando a resposta da requisição estiver disponível, esta função será chamada. Ela converte a resposta em JSON chamando o método `json()` da resposta, que retorna uma nova promessa representando o conteúdo JSON da resposta.
            .then(dadosArquivoJSON => { //Esta linha encadeia outra chamada .then à promessa anterior. Quando o conteúdo JSON estiver disponível, esta função será chamada, e o conteúdo JSON (representado pela variável dadosArquivoJSON) será passado como argumento para a função verificarUsuario.
                verificarUsuario(dadosArquivoJSON);
            })
            .catch(erro => console.error('Erro ao carregar o arquivo perfilUsuario.json:', erro)); //mensagem de erro do console caso tenha algum erro ao ler o arquivo json(formato json).
    }

    // Função para verificar se o usuário está logado, se estiver logado a div doacao-anonima ficará oculta.
    function verificarUsuario(dadosJSON) {
        //var doacao = document.getElementById('doacao');
        var doacaoAnonima = document.getElementById('doacao-anonima');
        var entrarConta = document.getElementById("entrar-conta");

        if (dadosJSON.usuarioLogado) {
            doacaoAnonima.style.display = 'none';
            entrarConta.style.display = 'none';

        }
    }

    // Chama a função para carregar o usuário quando a janela é carregada
    carregarUsuario();
}
*/


//Copiar o qr code para a área de transferência, pelo arquivo doacoes.js o método execCommand se apresenta rasurado, como depreciado, por isso foi colocado na tag script no html.
/*
function copiarTexto() {
    let textoCopiado = document.getElementById("pix-code");
    textoCopiado.select();
    textoCopiado.setSelectionRange(0,99999);

    document.execCommand("copy");
    alert("O QR-Code foi copiado!")
  }*/

