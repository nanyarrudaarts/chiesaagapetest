import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, type AppRole } from "@/hooks/use-auth";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";

type Prayer = {
  id: string;
  name: string;
  request: string;
  is_confidential: boolean;
  status: string;
  created_at: string;
};
type Member = { id: string; name: string; email: string; interest: string | null; status: string; created_at: string };
type Event = { id: string; title: string; starts_at: string; location: string | null };

const ROLE_LABEL: Record<AppRole, string> = {
  membro: "Membro",
  lider: "Líder",
  pastor: "Pastor",
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, loading, primaryRole, signOut } = useAuth();
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    if (!loading && !user) navigate("/entrar", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => setProfileName(data?.full_name ?? ""));

    supabase
      .from("events")
      .select("id,title,starts_at,location")
      .gte("starts_at", new Date().toISOString())
      .order("starts_at")
      .limit(5)
      .then(({ data }) => setEvents((data ?? []) as Event[]));
  }, [user]);

  const staff = primaryRole === "lider" || primaryRole === "pastor";

  useEffect(() => {
    if (!staff) return;
    supabase
      .from("prayer_requests")
      .select("id,name,request,is_confidential,status,created_at")
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }) => setPrayers((data ?? []) as Prayer[]));
    supabase
      .from("membership_requests")
      .select("id,name,email,interest,status,created_at")
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }) => setMembers((data ?? []) as Member[]));
  }, [staff]);

  if (loading || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-brand-navy text-brand-cream/60">
        A carregar…
      </div>
    );
  }

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString("pt-PT", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div className="min-h-screen bg-brand-navy text-brand-cream">
      <SiteNav />

      <div className="site-shell pb-24 pt-36">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-brand-cream/50">
            Área {primaryRole ? ROLE_LABEL[primaryRole] : "reservada"}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Olá{profileName ? `, ${profileName.split(" ")[0]}` : ""}.
          </h1>
          <p className="mt-4 max-w-2xl text-brand-cream/70">
            {primaryRole === "pastor"
              ? "Visão pastoral da comunidade: pedidos de oração, novos interessados e agenda."
              : primaryRole === "lider"
                ? "Painel de liderança: acompanhe pedidos, inscrições e a agenda dos encontros."
                : "O seu espaço na comunidade: agenda, pedidos de oração e vida da igreja."}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={async () => {
                await signOut();
                navigate("/", { replace: true });
              }}
              className="border border-brand-cream/40 px-6 py-2 text-xs uppercase tracking-widest transition-colors hover:bg-brand-cream hover:text-brand-navy"
            >
              Sair
            </button>
            <Link
              to="/pedido-de-oracao"
              className="border border-brand-cream/40 px-6 py-2 text-xs uppercase tracking-widest transition-colors hover:bg-brand-cream hover:text-brand-navy"
            >
              Enviar pedido de oração
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <Reveal className="border border-brand-cream/15 p-8">
            <h2 className="text-xl font-bold tracking-tight">Próximos encontros</h2>
            <ul className="mt-6 space-y-4 text-sm text-brand-cream/70">
              {events.length === 0 && <li>Nenhum encontro agendado por agora.</li>}
              {events.map((ev) => (
                <li key={ev.id} className="border-t border-brand-cream/10 pt-4">
                  <p className="text-brand-cream">{ev.title}</p>
                  <p>{fmt(ev.starts_at)}</p>
                  {ev.location && <p className="text-brand-cream/50">{ev.location}</p>}
                </li>
              ))}
            </ul>
          </Reveal>

          {staff ? (
            <Reveal delay={80} className="border border-brand-cream/15 p-8">
              <h2 className="text-xl font-bold tracking-tight">Pedidos de oração</h2>
              <ul className="mt-6 space-y-4 text-sm text-brand-cream/70">
                {prayers.length === 0 && <li>Sem pedidos por agora.</li>}
                {prayers.map((p) => (
                  <li key={p.id} className="border-t border-brand-cream/10 pt-4">
                    <p className="text-brand-cream">
                      {p.is_confidential ? "Pedido confidencial" : p.name}
                    </p>
                    <p className="mt-1">{p.request}</p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-brand-cream/40">
                      {p.status} · {fmt(p.created_at)}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : (
            <Reveal delay={80} className="border border-brand-cream/15 p-8">
              <h2 className="text-xl font-bold tracking-tight">Caminhar em comunidade</h2>
              <p className="mt-6 text-sm leading-relaxed text-brand-cream/70">
                Entre num pequeno grupo, sirva num ministério ou fale com a liderança. A vida da
                igreja acontece durante a semana, não só no domingo.
              </p>
              <div className="mt-6 flex flex-col gap-2 text-sm">
                <Link className="hover:text-brand-cream" to="/vida-da-igreja/pequenos-grupos">
                  Pequenos grupos →
                </Link>
                <Link className="hover:text-brand-cream" to="/vida-da-igreja/voluntariado">
                  Voluntariado →
                </Link>
                <Link className="hover:text-brand-cream" to="/conteudos/estudos">
                  Estudos bíblicos →
                </Link>
              </div>
            </Reveal>
          )}

          {staff && (
            <Reveal delay={140} className="border border-brand-cream/15 p-8 lg:col-span-2">
              <h2 className="text-xl font-bold tracking-tight">Quem quer fazer parte</h2>
              <ul className="mt-6 grid gap-4 text-sm text-brand-cream/70 md:grid-cols-2">
                {members.length === 0 && <li>Sem inscrições por agora.</li>}
                {members.map((m) => (
                  <li key={m.id} className="border-t border-brand-cream/10 pt-4">
                    <p className="text-brand-cream">{m.name}</p>
                    <p>{m.email}</p>
                    {m.interest && <p className="text-brand-cream/50">Interesse: {m.interest}</p>}
                    <p className="mt-1 text-xs uppercase tracking-widest text-brand-cream/40">
                      {m.status} · {fmt(m.created_at)}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          {primaryRole === "pastor" && (
            <Reveal delay={200} className="border border-brand-cream/15 p-8 lg:col-span-2">
              <h2 className="text-xl font-bold tracking-tight">Nota pastoral</h2>
              <p className="mt-4 text-sm leading-relaxed text-brand-cream/70">
                Como pastor, vê todos os pedidos e inscrições da comunidade e pode criar ou editar
                eventos da agenda. Os papéis de cada pessoa são geridos na base da comunidade.
              </p>
            </Reveal>
          )}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Dashboard;
