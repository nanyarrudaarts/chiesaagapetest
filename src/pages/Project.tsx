import { useParams, Link } from "react-router-dom";
import { projects, imageAt } from "@/data/projects";
import { CardGrid } from "@/components/card-grid";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

const Project = () => {
  const { id } = useParams<{ id: string }>();
  const index = projects.findIndex((p) => p.id === id);
  const project = projects[index];

  if (!project) {
    return (
      <div className="min-h-screen bg-brand-navy text-brand-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-4">Página não encontrada</h1>
          <Link to="/" className="text-muted-foreground hover:text-brand-cream transition-colors">
            ← Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  // Wrap around, so the first and last projects still have two neighbors —
  // an empty slot in a 50%-wide grid is half a row of black. Below 3
  // projects the strip renders nothing: wrap-around cannot produce two
  // distinct neighbors, and one "more project" is not a browsing offer.
  const count = projects.length;
  const neighbors =
    count >= 3
      ? [projects[(index - 1 + count) % count], projects[(index + 1) % count]]
      : [];
  const title = project.titleMasked.replace("\n", " ").replace(".", "");

  return (
    <div className="min-h-screen bg-brand-navy text-brand-cream">
      <SiteNav />

      {/* Hero image — full-bleed, so it needs a much wider source than a card */}
      <div className="w-full aspect-[16/9] max-h-[70vh] overflow-hidden bg-brand-ink">
        <img
          src={imageAt(project.image, 2400)}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details — left edge lines up with the nav and the other pages */}
      <div className="site-shell py-16">
        <div className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="inline-flex h-11 items-center text-brand-cream/50 transition-colors hover:text-brand-cream"
                >
                  Início
                </Link>
              </li>
              <li aria-hidden className="text-brand-cream/35">
                /
              </li>
              <li className="text-brand-cream/70" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            {title}
          </h1>

          {/* dt/dd have to sit inside a dl to be valid HTML */}
          <dl className="flex gap-12 mb-12 text-sm border-b border-brand-cream/20 pb-8">
            <div>
              <dt className="text-brand-cream/50 uppercase tracking-widest text-xs mb-1">Quando</dt>
              <dd className="text-brand-cream">{project.year}</dd>
            </div>
            <div>
              <dt className="text-brand-cream/50 uppercase tracking-widest text-xs mb-1">Onde</dt>
              <dd className="text-brand-cream">{project.location}</dd>
            </div>
          </dl>

          <p className="text-brand-cream/70 text-lg leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* More Projects — the real CardGrid component, not a copy of its DOM:
          it brings the touch-device CardManager, without which card photos
          never activate on phones (they idle at opacity 0). */}
      {neighbors.length > 0 && (
        <div className="border-t border-brand-cream/20">
          <div className="site-shell py-10">
            <h2 className="text-xs text-brand-cream/50 uppercase tracking-widest mb-6">Veja também</h2>
          </div>
          <CardGrid cards={neighbors} />
        </div>
      )}

      <SiteFooter />
    </div>
  );
};

export default Project;
