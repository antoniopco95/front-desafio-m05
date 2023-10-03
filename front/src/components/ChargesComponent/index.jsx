import React from "react";
import "./styles.css";
import ChargesTable from "../ChargesTable";
import SnackBarSuccess from "../SnackBarSuccess";
import useUser from "../../hooks/useUser";

function ChargesComponent() {
  const { customMessageApprove, openSnackApprove, setOpenSnackApprove } =
    useUser();
  return (
    <>
      <div className="chargescomponent-box">
        <div className="chargescomponent-title">Cobranças</div>
        <ChargesTable />
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
