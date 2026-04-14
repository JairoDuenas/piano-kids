import { useState } from "react";
import { SONGS } from "@/src/data/songs";
import { generateNewSong } from "@/src/services/geminiService";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Music, Eye, Star, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/utils/utils";

export function LessonList({ onSelectLesson }) {
  const [activeLevel, setActiveLevel] = useState("Easy");
  const [localSongs, setLocalSongs] = useState(SONGS);
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredSongs = localSongs.filter(
    (song) => song.difficulty === activeLevel,
  );

  const handleDiscover = async () => {
    setIsGenerating(true);
    const newSong = await generateNewSong(activeLevel);
    if (newSong) {
      setLocalSongs((prev) => [newSong, ...prev]);
    }
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="flex flex-col items-center gap-6 px-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl">
          <Tabs
            value={activeLevel}
            onValueChange={setActiveLevel}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-zinc-100 rounded-xl p-1 h-12">
              <TabsTrigger
                value="Easy"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-xs sm:text-sm"
              >
                Fácil
              </TabsTrigger>
              <TabsTrigger
                value="Medium"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-xs sm:text-sm"
              >
                Intermedio
              </TabsTrigger>
              <TabsTrigger
                value="Hard"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-bold text-xs sm:text-sm"
              >
                Avanzado
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            onClick={handleDiscover}
            disabled={isGenerating}
            variant="outline"
            className="w-full sm:w-auto rounded-xl border-zinc-200 h-12 hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200 transition-all gap-2"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            Descubrir
          </Button>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-black text-zinc-900">
            {activeLevel === "Easy"
              ? "Nivel Principiante"
              : activeLevel === "Medium"
                ? "Nivel Intermedio"
                : "Nivel Maestro"}
          </h3>
          <p className="text-zinc-500 font-medium">
            {filteredSongs.length} canciones disponibles para practicar.
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeLevel}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4"
        >
          {filteredSongs.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 border-none bg-white/80 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div
                      className={cn(
                        "p-2 rounded-lg",
                        lesson.difficulty === "Easy"
                          ? "bg-green-100 text-green-600"
                          : lesson.difficulty === "Medium"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-purple-100 text-purple-600",
                      )}
                    >
                      <Music className="w-5 h-5" />
                    </div>
                    <div className="flex gap-1">
                      {Array.from({
                        length:
                          lesson.difficulty === "Easy"
                            ? 1
                            : lesson.difficulty === "Medium"
                              ? 2
                              : 3,
                      }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-amber-600 transition-colors line-clamp-1">
                    {lesson.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 min-h-[2.5rem]">
                    {lesson.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button
                    onClick={() => onSelectLesson(lesson)}
                    className="w-full gap-2 bg-zinc-900 hover:bg-zinc-800 text-white"
                  >
                    <Eye className="w-4 h-4" /> Ver Guía
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
