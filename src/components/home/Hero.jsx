export function Hero({ title, description, highlight }) {
  return (
    <div className="text-center space-y-4 max-w-3xl mx-auto pt-12 pb-8">
      <h2 className="text-5xl md:text-6xl font-black tracking-tight text-zinc-900 leading-tight">
        {title} <span className="text-amber-500">{highlight}</span>
      </h2>
      <p className="text-lg md:text-xl text-zinc-500 font-medium max-w-xl mx-auto">
        {description}
      </p>
    </div>
  );
}
