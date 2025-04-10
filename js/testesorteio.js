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
  { numero: 13, nome: "Diana" }, // Primeiro ganhador fixo
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

// Inicialização das variáveis
const numerosSorteados = [13]; // Número da Diana já fixo como primeiro ganhador
const botaoSorteio2 = document.getElementById("botao2");
const resultado2 = document.getElementById("resultado2");

// Data do sorteio
const DATA_SORTEIO = new Date("2025-04-10T15:00:00");

// Verifica se já existe um ganhador do segundo prêmio
let ganhador2 = JSON.parse(localStorage.getItem("ganhador2"));

// Função para verificar se o horário do sorteio já chegou
function verificarHorarioSorteio() {
  return new Date() >= DATA_SORTEIO;
}

// Função para animar o sorteio
function animarSorteio() {
  let iteracoes = 0;
  const maxIteracoes = 30;
  let intervalo = 100;

  const animacao = setInterval(() => {
    const indiceAleatorio = Math.floor(Math.random() * participantes.length);
    const participante = participantes[indiceAleatorio];

    resultado2.innerHTML = `<h3>🎲 ${participante.numero} - ${participante.nome}</h3>`;

    iteracoes++;
    if (iteracoes >= maxIteracoes) {
      clearInterval(animacao);
      finalizarSorteio();
    }
  }, intervalo);
}

// Função para finalizar o sorteio
function finalizarSorteio() {
  let ganhador;
  do {
    const indiceAleatorio = Math.floor(Math.random() * participantes.length);
    ganhador = participantes[indiceAleatorio];
  } while (numerosSorteados.includes(ganhador.numero));

  // Salva o ganhador no localStorage
  localStorage.setItem("ganhador2", JSON.stringify(ganhador));

  // Atualiza a interface
  resultado2.innerHTML = `<h3>🎉 ${ganhador.numero} - ${ganhador.nome} 🎉</h3>`;
  resultado2.classList.add("final");
  botaoSorteio2.style.display = "none";

  // Dispara os confetes
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#FFB7C5", "#54C0EB", "#A8E6CE"],
  });
}

// Função para inicializar a página
function inicializarPagina() {
  if (!verificarHorarioSorteio()) {
    botaoSorteio2.disabled = true;
    botaoSorteio2.classList.add("locked");
    return;
  }

  if (ganhador2) {
    resultado2.innerHTML = `<h3>🎉 ${ganhador2.numero} - ${ganhador2.nome} 🎉</h3>`;
    resultado2.classList.add("final");
    botaoSorteio2.style.display = "none";
  }
}

// Event Listeners
botaoSorteio2.addEventListener("click", () => {
  if (!verificarHorarioSorteio()) {
    alert("O sorteio ainda não está liberado!");
    return;
  }

  botaoSorteio2.disabled = true;
  animarSorteio();
});

// Inicializa a página quando carregar
document.addEventListener("DOMContentLoaded", inicializarPagina);
