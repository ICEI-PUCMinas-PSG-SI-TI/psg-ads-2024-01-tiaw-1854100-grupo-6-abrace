const campanhas = [
  {
      id: 1,
      nome: 'Campanha Produto Solidário',
      descricao: 'Marcas apoiadoras repassam um percentual dos produtos participantes, adquiridos pelos consumidores apoiadores do projeto ABRACE.',
      status: 'ativa',
      dataInicio: '2023-06-20',
      dataFim: '2023-08-27'
  },
  {
      id: 2,
      nome: 'Campanha Natal Solidário',
      descricao: 'Doando alimentos e brinquedos você pode fazer o natal de alguém muito melhor. Dê este presente no Natal! Participe você também!',
      status: 'ativa',
      dataInicio: '2023-06-20',
      dataFim: '2023-08-27'
  },
  {
      id: 3,
      nome: 'Campanha Volta às Aulas',
      descricao: 'Todo ínicio de ano as crianças necessitam de todo apoio para começarem bem o ano letivo. Doe e ajude o projeto a beneficiar o retorno às aulas das crianças.',
      status: 'inativa',
      dataInicio: '2023-06-20',
      dataFim: '2023-08-27'
  }
];

$(document).ready(function () {
  $('.editarCamp').on('click', function (e) {
      e.preventDefault();
      const campanhaId = $(this).closest('.col').index() + 1; // Supondo que a ordem no HTML corresponde ao ID
      const campanha = campanhas.find(c => c.id === campanhaId);

      $('#campanhaId').val(campanha.id);
      $('#campanhaNome').val(campanha.nome);
      $('#campanhaDescricao').val(campanha.descricao);
      $('#campanhaStatus').val(campanha.status);
      $('#campanhaDataInicio').val(campanha.dataInicio);
      $('#campanhaDataFim').val(campanha.dataFim);

      $('#editarCampanhaModal').modal('show');
  });

  $('#formEditarCampanha').on('submit', function (e) {
      e.preventDefault();
      const id = parseInt($('#campanhaId').val());
      const nome = $('#campanhaNome').val();
      const descricao = $('#campanhaDescricao').val();
      const status = $('#campanhaStatus').val();
      const dataInicio = $('#campanhaDataInicio').val();
      const dataFim = $('#campanhaDataFim').val();

      const index = campanhas.findIndex(c => c.id === id);
      if (index !== -1) {
          campanhas[index] = {
              id,
              nome,
              descricao,
              status,
              dataInicio,
              dataFim
          };

          atualizarInterface();
          $('#editarCampanhaModal').modal('hide');
      }
  });

  function atualizarInterface() {
      $('.col').each(function (index) {
          const campanha = campanhas[index];
          $(this).find('.card-titulo').text(campanha.nome);
          $(this).find('.card-text').text(campanha.descricao);
          $(this).find('.ativo, .inativo').text(campanha.status === 'ativa' ? 'Ativa' : 'Inativa');
          $(this).find('.ativo, .inativo').toggleClass('ativo', campanha.status === 'ativa').toggleClass('inativo', campanha.status === 'inativa');
          $(this).find('.data-inicio').text(`Data de Início: ${campanha.dataInicio}`);
          $(this).find('.data-fim').text(`Data de Fim: ${campanha.dataFim}`);
      });
  }

  atualizarInterface();
});
