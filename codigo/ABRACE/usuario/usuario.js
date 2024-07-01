window.onload = function() {
  const dadosUsuario = document.getElementById('dadosUsuario');
  const botoesacessousuario = document.getElementById('botoesacessousuario');
  const bemvindo = document.getElementById('bemvindo');
  const botaoEditarInfo = document.getElementById('editarInfo');
  const botaoExcluirPerfil = document.getElementById('excluirPerfil');
  const botaoAlterarSenha = document.getElementById('alterarSenha');
  const formEdicao = document.getElementById('formEdicao');
  const formSenha = document.getElementById('formSenha');

  // Recuperar dados do localStorage
  const usuarioOn = JSON.parse(localStorage.getItem('usuarioOn'));
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || {};
  const voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || {};
  const doadores = JSON.parse(localStorage.getItem('doadores')) || {};

  let i = 0;
  // Verificar se usuário está logado
  if (usuarioOn && usuarioOn.email && usuarioOn.senha) {
    if (usuarioOn.tipo == 'Beneficiário') {
      for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email == usuarioOn.email && usuarios[i].senha == usuarioOn.senha) {
          // Exibir informações pessoais
          bemvindo.innerHTML = `Bem vindo(a), ${usuarios[i].nome}!`;
          dadosUsuario.innerHTML = `
            <h1>Informações Pessoais:</h1>
            <p><strong>Nome:</strong> ${usuarios[i].nome}</p>
            <p><strong>CPF:</strong> ${usuarios[i].cpf}</p>
            <p><strong>Data de Nascimento:</strong> ${usuarios[i].nascimento}</p>
            <p><strong>Endereço:</strong> ${usuarios[i].endereco}</p>
            <p><strong>Bairro:</strong> ${usuarios[i].bairro}</p>
            <p><strong>CEP:</strong> ${usuarios[i].cep}</p>
            <p><strong>Telefone:</strong> ${usuarios[i].telefone}</p>
            <p><strong>Email:</strong> ${usuarios[i].email}</p>
          `;

          // Preencher os campos do formulário de edição
          document.getElementById('nome').value = usuarios[i].nome;
          document.getElementById('cpf').value = usuarios[i].cpf;
          document.getElementById('nascimento').value = usuarios[i].nascimento;
          document.getElementById('endereco').value = usuarios[i].endereco;
          document.getElementById('bairro').value = usuarios[i].bairro;
          document.getElementById('cep').value = usuarios[i].cep;
          document.getElementById('telefone').value = usuarios[i].telefone;
          document.getElementById('email').value = usuarios[i].email;

          // Exibir botões e campos necessários
          botoesacessousuario.style.display = 'block';
          botaoEditarInfo.style.display = 'block';
          botaoExcluirPerfil.style.display = 'block';
          botaoAlterarSenha.style.display = 'block';
          dadosUsuario.style.display = 'block';
          formEdicao.style.display = 'none';
          formSenha.style.display = 'none';
        }
      }
    }
    else if (usuarioOn.tipo == 'Voluntário') {
      for (let i = 0; i < voluntarios.length; i++) {
        if (voluntarios[i].email == usuarioOn.email && voluntarios[i].senha == usuarioOn.senha) {
          // pessoa = voluntarios[i];
          // Exibir informações pessoais
          bemvindo.innerHTML = `Bem vindo(a), ${voluntarios[i].nome}!`;
          dadosUsuario.innerHTML = `
            <h1>Informações Pessoais:</h1>
            <p><strong>Nome:</strong> ${voluntarios[i].nome}</p>
            <p><strong>CPF:</strong> ${voluntarios[i].cpf}</p>
            <p><strong>Data de Nascimento:</strong> ${voluntarios[i].nascimento}</p>
            <p><strong>Endereço:</strong> ${voluntarios[i].endereco}</p>
            <p><strong>Bairro:</strong> ${voluntarios[i].bairro}</p>
            <p><strong>CEP:</strong> ${voluntarios[i].cep}</p>
            <p><strong>Telefone:</strong> ${voluntarios[i].telefone}</p>
            <p><strong>Email:</strong> ${voluntarios[i].email}</p>
          `;

          // Preencher os campos do formulário de edição
          document.getElementById('nome').value = voluntarios[i].nome;
          document.getElementById('cpf').value = voluntarios[i].cpf;
          document.getElementById('nascimento').value = voluntarios[i].nascimento;
          document.getElementById('endereco').value = voluntarios[i].endereco;
          document.getElementById('bairro').value = voluntarios[i].bairro;
          document.getElementById('cep').value = voluntarios[i].cep;
          document.getElementById('telefone').value = voluntarios[i].telefone;
          document.getElementById('email').value = voluntarios[i].email;

          // Exibir botões e campos necessários
          botoesacessousuario.style.display = 'block';
          botaoEditarInfo.style.display = 'block';
          botaoExcluirPerfil.style.display = 'block';
          botaoAlterarSenha.style.display = 'block';
          dadosUsuario.style.display = 'block';
          formEdicao.style.display = 'none';
          formSenha.style.display = 'none';
        }
      }
    }
    else if (usuarioOn.tipo == 'Doador') {
      for (let i = 0; i < doadores.length; i++) {
        if (doadores[i].email == usuarioOn.email && doadores[i].senha == usuarioOn.senha) {
          bemvindo.innerHTML = `Bem vindo(a), ${doadores[i].nome}!`;
          dadosUsuario.innerHTML = `
            <h1>Informações Pessoais:</h1>
            <p><strong>Nome:</strong> ${doadores[i].nome}</p>
            <p><strong>CPF:</strong> ${doadores[i].cpf}</p>
            <p><strong>Data de Nascimento:</strong> ${doadores[i].nascimento}</p>
            <p><strong>Endereço:</strong> ${doadores[i].endereco}</p>
            <p><strong>Bairro:</strong> ${doadores[i].bairro}</p>
            <p><strong>CEP:</strong> ${doadores[i].cep}</p>
            <p><strong>Telefone:</strong> ${doadores[i].telefone}</p>
            <p><strong>Email:</strong> ${doadores[i].email}</p>
          `;

          // Preencher os campos do formulário de edição
          document.getElementById('nome').value = doadores[i].nome;
          document.getElementById('cpf').value = doadores[i].cpf;
          document.getElementById('nascimento').value = doadores[i].nascimento;
          document.getElementById('endereco').value = doadores[i].endereco;
          document.getElementById('bairro').value = doadores[i].bairro;
          document.getElementById('cep').value = doadores[i].cep;
          document.getElementById('telefone').value = doadores[i].telefone;
          document.getElementById('email').value = doadores[i].email;

          // Exibir botões e campos necessários
          botoesacessousuario.style.display = 'block';
          botaoEditarInfo.style.display = 'block';
          botaoExcluirPerfil.style.display = 'block';
          botaoAlterarSenha.style.display = 'block';
          dadosUsuario.style.display = 'block';
          formEdicao.style.display = 'none';
          formSenha.style.display = 'none';
        }
      }
    }
  }
  else {
    // Usuário não está logado
    dadosUsuario.innerHTML = '<p>É necessário fazer Login.</p>';
    botoesacessousuario.style.display = 'none';
    botaoEditarInfo.style.display = 'none';
    botaoExcluirPerfil.style.display = 'none';
    botaoAlterarSenha.style.display = 'none';
    bemvindo.innerHTML = '';
    formEdicao.style.display = 'none';
    formSenha.style.display = 'none';
  }

  // Evento para botão de editar informações
  botaoEditarInfo.onclick = function() {
    formEdicao.style.display = 'block';
    dadosUsuario.style.display = 'none';
    botaoEditarInfo.style.display = 'none';
    botaoExcluirPerfil.style.display = 'none';
    botaoAlterarSenha.style.display = 'none';
  };
  // Evento de submit do formulário de edição
  document.getElementById('formEdicao').addEventListener('submit', function(event) {
    event.preventDefault();
    // Obter os novos valores dos campos do formulário
    const novoNome = document.getElementById('nome').value;
    const novoCPF = document.getElementById('cpf').value;
    const novoNascimento = document.getElementById('nascimento').value;
    const novoEndereco = document.getElementById('endereco').value;
    const novoBairro = document.getElementById('bairro').value;
    const novoCEP = document.getElementById('cep').value;
    const novoTelefone = document.getElementById('telefone').value;
    const novoEmail = document.getElementById('email').value;

    // Atualizar dados no localStorage
    if (usuarioOn.tipo === 'Beneficiário') {
      usuarios[i].nome = novoNome;
      usuarios[i].cpf = novoCPF;
      usuarios[i].nascimento = novoNascimento;
      usuarios[i].endereco = novoEndereco;
      usuarios[i].bairro = novoBairro;
      usuarios[i].cep = novoCEP;
      usuarios[i].telefone = novoTelefone;
      usuarios[i].email = novoEmail;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
    else if (usuarioOn.tipo === 'Voluntário') {
      voluntarios[i].nome = novoNome;
      voluntarios[i].cpf = novoCPF;
      voluntarios[i].nascimento = novoNascimento;
      voluntarios[i].endereco = novoEndereco;
      voluntarios[i].bairro = novoBairro;
      voluntarios[i].cep = novoCEP;
      voluntarios[i].telefone = novoTelefone;
      voluntarios[i].email = novoEmail;
      localStorage.setItem('voluntarios', JSON.stringify(voluntarios));
    }
    else if (usuarioOn.tipo === 'Doador') {
      doadores[i].nome = novoNome;
      doadores[i].cpf = novoCPF;
      doadores[i].nascimento = novoNascimento;
      doadores[i].endereco = novoEndereco;
      doadores[i].bairro = novoBairro;
      doadores[i].cep = novoCEP;
      doadores[i].telefone = novoTelefone;
      doadores[i].email = novoEmail;
      localStorage.setItem('doadores', JSON.stringify(doadores));
    }

    // Atualizar email no objeto usuarioOn
    usuarioOn.email = novoEmail;
    localStorage.setItem('usuarioOn', JSON.stringify(usuarioOn));

    // Atualizar exibição na tela
    bemvindo.innerHTML = `Bem vindo(a), ${novoNome}!`;
    dadosUsuario.innerHTML = `
      <h1>Informações Pessoais:</h1>
      <p><strong>Nome:</strong> ${novoNome}</p>
      <p><strong>CPF:</strong> ${novoCPF}</p>
      <p><strong>Data de Nascimento:</strong> ${novoNascimento}</p>
      <p><strong>Endereço:</strong> ${novoEndereco}</p>
      <p><strong>Bairro:</strong> ${novoBairro}</p>
      <p><strong>CEP:</strong> ${novoCEP}</p>
      <p><strong>Telefone:</strong> ${novoTelefone}</p>
      <p><strong>Email:</strong> ${novoEmail}</p>
    `;

    // Exibir novamente os elementos relevantes após edição
    dadosUsuario.style.display = 'block';
    formEdicao.style.display = 'none';
    botaoEditarInfo.style.display = 'block';
    botaoExcluirPerfil.style.display = 'block';
    botaoAlterarSenha.style.display = 'block';
  });
  // Evento para alterar senha
  botaoAlterarSenha.onclick = function() {
    formSenha.style.display = 'block';
    dadosUsuario.style.display = 'none';
    botaoEditarInfo.style.display = 'none';
    botaoExcluirPerfil.style.display = 'none';
    botaoAlterarSenha.style.display = 'none';
  };
  // Evento de submit do formulário de alteração de senha
  document.getElementById('formSenha').addEventListener('submit', function(event) {
    event.preventDefault();

    const senhaAtual = document.getElementById('senhaAtual').value;
    const senhaNova = document.getElementById('senhaNova').value;

    if (senhaAtual === usuarios[i].senha) {
      usuarios[i].senha = senhaNova;
      usuarioOn.senha = senhaNova;
      localStorage.setItem('usuarioOn', JSON.stringify(usuarioOn));
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      alert("Senha alterada com sucesso!");
      document.getElementById('senhaAtual').value = '';
      document.getElementById('senhaNova').value = '';
      formSenha.style.display = 'none';
      dadosUsuario.style.display = 'block';
      botaoEditarInfo.style.display = 'block';
      botaoExcluirPerfil.style.display = 'block';
      botaoAlterarSenha.style.display = 'block';
    }
    else if (senhaAtual === voluntarios[i].senha) {
      voluntarios[i].senha = senhaNova;
      usuarioOn.senha = senhaNova;
      localStorage.setItem('usuarioOn', JSON.stringify(usuarioOn));
      localStorage.setItem('voluntarios', JSON.stringify(voluntarios));
      alert("Senha alterada com sucesso!");
      document.getElementById('senhaAtual').value = '';
      document.getElementById('senhaNova').value = '';
      formSenha.style.display = 'none';
      dadosUsuario.style.display = 'block';
      botaoEditarInfo.style.display = 'block';
      botaoExcluirPerfil.style.display = 'block';
      botaoAlterarSenha.style.display = 'block';
    }
    else if (senhaAtual === doadores[i].senha) {
      doadores[i].senha = senhaNova;
      usuarioOn.senha = senhaNova;
      localStorage.setItem('usuarioOn', JSON.stringify(usuarioOn));
      localStorage.setItem('doadores', JSON.stringify(doadores));
      alert("Senha alterada com sucesso!");
      document.getElementById('senhaAtual').value = '';
      document.getElementById('senhaNova').value = '';
      formSenha.style.display = 'none';
      dadosUsuario.style.display = 'block';
      botaoEditarInfo.style.display = 'block';
      botaoExcluirPerfil.style.display = 'block';
      botaoAlterarSenha.style.display = 'block';
    }
    else {
      alert("Senha atual incorreta. Por favor, tente novamente.");
    }
  });
  // Evento para cancelar alteração de senha
  document.getElementById('cancelarSenha').addEventListener('click', function() {
    // Limpar campos do formulário
    document.getElementById('senhaAtual').value = '';
    document.getElementById('senhaNova').value = '';

    // Exibir novamente os elementos relevantes após cancelamento
    formSenha.style.display = 'none';
    dadosUsuario.style.display = 'block';
    botaoEditarInfo.style.display = 'block';
    botaoExcluirPerfil.style.display = 'block';
    botaoAlterarSenha.style.display = 'block';
  });
  // Evento para botão de excluir perfil
  botaoExcluirPerfil.onclick = function() {
    let confirmar = confirm("Você tem certeza que deseja excluir seu perfil?");
    if (confirmar) {
      localStorage.removeItem('usuarioOn');

      if (usuarioOn.tipo === 'Beneficiário') {
        let index = usuarios.findIndex(user => user.email === usuarioOn.email);
        if (index !== -1) usuarios.splice(index, 1);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
      } else if (usuarioOn.tipo === 'Voluntário') {
        let index = voluntarios.findIndex(user => user.email === usuarioOn.email);
        if (index !== -1) voluntarios.splice(index, 1);
        localStorage.setItem('voluntarios', JSON.stringify(voluntarios));
      } else if (usuarioOn.tipo === 'Doador') {
        let index = doadores.findIndex(user => user.email === usuarioOn.email);
        if (index !== -1) doadores.splice(index, 1);
        localStorage.setItem('doadores', JSON.stringify(doadores));
      }

      alert("Seu perfil foi excluído com sucesso!");
      window.location.href = '../index.html';
    }
  };
}
