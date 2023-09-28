import React, { useState } from 'react';
import './styles.css'
import ChargesTable from '../ChargesTable';
import SnackBarSuccess from '../SnackBarSuccess';
import DeleteChargesModal from '../DeleteChargesModal';

function ChargesComponent({ customMessageApprove, setCustomMessageApprove, openSnackApprove, setOpenSnackApprove, handleClickSnack }) {

    const [delChargesOpen, setDelChargesOpen] = useState(false);
    const handleDelChargesOpen = () => setDelChargesOpen(true);
    const handleDelChargesClose = () => setDelChargesOpen(false);

    return (
        <>
            <div className='chargescomponent-box'>
                <div className='chargescomponent-title'>Cobranças</div>
                <ChargesTable handleDelChargesOpen={handleDelChargesOpen} />
                <DeleteChargesModal delChargesOpen={delChargesOpen} handleDelChargesClose={handleDelChargesClose} handleClickSnack={handleClickSnack} setCustomMessageApprove={setCustomMessageApprove} />
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