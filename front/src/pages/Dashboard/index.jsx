import "./styles.css";
import VerticalHeader from "../../components/VerticalHeader";
import React, { useState, useEffect } from "react";
import { getItem } from "../../utils/storage";
import AccountMenu from "../../components/AccountMenu";
import HomeComponent from "../../components/HomeComponent";
import ClientsComponent from "../../components/ClientsComponent";
import ChargesComponent from "../../components/ChargesComponent";
import EditModal from "../../components/EditModal";
import DeleteChargesModal from "../../components/DeleteChargesModal";
import { useNavigate } from "react-router-dom";
import ChargesDetails from "../../components/ChargesDetails";
import { useClients } from "../../context/clientsContext";
import SnackBarSuccess from "../../components/SnackBarSuccess";
import SnackBarFail from "../../components/SnackBarFail";

function Dashboard() {
  const { home, setHome, clients, setClients, charges, setCharges } = useClients();

  const [delChargesOpen, setDelChargesOpen] = useState(false);
  const handleDelChargesOpen = () => setDelChargesOpen(true);
  const handleDelChargesClose = () => setDelChargesOpen(false);

  const [chargesDetailsOpen, setChargesDetailsOpen] = useState(false);
  const handleOpenChargesDetails = () => setChargesDetailsOpen(true);
  const handleCloseChargesDetails = () => setChargesDetailsOpen(false);

  const [customMessageApprove, setCustomMessageApprove] = useState("");
  const [openSnackApprove, setOpenSnackApprove] = useState(false);

  const [customMessageReprove, setCustomMessageReprove] = useState("");
  const [openSnackReprove, setOpenSnackReprove] = useState(false);

  const handleClickSnack = () => {
    setOpenSnackApprove(true);
  };
  const handleClickSnackFail = () => {
    setOpenSnackReprove(true);
  };

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  const navigate = useNavigate();

  const token = getItem("token");

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
    }
  }, []);

  if (!isAuthenticated) {
    return navigate("/");
  }

  const toggleHome = (e) => {
    e.preventDefault();
    setHome(true);
    setClients(false);
    setCharges(false);
  };

  const toggleClients = (e) => {
    e.preventDefault();
    setHome(false);
    setClients(true);
    setCharges(false);
  };

  const toggleCharges = (e) => {
    e.preventDefault();
    setHome(false);
    setClients(false);
    setCharges(true);
  };


  useEffect(() => { }, [home, clients, charges]);


  const handleExit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    return navigate("/");
  };

  return (

    <div className="box-size">
      <VerticalHeader
        home={home}
        clients={clients}
        charges={charges}
        toggleHome={toggleHome}
        toggleClients={toggleClients}
        toggleCharges={toggleCharges}
      />
      <div className="login-header">
        <AccountMenu handleOpenEdit={handleOpenEdit} handleExit={handleExit} />
      </div>
      {home && <HomeComponent />}
      {clients && (
        <ClientsComponent
          openAdd={openAdd}
          handleOpenAdd={handleOpenAdd}
          handleCloseAdd={handleCloseAdd}
          customMessageApprove={customMessageApprove}
          setCustomMessageApprove={setCustomMessageApprove}
          openSnackApprove={openSnackApprove}
          setOpenSnackApprove={setOpenSnackApprove}
          handleClickSnack={handleClickSnack}
          handleDelChargesOpen={handleDelChargesOpen}
          handleOpenChargesDetails={handleOpenChargesDetails}
        />
      )}
      {charges && <ChargesComponent
        customMessageApprove={customMessageApprove}
        setCustomMessageApprove={setCustomMessageApprove}
        openSnackApprove={openSnackApprove}
        setOpenSnackApprove={setOpenSnackApprove}
        handleClickSnack={handleClickSnack}
        delChargesOpen={delChargesOpen}
        handleDelChargesOpen={handleDelChargesOpen}
        handleDelChargesClose={handleDelChargesClose}
        chargesDetailsOpen={chargesDetailsOpen}
        handleOpenChargesDetails={handleOpenChargesDetails}
        handleCloseChargesDetails={handleCloseChargesDetails}
      />
      }
      <ChargesDetails chargesDetailsOpen={chargesDetailsOpen} handleCloseChargesDetails={handleCloseChargesDetails} />
      <DeleteChargesModal delChargesOpen={delChargesOpen} handleDelChargesClose={handleDelChargesClose} handleClickSnack={handleClickSnack} setCustomMessageApprove={setCustomMessageApprove} setCustomMessageReprove={setCustomMessageReprove} handleClickSnackFail={handleClickSnackFail} />
      <EditModal openEdit={openEdit} handleCloseEdit={handleCloseEdit} token={token} />
      <SnackBarSuccess customMessageApprove={customMessageApprove} openSnackApprove={openSnackApprove} setOpenSnackApprove={setOpenSnackApprove} />
      <SnackBarFail customMessageReprove={customMessageReprove} openSnackReprove={openSnackReprove} setOpenSnackReprove={setOpenSnackReprove} />
    </div>

  );
}

export default Dashboard;
