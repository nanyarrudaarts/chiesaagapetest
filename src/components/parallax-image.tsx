import { useEffect, useRef } from "react";

/**
 * Faixa de imagem com parallax: a imagem é mais alta que a moldura e desloca-se
 * lentamente conforme a moldura cruza o viewport.
 */
export function ParallaxImage({
  src,
  alt = "",
  className = "h-[50vh]",
  strength = 0.18,
}: {
  src: string;
  alt?: string;
  className?: string;
  strength?: number;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const apply = () => {
      rafRef.current = null;
      const frame = frameRef.current;
      const img = imgRef.current;
      if (!frame || !img) return;
      const rect = frame.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      // -1 (abaixo do ecrã) → 1 (acima do ecrã)
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
      img.style.transform = `translate3d(0, ${progress * strength * rect.height}px, 0)`;
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
  }, [strength]);

  return (
    <div ref={frameRef} className={`relative w-full overflow-hidden bg-brand-ink ${className}`}>
      <div ref={imgRef} className="absolute inset-x-0 -top-[15%] h-[130%] will-change-transform">
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-brand-navy/35" aria-hidden="true" />
    </div>
  );
}
