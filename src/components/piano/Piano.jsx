import { useState, useEffect, useCallback } from "react";
import { PianoKey } from "./PianoKey";
import { PIANO_KEYS } from "@/src/data/constants";
import { usePiano } from "@/src/hooks/usePiano";

export function Piano({ highlightedNote, onNotePlayed }) {
  const { playNote, stopNote } = usePiano();
  const [pressedKeys, setPressedKeys] = useState(new Set());

  const handleNoteDown = useCallback(
    (note) => {
      setPressedKeys((prev) => new Set(prev).add(note));
      playNote(note);
      onNotePlayed?.(note);
    },
    [playNote, onNotePlayed],
  );

  const handleNoteUp = useCallback(
    (note) => {
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(note);
        return next;
      });
      stopNote(note);
    },
    [stopNote],
  );

  useEffect(() => {
    // Keyboard listeners removed to focus on real piano practice as requested
    return () => {};
  }, []);

  return (
    <div className="w-full p-4 md:p-8 bg-zinc-50 rounded-2xl shadow-xl border border-zinc-200">
      <div className="flex relative w-full h-full min-h-[200px]">
        {PIANO_KEYS.map((key) => (
          <PianoKey
            key={key.note}
            note={key.note}
            label={key.label}
            isBlack={key.isBlack}
            keyboardKey={key.keyboardKey}
            color={key.color}
            isPressed={pressedKeys.has(key.note)}
            isHighlighted={highlightedNote === key.note}
            onMouseDown={() => handleNoteDown(key.note)}
            onMouseUp={() => handleNoteUp(key.note)}
          />
        ))}
      </div>
    </div>
  );
}
