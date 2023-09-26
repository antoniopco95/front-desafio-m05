import React from 'react';
import './styles.css'
import ChargesTable from '../ChargesTable';

function ChargesComponent() {

    return (
        <>
            <div className='chargescomponent-box'>
                <div className='chargescomponent-title'>Cobranças</div>
                <ChargesTable />
            </div>
        </>
    )
};

export default ChargesComponent;