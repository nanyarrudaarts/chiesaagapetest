import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { ParallaxImage } from "@/components/parallax-image";

const field =
  "w-full border border-brand-cream/25 bg-transparent px-4 py-3 text-brand-cream placeholder:text-brand-cream/40 focus:border-brand-cream focus:outline-none";

const INTERESTS = [
  "Visitar um culto",
  "Entrar num pequeno grupo",
  "Servir num ministério",
  "Batismo",
  "Conversar com a liderança",
];

const Join = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: INTERESTS[0],
    message: "",
  });
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.from("membership_requests").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      interest: form.interest,
      message: form.message || null,
    });
    setBusy(false);
    if (error) {
      toast.error("Não foi possível enviar. Tente novamente.");
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
              Quero Fazer Parte
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
              Há lugar para você aqui.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-cream/75">
              Diga-nos apenas por onde quer começar. Alguém da equipa entra em contacto e acompanha
              os primeiros passos — sem pressa e sem compromisso.
            </p>
          </Reveal>
        </div>
      </header>

      <ParallaxImage
        src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80"
        className="h-[40vh] md:h-[52vh]"
      />

      <div className="site-shell max-w-2xl py-20">
        {sent ? (
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight">Inscrição recebida.</h2>
            <p className="mt-4 leading-relaxed text-brand-cream/70">
              Obrigado por dar este passo. Entramos em contacto em breve pelo e-mail que deixou.
            </p>
          </Reveal>
        ) : (
          <Reveal>
            <form onSubmit={submit} className="space-y-4">
              <input
                className={field}
                placeholder="Nome completo"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                className={field}
                type="email"
                placeholder="E-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                className={field}
                placeholder="Telefone (opcional)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <select
                className={`${field} appearance-none`}
                value={form.interest}
                onChange={(e) => setForm({ ...form, interest: e.target.value })}
              >
                {INTERESTS.map((i) => (
                  <option key={i} value={i} className="bg-brand-navy">
                    {i}
                  </option>
                ))}
              </select>
              <textarea
                className={`${field} min-h-32 resize-y`}
                placeholder="Quer contar-nos algo? (opcional)"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <button
                type="submit"
                disabled={busy}
                className="w-full bg-brand-cream py-3 text-sm uppercase tracking-widest text-brand-navy transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto sm:px-10"
              >
                {busy ? "A enviar…" : "Enviar inscrição"}
              </button>
            </form>
          </Reveal>
        )}
      </div>

      <SiteFooter />
    </div>
  );
};

export default Join;
