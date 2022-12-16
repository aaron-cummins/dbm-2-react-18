import { Routes, Route } from "react-router-dom";
import {
  Usuario,
  ErrorPage,
  LugarTrabajo,
  Region,
  Comuna,
  Oem,
  AplicacionOem,
  Cargo,
  Aplicacion,
  ModuloControl,
  Modulos,
  Pais,
  PostTratamiento,
  TipoBlock,
  EstadoEquipo,
  EstadoEquipoInstalacion,
  TipoAdmision,
  TipoCombustible,
  TipoEmision,
  TipoFiltrado,
  TipoInyeccion,
  TipoLugarTrabajo,
  Roles,
  Vistas,
  VistasGroup,
  Zona,
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Area,
  Bar,
  Pie,
  Line,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
  PermisosGlobales,
  Equipo,
  Flotas,
  FlotaLugarTrabajo,
  VersionEquipo,
  Unidad,
  Motor,
  PermisosUsuario,
  IndexUsuario,
} from "pages";
import AuthGuard from "./AuthGuard";

const Rutas = () => {
  return (
    <Routes>
      {/* Pagina de Error */}
      <Route path="*" element={<ErrorPage />} />
      <Route path="/inicio" element={<Ecommerce />} />
      {/* Dashboard */}
      <Route path="/" element={<Ecommerce />}></Route>
      <Route path="/ecommerce" element={<Ecommerce />}></Route>

      <Route element={<AuthGuard />}>
        {/* Administración */}
        <Route path="/aplicacion" element={<Aplicacion />}></Route>
        <Route path="/aplicacionoem" element={<AplicacionOem />}></Route>
        <Route path="/cargo" element={<Cargo />}></Route>
        <Route path="/comuna" element={<Comuna />}></Route>
        <Route path="/equipo" element={<Equipo />}></Route>
        <Route path="/EstadoEquipo" element={<EstadoEquipo />}></Route>
        <Route path="/EstadoEquipoInstalacion" element={<EstadoEquipoInstalacion />}></Route>
        <Route path="/flotas" element={<Flotas />}></Route>
        <Route path="/flotalugartrabajo" element={<FlotaLugarTrabajo />}></Route>
        <Route path="/lugardetrabajo" element={<LugarTrabajo />}></Route>
        <Route path="/modulocontrol" element={<ModuloControl />}></Route>
        <Route path="/modulos" element={<Modulos />}></Route>
        <Route path="/motor" element={<Motor />}></Route>
        <Route path="/oem" element={<Oem />}></Route>
        <Route path="/pais" element={<Pais />}></Route>
        <Route path="/permisosglobales" element={<PermisosGlobales />}></Route>
        <Route path="/posttratamiento" element={<PostTratamiento />}></Route>
        <Route path="/region" element={<Region />}></Route>
        <Route path="/roles" element={<Roles />}></Route>
        <Route path="/tipoadmision" element={<TipoAdmision />}></Route>
        <Route path="/tipocombustible" element={<TipoCombustible />}></Route>
        <Route path="/tipoemision" element={<TipoEmision />}></Route>
        <Route path="/tipofiltrado" element={<TipoFiltrado />}></Route>
        <Route path="/tipoinyeccion" element={<TipoInyeccion />}></Route>
        <Route path="/tipolugartrabajo" element={<TipoLugarTrabajo />}></Route>
        <Route path="/unidad" element={<Unidad />}></Route>
        <Route path="/TipoBlock" element={<TipoBlock />}></Route>

        <Route path="/usuarios" element={<Usuario />}>
          <Route index element={<IndexUsuario />}></Route>
          <Route path="permisosusuario/:iduser" element={<PermisosUsuario />}></Route>
        </Route>
        <Route path="/versionequipo" element={<VersionEquipo />}></Route>
        <Route path="/vistas" element={<Vistas />}></Route>
        <Route path="/vistasgroup" element={<VistasGroup />}></Route>
        <Route path="/zona" element={<Zona />}></Route>
      </Route>
      {/* Pages */}
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/employees" element={<Employees />}></Route>
      <Route path="/customers" element={<Customers />}></Route>

      {/* APPS */}
      <Route path="/kanban" element={<Kanban />}></Route>
      <Route path="/editor" element={<Editor />}></Route>
      <Route path="/calendar" element={<Calendar />}></Route>
      <Route path="/color-picker" element={<ColorPicker />}></Route>

      {/* CHARTS */}
      <Route path="/line" element={<Line />}></Route>
      <Route path="/area" element={<Area />}></Route>
      <Route path="/pie" element={<Pie />}></Route>
      <Route path="/bar" element={<Bar />}></Route>
      <Route path="/financial" element={<Financial />}></Route>
      <Route path="/color-mapping" element={<ColorMapping />}></Route>
      <Route path="/pyramid" element={<Pyramid />}></Route>
      <Route path="/stacked" element={<Stacked />}></Route>
    </Routes>
  );
};

export default Rutas;
