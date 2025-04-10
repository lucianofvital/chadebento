const participantes = [
  { numero: 1, nome: "Alex" },
  { numero: 2, nome: "Karlinha" },
  { numero: 3, nome: "Mainha" },
  { numero: 5, nome: "Haroldo" },
  { numero: 6, nome: "Klebersson" },
  { numero: 7, nome: "Pai Gilmar" },
  { numero: 8, nome: "Kleberson" },
  { numero: 9, nome: "Mirella" },
  { numero: 10, nome: "Paulinha" },
  { numero: 12, nome: "Pai Gilmar" },
  { numero: 13, nome: "Diana" },
  { numero: 17, nome: "Nilza" },
  { numero: 19, nome: "Rosangela Lucas" },
  { numero: 20, nome: "Miza" },
  { numero: 22, nome: "Patrícia Lucas" },
  { numero: 23, nome: "Gabi Lucas" },
  { numero: 24, nome: "Karlinha" },
  { numero: 25, nome: "André" },
  { numero: 26, nome: "Tia Patrícia" },
  { numero: 27, nome: "Mainha" },
  { numero: 28, nome: "João do padre" },
  { numero: 30, nome: "Geovana" },
  { numero: 31, nome: "Paulinha" },
  { numero: 33, nome: "Antônio Carlos" },
  { numero: 40, nome: "André" },
  { numero: 46, nome: "Antônio Carlos" },
];

// Recupera dados salvos ou inicializa arrays vazios
let numerosSorteados =
  JSON.parse(localStorage.getItem("numerosSorteados")) || [];
let resultadosSorteio = JSON.parse(
  localStorage.getItem("resultadosSorteio")
) || {
  premio1: null,
  premio2: null,
};

// Verifica se já passou da data do sorteio
function verificarHorarioSorteio() {
  const dataDoSorteio = new Date("2025-04-10T13:20:00");
  const agora = new Date();
  return agora >= dataDoSorteio;
}

// Verifica e mostra resultados anteriores
function verificarResultadosAnteriores() {
  const botao1 = document.getElementById("botao1");
  const botao2 = document.getElementById("botao2");
  const resultado1 = document.getElementById("resultado1");
  const resultado2 = document.getElementById("resultado2");

  if (resultadosSorteio.premio1) {
    botao1.style.display = "none";
    mostrarResultadoSalvo(resultado1, resultadosSorteio.premio1);
  }

  if (resultadosSorteio.premio2) {
    botao2.style.display = "none";
    mostrarResultadoSalvo(resultado2, resultadosSorteio.premio2);
  }

  // Desabilita botões se não estiver na hora do sorteio
  if (!verificarHorarioSorteio()) {
    botao1.disabled = true;
    botao2.disabled = true;
    return false;
  }
}

function mostrarResultadoSalvo(elemento, ganhador) {
  elemento.classList.add("final");
  elemento.textContent = `🏆 ${ganhador.numero} - ${ganhador.nome} 🏆`;
}

function iniciarSorteio(botaoId, resultadoId, premioNumero) {
  if (!verificarHorarioSorteio()) {
    alert("O sorteio ainda não foi liberado!");
    return;
  }

  const botao = document.getElementById(botaoId);
  const resultado = document.getElementById(resultadoId);

  // Verifica se já foi sorteado
  if (resultadosSorteio[`premio${premioNumero}`]) {
    alert("Este prêmio já foi sorteado!");
    return;
  }

  botao.style.display = "none";
  resultado.classList.add("animando");

  let velocidade = 100;
  let iteracoes = 0;
  const maxIteracoes = 30;

  const roleta = setInterval(() => {
    const indice = Math.floor(Math.random() * participantes.length);
    const participante = participantes[indice];
    resultado.textContent = `${participante.numero} - ${participante.nome}`;

    iteracoes++;
    velocidade += 10;

    if (iteracoes >= maxIteracoes) {
      clearInterval(roleta);
      finalizarSorteio(resultado, premioNumero);
    }
  }, velocidade);
}

function finalizarSorteio(resultado, premioNumero) {
  let ganhador;
  do {
    const indice = Math.floor(Math.random() * participantes.length);
    ganhador = participantes[indice];
  } while (numerosSorteados.includes(ganhador.numero));

  numerosSorteados.push(ganhador.numero);
  resultadosSorteio[`premio${premioNumero}`] = ganhador;

  // Salva os resultados no localStorage
  localStorage.setItem("numerosSorteados", JSON.stringify(numerosSorteados));
  localStorage.setItem("resultadosSorteio", JSON.stringify(resultadosSorteio));

  resultado.classList.remove("animando");
  resultado.classList.add("final");
  resultado.textContent = `🎉 ${ganhador.numero} - ${ganhador.nome} 🎉`;

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#FFB7C5", "#54C0EB", "#A8E6CE"],
  });
}

// Event Listeners
document.getElementById("botao1").addEventListener("click", () => {
  iniciarSorteio("botao1", "resultado1", 1);
});

document.getElementById("botao2").addEventListener("click", () => {
  iniciarSorteio("botao2", "resultado2", 2);
});

// Verifica resultados anteriores quando a página carrega
document.addEventListener("DOMContentLoaded", verificarResultadosAnteriores);
