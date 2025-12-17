let recognition;
let isListening = false;

const responses = [
  { keys: ["hello", "hi", "hey"], reply: "Hello! I am listening." },
  { keys: ["your name"], reply: "My name is Mini Alexa." },
  { keys: ["how are you"], reply: "I am doing great. Thank you for asking." },
  { keys: ["time"], reply: () => "The time is " + new Date().toLocaleTimeString() },
  { keys: ["date"], reply: () => "Today is " + new Date().toDateString() },
  { keys: ["open google"], reply: "Opening Google", action: () => window.open("https://google.com") },
  { keys: ["open youtube"], reply: "Opening YouTube", action: () => window.open("https://youtube.com") },
  { keys: ["who made you"], reply: "You created me using JavaScript." },
  { keys: ["stop"], reply: "Okay, I will stop listening.", stop: true }
];

const fallback = [
  "I didn’t understand that, but I’m listening.",
  "Can you say it differently?",
  "That sounds interesting.",
  "Try asking me about time or opening websites."
];

function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-US";
  speechSynthesis.speak(msg);
}

document.getElementById("talkBtn").onclick = () => {
  if (isListening) return;

  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.continuous = true;
  isListening = true;

  recognition.onresult = (event) => {
    const text = event.results[event.results.length - 1][0].transcript.toLowerCase();
    document.getElementById("log").innerText = "You said: " + text;
    handleCommand(text);
  };

  recognition.start();
  speak("I am ready. Speak now.");
};

function handleCommand(text) {
  for (let item of responses) {
    for (let key of item.keys) {
      if (text.includes(key)) {
        const reply = typeof item.reply === "function" ? item.reply() : item.reply;
        speak(reply);
        if (item.action) item.action();
        if (item.stop) {
          recognition.stop();
          isListening = false;
        }
        return;
      }
    }
  }

  speak(fallback[Math.floor(Math.random() * fallback.length)]);
}