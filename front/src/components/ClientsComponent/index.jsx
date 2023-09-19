import React from 'react';
import './styles.css'
import ClientsTable from '../ClientsTable';
import AddClientModal from '../AddClientModal';

function ClientsComponent({ openAdd, handleOpenAdd, handleCloseAdd }) {

    return (
        <>
            <div className='clientscomponent-box'>
                <div className='clientscomponent-title'>Clientes</div>
                <ClientsTable handleOpenAdd={handleOpenAdd} />
                <AddClientModal openAdd={openAdd} handleCloseAdd={handleCloseAdd} />
            </div>
        </>
    )
};

export default ClientsComponent;