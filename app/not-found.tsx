import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <span className="font-serif text-2xl tracking-[0.15em] text-slate-900 font-black mb-8">
        AGALAZ
      </span>
      <h1 className="font-serif text-6xl md:text-8xl font-black text-slate-900 tracking-tight">
        404
      </h1>
      <p className="text-slate-400 text-sm font-light mt-4 mb-8 text-center max-w-md">
        This page doesn&apos;t exist. Maybe the URL changed or the page was removed.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-8 py-3 bg-slate-900 text-white text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-colors"
        >
          Home
        </Link>
        <Link
          href="/try-on"
          className="px-8 py-3 border border-slate-200 text-slate-600 text-xs font-black uppercase tracking-[0.2em] hover:border-slate-400 transition-colors"
        >
          Try On
        </Link>
      </div>
    </main>
  );
}
