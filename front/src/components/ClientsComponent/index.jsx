import React, { useState } from "react";
import "./styles.css";
import ClientsTable from "../ClientsTable";
import AddClientModal from "../AddClientModal";
import CreateCharges from "../CreateCharges";
import SnackBarSuccess from "../SnackBarSuccess";
import ClientDetails from "../ClientDetails";
import useUser from "../../hooks/useUser";

function ClientsComponent({ openAdd, handleOpenAdd, handleCloseAdd, handleDelChargesOpen, handleOpenChargesDetails }) {

  const {
    openClientDetail,
    divIsVisible,
    setOpenClientDetail,
    setDivIsVisible,
    customMessageApprove,
    setCustomMessageApprove,
    openSnackApprove,
    setOpenSnackApprove,
    onClickSnack,
  } = useUser();

  const [inputChargeName, setInputChargeName] = useState("");

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
              handleClickSnack={onClickSnack}
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
        handleClickSnack={onClickSnack}
        setCustomMessageApprove={setCustomMessageApprove}
        inputChargeName={inputChargeName}
      />
      <SnackBarSuccess
        customMessageApprove={customMessageApprove}
        openSnackApprove={openSnackApprove}
        setOpenSnackApprove={setOpenSnackApprove}
      />
      {openClientDetail && (
        <ClientDetails handleDelChargesOpen={handleDelChargesOpen}
          handleOpenChargesDetails={handleOpenChargesDetails}
          handleOpenCreateCharges={handleOpenCreateCharges}
          handleClickSnack={onClickSnack}
          setCustomMessageApprove={setCustomMessageApprove}
        />
      )}
    </>
  );
}

export default ClientsComponent;
