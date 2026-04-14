export const NOTE_COLORS = {
  C: "#ef4444", // Red
  D: "#f97316", // Orange
  E: "#eab308", // Yellow
  F: "#22c55e", // Green
  G: "#3b82f6", // Blue
  A: "#6366f1", // Indigo
  B: "#a855f7", // Violet
};

export const getNoteColor = (note) => {
  const baseNote = note.charAt(0);
  return NOTE_COLORS[baseNote] || "#94a3b8";
};

export const PIANO_KEYS = [
  {
    note: "C4",
    label: "Do",
    isBlack: false,
    keyboardKey: "a",
    color: NOTE_COLORS["C"],
  },
  {
    note: "C#4",
    label: "Do#",
    isBlack: true,
    keyboardKey: "w",
    color: NOTE_COLORS["C"],
  },
  {
    note: "D4",
    label: "Re",
    isBlack: false,
    keyboardKey: "s",
    color: NOTE_COLORS["D"],
  },
  {
    note: "D#4",
    label: "Re#",
    isBlack: true,
    keyboardKey: "e",
    color: NOTE_COLORS["D"],
  },
  {
    note: "E4",
    label: "Mi",
    isBlack: false,
    keyboardKey: "d",
    color: NOTE_COLORS["E"],
  },
  {
    note: "F4",
    label: "Fa",
    isBlack: false,
    keyboardKey: "f",
    color: NOTE_COLORS["F"],
  },
  {
    note: "F#4",
    label: "Fa#",
    isBlack: true,
    keyboardKey: "t",
    color: NOTE_COLORS["F"],
  },
  {
    note: "G4",
    label: "Sol",
    isBlack: false,
    keyboardKey: "g",
    color: NOTE_COLORS["G"],
  },
  {
    note: "G#4",
    label: "Sol#",
    isBlack: true,
    keyboardKey: "y",
    color: NOTE_COLORS["G"],
  },
  {
    note: "A4",
    label: "La",
    isBlack: false,
    keyboardKey: "h",
    color: NOTE_COLORS["A"],
  },
  {
    note: "A#4",
    label: "La#",
    isBlack: true,
    keyboardKey: "u",
    color: NOTE_COLORS["A"],
  },
  {
    note: "B4",
    label: "Si",
    isBlack: false,
    keyboardKey: "j",
    color: NOTE_COLORS["B"],
  },
  {
    note: "C5",
    label: "Do",
    isBlack: false,
    keyboardKey: "k",
    color: NOTE_COLORS["C"],
  },
  {
    note: "C#5",
    label: "Do#",
    isBlack: true,
    keyboardKey: "o",
    color: NOTE_COLORS["C"],
  },
  {
    note: "D5",
    label: "Re",
    isBlack: false,
    keyboardKey: "l",
    color: NOTE_COLORS["D"],
  },
  {
    note: "D#5",
    label: "Re#",
    isBlack: true,
    keyboardKey: "p",
    color: NOTE_COLORS["D"],
  },
  {
    note: "E5",
    label: "Mi",
    isBlack: false,
    keyboardKey: ";",
    color: NOTE_COLORS["E"],
  },
  {
    note: "F5",
    label: "Fa",
    isBlack: false,
    keyboardKey: "z",
    color: NOTE_COLORS["F"],
  },
  {
    note: "F#5",
    label: "Fa#",
    isBlack: true,
    keyboardKey: "x",
    color: NOTE_COLORS["F"],
  },
  {
    note: "G5",
    label: "Sol",
    isBlack: false,
    keyboardKey: "c",
    color: NOTE_COLORS["G"],
  },
  {
    note: "G#5",
    label: "Sol#",
    isBlack: true,
    keyboardKey: "v",
    color: NOTE_COLORS["G"],
  },
  {
    note: "A5",
    label: "La",
    isBlack: false,
    keyboardKey: "b",
    color: NOTE_COLORS["A"],
  },
  {
    note: "A#5",
    label: "La#",
    isBlack: true,
    keyboardKey: "n",
    color: NOTE_COLORS["A"],
  },
  {
    note: "B5",
    label: "Si",
    isBlack: false,
    keyboardKey: "m",
    color: NOTE_COLORS["B"],
  },
  {
    note: "C6",
    label: "Do",
    isBlack: false,
    keyboardKey: ",",
    color: NOTE_COLORS["C"],
  },
];
