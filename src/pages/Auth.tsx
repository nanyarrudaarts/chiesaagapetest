import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/use-auth";
import { SiteNav } from "@/components/site-nav";
import { BrandLogo } from "@/components/brand-logo";

type Mode = "login" | "signup" | "reset";

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate("/painel", { replace: true });
  }, [user, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate("/painel", { replace: true });
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/painel`,
            data: { full_name: fullName },
          },
        });
        if (error) throw error;
        toast.success("Conta criada. Verifique o seu e-mail para confirmar.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/entrar`,
        });
        if (error) throw error;
        toast.success("Enviámos um link de recuperação para o seu e-mail.");
        setMode("login");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível concluir.");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Não foi possível entrar com o Google.");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    navigate("/painel", { replace: true });
  };

  const field =
    "w-full border border-brand-cream/25 bg-transparent px-4 py-3 text-brand-cream placeholder:text-brand-cream/40 focus:border-brand-cream focus:outline-none";

  return (
    <div className="min-h-screen bg-brand-navy text-brand-cream">
      <SiteNav />

      <div className="flex min-h-screen items-center justify-center px-6 py-32">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-10 inline-block">
            <BrandLogo />
          </Link>

          <h1 className="text-3xl font-bold tracking-tight">
            {mode === "login" ? "Entrar" : mode === "signup" ? "Criar conta" : "Recuperar senha"}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-brand-cream/60">
            {mode === "login"
              ? "Área reservada aos membros, líderes e pastores da comunidade."
              : mode === "signup"
                ? "Crie a sua conta para acompanhar a vida da igreja de perto."
                : "Indique o seu e-mail e enviamos um link para definir nova senha."}
          </p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            {mode === "signup" && (
              <input
                className={field}
                placeholder="Nome completo"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            )}
            <input
              className={field}
              type="email"
              autoComplete="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {mode !== "reset" && (
              <input
                className={field}
                type="password"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full bg-brand-cream py-3 text-sm uppercase tracking-widest text-brand-navy transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {busy ? "Aguarde…" : mode === "login" ? "Entrar" : mode === "signup" ? "Criar conta" : "Enviar link"}
            </button>
          </form>

          {mode !== "reset" && (
            <>
              <div className="my-6 flex items-center gap-4 text-xs uppercase tracking-widest text-brand-cream/40">
                <span className="h-px flex-1 bg-brand-cream/20" />
                ou
                <span className="h-px flex-1 bg-brand-cream/20" />
              </div>
              <button
                type="button"
                onClick={google}
                disabled={busy}
                className="w-full border border-brand-cream/40 py-3 text-sm uppercase tracking-widest transition-colors hover:bg-brand-cream hover:text-brand-navy disabled:opacity-50"
              >
                Entrar com Google
              </button>
            </>
          )}

          <div className="mt-8 space-y-2 text-sm text-brand-cream/60">
            {mode === "login" && (
              <>
                <button className="block hover:text-brand-cream" onClick={() => setMode("reset")}>
                  Esqueci a senha
                </button>
                <button className="block hover:text-brand-cream" onClick={() => setMode("signup")}>
                  Ainda não tenho conta
                </button>
              </>
            )}
            {mode !== "login" && (
              <button className="block hover:text-brand-cream" onClick={() => setMode("login")}>
                Voltar a entrar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
