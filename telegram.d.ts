import { Telegram } from "@twa-dev/types"
declare global {
  interface Window {
    Telegram: Telegram;
  }
}

window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");