/// <reference types="vite/client" />

// types/env.d.ts
interface ImportMetaEnv {
  VITE_APP_Telegram_Script: string;
    // Agrega otras variables de entorno aquí
  }
  interface Window {
    SpeechRecognition?: typeof SpeechRecognition;
    webkitSpeechRecognition?: typeof SpeechRecognition;
  }
  