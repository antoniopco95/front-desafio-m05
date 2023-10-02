import React, { useState } from 'react';
import './styles.css'
import ChargesTable from '../ChargesTable';
import ChargesDetails from '../ChargesDetails';
import SnackBarSuccess from '../SnackBarSuccess';

function ChargesComponent({ customMessageApprove, setCustomMessageApprove, openSnackApprove, setOpenSnackApprove, handleClickSnack, delChargesOpen, handleDelChargesOpen, handleDelChargesClose, chargesDetailsOpen, handleOpenChargesDetails, handleCloseChargesDetails }) {

    return (
        <>
            <div className='chargescomponent-box'>
                <div className='chargescomponent-title'>Cobranças</div>
                <ChargesTable handleDelChargesOpen={handleDelChargesOpen} handleOpenChargesDetails={handleOpenChargesDetails} />
                <SnackBarSuccess
                    customMessageApprove={customMessageApprove}
                    setCustomMessageApprove={setCustomMessageApprove}
                    openSnackApprove={openSnackApprove}
                    setOpenSnackApprove={setOpenSnackApprove}
                    handleClickSnack={handleClickSnack}
                />
            </div>
        </>
    )
};

export default ChargesComponent;