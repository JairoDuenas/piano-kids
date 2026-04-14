import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import * as Tone from "tone";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        // Check if there's an update available
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.onstatechange = () => {
              if (installingWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  // New content is available; please refresh.
                  console.log("New content is available; please refresh.");
                  window.location.reload();
                }
              }
            };
          }
        };
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed: ", err);
      });
  });
}

// Resume AudioContext on first user interaction to clear warnings
const resumeAudio = async () => {
  if (Tone.context.state !== "running") {
    await Tone.start();
    console.log("AudioContext resumed");
  }
  window.removeEventListener("click", resumeAudio);
  window.removeEventListener("touchstart", resumeAudio);
};

window.addEventListener("click", resumeAudio);
window.addEventListener("touchstart", resumeAudio);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
