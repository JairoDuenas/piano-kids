import { useEffect, useRef, useState } from "react";
import { PIANO_KEYS, getNoteColor } from "@/src/data/constants";
import { motion } from "motion/react";

export function NoteRain({ lesson, isPlaying, currentTime, onNoteActive }) {
  const containerRef = useRef(null);
  const [visibleNotes, setVisibleNotes] = useState([]);

  // Note rain configuration
  const FALL_DURATION = 3; // seconds for a note to reach the bottom

  useEffect(() => {
    if (!isPlaying) {
      setVisibleNotes([]);
      return;
    }

    // Calculate which notes should be visible based on current time
    const notes = lesson.steps.map((step, index) => {
      const startTime = step.startTime ?? index * 1.5;
      return { ...step, startTime, id: `${step.note}-${index}` };
    });

    const active = notes.filter((note) => {
      const timeToStart = note.startTime - currentTime;
      return timeToStart > -0.5 && timeToStart < FALL_DURATION;
    });

    setVisibleNotes(active);

    // Find if any note is currently "hitting" the piano
    const hittingNote = active.find((note) => {
      const diff = Math.abs(note.startTime - currentTime);
      return diff < 0.1;
    });

    onNoteActive?.(hittingNote ? hittingNote.note : null);
  }, [currentTime, isPlaying, lesson, onNoteActive]);

  const getNoteX = (note) => {
    const keyIndex = PIANO_KEYS.findIndex((k) => k.note === note);
    if (keyIndex === -1) return 0;
    return (keyIndex / PIANO_KEYS.length) * 100;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] bg-zinc-900/5 rounded-t-2xl overflow-hidden border-x border-t border-zinc-200"
    >
      {/* Grid Lines for Reference */}
      <div className="absolute inset-0 flex">
        {PIANO_KEYS.map((key, i) => (
          <div
            key={i}
            className="h-full border-r border-zinc-200/30"
            style={{ width: `${100 / PIANO_KEYS.length}%` }}
          />
        ))}
      </div>

      {/* Falling Notes */}
      {visibleNotes.map((note) => {
        const timeToStart = note.startTime - currentTime;
        const progress = 1 - timeToStart / FALL_DURATION;
        const y = progress * 100;

        return (
          <motion.div
            key={note.id}
            initial={false}
            animate={{
              top: `${y}%`,
              opacity: timeToStart < 0 ? 0 : 1,
            }}
            transition={{ duration: 0.1, ease: "linear" }}
            className="absolute w-8 h-12 rounded-lg shadow-lg flex items-center justify-center text-white font-bold text-xs"
            style={{
              left: `${getNoteX(note.note)}%`,
              backgroundColor: getNoteColor(note.note),
              width: `${100 / PIANO_KEYS.length}%`,
              marginLeft: "2px",
              marginRight: "2px",
            }}
          >
            {PIANO_KEYS.find((k) => k.note === note.note)?.label ||
              note.note.replace(/\d/, "")}
          </motion.div>
        );
      })}

      {/* Hit Line */}
      <div className="absolute bottom-0 w-full h-1 bg-amber-500 shadow-[0_-4px_10px_rgba(245,158,11,0.5)]" />
    </div>
  );
}
