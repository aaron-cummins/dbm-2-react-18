import DataTable from "react-data-table-component";
import Checkbox from "@mui/material/Checkbox";
import { ArrowDownward } from "@mui/icons-material";
import useFetchAndLoad from "../../hooks/useFetchAndLoad";

const sortIcon = <ArrowDownward />;
const selectProps = { indeterminate: (isIndeterminate) => isIndeterminate };

const Tabla = (props) => {
  const { loading } = useFetchAndLoad();

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

  return (
    <DataTable
      progressPending={loading}
      customStyles={customStyles}
      pagination
      selectableRowsComponent={Checkbox}
      selectableRowsComponentProps={selectProps}
      sortIcon={sortIcon}
      dense
      {...props}
    />
  );
};

export default Tabla;
