import { useLocation } from "react-router-dom";
import { ContentPage } from "@/components/content-page";
import { PAGE_MAP } from "@/data/pages";
import NotFound from "@/pages/NotFound";

/** Uma rota, muitas páginas: o conteúdo vem de src/data/pages.ts pelo caminho. */
const EditorialPage = () => {
  const { pathname } = useLocation();
  const page = PAGE_MAP.get(pathname);
  if (!page) return <NotFound />;
  return <ContentPage page={page} />;
};

export default EditorialPage;
