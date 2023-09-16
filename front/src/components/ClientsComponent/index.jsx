import React from 'react';
import './styles.css'
import ClientsTable from '../ClientsTable';

function ClientsComponent() {

    return (
        <>
            <div className='clientscomponent-box'>
                <div className='clientscomponent-title'>Clientes</div>
                <ClientsTable />
            </div>
        </>
    )
};

export default ClientsComponent;