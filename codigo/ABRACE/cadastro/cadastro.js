// BOTÕES QUE TROCAM O FORMULÁRIO EXIBIDO
window.onload = function() {
  let botaoFamilia = document.getElementById("botaoFamilia");
  let botaoVoluntario = document.getElementById("botaoVoluntario");
  let botaoDoador = document.getElementById("botaoDoador");

  // SELECIONANDO FORMULÁRIO FAMÍLIA
  botaoFamilia.onclick = function() {
    let formFamilia = document.getElementById("familia");
    let formVoluntario = document.getElementById("voluntario");
    let formDoador = document.getElementById("doador");
    formFamilia.style.display = "block";
    formVoluntario.style.display = "none";
    formDoador.style.display = "none";
  };

  // SELECIONANDO FORMULÁRIO VOLUNTÁRIO
  botaoVoluntario.onclick = function() {
    let formFamilia = document.getElementById("familia");
    let formVoluntario = document.getElementById("voluntario");
    let formDoador = document.getElementById("doador");
    formFamilia.style.display = "none";
    formVoluntario.style.display = "block";
    formDoador.style.display = "none";
  };

  // SELECIONANDO FORMULÁRIO DOADOR
  botaoDoador.onclick = function() {
    let formFamilia = document.getElementById("familia");
    let formVoluntario = document.getElementById("voluntario");
    let formDoador = document.getElementById("doador");
    formFamilia.style.display = "none";
    formVoluntario.style.display = "none";
    formDoador.style.display = "block";
  };

  //// Array para armazenar os familiares
  let familiares = [];

  // Adicionar membro da família à tabela
  document.getElementById('botaoCadastrarMembro').addEventListener('click', function(event) {
    event.preventDefault();

    const nomeF = document.getElementById('nomeF').value;
    const rendaF = document.getElementById('rendaF').value;
    const cpfF = document.getElementById('cpfF').value;
    const nascimentoF = document.getElementById('nascimentoF').value;

    let verificacaoOk = true;
    // Não permitir campos vazios
    if (nomeF === '' || rendaF === '' || cpfF === '' || nascimentoF === '') {
      verificacaoOk = false;
      alert('Nenhum campo dos membros familiares pode ficar vazio!');
    }

    if (verificacaoOk) {
      // MEMBROS NA TABELA
      const tabelaFamiliares = document.getElementById('tabelaFamiliares');
      const newRow = tabelaFamiliares.insertRow();
      newRow.innerHTML = `
          <td>${nomeF}</td>
          <td>R$ ${rendaF}</td>
          <td>${cpfF}</td>
          <td>${nascimentoF}</td>
          <td> <button class="remover-btn"> X </button> </td>
        `;

      // ADICIONAR A PESSOA AO ARRAY
      familiares.push({
        nome: nomeF,
        renda: rendaF,
        cpf: cpfF,
        nascimento: nascimentoF,
      });

      // Limpar campos do formulário
      document.getElementById('nomeF').value = '';
      document.getElementById('rendaF').value = '';
      document.getElementById('cpfF').value = '';
      document.getElementById('nascimentoF').value = '';
    }
  });

  // Remover membro da família
  document.getElementById('tabelaFamiliares').addEventListener('click', function(event) {
    if (event.target.classList.contains('remover-btn')) {
      const row = event.target.parentElement.parentElement;
      const index = row.rowIndex - 1;
      familiares.splice(index, 1); //Remove do array
      row.remove(); //Remove da tabela
    }
  });

  // Função para salvar dados no localStorage
  function salvarDadosNoLocalStorage(tipo, dados) {
    let arrayDeDados = JSON.parse(localStorage.getItem(tipo)) || [];
    arrayDeDados.push(dados);
    localStorage.setItem(tipo, JSON.stringify(arrayDeDados));
  }

  // Formulários de cadastro
  // FORMULÁRIO FAMÍLIA
  document.getElementById('botaoSubmitFamilia').addEventListener('click', function(event) {
    event.preventDefault();

    const nomeUsuario = document.getElementById('nomeUsuario').value;
    const rendaUsuario = document.getElementById('rendaUsuario').value;
    const cpfUsuario = document.getElementById('cpfUsuario').value;
    const nascimentoUsuario = document.getElementById('nascimentoUsuario').value;
    const estadoCivilUsuario = document.getElementById('estadoCivilUsuario').value;
    const enderecoUsuario = document.getElementById('enderecoUsuario').value;
    const cepUsuario = document.getElementById('cepUsuario').value;
    const bairroUsuario = document.getElementById('bairroUsuario').value;
    const telefoneUsuario = document.getElementById('telefoneUsuario').value;
    const emailUsuario = document.getElementById('emailUsuario').value;
    const senhaUsuario = document.getElementById('senhaUsuario').value;
    const confirmarSenhaUsuario = document.getElementById('confirmarSenhaUsuario').value;

    let verificaSenha = true;
    if (senhaUsuario !== confirmarSenhaUsuario) {
      document.getElementById('error').innerText = 'As senhas não coincidem';
      verificaSenha = false;
    }

    let verificaUsuario = true;
    if (nomeUsuario === '' || rendaUsuario === '' || cpfUsuario === '' || nascimentoUsuario === '' || estadoCivilUsuario === '' || enderecoUsuario === '' || cepUsuario === '' || bairroUsuario === '' || telefoneUsuario === '' || emailUsuario === '' || senhaUsuario === '' || confirmarSenhaUsuario === '') {
      verificaUsuario = false;
      alert('Nenhum campo pode estar vazio!');
    }

    let usuario = {
      nome: nomeUsuario,
      renda: rendaUsuario,
      cpf: cpfUsuario,
      nascimento: nascimentoUsuario,
      estadoCivil: estadoCivilUsuario,
      endereco: enderecoUsuario,
      cep: cepUsuario,
      bairro: bairroUsuario,
      telefone: telefoneUsuario,
      email: emailUsuario,
      senha: senhaUsuario,
      doacoes: [],
      familiares: familiares,
      tipo: 'Beneficiário',
    };;

    if (verificaUsuario && verificaSenha) {
      salvarDadosNoLocalStorage('usuarios', usuario);
      alert('Cadastro realizado com sucesso!\nFaça Login em sua conta');

      // Limpar campos do formulário usuário após cadastro concluído
      document.getElementById('nomeUsuario').value = '';
      document.getElementById('rendaUsuario').value = '';
      document.getElementById('cpfUsuario').value = '';
      document.getElementById('nascimentoUsuario').value = '';
      document.getElementById('estadoCivilUsuario').value = '';
      document.getElementById('enderecoUsuario').value = '';
      document.getElementById('cepUsuario').value = '';
      document.getElementById('bairroUsuario').value = '';
      document.getElementById('telefoneUsuario').value = '';
      document.getElementById('emailUsuario').value = '';
      document.getElementById('senhaUsuario').value = '';
      document.getElementById('confirmarSenhaUsuario').value = '';

      window.location.href = '../index.html';
    }
  });

  // FORMULARIO VOLUNTÁRIO (VALIDAR DADOS!)
  document.getElementById('botaoSubmitVoluntario').addEventListener('click', function(event) {
    event.preventDefault();

    const nomeVoluntario = document.getElementById('nomeVoluntario').value;
    const cpfVoluntario = document.getElementById('cpfVoluntario').value;
    const nascimentoVoluntario = document.getElementById('nascimentoVoluntario').value;
    const profissaoVoluntario = document.getElementById('profissaoVoluntario').value;
    const estadoCivilVoluntario = document.getElementById('estadoCivilVoluntario').value;
    const enderecoVoluntario = document.getElementById('enderecoVoluntario').value;
    const bairroVoluntario = document.getElementById('bairroVoluntario').value;
    const cidadeVoluntario = document.getElementById('cidadeVoluntario').value;
    const cepVoluntario = document.getElementById('cepVoluntario').value;
    const telefoneVoluntario = document.getElementById('telefoneVoluntario').value;
    const emailVoluntario = document.getElementById('emailVoluntario').value;
    const senhaVoluntario = document.getElementById('senhaVoluntario').value;
    const confirmarSenhaVoluntario = document.getElementById('confirmarSenhaVoluntario').value;
    const disponibilidade = document.getElementById('disponibilidade').value;

    let verificaSenhaVoluntario = true;
    if (senhaVoluntario !== confirmarSenhaVoluntario) {
      document.getElementById('errorV').innerText = 'As senhas não coincidem';
      verificaSenhaVoluntario = false;
    }

    let verificaVoluntario = true;
    if (nomeVoluntario === '' || cpfVoluntario === '' || nascimentoVoluntario === '' || profissaoVoluntario === '' || estadoCivilVoluntario === '' || enderecoVoluntario === '' || cepVoluntario === '' || cidadeVoluntario === '' || bairroVoluntario === '' || telefoneVoluntario === '' || emailVoluntario === '' || senhaVoluntario === '' || confirmarSenhaVoluntario === '' || disponibilidade === '') {
      verificaVoluntario = false;
      alert('Nenhum campo pode estar vazio!');
    }

    let voluntario = {
      nome: nomeVoluntario,
      cpf: cpfVoluntario,
      nascimento: nascimentoVoluntario,
      profissao: profissaoVoluntario,
      estadoCivil: estadoCivilVoluntario,
      endereco: enderecoVoluntario,
      bairro: bairroVoluntario,
      cidade: cidadeVoluntario,
      cep: cepVoluntario,
      telefone: telefoneVoluntario,
      email: emailVoluntario,
      senha: senhaVoluntario,
      disponibilidade: disponibilidade,
      doacoes: [],
      tipo: 'Voluntário',
    };

    if (verificaVoluntario && verificaSenhaVoluntario) {
      salvarDadosNoLocalStorage('voluntarios', voluntario);
      alert('Cadastro realizado com sucesso!\nFaça Login em sua conta');

      // Limpar campos do formulário de voluntário após cadastro concluído
      document.getElementById('nomeVoluntario').value = '';
      document.getElementById('cpfVoluntario').value = '';
      document.getElementById('nascimentoVoluntario').value = '';
      document.getElementById('profissaoVoluntario').value = '';
      document.getElementById('estadoCivilVoluntario').value = '';
      document.getElementById('enderecoVoluntario').value = '';
      document.getElementById('bairroVoluntario').value = '';
      document.getElementById('cidadeVoluntario').value = '';
      document.getElementById('cepVoluntario').value = '';
      document.getElementById('telefoneVoluntario').value = '';
      document.getElementById('emailVoluntario').value = '';
      document.getElementById('senhaVoluntario').value = '';
      document.getElementById('confirmarSenhaVoluntario').value = '';
      document.getElementById('disponibilidade').value = '';

      window.location.href = '../index.html';
    }
  });

  // FORMULARIO DOADOR (VALIDAR DADOS!)
  document.getElementById('botaoSubmitDoador').addEventListener('click', function(event) {
    event.preventDefault();

    const nomeDoador = document.getElementById('nomeDoador').value;
    const cpfDoador = document.getElementById('cpfDoador').value;
    const nascimentoDoador = document.getElementById('nascimentoDoador').value;
    const profissaoDoador = document.getElementById('profissaoDoador').value;
    const estadoCivilDoador = document.getElementById('estadoCivilDoador').value;
    const enderecoDoador = document.getElementById('enderecoDoador').value;
    const bairroDoador = document.getElementById('bairroDoador').value;
    const cidadeDoador = document.getElementById('cidadeDoador').value;
    const cepDoador = document.getElementById('cepDoador').value;
    const telefoneDoador = document.getElementById('telefoneDoador').value;
    const emailDoador = document.getElementById('emailDoador').value;
    const senhaDoador = document.getElementById('senhaDoador').value;
    const confirmarSenhaDoador = document.getElementById('confirmarSenhaDoador').value;

    let verificaSenhaDoador = true;
    if (senhaDoador !== confirmarSenhaDoador) {
      document.getElementById('errorD').innerText = 'As senhas não coincidem';
      verificaSenhaDoador = false;
    }

    let verificaDoador = true;
    if (nomeDoador === '' || cpfDoador === '' || nascimentoDoador === '' || profissaoDoador === '' || estadoCivilDoador === '' || enderecoDoador === '' || cepDoador === '' || cidadeDoador === '' || bairroDoador === '' || telefoneDoador === '' || emailDoador === '' || senhaDoador === '' || confirmarSenhaDoador === '') {
      verificaDoador = false;
      alert('Nenhum campo pode estar vazio!');
    }

    let doador = {
      nome: nomeDoador,
      cpf: cpfDoador,
      nascimento: nascimentoDoador,
      profissao: profissaoDoador,
      estadoCivil: estadoCivilDoador,
      endereco: enderecoDoador,
      bairro: bairroDoador,
      cidade: cidadeDoador,
      cep: cepDoador,
      telefone: telefoneDoador,
      email: emailDoador,
      senha: senhaDoador,
      doacoes: [],
      tipo: 'Doador',
    };

    if (verificaDoador && verificaSenhaDoador) {
      salvarDadosNoLocalStorage('doadores', doador);
      alert('Cadastro realizado com sucesso!\nFaça Login em sua conta');

      // Limpar campos do formulário doador após cadastro concluído
      document.getElementById('nomeDoador').value = '';
      document.getElementById('cpfDoador').value = '';
      document.getElementById('nascimentoDoador').value = '';
      document.getElementById('profissaoDoador').value = '';
      document.getElementById('estadoCivilDoador').value = '';
      document.getElementById('enderecoDoador').value = '';
      document.getElementById('bairroDoador').value = '';
      document.getElementById('cidadeDoador').value = '';
      document.getElementById('cepDoador').value = '';
      document.getElementById('telefoneDoador').value = '';
      document.getElementById('emailDoador').value = '';
      document.getElementById('senhaDoador').value = '';
      document.getElementById('confirmarSenhaDoador').value = '';

      window.location.href = '../index.html';
    }
  });
}