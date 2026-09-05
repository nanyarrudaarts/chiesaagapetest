import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import heroVideo from "@/assets/hero-video.mp4.asset.json";
import { useI18n } from "@/i18n";

/**
 * Entrada do site: vídeo em ecrã inteiro com parallax.
 * O vídeo desloca-se a metade da velocidade do scroll (parallax clássico) e o
 * texto sobe, esbate e reduz ligeiramente — a transição para a secção seguinte.
 * Tudo é feito num único requestAnimationFrame por frame de scroll.
 */
export function VideoHero() {
  const { t } = useI18n();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const apply = () => {
      rafRef.current = null;
      const y = window.scrollY;
      const h = window.innerHeight || 1;
      const p = Math.min(y / h, 1);

      if (videoRef.current) {
        videoRef.current.style.transform = `translate3d(0, ${y * 0.45}px, 0) scale(${1 + p * 0.08})`;
      }
      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, ${y * -0.15}px, 0) scale(${1 - p * 0.06})`;
        contentRef.current.style.opacity = `${Math.max(1 - p * 1.6, 0)}`;
      }
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[100svh] w-full overflow-hidden bg-brand-navy">
      {/* Camada do vídeo — mais alta que o ecrã, para o parallax nunca revelar
          a borda inferior enquanto desliza. */}
      <div ref={videoRef} className="absolute inset-x-0 top-0 h-[130%] will-change-transform">
        <video
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          src={heroVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
          aria-hidden="true"
        />
        {/* Escurecimento da marca: o creme do texto tem de ler sobre qualquer frame */}
        <div className="absolute inset-0 bg-brand-navy/55" aria-hidden="true" />
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-brand-cream will-change-transform"
      >
        <p className="animate-fade-in text-xs uppercase tracking-[0.4em] text-brand-cream/70">
          {t("ui.hero.eyebrow")}
        </p>
        <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          {t("ui.hero.titleLine1")}
          <br />
          {t("ui.hero.titleLine2")}
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-brand-cream/80 sm:text-lg">
          {t("ui.hero.lead")}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/quero-fazer-parte"
            className="border border-brand-cream bg-brand-cream px-8 py-3 text-sm uppercase tracking-widest text-brand-navy transition-colors hover:bg-transparent hover:text-brand-cream"
          >
            {t("ui.hero.ctaJoin")}
          </Link>
          <Link
            to="/vida-da-igreja/cultos"
            className="border border-brand-cream/60 px-8 py-3 text-sm uppercase tracking-widest transition-colors hover:bg-brand-cream hover:text-brand-navy"
          >
            {t("ui.hero.ctaServices")}
          </Link>
        </div>
      </div>

      {/* Indicador de scroll — assina a transição para a secção seguinte */}
      <div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-brand-cream/50"
        aria-hidden="true"
      >
        <span className="block h-12 w-px animate-pulse bg-brand-cream/40" />
      </div>
    </div>
  );
}
