// Configuração do sorteio
const dataDoSorteio = new Date("2025-04-15T15:00:00");
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

let numerosSorteados = [];

// Elementos do DOM
const diasEl = document.getElementById("dias");
const horasEl = document.getElementById("horas");
const minutosEl = document.getElementById("minutos");
const segundosEl = document.getElementById("segundos");
const botao1 = document.getElementById("sortear-premio-1");
const botao2 = document.getElementById("sortear-premio-2");
const resultado1 = document.getElementById("resultado-1");
const resultado2 = document.getElementById("resultado-2");

// Atualização do contador regressivo
function atualizarContagem() {
  const agora = new Date();
  const tempoRestante = dataDoSorteio - agora;

  if (tempoRestante <= 0) {
    [diasEl, horasEl, minutosEl, segundosEl].forEach(
      (el) => (el.textContent = "00")
    );
    [botao1, botao2].forEach((btn) => (btn.disabled = false));
    return;
  }

  const dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));
  const horas = Math.floor(
    (tempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutos = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((tempoRestante % (1000 * 60)) / 1000);

  diasEl.textContent = String(dias).padStart(2, "0");
  horasEl.textContent = String(horas).padStart(2, "0");
  minutosEl.textContent = String(minutos).padStart(2, "0");
  segundosEl.textContent = String(segundos).padStart(2, "0");
}

// Função para sortear um número não repetido
function sortearNumero() {
  let numeroDisponivel;
  do {
    numeroDisponivel = Math.floor(Math.random() * participantes.length) + 1;
  } while (numerosSorteados.includes(numeroDisponivel));

  numerosSorteados.push(numeroDisponivel);
  return participantes.find((p) => p.numero === numeroDisponivel);
}

// Animação de rolagem
function animarRolagem(elemento, callback) {
  elemento.classList.add("animating");
  let contagem = 0;
  const totalIteracoes = 20;
  const intervalo = setInterval(() => {
    const numeroTemp = Math.floor(Math.random() * participantes.length) + 1;
    const participanteTemp = participantes.find((p) => p.numero === numeroTemp);
    elemento.textContent = `🎲 ${participanteTemp.numero} - ${participanteTemp.nome}`;

    contagem++;
    if (contagem >= totalIteracoes) {
      clearInterval(intervalo);
      elemento.classList.remove("animating");
      callback();
    }
  }, 100);
}

// Função para mostrar o ganhador
function mostrarGanhador(ganhador, elemento) {
  elemento.classList.add("winner");
  elemento.textContent = `🎉 ${ganhador.numero} - ${ganhador.nome} 🎉`;
  dispararConfetes();
}

// Efeito de confetes
function dispararConfetes() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#FFB7C5", "#54C0EB", "#A8E6CE"],
  });
}

// Event listeners para os botões
botao1.addEventListener("click", () => {
  botao1.disabled = true;
  const ganhador = sortearNumero();
  animarRolagem(resultado1, () => mostrarGanhador(ganhador, resultado1));
});

botao2.addEventListener("click", () => {
  botao2.disabled = true;
  const ganhador = sortearNumero();
  animarRolagem(resultado2, () => mostrarGanhador(ganhador, resultado2));
});

// Iniciar o contador
setInterval(atualizarContagem, 1000);
atualizarContagem();
