let recognition;
let listening = false;

const talkBtn = document.getElementById("talkBtn");
const statusEl = document.getElementById("status");
const userTextEl = document.getElementById("userText");
const botTextEl = document.getElementById("botText");

const synth = window.speechSynthesis;

function speak(text) {
  synth.cancel();
  botTextEl.textContent = text;

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "kn-IN";
  utter.rate = 0.95;
  synth.speak(utter);
}

talkBtn.addEventListener("click", () => {
  if (!listening) startAssistant();
});

function startAssistant() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "kn-IN";
  recognition.continuous = true;

  recognition.onstart = () => {
    listening = true;
    statusEl.textContent = "ಸ್ಥಿತಿ: ಕೇಳುತ್ತಿದೆ...";
  };

  recognition.onresult = (event) => {
    const text =
      event.results[event.results.length - 1][0].transcript
        .toLowerCase()
        .trim();

    userTextEl.textContent = text;
    handleCommand(text);
  };

  recognition.onerror = () => {
    recognition.start();
  };

  recognition.onend = () => {
    if (listening) recognition.start();
  };

  recognition.start();

  // ✅ Speak AFTER mic starts (critical fix)
  setTimeout(() => {
    speak("ನಮಸ್ಕಾರ. ಈಗ ನೀವು ಮಾತನಾಡಬಹುದು.");
  }, 900);
}

function handleCommand(text) {

  if (text.includes("ನಮಸ್ಕಾರ") || text.includes("ಹಲೋ")) {
    reply([
      "ನಮಸ್ಕಾರ, ನಾನು ಕೇಳುತ್ತಿದ್ದೇನೆ",
      "ಹಲೋ, ಹೇಳಿ",
      "ನಮಸ್ಕಾರ"
    ]);
    return;
  }

  if (text.includes("ನಿನ್ನ ಹೆಸರು")) {
    speak("ನನ್ನ ಹೆಸರು ಮಿನಿ ಅಲೆಕ್ಸಾ");
    return;
  }

  if (text.includes("ಸಮಯ")) {
    speak("ಈಗಿನ ಸಮಯ " + new Date().toLocaleTimeString("kn-IN"));
    return;
  }

  if (text.includes("ದಿನಾಂಕ")) {
    speak("ಇಂದಿನ ದಿನಾಂಕ " + new Date().toLocaleDateString("kn-IN"));
    return;
  }

  if (text.includes("ನಿನ್ನನ್ನು ಯಾರು 만든ರು")) {
    speak("ನನ್ನನ್ನು ರಾಘವ್ ಅವರು ಜಾವಾಸ್ಕ್ರಿಪ್ಟ್ ಬಳಸಿ 만든ರು");
    return;
  }

  if (text.includes("ನಿನಗೆ ಕನ್ನಡ ಬರುತ್ತದಾ")) {
    speak("ಹೌದು, ನನಗೆ ಕನ್ನಡ ಬರುತ್ತದೆ");
    return;
  }

  reply([
    "ನಾನು ಇನ್ನೂ ಕಲಿಯುತ್ತಿದ್ದೇನೆ",
    "ಈ ಪ್ರಶ್ನೆಗೆ ನಾನು ಸಿದ್ಧವಾಗಿಲ್ಲ",
    "ದಯವಿಟ್ಟು ಬೇರೆ ಪ್ರಶ್ನೆ ಕೇಳಿ"
  ]);
}

function reply(list) {
  speak(list[Math.floor(Math.random() * list.length)]);
}