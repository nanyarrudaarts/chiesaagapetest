import logo from "@/assets/logo.png.asset.json";

/**
 * Marca da Chiesa Evangelica Agape: símbolo "A" + nome.
 * O ficheiro original é grafite sobre branco, por isso em fundo escuro é
 * convertido para creme por filtro (.logo-on-dark), sem duplicar o asset.
 */
export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={logo.url}
        alt=""
        aria-hidden="true"
        className="logo-on-dark h-8 w-auto"
      />
      <span className="flex flex-col leading-none">
        <span className="text-[0.6rem] uppercase tracking-[0.18em] text-brand-cream/60">
          Chiesa Evangelica
        </span>
        <span className="text-lg font-bold tracking-tight">Agape</span>
      </span>
    </span>
  );
}
