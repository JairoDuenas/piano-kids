import { motion } from "motion/react";
import { cn } from "@/src/utils/utils";

export function PianoKey({
  note,
  label,
  isBlack,
  keyboardKey,
  isPressed,
  isHighlighted,
  color,
  onMouseDown,
  onMouseUp,
}) {
  return (
    <motion.div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={(e) => {
        e.preventDefault();
        onMouseDown();
      }}
      onTouchEnd={(e) => {
        e.preventDefault();
        onMouseUp();
      }}
      className={cn(
        "relative flex flex-col items-center justify-end pb-6 cursor-pointer select-none transition-colors",
        isBlack
          ? "w-[5%] h-32 -mx-[2.5%] z-10 rounded-b-md bg-zinc-900 border-x border-b border-zinc-700"
          : "flex-1 min-w-[30px] h-48 bg-white border border-zinc-200 rounded-b-lg shadow-sm",
        isPressed && (isBlack ? "bg-zinc-700" : "bg-zinc-100 shadow-inner"),
        isHighlighted &&
          !isPressed &&
          (isBlack
            ? "bg-zinc-800 border-amber-500"
            : "bg-amber-50 border-amber-300"),
      )}
      whileTap={{ scale: 0.98 }}
    >
      {/* Color Indicator for Real Piano Mapping */}
      <div
        className="absolute bottom-2 w-4 h-4 rounded-full shadow-sm"
        style={{ backgroundColor: color }}
      />

      <div
        className={cn(
          "text-xs font-medium mb-1",
          isBlack ? "text-zinc-500" : "text-zinc-400",
        )}
      >
        {label}
      </div>

      {isHighlighted && (
        <motion.div
          layoutId="highlight"
          className="absolute top-2 w-full h-1 bg-amber-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </motion.div>
  );
}
