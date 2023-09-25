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

  const [customMessageApprove, setCustomMessageApprove] = useState("");
  const [openSnackApprove, setOpenSnackApprove] = useState(false);

  const handleClickSnack = () => {
    setOpenSnackApprove(true);
  };

  const [openCreateCharges, setOpenCreateCharges] = useState(false);
  const handleOpenCreateCharges = () => setOpenCreateCharges(true);
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
       { <ClientsTable
          handleOpenAdd={handleOpenAdd}
          handleOpenCreateCharges={handleOpenCreateCharges}
        />}
        <AddClientModal openAdd={openAdd} handleCloseAdd={handleCloseAdd} />
        <CreateCharges
          openCreateCharges={openCreateCharges}
          handleCloseCreateCharges={handleCloseCreateCharges}
          handleClickSnack={handleClickSnack}
          setCustomMessageApprove={setCustomMessageApprove}
        />
        <SnackBarSuccess
          customMessageApprove={customMessageApprove}
          openSnackApprove={openSnackApprove}
          setOpenSnackApprove={setOpenSnackApprove}
        />
      </div>
      {openClientDetail && <ClientDetails />}
    </>
  );
}

export default ClientsComponent;
