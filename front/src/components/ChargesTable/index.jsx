import React, { useEffect, useState } from 'react';
import './styles.css'
import ChargesIcon from '../../assets/ChargesIcon.svg';
import FilterIcon from '../../assets/FilterIcon.svg';
import SearchIcon from '../../assets/SearchIcon.svg';
import EditTable from '../../assets/EditTable.svg';
import DeleteTable from '../../assets/DeleteTable.svg';
import { getItem, setItem } from '../../utils/storage';
import registerUserFecth from '../../axios/config';
import { format } from 'date-fns';
import EditChargeModal from "../EditChargeModal";
import useUser from "../../hooks/useUser";
import { useClients } from "../../context/clientsContext";

function ChargesTable({ handleClickSnack, setCustomMessageApprove, handleDelChargesOpen, handleOpenChargesDetails }) {

  const { openEditChargeModal, setOpenEditChargeModal } = useUser();
  const [modalCharge, setModalCharge] = useState({});
  const [update, setUpdate] = useState(false);

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const {
    chargeType,
    allCharges,
    resetAllCharge,
    updateChargeType,
    getAllCharges,
    chargesData,
    chargesExpired,
    setChargesExpired
  } = useClients();

  const handleChargesName = (reset) => {
    resetAllCharge(reset)
    updateChargeType("clear")
  }

  const [chargesDue, setChargesDue] = useState([]);
  const [chargesPaid, setChargesPaid] = useState([]);

  let Real = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  useEffect(() => {
    getAllCharges();
  }, [update, chargesData]);

  useEffect(() => {
    const fetchData = async () => {
      const token = getItem("token");
      if (token) {
        try {
          const response = await registerUserFecth.get("/cobrancas/vencidas", {
            headers: {
              Authorization: ` Bearer ${token}`,
            },
          });
          const data = response.data;

          setChargesDue(data.cobrancas_vencidas);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const token = getItem("token");
      if (token) {
        try {
          const response = await registerUserFecth.get("/cobrancas/previstas", {
            headers: {
              Authorization: ` Bearer ${token}`,
            },
          });
          const data = response.data.cobrancas_previstas;

          setChargesExpired(data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [chargesExpired]);

  useEffect(() => {
    const fetchData = async () => {
      const token = getItem("token");
      if (token) {
        try {
          const response = await registerUserFecth.get("/cobrancas/pagas", {
            headers: {
              Authorization: ` Bearer ${token}`,
            },
          });
          const data = response.data;
          setChargesPaid(data.cobrancas_pagas);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [chargesDue, chargesExpired, chargesPaid]);

  return (
    <div className="chargestable-box">
      <div className="chargestable-header">
        <div className="chargestable-iconandtitle">
          <img
            className="chargestable-icon"
            src={ChargesIcon}
            alt="chargesicon"
            onClick={() => handleChargesName("clear")}
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
          {allCharges === "clear" && chargeType === "clear"
            ? chargesData.map((charge, index) => (
              <tr key={index} className="table-tr">
                <td className="table-td" onClick={() => {
                  setItem("chargesId", charge.cobranca_id);
                  handleOpenChargesDetails();
                }}>{charge.nome}</td>
                <td className="table-td" onClick={() => {
                  setItem("chargesId", charge.cobranca_id);
                  handleOpenChargesDetails();
                }}>
                  {charge.cobranca_id.substring(0, 8)}
                </td>
                <td className="table-td" onClick={() => {
                  setItem("chargesId", charge.cobranca_id);
                  handleOpenChargesDetails();
                }}>{Real.format(charge.valor)}</td>
                <td className="table-td" onClick={() => {
                  setItem("chargesId", charge.cobranca_id);
                  handleOpenChargesDetails();
                }}>
                  {format(new Date(parseInt(charge.data_vencimento.substr(0, 4)), parseInt(charge.data_vencimento.substr(5, 2) - 2), parseInt(charge.data_vencimento.substr(8, 2))), 'dd/MM/yyyy')}
                </td>
                <td
                  className={`table-td status ${charge.status === "vencida"
                    ? "red"
                    : charge.status === "prevista"
                      ? "yellow"
                      : charge.status === "paga" && "blue"
                    }`}
                >
                  {charge.status.charAt(0).toUpperCase() +
                    charge.status.slice(1)}
                </td>
                <td className="table-td" onClick={() => {
                  setItem("chargesId", charge.cobranca_id);
                  handleOpenChargesDetails();
                }}>
                  {charge.descricao === null
                    ? ""
                    : `${charge.descricao
                      .split(" ")
                      .slice(0, 5)
                      .join(" ")} ...`}
                </td>
                <td
                  className="table-td"
                  onClick={() => {
                    setOpenEditChargeModal(true);
                    setModalCharge({ ...charge });
                  }}
                >
                  <img
                    src={EditTable}
                    alt="edittableicon"
                    className="buttons"
                  />
                </td>
                <td className="table-td">
                  <img
                    src={DeleteTable}
                    alt="deletetableicon"
                    className="buttons"
                    onClick={() => {
                      setItem("chargesId", charge.cobranca_id);
                      handleDelChargesOpen();
                    }}
                  />
                </td>
              </tr>
            ))
            : chargeType === "vencidas"
              ? chargesDue.map((charge, index) => (
                <tr key={index} className="table-tr">
                  <td className="table-td" onClick={() => {
                    setItem("chargesId", charge.cobranca_id);
                    handleOpenChargesDetails();
                  }}>{charge.nome}</td>
                  <td className="table-td" onClick={() => {
                    setItem("chargesId", charge.cobranca_id);
                    handleOpenChargesDetails();
                  }}>
                    {charge.cobranca_id.substring(0, 8)}
                  </td>
                  <td className="table-td" onClick={() => {
                    setItem("chargesId", charge.cobranca_id);
                    handleOpenChargesDetails();
                  }}>{Real.format(charge.valor)}</td>
                  <td className="table-td" onClick={() => {
                    setItem("chargesId", charge.cobranca_id);
                    handleOpenChargesDetails();
                  }}>
                    {format(new Date(parseInt(charge.data_vencimento.substr(0, 4)), parseInt(charge.data_vencimento.substr(5, 2) - 2), parseInt(charge.data_vencimento.substr(8, 2))), 'dd/MM/yyyy')}
                  </td>
                  <td className="table-td status red" onClick={() => {
                    setItem("chargesId", charge.cobranca_id);
                    handleOpenChargesDetails();
                  }}>Vencida</td>
                  <td className="table-td" onClick={() => {
                    setItem("chargesId", charge.cobranca_id);
                    handleOpenChargesDetails();
                  }}>
                    {charge.descricao === null
                      ? ""
                      : `${charge.descricao
                        .split(" ")
                        .slice(0, 5)
                        .join(" ")} ...`}
                  </td>
                  <td
                    className="table-td"
                    onClick={() => {
                      setOpenEditChargeModal(true);
                      setModalCharge({ ...charge });
                    }}
                  >
                    <img
                      src={EditTable}
                      alt="edittableicon"
                      className="buttons"
                    />
                  </td>
                  <td className="table-td">
                    <img
                      src={DeleteTable}
                      alt="deletetableicon"
                      className="buttons"
                      onClick={() => {
                        setItem("chargesId", charge.cobranca_id);
                        handleDelChargesOpen();
                      }}
                    />
                  </td>
                </tr>
              ))
              : chargeType === "previstas"
                ? chargesExpired.map((charge, index) => (
                  <tr key={index} className="table-tr">
                    <td className="table-td" onClick={() => {
                      setItem("chargesId", charge.cobranca_id);
                      handleOpenChargesDetails();
                    }}>{charge.nome}</td>
                    <td className="table-td" onClick={() => {
                      setItem("chargesId", charge.cobranca_id);
                      handleOpenChargesDetails();
                    }}>
                      {charge.cobranca_id.substring(0, 8)}
                    </td>
                    <td className="table-td" onClick={() => {
                      setItem("chargesId", charge.cobranca_id);
                      handleOpenChargesDetails();
                    }}>{Real.format(charge.valor)}</td>
                    <td className="table-td" onClick={() => {
                      setItem("chargesId", charge.cobranca_id);
                      handleOpenChargesDetails();
                    }}>
                      {format(new Date(parseInt(charge.data_vencimento.substr(0, 4)), parseInt(charge.data_vencimento.substr(5, 2) - 2), parseInt(charge.data_vencimento.substr(8, 2))), 'dd/MM/yyyy')}
                    </td>
                    <td className="table-td status yellow" onClick={() => {
                      setItem("chargesId", charge.cobranca_id);
                      handleOpenChargesDetails();
                    }}>Prevista</td>
                    <td className="table-td" onClick={() => {
                      setItem("chargesId", charge.cobranca_id);
                      handleOpenChargesDetails();
                    }}>
                      {charge.descricao === null
                        ? ""
                        : `${charge.descricao
                          .split(" ")
                          .slice(0, 5)
                          .join(" ")} ...`}
                    </td>
                    <td
                      className="table-td"
                      onClick={() => {
                        setOpenEditChargeModal(true);
                        setModalCharge({ ...charge });
                      }}
                    >
                      <img
                        src={EditTable}
                        alt="edittableicon"
                        className="buttons"
                      />
                    </td>
                    <td className="table-td">
                      <img
                        src={DeleteTable}
                        alt="deletetableicon"
                        className="buttons"
                        onClick={() => {
                          setItem("chargesId", charge.cobranca_id);
                          handleDelChargesOpen();
                        }}
                      />
                    </td>
                  </tr>
                ))
                : chargeType === "pagas"
                  ? chargesPaid.map((charge, index) => (
                    <tr key={index} className="table-tr">
                      <td className="table-td" onClick={() => {
                        setItem("chargesId", charge.cobranca_id);
                        handleOpenChargesDetails();
                      }}>{charge.nome}</td>
                      <td className="table-td" onClick={() => {
                        setItem("chargesId", charge.cobranca_id);
                        handleOpenChargesDetails();
                      }}>
                        {charge.cobranca_id.substring(0, 8)}
                      </td>
                      <td className="table-td" onClick={() => {
                        setItem("chargesId", charge.cobranca_id);
                        handleOpenChargesDetails();
                      }}>{Real.format(charge.valor)}</td>
                      <td className="table-td" onClick={() => {
                        setItem("chargesId", charge.cobranca_id);
                        handleOpenChargesDetails();
                      }}>
                        {format(new Date(parseInt(charge.data_vencimento.substr(0, 4)), parseInt(charge.data_vencimento.substr(5, 2) - 2), parseInt(charge.data_vencimento.substr(8, 2))), 'dd/MM/yyyy')}
                      </td>
                      <td className="table-td status blue" onClick={() => {
                        setItem("chargesId", charge.cobranca_id);
                        handleOpenChargesDetails();
                      }}>Paga</td>
                      <td className="table-td" onClick={() => {
                        setItem("chargesId", charge.cobranca_id);
                        handleOpenChargesDetails();
                      }}>
                        {charge.descricao === null
                          ? ""
                          : `${charge.descricao
                            .split(" ")
                            .slice(0, 5)
                            .join(" ")} ...`}
                      </td>
                      <td
                        className="table-td"
                        onClick={() => {
                          setOpenEditChargeModal(true);
                          setModalCharge({ ...charge });
                        }}
                      >
                        <img
                          src={EditTable}
                          alt="edittableicon"
                          className="buttons"
                        />
                      </td>
                      <td className="table-td">
                        <img
                          src={DeleteTable}
                          alt="deletetableicon"
                          className="buttons"
                          onClick={() => {
                            setItem("chargesId", charge.cobranca_id);
                            handleDelChargesOpen();
                          }}
                        />
                      </td>
                    </tr>
                  ))
                  : chargesData.map((charge, index) => (
                    <tr key={index} className="table-tr">
                      <td className="table-td" onClick={() => {
                        setItem("chargesId", charge.cobranca_id);
                        handleOpenChargesDetails();
                      }}>{charge.nome}</td>
                      <td className="table-td" onClick={() => {
                        setItem("chargesId", charge.cobranca_id);
                        handleOpenChargesDetails();
                      }}>
                        {charge.cobranca_id.substring(0, 8)}
                      </td>
                      <td className="table-td" onClick={() => {
                        setItem("chargesId", charge.cobranca_id);
                        handleOpenChargesDetails();
                      }}>{Real.format(charge.valor)}</td>
                      <td className="table-td" onClick={() => {
                        setItem("chargesId", charge.cobranca_id);
                        handleOpenChargesDetails();
                      }}>
                        {format(new Date(parseInt(charge.data_vencimento.substr(0, 4)), parseInt(charge.data_vencimento.substr(5, 2) - 2), parseInt(charge.data_vencimento.substr(8, 2))), 'dd/MM/yyyy')}
                      </td>
                      <td
                        className={`table-td status ${charge.status === "vencida"
                          ? "red"
                          : charge.status === "prevista"
                            ? "yellow"
                            : charge.status === "paga" && "blue"
                          }`} onClick={() => {
                            setItem("chargesId", charge.cobranca_id);
                            handleOpenChargesDetails();
                          }}
                      >
                        {charge.status.charAt(0).toUpperCase() +
                          charge.status.slice(1)}
                      </td>
                      <td className="table-td" onClick={() => {
                        setItem("chargesId", charge.cobranca_id);
                        handleOpenChargesDetails();
                      }}>
                        {charge.descricao === null
                          ? ""
                          : `${charge.descricao
                            .split(" ")
                            .slice(0, 5)
                            .join(" ")} ...`}
                      </td>
                      <td
                        className="table-td"
                        onClick={() => {
                          setOpenEditChargeModal(true);
                          setModalCharge({ ...charge });
                        }}
                      >
                        <img
                          src={EditTable}
                          alt="edittableicon"
                          className="buttons"
                        />
                      </td>
                      <td className="table-td">
                        <img
                          src={DeleteTable}
                          alt="deletetableicon"
                          className="buttons"
                          onClick={() => {
                            setItem("chargesId", charge.cobranca_id);
                            handleDelChargesOpen();
                          }}
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
