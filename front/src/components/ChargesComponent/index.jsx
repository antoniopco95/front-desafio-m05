import React, { useState } from 'react';
import './styles.css'
import ChargesTable from '../ChargesTable';
import ChargesDetails from '../ChargesDetails';
import SnackBarSuccess from '../SnackBarSuccess';
import DeleteChargesModal from '../DeleteChargesModal';

function ChargesComponent({ customMessageApprove, setCustomMessageApprove, openSnackApprove, setOpenSnackApprove, handleClickSnack }) {

    const [delChargesOpen, setDelChargesOpen] = useState(false);
    const handleDelChargesOpen = () => setDelChargesOpen(true);
    const handleDelChargesClose = () => setDelChargesOpen(false);

    const [chargesDetailsOpen, setChargesDetailsOpen] = useState(false);
    const handleOpenChargesDetails = () => setChargesDetailsOpen(true);
    const handleCloseChargesDetails = () => setChargesDetailsOpen(false);

    return (
        <>
            <div className='chargescomponent-box'>
                <div className='chargescomponent-title'>Cobranças</div>
                <ChargesTable handleDelChargesOpen={handleDelChargesOpen} handleOpenChargesDetails={handleOpenChargesDetails} />
                <DeleteChargesModal delChargesOpen={delChargesOpen} handleDelChargesClose={handleDelChargesClose} handleClickSnack={handleClickSnack} setCustomMessageApprove={setCustomMessageApprove} />
                <SnackBarSuccess
                    customMessageApprove={customMessageApprove}
                    setCustomMessageApprove={setCustomMessageApprove}
                    openSnackApprove={openSnackApprove}
                    setOpenSnackApprove={setOpenSnackApprove}
                    handleClickSnack={handleClickSnack}
                />
                <ChargesDetails chargesDetailsOpen={chargesDetailsOpen} handleCloseChargesDetails={handleCloseChargesDetails} />
            </div>
        </>
    )
};

export default ChargesComponent;