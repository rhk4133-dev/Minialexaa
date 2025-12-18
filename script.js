const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("status");
const logBox = document.getElementById("log");

let recognition;
let stage = 0; // 0 = waiting anything, 1 = waiting name

function log(text) {
  logBox.innerHTML += text + "<br>";
  logBox.scrollTop = logBox.scrollHeight;
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
}

function initRecognition() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    statusText.textContent = "Listening...";
  };

  recognition.onresult = (event) => {
    const speech = event.results[0][0].transcript.trim();
    log("User: " + speech);

    if (stage === 0) {
      stage = 1;
      speak("What is your name?");
      setTimeout(() => recognition.start(), 1200);
    } else if (stage === 1) {
      const name = speech.split(" ")[0];
      speak(`Fuck you ${name}`);
      log("Assistant: Fuck you " + name);
      stage = 0;
    }
  };

  recognition.onerror = (e) => {
    statusText.textContent = "Error";
    console.error(e);
  };

  recognition.onend = () => {
    statusText.textContent = "Idle";
  };
}

startBtn.addEventListener("click", () => {
  if (!recognition) initRecognition();
  recognition.start();
});