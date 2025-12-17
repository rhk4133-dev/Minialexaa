document.addEventListener("DOMContentLoaded", () => {

  const talkBtn = document.getElementById("talkBtn");
  const log = document.getElementById("log");

  let recognition;
  let listening = false;

  function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-US";
    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
  }

  talkBtn.addEventListener("click", () => {

    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    if (listening) return;

    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
    listening = true;

    speak("I am ready. Speak now.");
    log.innerText = "Listening...";

    recognition.onresult = (event) => {
      const text = event.results[event.results.length - 1][0].transcript.toLowerCase();
      log.innerText = "You said: " + text;

      if (text.includes("hello")) speak("Hello bro");
      else if (text.includes("time")) speak(new Date().toLocaleTimeString());
      else if (text.includes("stop")) {
        speak("Stopping");
        recognition.stop();
        listening = false;
      }
      else speak("I heard you");
    };

    recognition.onerror = (e) => {
      console.error(e);
      listening = false;
    };

    recognition.start();
  });

});