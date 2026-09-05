import { useI18n } from "@/i18n";
import { projects, type Project } from "@/data/projects";
import { PAGE_MAP, type PageContent } from "@/data/pages";
import type { NavItem, NavChild } from "@/data/navigation";

/** Atividades da comunidade com os textos no idioma escolhido. */
export function useCards(): Project[] {
  const { tx } = useI18n();
  return projects.map((p) => ({ ...p, ...tx<Partial<Project>>(`cards.${p.id}`, {}) }));
}

/** Página editorial: imagens e destinos vêm do código, os textos do idioma. */
export function useLocalizedPage(path: string): PageContent | undefined {
  const { tx } = useI18n();
  const base = PAGE_MAP.get(path);
  if (!base) return undefined;
  const loc = tx<Partial<PageContent>>(`pages.${path}`, {});
  return {
    ...base,
    ...loc,
    image: base.image,
    cta: base.cta ? { to: base.cta.to, label: loc.cta?.label ?? base.cta.label } : undefined,
  };
}

/** Etiqueta de um item de menu (chave = caminho, ou o rótulo quando é secção). */
export function useNavLabel(): (item: NavItem | NavChild) => string {
  const { t } = useI18n();
  return (item) => t(`nav.${("to" in item && item.to) || item.label}`);
}
