import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { ParallaxImage } from "@/components/parallax-image";

type Event = {
  id: string;
  title: string;
  description: string | null;
  starts_at: string;
  location: string | null;
  is_featured: boolean;
};

const Agenda = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("events")
      .select("id,title,description,starts_at,location,is_featured")
      .gte("starts_at", new Date().toISOString())
      .order("starts_at")
      .then(({ data }) => {
        setEvents((data ?? []) as Event[]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-brand-navy text-brand-cream">
      <SiteNav />

      <header className="pb-16 pt-36 md:pt-44">
        <div className="site-shell max-w-4xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-brand-cream/50">Agenda</p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
              Próximos encontros
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-cream/75">
              Cultos, estudos, oração e eventos especiais. Todos os encontros são abertos — traga
              quem quiser.
            </p>
          </Reveal>
        </div>
      </header>

      <ParallaxImage
        src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80"
        className="h-[40vh] md:h-[52vh]"
      />

      <div className="site-shell max-w-4xl py-20">
        {loading && <p className="text-brand-cream/60">A carregar a agenda…</p>}
        {!loading && events.length === 0 && (
          <p className="text-brand-cream/60">
            Nenhum encontro publicado por agora. O culto de domingo acontece sempre às 10h30.
          </p>
        )}
        <ul className="space-y-10">
          {events.map((ev, i) => (
            <Reveal key={ev.id} delay={i * 60}>
              <li className="border-t border-brand-cream/15 pt-8 md:grid md:grid-cols-[14rem_1fr] md:gap-10">
                <p className="text-sm uppercase tracking-widest text-brand-cream/50">
                  {new Date(ev.starts_at).toLocaleString("pt-PT", {
                    weekday: "long",
                    day: "2-digit",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <div className="mt-3 md:mt-0">
                  <h2 className="text-2xl font-bold tracking-tight">
                    {ev.title}
                    {ev.is_featured && (
                      <span className="ml-3 align-middle text-xs uppercase tracking-widest text-brand-cream/50">
                        destaque
                      </span>
                    )}
                  </h2>
                  {ev.description && (
                    <p className="mt-3 leading-relaxed text-brand-cream/70">{ev.description}</p>
                  )}
                  {ev.location && (
                    <p className="mt-2 text-sm text-brand-cream/50">{ev.location}</p>
                  )}
                </div>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16">
          <Link
            to="/pedido-de-oracao"
            className="inline-block border border-brand-cream px-8 py-3 text-sm uppercase tracking-widest transition-colors hover:bg-brand-cream hover:text-brand-navy"
          >
            Enviar um pedido de oração
          </Link>
        </Reveal>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Agenda;
