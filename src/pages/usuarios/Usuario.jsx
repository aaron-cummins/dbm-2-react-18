import React from 'react';
import { Header, Modal } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../../data/dummy';
import FormUsuario from './FormUsuario';

const Usuario = () => {
    const { currentColor } = useStateContext();

    const editing = { allowDeleting: true, allowEditing: true };
    const toolbarOptions = ['Search'];

    return (
        <div className="m-1 p-3 md:p-7 bg-white rounded-3xl">
            <Header category="Administración" title="Usuarios" >
                <button
                    type="button"
                    data-bs-toggle="modal" 
                    data-bs-target="#user-modal"
                    style={{ backgroundColor: currentColor, color:"white", borderRadius: "10px" }}
                    className={`gap-5 p-3  hover:drop-shadow-xl hover:bg-${ currentColor } text-center inline-flex items-center`}
                    > Nuevo usuario
                </button>
            </Header>
                    
            

            <GridComponent
                dataSource={employeesData}
                width="auto"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5 }}
                editSettings={editing}
                toolbar={toolbarOptions}
            >
                <ColumnsDirective>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
                <Inject services={[Search, Page]} />

            </GridComponent>

            <Modal ModalTitle="Usuario" modalId='user-modal'>
                <FormUsuario></FormUsuario>
            </Modal>

        </div>

       
    )
}

export default Usuario;