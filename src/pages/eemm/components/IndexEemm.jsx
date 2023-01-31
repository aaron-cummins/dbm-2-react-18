import { Filtros, Header, Seccion, Select } from "components";
import { useStateContext } from "contexts/ContextProvider";
import { SelectsContext } from "contexts/SelectsContext";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { EemmContext } from "../context/eemmContext";
import TablaEemm from "./tablas/TablaEemm";

import { read, utils, writeFileXLSX } from "xlsx";
import { formatDateshort, Month, Year } from "utilities/Utiles";
import ExcelExportHelper from "./ExcelExportHelper";

const IndexEemm = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const { eemm, setEemm, obtenerEemmlist, eemmList } = useContext(EemmContext);
  const { enqueueSnackbar } = useSnackbar();
  const {
    obtenerFlotasLugarTrabajo,
    obtenerUnidades,
    obtenerEsn,
    limpiarFlotasLugarTrabajo,
    limpiarUnidades,
    limpiarEsn,
    lugarTrabajoUsuarioList,
    flotasLugarTrabajoList,
    unidadesList,
    esnList,
  } = useContext(SelectsContext);

  /*const [dataEemm, setDataEemm] = useState([
    {
      id: 0,
      faena: "",
      tipoContrato: "",
      flotaEquipo: "",
      nroSerie: "",
      oem: "",
      unidad: "",
      esn: "",
      placa: "",
      arregloMotor: "",
      modeloMotor: "",
      estado: "",
      hrEquipoInstalacion: 0,
      hrMotorInstalacion: 0,
      estadoinstalacion: "",
      fechaPs: "",
      hrOperadasMotor: 0,
      hrAcumuladasMotor: 0,
      hrHistoricoMotor: 0,
      fechaFalla: "",
      anoSalida: 0,
      mesSalida: 0,
      tipoSalida2: "",
      categoriaDetencion: "",
      motivoCambio: "",
      tipoSalida: "",
      correlativoDbm: 0,
    },
  ]);*/

  const montar = () => {
    navigate("montaje");
  };
  const desmontar = () => {
    navigate("desmontaje");
  };
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "lugarTrabajoId") {
      obtenerFlotasLugarTrabajo(value);
      setEemm({ ...eemm, unidad: { id: 0 }, [name]: value });
      limpiarFlotasLugarTrabajo();
      limpiarUnidades();
      limpiarEsn();
    } else if (name === "flotaLugarTrabajoId") {
      obtenerUnidades(value);
      setEemm({ ...eemm, flotaLugarTrabajo: { id: value }, [name]: value });
      limpiarUnidades();
      limpiarEsn();
    } else if (name === "unidadId") {
      obtenerEsn(false);
      setEemm({ ...eemm, unidad: { id: value }, [name]: value });
    } else if (name === "esnId") {
      setEemm({ ...eemm, esn: { id: value }, [name]: value });
    } else setEemm({ ...eemm, [name]: value });
  };
  const handleSearch = (e) => {
    /*obtenerEemmEsnlist(eemm.esn.id).then((item) => {
      //setEsnMontado(item);
    });
    obtenerEemmUnidadlist(eemm.unidad.id).then((item) => {
      //setUnidadMontada(item);
    });*/

    obtenerEemmlist();
    //console.log(val.data);
  };

  const download = (e) => {
    e.preventDefault();
    /*const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    //const ws = utils.json_to_sheet(TransformaDataEemm(eemmList));
    const headers = [
      [
        "ID",
        "FAENA",
        "TIPO CONTRATO",
        "FLOTA/EQUIPO",
        "N SERIE",
        "OEM",
        "UNIDAD",
        "ESN",
        "PLACA",
        "ARREGLO MOTOR",
        "MODELO MOTOR",
        "ESTADO",
        "HR EQUIPO EN LA INSTALACION",
        "HR MOTOR EN LA INSTALACION",
        "ESTADO EN LA INSTALACION",
        "FECHA PS",
        "HR OPERADAS MOTOR",
        "HR ACUMULADAS MOTOR",
        "HR HISTORICO MOTOR",
        "FECHA FALLA",
        "AÑO SALIDA",
        "MES SALIDA",
        "TIPO SALIDA 2",
        "CATEGORIA DETENCION",
        "MOTIVO CAMBIO",
        "TIPO SALIDA",
        "CORRELTIVO INTERVENCION",
      ],
    ];

    utils.sheet_add_aoa(ws, headers, { color: "000000" });
    utils.sheet_add_json(ws, TransformaDataEemm(eemmList), { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Estado de Motores");
    writeFileXLSX(wb, "Estado_Motor_Nacional_2.0.xlsx");*/
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
            className={`gap-5 p-3 hover:drop-shadow-xl bg-green-dark-cummins hover:bg-green-dark-cummins text-center inline-flex items-center`}
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
      <Filtros Fn={handleSearch}>
        <div className="form-group">
          <Select
            id="lugarTrabajoId"
            name="lugarTrabajoId"
            placeholder="Lugar Trabajo"
            label="Lugar Trabajo"
            list={lugarTrabajoUsuarioList}
            value={eemm?.flotaLugarTrabajo.lugarTrabajo?.id}
            onChange={(e) => handleChange(e)}
            required={true}
          />
        </div>
        <div className="form-group">
          <Select
            id="flotaLugarTrabajoId"
            name="flotaLugarTrabajoId"
            placeholder="Flota"
            label="Flota"
            list={flotasLugarTrabajoList}
            value={eemm?.flotaLugarTrabajo?.id}
            onChange={(e) => handleChange(e)}
            required={true}
          />
        </div>
        <div className="form-group">
          <Select
            id="unidadId"
            name="unidadId"
            placeholder="Unidad"
            label="Unidad"
            list={unidadesList}
            value={eemm.unidad.id}
            onChange={(e) => handleChange(e)}
            required={true}
          />
        </div>

        <div className="form-group">
          <Select
            id="esnId"
            name="esnId"
            placeholder="ESN"
            label="ESN"
            list={esnList}
            value={eemm.esn.id}
            onChange={(e) => handleChange(e)}
            required={true}
          />
        </div>
      </Filtros>
      <Seccion titulo="Descarga Estado motor" visible="true">
        <ExcelExportHelper data={eemmList} />
        <TablaEemm />
      </Seccion>
    </>
  );
};

export default IndexEemm;
