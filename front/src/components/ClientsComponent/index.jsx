/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./styles.css";
import ClientsTable from "../ClientsTable";
import AddClientModal from "../AddClientModal";
import CreateCharges from "../CreateCharges";
import SnackBarSuccess from "../SnackBarSuccess";
import ClientDetails from "../ClientDetails";
import useUser from "../../hooks/useUser";

function ClientsComponent({ openAdd, handleOpenAdd, handleCloseAdd }) {
  const {
    openClientDetail,
    divIsVisible,
    setOpenClientDetail,
    setDivIsVisible,
  } = useUser();


  const [inputChargeName, setInputChargeName] = useState("");


  const [customMessageApprove, setCustomMessageApprove] = useState("");
  const [openSnackApprove, setOpenSnackApprove] = useState(false);

  const handleClickSnack = () => {
    setOpenSnackApprove(true);
  };

  const [openCreateCharges, setOpenCreateCharges] = useState(false);
  const handleOpenCreateCharges = () => {
    setInputChargeName(localStorage.getItem("clientsName"));
    setOpenCreateCharges(true);
  };
  const handleCloseCreateCharges = () => setOpenCreateCharges(false);

  return (
    <>
      <div className="clientscomponent-box">
        <div
          onClick={() => {
            setOpenClientDetail(false);
            setDivIsVisible(true);
          }}
          className="clientscomponent-title"
        >
          Clientes
        </div>
        {divIsVisible && (
          <>
            {" "}
            <ClientsTable
              handleOpenAdd={handleOpenAdd}
              handleOpenCreateCharges={handleOpenCreateCharges}
            />
            <AddClientModal openAdd={openAdd} handleCloseAdd={handleCloseAdd} />

            <CreateCharges
              openCreateCharges={openCreateCharges}
              handleCloseCreateCharges={handleCloseCreateCharges}
              handleClickSnack={handleClickSnack}
              setCustomMessageApprove={setCustomMessageApprove}
              inputChargeName={inputChargeName}
            />
            <SnackBarSuccess
              customMessageApprove={customMessageApprove}
              openSnackApprove={openSnackApprove}
              setOpenSnackApprove={setOpenSnackApprove}
            />

          </>
        )}
      </div>
      <CreateCharges
        openCreateCharges={openCreateCharges}
        handleCloseCreateCharges={handleCloseCreateCharges}
        handleClickSnack={handleClickSnack}
        setCustomMessageApprove={setCustomMessageApprove}
        inputChargeName={inputChargeName}
      />
      <SnackBarSuccess
        customMessageApprove={customMessageApprove}
        openSnackApprove={openSnackApprove}
        setOpenSnackApprove={setOpenSnackApprove}
      />
      {openClientDetail && <ClientDetails handleOpenCreateCharges={handleOpenCreateCharges} />}
    </>
  );
}

export default ClientsComponent;
