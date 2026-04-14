import { Piano as PianoIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-zinc-100 py-12 mt-12 bg-white/50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white">
            <PianoIcon className="w-5 h-5" />
          </div>
          <span className="font-black text-zinc-900">PianoKids Academy</span>
        </div>
        <div className="flex gap-8 text-sm font-bold text-zinc-400">
          <a href="#" className="hover:text-zinc-900 transition-colors">
            Sobre nosotros
          </a>
          <a href="#" className="hover:text-zinc-900 transition-colors">
            Padres
          </a>
          <a href="#" className="hover:text-zinc-900 transition-colors">
            Privacidad
          </a>
        </div>
        <div className="text-sm font-bold text-zinc-400">
          © 2026 PianoKids. Hecho con ❤️ para pequeños músicos.
        </div>
      </div>
    </footer>
  );
}
