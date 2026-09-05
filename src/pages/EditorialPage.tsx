import { useLocation } from "react-router-dom";
import { ContentPage } from "@/components/content-page";
import { useLocalizedPage } from "@/i18n/content";
import NotFound from "@/pages/NotFound";

/** Uma rota, muitas páginas: o conteúdo vem do dicionário do idioma ativo. */
const EditorialPage = () => {
  const { pathname } = useLocation();
  const page = useLocalizedPage(pathname);
  if (!page) return <NotFound />;
  return <ContentPage page={page} />;
};

export default EditorialPage;
