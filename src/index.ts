import { InstrumentName, Player, instrument } from "soundfont-player";
import { observable, ObservableMap } from "mobx";
import INSTRUMENTS from "./constants/INSTRUMENTS";

export { InstrumentName, Player };

export const getAudioContext = () => {
  const AudioContext =
    // @ts-ignore
    window.AudioContext || // Default
    // @ts-ignore
    window.webkitAudioContext || // Safari and old versions of Chrome
    false;
  if (!AudioContext) {
    console.warn(
      "Sorry but the WebAudio API is not supported on this browser. Please consider using Chrome or Safari for the best experience "
    );
    return {};
    // throw new Error('PLATFORM_NOT_SUPPORTED');
  }
  return new AudioContext();
};

export type NotePlayer = {
  play: (
    noteName: string,
    opts?: {
      duration?: number;
      gain?: number;
      attack?: number;
      decay?: number;
      sustain?: number;
      release?: number;
      adsr?: [number, number, number, number];
      loop?: boolean;
    }
  ) => void;
  stop: (noteName?: string) => void;
};
const getInitialState = () => {
  const instruments = observable.map({}) as ObservableMap<
    InstrumentName,
    NotePlayer
  >;
  const playingNotes = observable.map({}) as ObservableMap<string, Player>;
  return { instruments, playingNotes };
};

export const getInstrumentNames = () => {
  return INSTRUMENTS;
};

export const getInstruments = async (instrumentNames: InstrumentName[]) => {
  const { instruments, playingNotes } = getInitialState();
  const ac = getAudioContext();
  const instrumentPlayers = await Promise.all(
    instrumentNames.map(name =>
      instrument(ac, name).then(player => {
        const play: NotePlayer["play"] = (noteName: string, options = {}) => {
          let audioNode = player.play(noteName);
          playingNotes.set(noteName, audioNode);
          if (!!options.duration) {
            audioNode.stop(ac.currentTime + options.duration / 1000);
          }
        };
        const stop = (noteName?: string, fadeOutDuration?: number) => {
          if (!!noteName && playingNotes.has(noteName)) {
            //@ts-ignore
            playingNotes.get(noteName).stop();
            playingNotes.delete(noteName);
          } else {
            player.stop();
          }
        };
        return { play, stop } as NotePlayer;
      })
    )
  );
  for (let i = 0; i < instrumentNames.length; i += 1) {
    instruments.set(instrumentNames[i], instrumentPlayers[i]);
  }
  return {
    instruments,
    playingNotes
  };
};
