function carregaList() {
  var select = document.getElementById("selectCidades");
  var nomeCidade = document.getElementById("nomeCidade").value;

  if (nomeCidade == null || nomeCidade == "") {
    alert("Preencha o nome da cidade cidade!");
    return;
  }

  $.ajax({
    dataType: "xml",
    url: "http://servicos.cptec.inpe.br/XML/listaCidades?city=" + nomeCidade,
  }).then(function (data) {

    $(data)
      .find("cidade")
      .each(function () {
        select.append(new Option($(this).find("nome").text() + "/" + $(this).find("uf").text(), $(this).find("id").text()));
      });
  });
}

function requestCidades(select) {
  var idSelecionado = select.options[select.selectedIndex].value;

  if (idSelecionado == 0) {
    alert("Preencha a cidade!");
    return;
  }

  $.ajax({
    dataType: "xml",
    url: "http://servicos.cptec.inpe.br/XML/cidade/7dias/" +
      idSelecionado +
      "/previsao.xml",
  }).then(function (data) {

    var cidadeUF = '';

    $(data)
      .find("cidade")
      .each(function () {
        var _name = $(this).find('nome').text();
        var _uf = ' / ' + $(this).find('uf').text();
        cidadeUF = _name + _uf;
      });

    var _dias = [];
    $(data)
      .find("dia")
      .each(function () {
        _dias.push($(this).text());
      });

    var _maxs = [];
    $(data)
      .find("maxima")
      .each(function () {
        _maxs.push($(this).text());
      });

    var _mins = [];
    $(data)
      .find("minima")
      .each(function () {
        _mins.push($(this).text());
      });

    var _tempos = [];
    $(data)
      .find("tempo")
      .each(function () {
        _tempos.push($(this).text());
      });
    $('#forecast-container').empty();
    for (let i = 0; i < _dias.length; i++) {
      if (i === 0) {
        var cardToday = `
          <div class="today forecast">
            <div class="forecast-header">
              <div class="day">${getTempo(_tempos[i])}</div>
              <div class="date">${_dias[i]}</div>
            </div>
            <div class="forecast-content">
              <div class="location">
                ${cidadeUF}
              </div>
              <div class="degree">
                <div class="num">${_maxs[i]}<sup>o</sup>C</div>
                <div class="forecast-icon">
                  <img src="images/${getIconeTempo(_tempos[i])}.svg" width=90>
                </div>
              </div>
            </div>
          </div>
        `;
        $('#forecast-container').append(cardToday);
      } else {
        var card = `
          <div class="forecast">
            <div class="forecast-header">
              <div class="day">${_dias[i]}</div>
            </div>
            <div class="forecast-content">
              <div class="forecast-icon">
                <img src="images/${getIconeTempo(_tempos[i])}.svg" width=48>
              </div>
              <div class="degree">⬆ ${_maxs[i]}<sup>o</sup>C</div>
              <small>⬇ ${_mins[i]}<sup>o</sup></small>
            </div>
          </div>
        `;

        $('#forecast-container').append(card);
      }
    }
  });


  function getTempo(sigla) {
    var mapTempo = {
      // Icone chuva
      "c": "Chuva",
      "in": "Instável",
      "ci": "Chuvas Isoladas",
      "cm": "Chuva pela Manhã",
      "cn": "Chuva a Noite",
      "ec": "Encoberto com Chuvas Isoladas",
      "pp": "Poss. de Pancadas de Chuva",
      "ppn": "Poss. de Panc. de Chuva a Noite",
      "ppt": "Poss. de Panc. de Chuva a Tarde",
      "ppm": "Poss. de Panc. de Chuva pela Manhã",
      "pnt": "Pancadas de Chuva a Noite",
      "psc": "Possibilidade de Chuva",
      "pcm": "Possibilidade de Chuva pela Manhã",
      "pct": "Possibilidade de Chuva a Tarde",
      "pcn": "Possibilidade de Chuva a Noite",
      "pt": "Pancadas de Chuva a Tarde",
      "pm": "Pancadas de Chuva pela Manhã",
      "np": "Nublado e Pancadas de Chuva",
      "pc": "Pancadas de Chuva",
      "cv": "Chuvisco",
      "ch": "Chuvoso",
      "t": "Tempestade",
      "npt": "Nublado com Pancadas a Tarde",
      "npn": "Nublado com Pancadas a Noite",
      "npm": "Nublado com Pancadas pela Manhã",
      "ct": "Chuva a Tarde",
      "g": "Geada",
      "ne": "Neve",

      "pn": "Parcialmente Nublado",
      "e": "Encoberto",
      "n": "Nublado",
      "nv": "Nevoeiro",
      "ncn": "Nublado com Poss. de Chuva a Noite",
      "nct": "Nublado com Poss. de Chuva a Tarde",
      "ncm": "Nubl. c/ Poss. de Chuva pela Manhã",
      "npp": "Nublado com Possibilidade de Chuva",
      "vn": "Variação de Nebulosidade",

      "ps": "Predomínio de Sol",
      "cl": "Céu Claro",
      "nd": "Não Definido",
    }

    return mapTempo[sigla];
  }

  function getIconeTempo(sigla) {
    var mapTempo = {
      "c": "chuvoso",
      "in": "chuvoso",
      "ci": "chuvoso",
      "cm": "chuvoso",
      "cn": "chuvoso",
      "ec": "chuvoso",
      "pp": "chuvoso",
      "ppn": "chuvoso",
      "ppt": "chuvoso",
      "ppm": "chuvoso",
      "pnt": "chuvoso",
      "psc": "chuvoso",
      "pcm": "chuvoso",
      "pct": "chuvoso",
      "pcn": "chuvoso",
      "pt": "chuvoso",
      "pm": "chuvoso",
      "np": "chuvoso",
      "pc": "chuvoso",
      "cv": "chuvoso",
      "ch": "chuvoso",
      "t": "chuvoso",
      "npt": "chuvoso",
      "npn": "chuvoso",
      "npm": "chuvoso",
      "ct": "chuvoso",
      "g": "chuvoso",
      "ne": "chuvoso",

      "pn": "nublado",
      "e": "nublado",
      "n": "nublado",
      "nv": "nublado",
      "ncn": "nublado",
      "nct": "nublado",
      "ncm": "nublado",
      "npp": "nublado",
      "vn": "nubladoe",

      "ps": "ensolarado",
      "cl": "ensolarado",
      "nd": "ensolarado",
    }

    return mapTempo[sigla];
  }

}