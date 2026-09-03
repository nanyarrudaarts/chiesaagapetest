import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { ParallaxImage } from "@/components/parallax-image";

const field =
  "w-full border border-brand-cream/25 bg-transparent px-4 py-3 text-brand-cream placeholder:text-brand-cream/40 focus:border-brand-cream focus:outline-none";

const PrayerRequest = () => {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [request, setRequest] = useState("");
  const [confidential, setConfidential] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("prayer_requests").insert({
      name,
      email: email || null,
      request,
      is_confidential: confidential,
      user_id: user?.id ?? null,
    });
    setBusy(false);
    if (error) {
      toast.error("Não foi possível enviar o pedido. Tente novamente.");
      return;
    }
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-brand-navy text-brand-cream">
      <SiteNav />

      <header className="pb-16 pt-36 md:pt-44">
        <div className="site-shell max-w-4xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-brand-cream/50">
              Pedido de Oração
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
              Podemos orar por você?
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-cream/75">
              Não há pedido pequeno demais. A equipa pastoral ora por cada mensagem recebida — e,
              se preferir, o seu pedido fica reservado apenas à liderança.
            </p>
          </Reveal>
        </div>
      </header>

      <ParallaxImage
        src="https://images.unsplash.com/photo-1445052693476-1cbb08fa663a?auto=format&fit=crop&w=1600&q=80"
        className="h-[40vh] md:h-[52vh]"
      />

      <div className="site-shell max-w-2xl py-20">
        {sent ? (
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight">Recebemos o seu pedido.</h2>
            <p className="mt-4 leading-relaxed text-brand-cream/70">
              Vamos orar. Se deixou o e-mail, alguém da equipa poderá escrever-lhe para acompanhar
              de perto.
            </p>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={submit} className="space-y-4">
              <input
                className={field}
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className={field}
                type="email"
                placeholder="E-mail (opcional)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                className={`${field} min-h-40 resize-y`}
                placeholder="O seu pedido"
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                required
              />
              <label className="flex items-start gap-3 text-sm text-brand-cream/70">
                <input
                  type="checkbox"
                  checked={confidential}
                  onChange={(e) => setConfidential(e.target.checked)}
                  className="mt-1 accent-brand-cream"
                />
                Manter confidencial — apenas a liderança verá este pedido.
              </label>
              <button
                type="submit"
                disabled={busy}
                className="w-full bg-brand-cream py-3 text-sm uppercase tracking-widest text-brand-navy transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto sm:px-10"
              >
                {busy ? "A enviar…" : "Enviar pedido"}
              </button>
            </form>
          </Reveal>
        )}
      </div>

      <SiteFooter />
    </div>
  );
};

export default PrayerRequest;
