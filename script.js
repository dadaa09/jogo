
const perguntas = [
  {
    pergunta: "Quanto é 8 × 7?",
    alternativas: ["54", "56", "64", "48"],
    correta: "56"
  },
  {
    pergunta: "Quanto é 45 ÷ 5?",
    alternativas: ["8", "10", "9", "7"],
    correta: "9"
  },
  {
    pergunta: "Qual é o resultado de 125 + 75?",
    alternativas: ["190", "210", "200", "180"],
    correta: "200"
  },
  {
    pergunta: "Qual fração representa a metade?",
    alternativas: ["1/3", "1/4", "2/3", "1/2"],
    correta: "1/2"
  },
  {
    pergunta: "Um quadrado tem lados de 6 cm. Qual é seu perímetro?",
    alternativas: ["12 cm", "24 cm", "36 cm", "18 cm"],
    correta: "24 cm"
  }
];

const personagem = document.getElementById("personagem");
const obstaculo = document.getElementById("obstaculo");
const pontosTexto = document.getElementById("pontos");
const etapaTexto = document.getElementById("etapa");
const mensagem = document.getElementById("mensagem");

const telaInicio = document.getElementById("telaInicio");
const telaPergunta = document.getElementById("telaPergunta");
const telaFinal = document.getElementById("telaFinal");

const perguntaTexto = document.getElementById("pergunta");
const alternativasDiv = document.getElementById("alternativas");
const feedback = document.getElementById("feedback");

const btnIniciar = document.getElementById("btnIniciar");
const btnReiniciar = document.getElementById("btnReiniciar");
const resultadoFinal = document.getElementById("resultadoFinal");

let etapa = 0;
let pontos = 0;
let respondendo = false;

function mostrarTela(telaVisivel) {
  [telaInicio, telaPergunta, telaFinal].forEach(tela => {
    tela.classList.add("escondida");
  });

  telaVisivel.classList.remove("escondida");
}

function atualizarPainel() {
  pontosTexto.textContent = pontos;
  etapaTexto.textContent = Math.min(etapa + 1, perguntas.length);
}

function iniciarJogo() {
  etapa = 0;
  pontos = 0;
  respondendo = false;

  personagem.style.left = "5%";
  obstaculo.style.display = "block";
  obstaculo.style.left = "55%";
  obstaculo.textContent = "🪨";

  mensagem.textContent = "Encontre o obstáculo e responda!";
  atualizarPainel();
  mostrarTela(telaPergunta);
  mostrarPergunta();
}

function mostrarPergunta() {
  respondendo = false;

  if (etapa >= perguntas.length) {
    finalizarJogo();
    return;
  }

  const atual = perguntas[etapa];

  perguntaTexto.textContent = atual.pergunta;
  alternativasDiv.innerHTML = "";
  feedback.textContent = "";

  atual.alternativas.forEach(alternativa => {
    const botao = document.createElement("button");
    botao.textContent = alternativa;

    botao.addEventListener("click", () => {
      verificarResposta(alternativa, botao);
    });

    alternativasDiv.appendChild(botao);
  });

  atualizarPainel();
}

function verificarResposta(resposta, botaoClicado) {
  if (respondendo) return;

  respondendo = true;

  const atual = perguntas[etapa];
  const botoes = alternativasDiv.querySelectorAll("button");

  botoes.forEach(botao => {
    botao.disabled = true;

    if (botao.textContent === atual.correta) {
      botao.classList.add("correta");
    }
  });

  if (resposta === atual.correta) {
    pontos += 10;
    pontosTexto.textContent = pontos;

    feedback.textContent = "🎉 Muito bem! Você passou pelo obstáculo!";
    mensagem.textContent = "Resposta correta! Avançando...";
    personagem.style.left = `${Math.min(12 + etapa * 17, 82)}%`;
    obstaculo.textContent = "✨";
    botaoClicado.classList.add("correta");

    setTimeout(() => {
      etapa++;
      atualizarPainel();

      if (etapa >= perguntas.length) {
        finalizarJogo();
      } else {
        personagem.style.left = `${Math.min(5 + etapa * 17, 73)}%`;
        obstaculo.style.left = `${Math.min(55 + etapa * 4, 78)}%`;
        obstaculo.textContent = "🪨";
        mostrarPergunta();
      }
    }, 1200);
  } else {
    botaoClicado.classList.add("errada");

    feedback.textContent = "❌ Resposta errada! Vamos recomeçar!";
    mensagem.textContent = "Ops! Você voltou ao início da trilha.";

    personagem.style.left = "5%";
    obstaculo.style.left = "55%";
    obstaculo.textContent = "🪨";

    setTimeout(() => {
      etapa = 0;
      atualizarPainel();
      mostrarPergunta();
    }, 1800);
  }
}

function finalizarJogo() {
  respondendo = false;

  personagem.style.left = "85%";
  obstaculo.style.display = "none";

  mensagem.textContent = "Você chegou ao destino!";
  resultadoFinal.textContent =
    `Parabéns! Você completou a aventura e fez ${pontos} pontos!`;

  mostrarTela(telaFinal);
}

btnIniciar.addEventListener("click", iniciarJogo);
btnReiniciar.addEventListener("click", iniciarJogo);
