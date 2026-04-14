import { useState, useEffect, useRef } from "react";
import { Piano } from "../piano/Piano";
import { NoteRain } from "../visualizer/NoteRain";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Progress } from "@/src/components/ui/progress";
import { Badge } from "@/src/components/ui/badge";
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  ArrowLeft,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/utils/utils";

export function LessonPlayer({ lesson, onBack }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeNote, setActiveNote] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const timerRef = useRef(null);

  if (!lesson || !Array.isArray(lesson.steps)) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
        <p className="text-zinc-500">No se pudo cargar la lección.</p>
        <Button onClick={onBack}>Volver</Button>
      </div>
    );
  }

  const totalDuration = (lesson.steps?.length || 0) * 1.5;

  const startPlayback = () => {
    setIsPlaying(true);
    setIsCompleted(false);
  };

  const pausePlayback = () => {
    setIsPlaying(false);
  };

  const resetLesson = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setIsCompleted(false);
    setActiveNote(null);
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.05;
          if (next >= totalDuration) {
            setIsPlaying(false);
            setIsCompleted(true);
            return totalDuration;
          }
          return next;
        });
      }, 50);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalDuration]);

  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Button variant="ghost" onClick={onBack} className="gap-2 -ml-2">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Button>
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200"
          >
            {lesson.difficulty}
          </Badge>
          <div className="text-sm font-medium text-zinc-500">
            {Math.floor(currentTime)}s / {Math.floor(totalDuration)}s
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Right Column: Visualizer (First on mobile) */}
        <div className="lg:col-span-2 space-y-4 order-1 lg:order-2">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-zinc-200">
            <NoteRain
              lesson={lesson}
              isPlaying={isPlaying}
              currentTime={currentTime}
              onNoteActive={setActiveNote}
            />

            <div className="mt-[-1px] bg-white">
              <Piano highlightedNote={activeNote} />
            </div>

            <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full pointer-events-none">
              Mapa de Referencia
            </div>
          </div>

          <div className="px-2">
            <Progress value={progress} className="h-2 bg-zinc-100" />
          </div>
        </div>

        {/* Left Column: Info & Controls (Second on mobile) */}
        <div className="space-y-6 order-2 lg:order-1">
          <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-zinc-900">
                {lesson.title}
              </CardTitle>
              <CardDescription>{lesson.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <div className="flex items-center gap-2 text-amber-700 font-bold mb-2">
                  <Eye className="w-4 h-4" /> Instrucciones
                </div>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Observa la lluvia de colores. Cuando una nota toque la línea
                  naranja, tócala en tu <strong>piano real</strong> usando el
                  color como guía.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {!isPlaying && !isCompleted ? (
                  <Button
                    onClick={startPlayback}
                    className="w-full h-12 gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg shadow-lg shadow-amber-200"
                  >
                    <Play className="w-5 h-5 fill-current" /> Empezar Guía
                  </Button>
                ) : isPlaying ? (
                  <Button
                    onClick={pausePlayback}
                    variant="outline"
                    className="w-full h-12 gap-2 font-bold text-lg"
                  >
                    <Pause className="w-5 h-5 fill-current" /> Pausar
                  </Button>
                ) : (
                  <Button
                    onClick={resetLesson}
                    className="w-full h-12 gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-lg"
                  >
                    <RotateCcw className="w-5 h-5" /> Repetir
                  </Button>
                )}

                <Button
                  onClick={resetLesson}
                  variant="ghost"
                  className="w-full"
                >
                  Reiniciar tiempo
                </Button>
              </div>
            </CardContent>
          </Card>

          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 bg-green-50 rounded-2xl border border-green-100 text-center space-y-3"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-green-900">
                  ¡Lección Terminada!
                </h3>
                <p className="text-sm text-green-700">
                  ¿Lo lograste en tu piano real? ¡Sigue practicando!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
