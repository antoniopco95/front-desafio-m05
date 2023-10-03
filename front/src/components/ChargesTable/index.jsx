/* eslint-disable no-unused-vars */
import React from "react";
import "./styles.css";
import ChargesIcon from "../../assets/ChargesIcon.svg";
import FilterIcon from "../../assets/FilterIcon.svg";
import SearchIcon from "../../assets/SearchIcon.svg";
import EditTable from "../../assets/EditTable.svg";
import DeleteTable from "../../assets/DeleteTable.svg";
import { useEffect, useState } from "react";
import { getItem } from "../../utils/storage";
import registerUserFecth from "../../axios/config";
import { format } from "date-fns";
import EditChargeModal from "../EditChargeModal";
import useUser from "../../hooks/useUser";

function ChargesTable(handleClickSnack, setCustomMessageApprove) {
  const [charges, setCharges] = useState([]);
  const { openEditChargeModal, setOpenEditChargeModal } = useUser();
  const [modalCharge, setModalCharge] = useState({});
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(!update);
  };

  let Real = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  async function getAllCharges() {
    const token = getItem("token");
    try {
      const response = await registerUserFecth.get("/cobrancas", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCharges(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCharges();
  }, [update]);

  return (
    <div className="chargestable-box">
      <div className="chargestable-header">
        <div className="chargestable-iconandtitle">
          <img
            className="chargestable-icon"
            src={ChargesIcon}
            alt="chargesicon"
          />
          <span className="chargestable-title">Cobranças</span>
        </div>
        <div className="chargestable-filterandinput">
          <button className="chargestable-filterbutton">
            <img src={FilterIcon} alt="filtericon" />
          </button>
          <div className="chargestable-search">
            <input
              className="chargestable-searchinput"
              type="text"
              placeholder="Pesquisa"
            ></input>
            <img src={SearchIcon} alt="searchicon" />
          </div>
        </div>
      </div>
      <table className="chargestable-table">
        <thead className="table-titles">
          <tr>
            <th className="table-th">Cliente</th>
            <th className="table-th">ID Cob.</th>
            <th className="table-th">Valor</th>
            <th className="table-th">Data de venc.</th>
            <th className="table-th">Status</th>
            <th className="table-th desc">Descrição</th>
            <th className="table-th"></th>
            <th className="table-th"></th>
          </tr>
        </thead>
        <tbody className="table-body">
          {charges.map((charge, index) => (
            <tr key={index} className="table-tr">
              <td className="table-td">{charge.nome}</td>
              <td className="table-td">{charge.cobranca_id.substring(0, 8)}</td>
              <td className="table-td">{Real.format(charge.valor)}</td>
              <td className="table-td">
                {format(new Date(charge.data_vencimento), "dd/MM/yyyy")}
              </td>
              <td
                className={`table-td status ${
                  charge.status === "vencida"
                    ? "red"
                    : charge.status === "prevista"
                    ? "yellow"
                    : charge.status === "paga" && "blue"
                }`}
              >
                {charge.status.charAt(0).toUpperCase() + charge.status.slice(1)}
              </td>
              <td className="table-td">
                {charge.descricao === null
                  ? ""
                  : `${charge.descricao.split(" ").slice(0, 5).join(" ")} ...`}
              </td>
              <td
                className="table-td"
                onClick={() => {
                  setOpenEditChargeModal(true);
                  setModalCharge({ ...charge });
                }}
              >
                <img src={EditTable} alt="edittableicon" className="buttons" />
              </td>
              <td className="table-td">
                <img
                  src={DeleteTable}
                  alt="deletetableicon"
                  className="buttons"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openEditChargeModal && (
        <EditChargeModal
          charge={modalCharge}
          userName={modalCharge.nome}
          handleUpdate={handleUpdate}
          handleClickSnack={handleClickSnack}
          setCustomMessageApprove={setCustomMessageApprove}
        />
      )}
    </div>
  );
}

export default ChargesTable;
