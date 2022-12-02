import React, { useEffect, useContext, useState } from "react";
import { PermisosGlobalesContext } from "../context/permisosGlobalesContext";
import { useStateContext } from "contexts/ContextProvider";
import { SelectsContext } from "contexts/SelectsContext";
import { Alerts, OpcionesTabla, Tabla } from "components";

const TablaPermisoGlobal = () => {
  const {
    permisoGlobalList,
    obtenerPermisosGlobales,
    obtenerPermisoGlobal,
    registrarPermisoGlobalList,
  } = useContext(PermisosGlobalesContext);
  const { obtenerModulos, obtenerRol, rolesList, modulosList } =
    useContext(SelectsContext);
  const { mensaje } = useStateContext();

  const [checkedState, setCheckedState] = useState([]);

  //const [permisosGlobales, SetPermisosGlobales] = useState([]);

  const getPermisoGlobal = (props) => {
    obtenerPermisoGlobal(props);
  };

  useEffect(() => {
    obtenerPermisosGlobales();
    obtenerModulos();
    obtenerRol();
    //setCheckedState([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleCheckbox();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolesList]);

  const handleCheckbox = () => {
    modulosList.forEach((mod) => {
      rolesList.forEach((rol) => {
        const m = {
          key: `${rol.id}_${mod.id}`,
          id: !permisoGlobalList.map((item) =>
            rol.id === item.rolId && mod.id === item.moduloId ? item.id : 0
          ),
          moduloId: mod.id,
          rolId: rol.id,
          activo: !permisoGlobalList.find(
            (item) => rol.id === item.rolId && mod.id === item.moduloId
          )
            ? false
            : true,
        };

        checkedState.push(m);
        let checkedStateNew = [...new Set(checkedState)];
        setCheckedState(checkedStateNew);
      });
    });
  };

  /*const handleCheckbox = () => {
    modulosList.forEach((mod) => {
      setCheckedState([
        ...checkedState,
        rolesList.map((rol) => ({
          key: `${rol.id}_${mod.id}`,
          id: 0,
          moduloId: mod.id,
          rolId: rol.id,
          activo: !permisoGlobalList.find(
            (item) => rol.id === item.rolId && mod.id === item.moduloId
          )
            ? false
            : true,
        })),
      ]);
    });
  };*/

  const columns = [
    { name: "Id", selector: (row) => row.id, sortable: true },
    { name: "Rol", selector: (row) => row.rolId, sortable: true },
    { name: "Módulo", selector: (row) => row.moduloId, sortable: true },
    {
      name: "Acciones",
      cell: (props) => (
        <OpcionesTabla
          editar={true}
          FnEditar={() => getPermisoGlobal(props)}
          nombreform="PermisoGlobal"
        />
      ),
    },
  ];

  const handleChange = (e) => {
    //if (e.target.checked) {
    //let perm = e.target.id.split("_");
    let c = checkedState.find((item) => item.key === e.target.id);
    c.activo = !c.activo;

    setCheckedState(
      checkedState.map((item) => (item.key === e.target.id ? c : item))
    );
    //if (permisosGlobales.find((item) => item.key === e.target.id)) return;

    /*const newPermiso = {
        key: e.target.id,
        id: 0,
        moduloId: perm[1],
        rolId: perm[0],
      };*/

    //SetPermisosGlobales([...permisosGlobales, newPermiso]);
    //} else {
    //checkedState.find((item) =>
    //  item.key === e.target.id ? (item.activo = false) : null
    //);
    /*SetPermisosGlobales(
        permisosGlobales.filter((permiso) => permiso.key !== e.target.id)
      );*/
    //}
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    registrarPermisoGlobalList(PermisoGlobalAEnviar());
  };

  const PermisoGlobalAEnviar = () => {
    let PermisoGlobalTmp = [];

    PermisoGlobalTmp = checkedState.map((item) => {
      if (item.activo === true) {
        return {
          id: 0,
          moduloId: item.moduloId,
          rolId: item.rolId,
        };
      }
    });

    return PermisoGlobalTmp;
  };

  return (
    <>
      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <Tabla columns={columns} data={permisoGlobalList} />

      {mensaje.mensaje ? (
        <Alerts type={mensaje.tipoAlerta}>{mensaje.mensaje}</Alerts>
      ) : null}
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 pl-2 border">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="text-center">
              <th width="30%"></th>
              {rolesList.map((item) => (
                <td className="border" key={`${item.id}_r`}>
                  {item.nombre}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {modulosList.map((item) => (
              <tr key={`${item.id}_m_tr`}>
                <td className="border ml-2" key={`${item.id}_m`}>
                  <b>{item.nombre}</b>
                </td>

                {checkedState?.map((i) =>
                  i.moduloId === item.id ? (
                    <td
                      className="text-center border"
                      key={`${item.id}_${i.rolId}`}>
                      <input
                        key={i.key}
                        type="checkbox"
                        id={i.key}
                        name={i.key}
                        value={i.key}
                        onChange={handleChange}
                        //checked={checkedState}
                        checked={i.activo}
                      />
                    </td>
                  ) : null
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <br />
        <div className="flex-grow border-t"></div>
        <br />

        <button
          type="button"
          onClick={handleOnSubmit}
          className="float-right inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight rounded shadow-md bg-red-cummins hover:bg-red-cummins hover:shadow-lg focus:bg-red-cummins focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-cummins active:shadow-lg transition duration-150 ease-in-out ml-1">
          Guardar
        </button>

        <button
          type="button"
          onClick={() => {}}
          className="float-right inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight rounded shadow-md bg-light-gray hover:bg-light-gray hover:shadow-lg focus:bg-light-gray focus:shadow-lg focus:outline-none focus:ring-0 active:bg-light-gray active:shadow-lg transition duration-150 ease-in-out">
          Volver
        </button>
        <br />
      </div>
    </>
  );
};

export default TablaPermisoGlobal;
