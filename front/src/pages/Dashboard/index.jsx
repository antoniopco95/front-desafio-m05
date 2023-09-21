import "./styles.css";
import VerticalHeader from "../../components/VerticalHeader";
import React, { useState, useEffect } from "react";
import AccountLogin from "../../components/AccountLogin";
import HomeComponent from "../../components/HomeComponent";
import ClientsComponent from "../../components/ClientsComponent";
import EditModal from "../../components/EditModal";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

function Dashboard() {
  const { setName, setId } = useUser();
  const [home, setHome] = useState(true);
  const [clients, setClients] = useState(false);
  const [charges, setCharges] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
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

  useEffect(() => {}, [home, clients]);

  const handleExit = () => {
    localStorage.removeItem("token");
    setName("");
    setId("");
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
        <AccountLogin handleOpenEdit={handleOpenEdit} handleExit={handleExit} />
      </div>
      {home && <HomeComponent />}
      {clients && (
        <ClientsComponent
          openAdd={openAdd}
          handleOpenAdd={handleOpenAdd}
          handleCloseAdd={handleCloseAdd}
        />
      )}
      <EditModal openEdit={openEdit} handleCloseEdit={handleCloseEdit} />
    </div>
  );
}

export default Dashboard;
