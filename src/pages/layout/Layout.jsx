import { Suspense, useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar2, ThemeSettings, Rutas } from "../../components";
import { useStateContext } from "../../contexts/ContextProvider";
import { LugarTrabajoContext } from "../../contexts/LugarTrabajoContext";
import LoadPage from "../utiles/LoadPage";

const Layout = () => {
  const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } =
    useStateContext();
  const { obtenerLugaresTrabajo } = useContext(LugarTrabajoContext);

  useEffect(() => {
    obtenerLugaresTrabajo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <Suspense fallback={<LoadPage />}>
        <BrowserRouter>
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                  style={{ background: currentColor, borderRadius: "50%" }}
                  onClick={() => setThemeSettings(true)}>
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>

            {/* SIDEBARS */}
            {activeMenu ? (
              <div className="w-screen md:w-80 fixed sidebar dark:bg-secondary-dark-bg bg-secondary-dark-bg">
                <Sidebar2 />
              </div>
            ) : (
              <div className="w-0 md:w-16 dark:bg-secondary-dark-bg">
                <Sidebar2 />
              </div>
            )}

            {/* CONTENIDO */}
            <div
              className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
                activeMenu ? "md:ml-80 ml-80" : "flex-1"
              }`}>
              {/* NAVBAR */}
              <div className="dark:bg-main-dark-bg navbar w-full">
                <Navbar />
              </div>
              <div>
                {themeSettings && <ThemeSettings />}

                {/* RUTAS */}
                <Rutas />
              </div>

              {/* FOOTER */}
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default Layout;
