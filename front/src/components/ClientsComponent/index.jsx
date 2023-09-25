import React, { useState, useEffect } from "react";
import "./styles.css";
import ClientsTable from "../ClientsTable";
import AddClientModal from "../AddClientModal";
import ClientDetails from "../ClientDetails";
import useUser from "../../hooks/useUser";

function ClientsComponent({ openAdd, handleOpenAdd, handleCloseAdd }) {
  const { openClientDetail, divIsVisible, setOpenClientDetail, setDivIsVisible } =
    useUser();

  return (
    <>
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
        <div className="clientscomponent-box">
          <ClientsTable handleOpenAdd={handleOpenAdd} />
          <AddClientModal openAdd={openAdd} handleCloseAdd={handleCloseAdd} />
        </div>
      )}
      {openClientDetail && <ClientDetails />}
    </>
  );
}

export default ClientsComponent;
