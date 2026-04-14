import { GraduationCap, Music2, Piano as PianoIcon } from "lucide-react";
import { cn } from "../../utils/utils";

export function Header({ activeTab, onTabChange }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-100 bg-white/70 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-200">
            <PianoIcon className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-900">
            Piano<span className="text-amber-500">Kids</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 bg-zinc-100/50 p-1 rounded-2xl border border-zinc-200">
          <button
            onClick={() => onTabChange("lessons")}
            className={cn(
              "px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
              activeTab === "lessons"
                ? "bg-white shadow-sm text-zinc-900"
                : "text-zinc-500 hover:text-zinc-900",
            )}
          >
            <GraduationCap className="w-4 h-4" /> Lecciones
          </button>
          <button
            onClick={() => onTabChange("freeplay")}
            className={cn(
              "px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2",
              activeTab === "freeplay"
                ? "bg-white shadow-sm text-zinc-900"
                : "text-zinc-500 hover:text-zinc-900",
            )}
          >
            <Music2 className="w-4 h-4" /> Práctica Libre
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              Nivel
            </div>
            <div className="text-sm font-black text-zinc-900">Principiante</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-zinc-100 border-2 border-white shadow-sm overflow-hidden">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Avatar"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
