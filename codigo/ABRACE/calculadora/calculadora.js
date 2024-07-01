function calcularImpacto() {
  var tipoUsuario = document.getElementById('Sescolha').value;
  var valorDoacao = parseFloat(document.getElementById('Sdoacao').value);
  var horasVoluntariado = parseFloat(document.getElementById('Svoluntariado').value);

  // Validar se os campos foram preenchidos corretamente
  if (isNaN(valorDoacao) || valorDoacao <= 0) {
      alert("Por favor, informe um valor válido para a doação.");
      return;
  }

  if (isNaN(horasVoluntariado) || horasVoluntariado <= 0) {
      alert("Por favor, informe um número válido de horas de voluntariado.");
      return;
  }

  // Calcular o impacto
  var familiasBeneficiadas = valorDoacao * 3; 
  var cestasDistribuidas = horasVoluntariado * 0.7; 
  var impactoSaude = valorDoacao * 7; 
  var economiaGerada = horasVoluntariado * 15; 
  var reducaoDesperdicio = valorDoacao * 0.3; 

  // Calcular valores anuais
  var valorAnualDoacao = valorDoacao * 12;
  var valorAnualVoluntariado = horasVoluntariado * 12;

  // Atualizar os campos de resultado na tela
  document.getElementById('families').value = familiasBeneficiadas.toFixed(0);
  document.getElementById('baskets').value = cestasDistribuidas.toFixed(1);
  document.getElementById('health').value = impactoSaude.toFixed(2);
  document.getElementById('economy').value = economiaGerada.toFixed(2);
  document.getElementById('waste').value = reducaoDesperdicio.toFixed(2);
  document.getElementById('anualDoacao').value = valorAnualDoacao.toFixed(2);
  document.getElementById('anualVoluntariado').value = valorAnualVoluntariado.toFixed(2);
}

// Event listener para o botão de calcular
document.getElementById('Scalcular').addEventListener('click', function(event) {
  event.preventDefault(); // Impedir envio do formulário

  // Chamar o cálculo
  calcularImpacto();
});