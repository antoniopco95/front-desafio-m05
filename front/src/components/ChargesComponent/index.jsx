import React, { useState } from 'react';
import './styles.css'
import ChargesTable from '../ChargesTable';
import ChargesDetails from '../ChargesDetails';
import SnackBarSuccess from '../SnackBarSuccess';
import useUser from "../../hooks/useUser";

function ChargesComponent({ setCustomMessageApprove, handleClickSnack, delChargesOpen, handleDelChargesOpen, handleDelChargesClose, chargesDetailsOpen, handleOpenChargesDetails, handleCloseChargesDetails }) {
  const { customMessageApprove, openSnackApprove, setOpenSnackApprove } =
    useUser();
  return (
    <>
      <div className="chargescomponent-box">
        <div className="chargescomponent-title">Cobranças</div>
        <ChargesTable handleDelChargesOpen={handleDelChargesOpen} handleOpenChargesDetails={handleOpenChargesDetails} />
        <SnackBarSuccess
          customMessageApprove={customMessageApprove}
          setCustomMessageApprove={setCustomMessageApprove}
          openSnackApprove={openSnackApprove}
          setOpenSnackApprove={setOpenSnackApprove}
          handleClickSnack={handleClickSnack}
        />
      </div>
      <SnackBarSuccess
        customMessageApprove={customMessageApprove}
        openSnackApprove={openSnackApprove}
        setOpenSnackApprove={setOpenSnackApprove}
      />
    </>
  );
}

export default ChargesComponent;
