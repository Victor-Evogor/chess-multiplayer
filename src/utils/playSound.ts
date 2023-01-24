import { Sound } from "../types/Sound";
import alert from "../sound/alert.mp3";
import move from "../sound/move.mp3";
import newAlert from "../sound/new-alert.mp3";
import capture from "../sound/capture.mp3";

export const playSound = (sound: Sound) => {
  const sounds = new Map<Sound, string>([
    ["alert", alert],
    ["capture", capture],
    ["move", move],
    ["new alert", newAlert],
  ]);
  const audio = new Audio(sounds.get(sound));
  audio.play();
};
