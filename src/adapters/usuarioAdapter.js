
export const createUserAdapter = (usuario) => (
    {    
    id: usuario.id,
    rut: usuario.rut,
    uid: usuario.uid,
    nombres: usuario.nombres,
    apellidos: usuario.apellidos,
    correo: usuario.correo,
    telefono: usuario.telefono,
    anexo: usuario.anexo,
    //id_cargo: usuario.cargo.id,
    cargo: {
        id: usuario.cargo.id,
        nombre: usuario.cargo.nombre,
    },
    permisos: usuario.permisos,

    lugarTrabajos: {
        id: usuario.permisos[0].lugarTrabajo
    },
    activo: usuario.activo
})


export const loginAdapter = (correo) => (
    {
        username: correo,
        password: "123456"
    }
)