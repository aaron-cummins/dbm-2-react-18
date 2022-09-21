/** PERSISTENCIA DE LA DATA **/
export const persistUsuarioState = (usuario) => {
  //localStorage.setItem('user_info', JSON.stringify({ ...usuario}));
  sessionStorage.setItem("user_info", JSON.stringify({ ...usuario }));

  let l_trabajo = [];
  usuario.permisos.map((item) => {
    return l_trabajo.push(item.lugarTrabajo);
  });

  let LTrabajos = new Set(l_trabajo);
  let LugarTrabajo = [...LTrabajos];
  //console.log(LugarTrabajo);
  LugarTrabajo = LugarTrabajo ? LugarTrabajo : [0];
  sessionStorage.setItem("user_info_lugaresTrabajo", JSON.stringify({ LugarTrabajo }));

  let id_trabajo = usuario.lugarTrabajos.id ? usuario.lugarTrabajos.id : 0;
  sessionStorage.setItem("user_info_lugarTrabajo_actual", id_trabajo);
};

export const persistJwt = (jwt) => {
  sessionStorage.setItem("@AnZr1SmZp2CvPa3-ToKnN_@CDRF", jwt);
};

/*  Elimina los datos de sesion */
export const LogOut = () => {
  sessionStorage.clear();
  localStorage.removeItem("accessToken");
  sessionStorage.removeItem("user_info");
  sessionStorage.removeItem("@AnZr1SmZp2CvPa3-ToKnN_@CDRF");
  window.location.href = "/";
  return true;
};

/* Obtiene el usuario guardando en la sessionStorage  */
export const getUsuarioPersist = () => {
  let userPerfil = null;
  const usuarioLog = sessionStorage.getItem("user_info");
  const jwtLog = sessionStorage.getItem("@AnZr1SmZp2CvPa3-ToKnN_@CDRF");

  if (
    (usuarioLog !== "" || usuarioLog !== null || usuarioLog !== undefined) &&
    (jwtLog !== "" || jwtLog !== null || jwtLog !== undefined)
  ) {
    userPerfil = JSON.parse(usuarioLog);
  }
  return userPerfil;
};

export const setUsuarioLugarTrabajo = (id_lugar_trabajo) => {
  return JSON.parse(sessionStorage.setItem("user_info_lugarTrabajo_actual", id_lugar_trabajo));
};

export const getUsuarioLugarTrabajo = () => {
  return JSON.parse(sessionStorage.getItem("user_info_lugarTrabajo_actual"));
};

export const getUsuarioLugaresTrabajoList = () => {
  return JSON.parse(sessionStorage.getItem("user_info_lugaresTrabajo"));
};

export const getPermisosUser = (lugar_trabajo) => {
  let permisos = [
    {
      id: 0,
      nombre: "Inicio",
      controller: "inicio",
      accion: "ecommerce",
      icono: 0,
    },
  ];

  let modulos = JSON.parse(sessionStorage.getItem("user_info"));
  modulos.permisos.forEach((item) => {
    if (item.lugarTrabajo === lugar_trabajo) {
      let permisosGlob = item.roles.permisosGlobales;
      permisosGlob.forEach((i) => {
        i.modulo && permisos.push(i.modulo);
      });
    }
  });
  return permisos;
};
