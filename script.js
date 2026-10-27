// PERSONALIZE AQUI: nome da música, frases e comportamento dos botões.
const $ = (selector) => document.querySelector(selector);

const canvas = $("#stars");
const ctx = canvas.getContext("2d");
let stars = [];
let canvasWidth = 0;
let canvasHeight = 0;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const count = Math.min(150, Math.floor((canvasWidth * canvasHeight) / 9000));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    radius: Math.random() * 1.3 + 0.2,
    alpha: Math.random() * 0.6 + 0.15,
    speed: Math.random() * 0.006 + 0.002,
    phase: Math.random() * Math.PI * 2
  }));
}
function drawStars(time = 0) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  for (const star of stars) {
    const twinkle = 0.55 + Math.sin(time * star.speed + star.phase) * 0.45;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 218, 229, ${star.alpha * twinkle})`;
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}
resizeCanvas();
requestAnimationFrame(drawStars);
window.addEventListener("resize", resizeCanvas);

// Entrada suave dos elementos conforme a pessoa rola a página.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

$("#beginButton").addEventListener("click", () => {
  $("#memorias").scrollIntoView({ behavior: "smooth" });
});

// Música: navegadores exigem uma interação explícita antes de reproduzir áudio.
const audio = $("#loveSong");
const musicToggle = $("#musicToggle");
const musicLabel = $("#musicLabel");
const playButton = $("#playButton");
const playText = $("#playText");
const playIcon = $("#playIcon");
const vinyl = $(".vinyl");
const soundwave = $(".soundwave");
$("#trackTitle").textContent = "A nossa música"; // Troque pelo nome da música.

async function toggleMusic() {
  if (!audio.getAttribute("src") || audio.getAttribute("src").includes("nossa-musica.mp3") && audio.error) {
    return;
  }
  if (audio.paused) {
    try {
      await audio.play();
    } catch (error) {
      alert("Não foi possível tocar o áudio. Confira se o arquivo assets/nossa-musica.mp3 existe e está em formato MP3.");
    }
  } else {
    audio.pause();
  }
}
function updateMusicUI() {
  const playing = !audio.paused;
  musicToggle.setAttribute("aria-pressed", String(playing));
  musicLabel.textContent = playing ? "Pausar trilha sonora" : "Ligar trilha sonora";
  playText.textContent = playing ? "Pausar nossa música" : "Tocar nossa música";
  playIcon.textContent = playing ? "Ⅱ" : "▶";
  vinyl.classList.toggle("playing", playing);
  soundwave.classList.toggle("active", playing);
}
musicToggle.addEventListener("click", toggleMusic);
playButton.addEventListener("click", toggleMusic);
audio.addEventListener("play", updateMusicUI);
audio.addEventListener("pause", updateMusicUI);
audio.addEventListener("ended", updateMusicUI);

// Carta com abertura cinematográfica.
const letterPaper = $("#letterPaper");
const letterIntro = $(".letter-intro");
$("#openLetter").addEventListener("click", () => {
  letterPaper.classList.add("open");
  letterPaper.setAttribute("aria-hidden", "false");
  letterIntro.style.display = "none";
  letterPaper.scrollIntoView({ behavior: "smooth", block: "center" });
});
$("#closeLetter").addEventListener("click", () => {
  letterPaper.classList.remove("open");
  letterPaper.setAttribute("aria-hidden", "true");
  letterIntro.style.display = "block";
  letterIntro.scrollIntoView({ behavior: "smooth", block: "center" });
});

// Pequena surpresa final.
const surpriseMessages = [
  "Eu te amo, minha vida!!",
  "Você é tudo que eu sempre sonhei",
  "Obrigado por permitir com que eu te ame"
];
let surpriseIndex = 0;
$("#surpriseButton").addEventListener("click", () => {
  $("#surpriseMessage").textContent = surpriseMessages[surpriseIndex];
  surpriseIndex = (surpriseIndex + 1) % surpriseMessages.length;
});
