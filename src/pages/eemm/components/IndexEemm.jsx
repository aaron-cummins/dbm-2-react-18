import { Header, Seccion } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

const IndexEemm = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();

  const montar = () => {
    navigate("montaje");
  };
  const desmontar = () => {
    navigate("desmontaje");
  };
  return (
    <>
      <Header category="Administración" title="EEMM">
        <div className="gap-6">
          <button
            type="button"
            style={{
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3 hover:drop-shadow-xl bg-green-500 hover:bg-green-500 text-center inline-flex items-center`}
            onClick={montar}>
            Montar
          </button>
          &nbsp;&nbsp;
          <button
            type="button"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
            }}
            className={`gap-5 p-3 hover:drop-shadow-xl hover:bg-${currentColor} text-center inline-flex items-center`}
            onClick={desmontar}>
            Desmontar
          </button>
        </div>
      </Header>
      <Seccion titulo="Descarga Estado motor" visible="true"></Seccion>
    </>
  );
};

export default IndexEemm;
