import { useEffect, useRef, useState, useCallback } from "react";
import * as Tone from "tone";

export function usePiano() {
  const synthRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initialize synth with a piano-like sound
    const synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: "triangle",
      },
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.3,
        release: 1,
      },
    }).toDestination();

    synthRef.current = synth;
    setIsLoaded(true);

    return () => {
      synth.dispose();
    };
  }, []);

  const playNote = useCallback(async (note) => {
    if (Tone.context.state !== "running") {
      await Tone.start();
    }
    synthRef.current?.triggerAttackRelease(note, "4n");
  }, []);

  const stopNote = useCallback((note) => {
    synthRef.current?.triggerRelease(note);
  }, []);

  return { playNote, stopNote, isLoaded };
}
