// PAINEL DE USUÁRIO
let botaoUsuario = document.getElementById("botaoUsuario");
let telaLogin = document.getElementById("login");
let botaoFecharMenu = document.getElementById("fecharMenu");

// Abrir e fechar painel do usuário
botaoUsuario.onclick = function() {
  telaLogin.style.display = 'block';
};
botaoFecharMenu.onclick = function() {
  telaLogin.style.display = 'none';
};

let botaoEntrar = document.getElementById("entrar");
let botaoSair = document.getElementById("fazerLogout");
let botaoSairADM = document.getElementById("fazerLogoutADM");
let logado = document.getElementById("logado");
let naologado = document.getElementById("naologado");

// BOTÕES E CAMPOS NECESSÁRIOS PARA O USUÁRIO
const dadosUsuario = document.getElementById('dadosUsuario');
const botoesacessousuario = document.getElementById('botoesacessousuario');
const botaoEditarInfo = document.getElementById('editarInfo');
const botaoExcluirPerfil = document.getElementById('excluirPerfil');
const botaoAlterarSenha = document.getElementById('alterarSenha');

// RESGATANTO DADOS DO LOCALSTORAGE
const usuario = JSON.parse(localStorage.getItem('usuario'));
const voluntario = JSON.parse(localStorage.getItem('voluntario'));
const doador = JSON.parse(localStorage.getItem('doador'));
// DADOS DE LOGIN
const admOn = JSON.parse(localStorage.getItem('admOn'));
const usuarioOn = JSON.parse(localStorage.getItem('usuarioOn'));

// VERIFICANDO SE O USUÁRIO ESTÁ LOGADO
if (!usuarioOn && !admOn) {
  logado.style.display = 'none';
  admdosistema.style.display = 'none';
  naologado.style.display = 'block';
}
else {
  if (admOn) {
    logado.style.display = 'none';
    admdosistema.style.display = 'block';
    naologado.style.display = 'none';
  } else {
    logado.style.display = 'block';
    admdosistema.style.display = 'none';
    naologado.style.display = 'none';
  }
}

// Realizar login como usuário da plataforma:
botaoEntrar.addEventListener('click', function(event) {
  event.preventDefault();
  const emailLogin = document.getElementById('emailLogin').value;
  const senhaLogin = document.getElementById('senhaLogin').value;
  const tipoDeCadastro = document.getElementById('tipoDeCadastro').value;

  switch (tipoDeCadastro) {
    case 'usuario':
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const usuarioEncontrado = usuarios.find(usuario => usuario.email === emailLogin && usuario.senha === senhaLogin);
      if (usuarioEncontrado) {
        localStorage.setItem('usuarioOn', JSON.stringify({ email: emailLogin, senha: senhaLogin, tipo: 'Beneficiário' }));
        naologado.style.display = 'none';
        logado.style.display = 'block';
        admdosistema.style.display = 'none';
        alert('Login bem-sucedido como Beneficiário!');
        window.location.href = '../usuario/usuario.html';
      } else {
        alert('E-mail ou senha incorretos para Beneficiário.');
      }
      break;

    case 'voluntario':
      const voluntarios = JSON.parse(localStorage.getItem('voluntarios')) || [];
      const voluntarioEncontrado = voluntarios.find(voluntario => voluntario.email === emailLogin && voluntario.senha === senhaLogin);
      if (voluntarioEncontrado) {
        localStorage.setItem('usuarioOn', JSON.stringify({ email: emailLogin, senha: senhaLogin, tipo: 'Voluntário' }));
        naologado.style.display = 'none';
        logado.style.display = 'block';
        admdosistema.style.display = 'none';
        alert('Login bem-sucedido como Voluntário!');
        window.location.href = '../usuario/usuario.html';
      } else {
        alert('E-mail ou senha incorretos para Voluntário.');
      }
      break;

    case 'doador':
      const doadores = JSON.parse(localStorage.getItem('doadores')) || [];
      const doadorEncontrado = doadores.find(doador => doador.email === emailLogin && doador.senha === senhaLogin);
      if (doadorEncontrado) {
        localStorage.setItem('usuarioOn', JSON.stringify({ email: emailLogin, senha: senhaLogin, tipo: 'Doador' }));
        naologado.style.display = 'none';
        logado.style.display = 'block';
        admdosistema.style.display = 'none';
        alert('Login bem-sucedido como Doador!');
        window.location.href = '../usuario/usuario.html';
      } else {
        alert('E-mail ou senha incorretos para Doador.');
      }
      break;

    case 'administrador':
      if (emailLogin === "admin@abrace.com" && senhaLogin === "admin") {
        localStorage.setItem('admOn', JSON.stringify({ email: emailLogin, senha: senhaLogin }));
        naologado.style.display = 'none';
        logado.style.display = 'none';
        admdosistema.style.display = 'block';
        alert('BEM VINDO ADMINISTRADOR DO ABRACE!');
        window.location.href = '../index.html';
      }
      break;

    default:
      alert('Tipo de cadastro inválido.');
      break;
  }
});

// Realizar logout
botaoSair.onclick = function() {
  localStorage.removeItem('usuarioOn');
  naologado.style.display = 'block';
  logado.style.display = 'none';
  admdosistema.style.display = 'none';
  document.getElementById('emailLogin').value = '';
  document.getElementById('senhaLogin').value = '';
  dadosUsuario.innerHTML = '<p>É necessário fazer Login.</p>';
  botoesacessousuario.style.display = 'none';
  botaoEditarInfo.style.display = 'none';
  botaoExcluirPerfil.style.display = 'none';
  botaoAlterarSenha.style.display = 'none';
  window.location.href = '../index.html';
};

// Realizar logout do ADM
botaoSairADM.onclick = function() {
  localStorage.removeItem('admOn');
  naologado.style.display = 'block';
  logado.style.display = 'none';
  admdosistema.style.display = 'none';
  document.getElementById('emailLogin').value = '';
  document.getElementById('senhaLogin').value = '';
  window.location.href = '../index.html';
};