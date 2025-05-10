import AppRoutes from "../AppRoutes/AppRoutes";

// Affiche le contenu dynamique selon les routes
const PageContent = () => {
  return (
    <div className="p-4 pt-20  overflow-auto h-full">
      <AppRoutes />
    </div>
  );
};

export default PageContent;
