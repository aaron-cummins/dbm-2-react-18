import { utils, write } from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
import { RiFileExcel2Fill } from "react-icons/ri";
import { formatDateshort, Month, Year } from "utilities/Utiles";

const ExcelExportHelper = ({ data }) => {
  const TransformaDataEemm = (dataList) => {
    let dataEemm = [];
    dataList.forEach((item) => {
      dataEemm.push({
        id: item.esn.esnPlaca + item.estadoMotor.nombre.toUpperCase(),
        faena: item.flotaLugarTrabajo.lugarTrabajo.nombre,
        tipoContrato: item.contrato.tipoContrato.nombre,
        flotaEquipo: item.flotaLugarTrabajo.flotas.nombre,
        nroSerie: item.unidad.nserieEquipo,
        oem: item.unidad.oem.nombre,
        unidad: item.unidad.nombre,
        esn: item.esn.esn,
        placa: item.esn.esnPlaca,
        arregloMotor: "",
        modeloMotor: "",
        estado: item.estadoMotor.nombre.toUpperCase(),
        hrEquipoInstalacion: item.hrEquipoInstalacion,
        hrMotorInstalacion: item.hrMotorInstalacion,
        estadoinstalacion: item.estadoMotorInstalacion.nombre.toUpperCase(),
        fechaPs: formatDateshort(item.fechaps),
        hrOperadasMotor: item.hrOperadasMotor,
        hrAcumuladasMotor: item.hrAcumuladasMotor,
        hrHistoricoMotor: item.hrHistoricoMotor,
        fechaFalla: item.fechaFalla ? formatDateshort(item.fechaFalla) : "",
        anoSalida: item.fechaFalla ? Year(item.fechaFalla) : "",
        mesSalida: item.fechaFalla ? Month(item.fechaFalla) : "",
        tipoSalida2: "",
        categoriaDetencion: "",
        motivoCambio: "",
        tipoSalida: "",
        correlativoDbm: item.intervencionId,
      });
    });

    return dataEemm;
  };

  const createDownLoadData = () => {
    handleExport().then((url) => {
      //console.log(url);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", "Estado_motores_nacional.xlsx");
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };

  const workbook2blob = (workbook) => {
    const wopts = {
      bookType: "xlsx",
      bookSST: false,
      type: "binary",
    };

    const wbout = write(workbook, wopts);

    // The application/octet-stream MIME type is used for unknown binary files.
    // It preserves the file contents, but requires the receiver to determine file type,
    // for example, from the filename extension.
    const blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });

    return blob;
  };

  const s2ab = (s) => {
    // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
    // create an ArrayBuffer with a size in bytes
    const buf = new ArrayBuffer(s.length);

    //console.log(buf);

    //create a 8 bit integer array
    const view = new Uint8Array(buf);

    //console.log(view);
    //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
    for (let i = 0; i !== s.length; ++i) {
      //console.log(s.charCodeAt(i));
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };

  const handleExport = () => {
    const wb = utils.book_new();
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
    utils.sheet_add_json(ws, TransformaDataEemm(data), { origin: "A2", skipHeader: true });
    utils.book_append_sheet(wb, ws, "Estado de Motores");

    const workbookBlob = workbook2blob(wb);

    return addStyle(workbookBlob);
  };

  const addStyle = (workbookBlob) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
      workbook.sheets().forEach((sheet) => {
        //Formato de toda la hoja
        sheet.usedRange().style({
          fontFamily: "calibri",
          horizontalAlignment: "right",
          fontSize: 8,
        });

        //Formato de titulo
        sheet.range("A1:AA1").style({
          bold: true,
          fontColor: "ffffff",
          fill: "D02323",
          verticalAlignment: "center",
          horizontalAlignment: "center",
          wrapText: true,
        });

        //formato de celdas con estado operando
        sheet._sheetDataNode.children.forEach((item) => {
          if (item._cells[12].value() === "OPERANDO") {
            item._cells.forEach((col) => {
              if (col.value() === "OPERANDO") {
                col.style({ fill: "92D050" });
              } else
                col.style({
                  fill: "BFBFBF",
                });
            });
          }
        });

        sheet.row(1).height(30);
        sheet.column("A").width(15);
        sheet.column("B").width(20);

        sheet.column("M").width(20);
        sheet.column("N").width(20);

        sheet.column("O").width(20);
      });

      return workbook.outputAsync().then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };

  return (
    <button
      type="button"
      style={{
        color: "white",
        borderRadius: "10px",
      }}
      className={`gap-2 p-2 mb-2 hover:drop-shadow-xl bg-green-dark-cummins hover:bg-green-dark-cummins text-center inline-flex items-center`}
      onClick={createDownLoadData}>
      <RiFileExcel2Fill />
      <span>Exportar</span>
    </button>
  );
};

export default ExcelExportHelper;
