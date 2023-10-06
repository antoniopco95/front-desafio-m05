/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./styles.css";
import ClientsIcon from "../../assets/ClientsIcon.svg";
import FilterIcon from "../../assets/FilterIcon.svg";
import SearchIcon from "../../assets/SearchIcon.svg";
import AddCharge from "../../assets/AddCharge.svg";
import NotFoundIcon from "../../assets/NotFound.svg"
import { getItem, setItem } from "../../utils/storage";
import registerUserFecth from "../../axios/config";
import { useClients } from "../../context/clientsContext";
import useUser from "../../hooks/useUser";

function ClientsTable({ handleOpenAdd, handleOpenCreateCharges }) {

  const { clientsData, updateClientsData, allStatus, resetAllStatus, updateClientStatus, clientStatus, setAllStatus, setClientStatus } = useClients();
  const { setOpenClientDetail, setDivIsVisible, setId } = useUser();

  const [searchClient, setSearchClient] = useState("");
  const [sortedClients, setSortedClients] = useState([]);
  const [orderClients, setOrderClients] = useState("");
  const [orderDirection, setOrderDirection] = useState("asc");





  const handleOrderClients = () => {
    setOrderClients("ordenar")

    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");

    setAllStatus("")
    setClientStatus("")



    console.log(orderClients);
    console.log(orderDirection);
  }


  const handleInputSearch = (e) => {
    setSearchClient(e.target.value);
  }

  const clientsFilter = clientsData.filter(client => {
    const nameClient = client.nome.toLowerCase();
    const cpfClientNumbers = client.cpf.toLowerCase();
    const cpfClientFormatted = client.cpf.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
    const emailClient = client.email.toLowerCase();
    const query = searchClient.toLowerCase();

    return nameClient.includes(query) || cpfClientNumbers.includes(query) || cpfClientFormatted.includes(query) || emailClient.includes(query);
  })

  const inadimplentes = clientsData.filter(client => client.status === "Inadimplente")

  const emDia = clientsData.filter(client => client.status === "Em dia")

  const handleClientStatus = (reset) => {
    resetAllStatus(reset);
    updateClientStatus("clear");
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = getItem("token");

      if (token) {
        try {
          const response = await registerUserFecth.get("/clientes", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = response.data;

          updateClientsData(data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [updateClientsData]);

  useEffect(() => {
    const sorted = [...clientsData].sort((a, b) => {
      const nameA = a.nome.toLowerCase();
      const nameB = b.nome.toLowerCase();
      return orderDirection === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    });
    setSortedClients(sorted);
    console.log(sorted);
  }, [clientsData, orderDirection]);

  function formatCPF(cpf) {
    const cleanedCPF = cpf.replace(/\D/g, "");

    const formattedCPF = cleanedCPF.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );

    return formattedCPF;
  }

  function formatPhoneNumber(phoneNumber) {
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, "");

    const formattedPhoneNumber = cleanedPhoneNumber.replace(
      /(\d{2})(\d{5})(\d{4})/,
      "($1) $2-$3"
    );

    return formattedPhoneNumber;
  }

  return (
    <div className="clientstable-box">
      <div className="clientstable-header">
        <div className="clientstable-iconandtitle">
          <img
            className="clientstable-icon"
            src={ClientsIcon}
            alt="clientsicon"
            onClick={() => handleClientStatus("clear")}
          />
          <span className="clientstable-title" >Clientes</span>
        </div>
        <button className="clientstable-addbutton" onClick={handleOpenAdd}>
          + Adicionar cliente
        </button>
        <button className="clientstable-filterbutton">
          <img src={FilterIcon} alt="filtericon" />
        </button>
        <div className="clientstable-search">
          <input
            className="clientstable-searchinput"
            type="text"
            placeholder="Pesquisa"
            value={searchClient}
            onChange={handleInputSearch}

          ></input>
          <img src={SearchIcon} alt="searchicon" />
        </div>
      </div>
      <table className="clientstable-table">
        <thead className="table-titles">
          <tr>
            <th className="table-th" onClick={handleOrderClients}>Cliente</th>
            <th className="table-th">CPF</th>
            <th className="table-th">E-mail</th>
            <th className="table-th">Telefone</th>
            <th className="table-th">Status</th>
            <th className="table-th">Criar Cobrança</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {clientsFilter.length === 0 ? (


            <tr className="centered">
              <td colSpan="6">
                <img className="not-found" src={NotFoundIcon} alt="Not Found" />
              </td>
            </tr>


          ) : searchClient !== "" ? (

            clientsFilter.map((client) => (
              <tr key={client.cliente_id} className="table-tr">
                <td
                  className="table-td client-name"
                  onClick={() => {
                    setOpenClientDetail(true);
                    setDivIsVisible(false);
                    setId(client);
                  }}
                >
                  {client.nome}
                </td>
                <td className="table-td">{formatCPF(client.cpf)}</td>
                <td className="table-td">{client.email}</td>
                <td className="table-td">{formatPhoneNumber(client.telefone)}</td>
                <td
                  className={`table-td status ${client.status === "Inadimplente" ? "redStyle" : "blueStyle"
                    }`}
                >
                  {client.status}
                </td>
                <td className="table-td">
                  <img
                    className="addcharge-icon"
                    src={AddCharge}
                    alt="addchargeicon"
                    onClick={() => {
                      setItem("clientsName", client.nome);
                      setItem("clientsId", client.cliente_id);
                      handleOpenCreateCharges();
                    }}
                  />
                </td>
              </tr>
            ))



          ) : allStatus === "clear" && clientStatus === "clear" ? (


            clientsData.map((client) => (
              <tr key={client.cliente_id} className="table-tr">
                <td
                  className="table-td client-name"
                  onClick={() => {
                    setOpenClientDetail(true);
                    setDivIsVisible(false);
                    setId(client);
                  }}
                >
                  {client.nome}
                </td>
                <td className="table-td">{formatCPF(client.cpf)}</td>
                <td className="table-td">{client.email}</td>
                <td className="table-td">{formatPhoneNumber(client.telefone)}</td>
                <td
                  className={`table-td status ${client.status === "Inadimplente" ? "redStyle" : "blueStyle"
                    }`}
                >
                  {client.status}
                </td>
                <td className="table-td">
                  <img
                    className="addcharge-icon"
                    src={AddCharge}
                    alt="addchargeicon"
                    onClick={() => {
                      setItem("clientsName", client.nome);
                      setItem("clientsId", client.cliente_id);
                      handleOpenCreateCharges();
                    }}
                  />
                </td>
              </tr>
            ))

          ) : clientStatus === "Inadimplente" ? (

            inadimplentes.map((client) => (

              <tr key={client.cliente_id} className="table-tr">
                <td
                  className="table-td client-name"
                  onClick={() => {
                    setOpenClientDetail(true);
                    setDivIsVisible(false);
                    setId(client);
                  }}
                >
                  {client.nome}
                </td>
                <td className="table-td">{formatCPF(client.cpf)}</td>
                <td className="table-td">{client.email}</td>
                <td className="table-td">{formatPhoneNumber(client.telefone)}</td>
                <td className={"table-td status redStyle"}>
                  Inadimplente
                </td>
                <td className="table-td">
                  <img
                    className="addcharge-icon"
                    src={AddCharge}
                    alt="addchargeicon"
                    onClick={() => {
                      setItem("clientsName", client.nome);
                      setItem("clientsId", client.cliente_id);
                      handleOpenCreateCharges();
                    }}
                  />
                </td>
              </tr>
            ))

          ) : clientStatus === "Em dia" ? (

            emDia.map((client) => (

              <tr key={client.cliente_id} className="table-tr">
                <td
                  className="table-td client-name"
                  onClick={() => {
                    setOpenClientDetail(true);
                    setDivIsVisible(false);
                    setId(client);
                  }}
                >
                  {client.nome}
                </td>
                <td className="table-td">{formatCPF(client.cpf)}</td>
                <td className="table-td">{client.email}</td>
                <td className="table-td">{formatPhoneNumber(client.telefone)}</td>
                <td className={"table-td status blueStyle"}>
                  Em dia
                </td>
                <td className="table-td">
                  <img
                    className="addcharge-icon"
                    src={AddCharge}
                    alt="addchargeicon"
                    onClick={() => {
                      setItem("clientsName", client.nome);
                      setItem("clientsId", client.cliente_id);
                      handleOpenCreateCharges();
                    }}
                  />
                </td>
              </tr>
            ))

          ) : orderClients === "ordenar" ? (sortedClients.map((client) => (
            <tr key={client.cliente_id} className="table-tr">
              <td
                className="table-td client-name"
                onClick={() => {
                  setOpenClientDetail(true);
                  setDivIsVisible(false);
                  setId(client);
                }}
              >
                {client.nome}
              </td>
              <td className="table-td">{formatCPF(client.cpf)}</td>
              <td className="table-td">{client.email}</td>
              <td className="table-td">{formatPhoneNumber(client.telefone)}</td>
              <td
                className={`table-td status ${client.status === "Inadimplente" ? "redStyle" : "blueStyle"
                  }`}
              >
                {client.status}
              </td>
              <td className="table-td">
                <img
                  className="addcharge-icon"
                  src={AddCharge}
                  alt="addchargeicon"
                  onClick={() => {
                    setItem("clientsName", client.nome);
                    setItem("clientsId", client.cliente_id);
                    handleOpenCreateCharges();
                  }}
                />
              </td>
            </tr>
          ))

          ) : clientsData.map((client) => (
            <tr key={client.cliente_id} className="table-tr">
              <td
                className="table-td client-name"
                onClick={() => {
                  setOpenClientDetail(true);
                  setDivIsVisible(false);
                  setId(client);
                }}
              >
                {client.nome}
              </td>
              <td className="table-td">{formatCPF(client.cpf)}</td>
              <td className="table-td">{client.email}</td>
              <td className="table-td">{formatPhoneNumber(client.telefone)}</td>
              <td
                className={`table-td status ${client.status === "Inadimplente" ? "redStyle" : "blueStyle"
                  }`}
              >
                {client.status}
              </td>
              <td className="table-td">
                <img
                  className="addcharge-icon"
                  src={AddCharge}
                  alt="addchargeicon"
                  onClick={() => {
                    setItem("clientsName", client.nome);
                    setItem("clientsId", client.cliente_id);
                    handleOpenCreateCharges();
                  }}
                />
              </td>
            </tr>
          ))

          }
        </tbody>
      </table>
    </div>
  );
}

export default ClientsTable;
















