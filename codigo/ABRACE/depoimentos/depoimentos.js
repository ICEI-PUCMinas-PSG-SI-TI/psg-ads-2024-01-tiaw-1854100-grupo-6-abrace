// Inicio do Desfoque!!!

// Seleciona o botão "Visualizar Todos..."
const btnVisualizar = document.querySelector('.btn-visualizar');

// Adiciona um ouvinte de evento para o clique no botão
btnVisualizar.addEventListener('click', function() {
    // Seleciona a camada de fundo para aplicar o desfoque
    const blurBackground = document.querySelector('.blur-background');

    // Mostra a camada de fundo para aplicar o desfoque
    blurBackground.style.display = 'block';
});

// Seleciona o modal
const modal = document.querySelector('#testimonialsModal');

// Adiciona um ouvinte de evento para o modal ser mostrado
modal.addEventListener('show.bs.modal', function() {
    // Oculta a camada de fundo para remover o desfoque
    const blurBackground = document.querySelector('.blur-background');
    blurBackground.style.display = 'none';
});

// Adiciona um ouvinte de evento para o modal ser escondido
modal.addEventListener('hidden.bs.modal', function() {
    // Oculta a camada de fundo para remover o desfoque
    const blurBackground = document.querySelector('.blur-background');
    blurBackground.style.display = 'none';
});
// Fim do Desfoque!!!



// Incio do Salvamento!!!
// Variável global para contar o número de depoimentos adicionados
let depoimentoId = 0;
// Variável global para armazenar os IDs dos depoimentos criados
let depoimentosCriados = [];

// Função para adicionar um depoimento ao modal
function adicionarDepoimento(nome, depoimento) {
    // Incrementa o ID do depoimento
    depoimentoId++;

    // Seleciona o container dos depoimentos dentro do modal
    const testimonialsContainer = document.getElementById('testimonialsContainer');

    // Cria um novo elemento col para adicionar o depoimento
    const col = document.createElement('div');
    col.classList.add('col-md-4', 'mb-4'); // Ajusta para 3 colunas em telas médias

    // Cria um novo elemento card para o depoimento
    const card = document.createElement('div');
    card.classList.add('card', 'testimonial-card');
    card.id = 'depoimento-' + depoimentoId;

    // Adiciona o ID ao array de depoimentos criados
    depoimentosCriados.push(card.id);

    // Cria um novo elemento card-body para o conteúdo do depoimento
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Adiciona o nome como título do card
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = nome;

    // Cria um elemento img para a classificação
    const imgClassificacao = document.createElement('img');
    imgClassificacao.classList.add('classificacao');
    imgClassificacao.src = "../assets/imgs/5estrelas.png";
    imgClassificacao.alt = "Classificação de 5 estrelas";

    // Cria um novo elemento p para o texto do depoimento
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = depoimento;

    // Adiciona os elementos criados ao documento HTML
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(imgClassificacao);
    cardBody.appendChild(cardText);
    card.appendChild(cardBody);
    col.appendChild(card);
    testimonialsContainer.appendChild(col);
}

// Evento de clique no botão "Enviar"
document.getElementById('enviarBtn').addEventListener('click', function() {
    // Obtém os valores dos campos nome e depoimento
    const nome = document.getElementById('nome').value;
    const depoimento = document.getElementById('depoimento').value;

    // Verifica se ambos os campos foram preenchidos
    if (nome && depoimento) {
        // Adiciona o depoimento ao modal
        adicionarDepoimento(nome, depoimento);

        // Limpa os campos após o envio
        document.getElementById('nome').value = '';
        document.getElementById('depoimento').value = '';

        // Fecha o modal após enviar o depoimento
        const modalElement = document.getElementById('testimonialsModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    } else {
        // Se algum campo estiver vazio, exibe uma mensagem de alerta
        alert('Por favor, preencha todos os campos.');
    }
});

// Evento de clique no botão "Limpar Campos"
document.getElementById('limparCamposBtn').addEventListener('click', function() {
    // Remove todos os depoimentos criados
    depoimentosCriados.forEach(function(id) {
        const depoimento = document.getElementById(id);
        if (depoimento) {
            depoimento.remove();
        }
    });

    // Limpa o array de IDs dos depoimentos criados
    depoimentosCriados = [];

    // Fecha o modal
    const modalElement = document.getElementById('testimonialsModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
});

// Adiciona a funcionalidade de fechar o modal ao botão de fechar
document.querySelectorAll('[data-bs-dismiss="modal"]').forEach(function(button) {
    button.addEventListener('click', function() {
        const modalElement = document.getElementById('testimonialsModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    });
});
// Fim do Salvamento!!!
