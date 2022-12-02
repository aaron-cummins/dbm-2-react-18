import DataTable from "react-data-table-component";
import Checkbox from "@mui/material/Checkbox";
import { ArrowDownward } from "@mui/icons-material";
import { Spinner } from "components";
//import useFetchAndLoad from "hooks/useFetchAndLoad";
import { useStateContext } from "contexts/ContextProvider";

const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

const Tabla = (props) => {
  const { cargando } = useStateContext();

  const customStyles = {
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
        background: "#fafafa",
        fontSize: "20x",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
  };

  const paginationOptions = {
    rowsPerPageText: "Filas por página:",
    rangeSeparatorText: "de",
    noRowsPerPage: false,
    selectAllRowsItem: false,
    selectAllRowsItemText: "Todos",
  };

  return (
    <DataTable
      progressPending={cargando}
      progressComponent={<Spinner />}
      customStyles={customStyles}
      pagination
      paginationComponentOptions={paginationOptions}
      noDataComponent="No se encontraron datos para mostrar"
      selectableRowsComponent={Checkbox}
      selectableRowsComponentProps={selectProps}
      sortIcon={sortIcon}
      dense
      {...props}
    />
  );
};

export default Tabla;
