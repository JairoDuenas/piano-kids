import { useState } from "react";
import { LessonList } from "../components/lessons/LessonsList";
import { LessonPlayer } from "../components/lessons/LessonsPlayer";
import { Piano } from "../components/piano/Piano";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/home/Hero";
import { motion, AnimatePresence } from "motion/react";

function BackgroundDecoration() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-amber-200 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -right-24 w-64 h-64 bg-blue-200 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 left-1/2 w-80 h-80 bg-green-200 rounded-full blur-3xl" />
    </div>
  );
}

export default function Home() {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [activeTab, setActiveTab] = useState("lessons");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedLesson(null);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-zinc-900 font-sans selection:bg-amber-200 pt-20">
      <BackgroundDecoration />
      <Header activeTab={activeTab} onTabChange={handleTabChange} />

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {activeTab === "lessons" ? (
            selectedLesson ? (
              <motion.div
                key="player"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <LessonPlayer
                  lesson={selectedLesson}
                  onBack={() => setSelectedLesson(null)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="lessons-list"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-12"
              >
                <Hero
                  title="Tu guía visual para el"
                  highlight="piano real"
                  description="Sigue la lluvia de colores y aprende a tocar tus canciones favoritas en tu propio instrumento."
                />
                <LessonList onSelectLesson={setSelectedLesson} />
              </motion.div>
            )
          ) : (
            <motion.div
              key="freeplay"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-12"
            >
              <Hero
                title="Modo"
                highlight="Libre"
                description="¡Toca lo que quieras! Experimenta con los sonidos y crea tu propia música."
              />
              <div className="w-full bg-white p-4 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-zinc-200/50 border border-zinc-100">
                <Piano />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
