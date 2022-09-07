
import { HiOutlineHome } from 'react-icons/hi';
import { CgMenuGridR } from 'react-icons/cg';
import { BiFoodMenu } from 'react-icons/bi';

export const linkses = [
    {
        id: 1,
        nombre: 'Inicio',
        controller: 'inicio',
        accion: 'ecommerce',
        icon: <HiOutlineHome/>
    },
    {
        id: 2,
        nombre: 'Administración',
        controller: 'administracion',
        accion: '#',
        icon: <CgMenuGridR/>,
        grupo: [
            {
                id: 1,
                nombre: 'configuraciones',
                vistas: [
                    {
                        id: 2,
                        nombre: "Lugar de trabajo",
                        controller: "administracion",
                        accion: 'lugardetrabajo',
                        grupo: 'configuraciones',
                    },
                    {
                        id: 12,
                        nombre: 'País',
                        controller: "administracion",
                        accion: 'pais',
                        grupo: 'configuraciones'
                    },
                    {
                        id: 4,
                        nombre: 'Región',
                        controller: "administracion",
                        accion: 'region',
                        grupo: 'configuraciones'
                    },
                    {
                        id: 5,
                        nombre: 'Comuna',
                        controller: "administracion",
                        accion: 'comuna',
                        grupo: 'configuraciones'
                    },
                    {
                        id: 19,
                        nombre: 'Vistas',
                        controller: "administracion",
                        accion: 'vistas',
                        grupo: 'configuraciones'
                    },
                    {
                        id: 21,
                        nombre: 'Grupo de Vistas',
                        controller: "administracion",
                        accion: 'vistasgroup',
                        grupo: 'configuraciones'
                    },
                    {
                        id: 11,
                        nombre: 'Módulos',
                        controller: "administracion",
                        accion: 'modulos',
                        grupo: 'configuraciones'
                    },
                ]
            },
            {
                id: 2,
                nombre: 'dotacion',
                vistas: [
                    {
                        id: 3,
                        nombre: 'Usuarios',
                        controller: "administracion",
                        accion: 'usuarios',
                        grupo: 'dotacion'
                    },
                    {
                        id: 8,
                        nombre: 'Cargo',
                        controller: "administracion",
                        accion: 'cargo',
                        grupo: 'dotacion'
                    },
                    {
                        id: 18,
                        nombre: 'Roles',
                        controller: "administracion",
                        accion: 'roles',
                        grupo: 'dotacion'
                    }
                ]
            },
            {
                id: 3,
                nombre: 'oems',
                vistas: [
                    {
                        id: 6,
                        nombre: 'Oem',
                        controller: "administracion",
                        accion: 'oem',
                        grupo: 'oems'
                    },
                    {
                        id: 7,
                        nombre: 'Aplicación Oem',
                        controller: "administracion",
                        accion: 'aplicacionoem',
                        grupo: 'oems'
                    },
                    {
                        id: 9,
                        nombre: 'Aplicación',
                        controller: "administracion",
                        accion: 'aplicacion',
                        grupo: 'oems'
                    },
                    {
                        id: 10,
                        nombre: 'Módulo Control',
                        controller: "administracion",
                        accion: 'modulocontrol',
                        grupo: 'oems'
                    },
                ]
            },
            {
                id: 4,
                nombre: 'motor',
                vistas: [
                    {
                        id: 13,
                        nombre: 'Tipo Admisión',
                        controller: "administracion",
                        accion: 'tipoadmision',
                        grupo: 'motor'
                    },
                    {
                        id: 14,
                        nombre: 'Tipo Combustible',
                        controller: "administracion",
                        accion: 'tipocombustible',
                        grupo: 'motor'
                    },
                    {
                        id: 15,
                        nombre: 'Tipo Emisión',
                        controller: "administracion",
                        accion: 'tipoemision',
                        grupo: 'motor'
                    },
                    {
                        id: 16,
                        nombre: 'Tipo Filtrado',
                        controller: "administracion",
                        accion: 'tipofiltrado',
                        grupo: 'motor'
                    },
                    {
                        id: 17,
                        nombre: 'Tipo Inyección',
                        controller: "administracion",
                        accion: 'tipoinyeccion',
                        grupo: 'motor'
                    },
                ]
            }
      ],
    },
  
    {
        id: 3,
        nombre: 'Pages',
        controller: 'pages',
        accion: '#',
        icon: <BiFoodMenu/>,
        grupo: [
            {
                id: 500,
                nombre: 'Paginas',
                vistas: [
                    {
                        id: 6,
                        nombre: 'Ordenes',
                        controller: "pages",
                        accion: 'orders'
                    },
                    {
                        id: 7,
                        nombre: 'Empleados',
                        controller: "pages",
                        accion: 'employees'
                    },
                    {
                        id: 8,
                        nombre: 'Clientes',
                        controller: "pages",
                        accion: 'customers'
                    },
                ]
            }
        
      ],
    },
]