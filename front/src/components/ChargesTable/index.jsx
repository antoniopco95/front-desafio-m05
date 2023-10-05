import React from "react";
import "./styles.css";
import ChargesIcon from "../../assets/ChargesIcon.svg";
import FilterIcon from "../../assets/FilterIcon.svg";
import SearchIcon from "../../assets/SearchIcon.svg";
import EditTable from "../../assets/EditTable.svg";
import DeleteTable from "../../assets/DeleteTable.svg";
import NotFoundIcon from "../../assets/NotFound.svg";
import { useEffect, useState } from "react";
import { getItem } from "../../utils/storage";
import registerUserFecth from "../../axios/config";
import { format } from "date-fns";
import EditChargeModal from "../EditChargeModal";
import useUser from "../../hooks/useUser";
import { useClients } from "../../context/clientsContext";

function ChargesTable(handleClickSnack, setCustomMessageApprove) {
    const { openEditChargeModal, setOpenEditChargeModal } = useUser();
    const [modalCharge, setModalCharge] = useState({});
    const [update, setUpdate] = useState(false);

    const handleUpdate = () => {
        setUpdate(!update);
    };

    const {
        chargeType,
        home,
        clients,
        charges,
        allCharges,
        setAllCharges,
        resetAllCharge,
        updateChargeType,
        setChargeType,
    } = useClients();

    const handleChargesName = (reset) => {
        resetAllCharge(reset);
        updateChargeType("clear");
    };

    const [chargesData, setChargesData] = useState([]);
    const [chargesDue, setChargesDue] = useState([]);
    const [chargesExpired, setChargesExpired] = useState([]);
    const [chargesPaid, setChargesPaid] = useState([]);
    const [searchCharges, setSearchCharges] = useState("");
    const [sortedCharges, setSortedCharges] = useState([]);
    const [orderCharges, setOrderCharges] = useState("");
    const [orderDirection, setOrderDirection] = useState("asc");


    const handleOrderCharges = () => {
        setOrderCharges("ordenar")

        setOrderDirection(orderDirection === "asc" ? "desc" : "asc");

        setAllCharges("");
        setChargeType("");

        console.log(orderDirection);
        console.log(orderCharges);


    }

    const handleInputSearch = (e) => {
        setSearchCharges(e.target.value);
    }

    const chargesFilter = chargesData.filter(charge => {
        const nameClient = charge.nome.toLowerCase();
        const idClient = charge.cobranca_id.toString();
        const query = searchCharges.toLowerCase();

        return nameClient.includes(query) || idClient.includes(query);
    })


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
            setChargesData(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getAllCharges();
    }, [update]);




    useEffect(() => {
        getAllCharges();
    }, [])

    useEffect(() => {

        const fetchData = async () => {
            const token = getItem('token');
            if (token) {

                try {
                    const response = await registerUserFecth.get('/cobrancas/vencidas', {
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
            const token = getItem('token');
            if (token) {

                try {
                    const response = await registerUserFecth.get('/cobrancas/previstas', {
                        headers: {
                            Authorization: ` Bearer ${token}`,
                        },
                    });
                    const data = response.data.cobrancas_previstas;


                    setChargesExpired(data);

                } catch (error) {
                    console.log(error)
                }
            }
        };
        fetchData();

    }, []);

    useEffect(() => {

        const fetchData = async () => {
            const token = getItem('token');
            if (token) {

                try {
                    const response = await registerUserFecth.get('/cobrancas/pagas', {
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
    }, []);


    useEffect(() => {
        const sorted = [...chargesData].sort((a, b) => {
            const nameA = a.nome.toLowerCase();
            const nameB = b.nome.toLowerCase();


            const nameComparison = orderDirection === "asc"
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);

            const idA = a.cobranca_id;
            const idB = b.cobranca_id;

            return nameComparison !== 0 ? nameComparison : idA - idB;
        });
        setSortedCharges(sorted);
        console.log(sorted);
    }, [chargesData, orderDirection]);

    return (
        <div className='chargestable-box'>
            <div className='chargestable-header'>
                <div className='chargestable-iconandtitle'>
                    <img className='chargestable-icon' src={ChargesIcon} alt='chargesicon' onClick={() => handleChargesName("clear")} />
                    <span className='chargestable-title'>Cobranças</span>
                </div>
                <div className='chargestable-filterandinput'>
                    <button className='chargestable-filterbutton'><img src={FilterIcon} alt="filtericon" /></button>
                    <div className='chargestable-search'>
                        <input
                            className='chargestable-searchinput'
                            type="text"
                            placeholder='Pesquisa'
                            value={searchCharges}
                            onChange={handleInputSearch}
                        >
                        </input>
                        <img src={SearchIcon} alt="searchicon" />
                    </div>
                </div>
            </div>
            <table className='chargestable-table'>
                <thead className='table-titles'>
                    <tr>
                        <th className='table-th' onClick={handleOrderCharges}>Cliente</th>
                        <th className='table-th' onClick={handleOrderCharges}>ID Cob.</th>
                        <th className='table-th'>Valor</th>
                        <th className='table-th'>Data de venc.</th>
                        <th className='table-th'>Status</th>
                        <th className='table-th desc'>Descrição</th>
                        <th className='table-th'></th>
                        <th className='table-th'></th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    {chargesFilter.length === 0 ? (
                        <tr className="centered">
                            <td colSpan="6">
                                <img className="not-found" src={NotFoundIcon} alt="Not Found" />
                            </td>
                        </tr>
                    ) : searchCharges !== "" ? (

                        chargesFilter.map((charge, index) => (
                            <tr key={index} className='table-tr'>
                                <td className='table-td'>{charge.nome}</td>
                                <td className='table-td'>{charge.cobranca_id.substring(0, 8)}</td>
                                <td className='table-td'>{Real.format(charge.valor)}</td>
                                <td className='table-td'>{format(new Date(charge.data_vencimento), "dd/MM/yyyy")}</td>
                                <td className={`table-td status ${charge.status === "vencida"
                                    ? "red"
                                    : charge.status === "prevista"
                                        ? "yellow"
                                        : charge.status === "paga" && "blue"
                                    }`}>
                                    {charge.status.charAt(0).toUpperCase() + charge.status.slice(1)}</td>
                                <td className='table-td'>{charge.descricao === null ? '' : `${charge.descricao.split(' ').slice(0, 5).join(' ')} ...`}</td>
                                <td className='table-td'><img src={EditTable} alt="edittableicon" className='buttons' /></td>
                                <td className='table-td' onClick={() => {
                                    setOpenEditChargeModal(true);
                                    setModalCharge({ ...charge });
                                }}><img src={DeleteTable} alt="deletetableicon" className='buttons' /></td>
                            </tr>
                        ))

                    ) :

                        allCharges === "clear" && chargeType === "clear" ? (chargesData.map((charge, index) => (
                            <tr key={index} className='table-tr'>
                                <td className='table-td'>{charge.nome}</td>
                                <td className='table-td'>{charge.cobranca_id.substring(0, 8)}</td>
                                <td className='table-td'>{Real.format(charge.valor)}</td>
                                <td className='table-td'>{format(new Date(charge.data_vencimento), "dd/MM/yyyy")}</td>
                                <td className={`table-td status ${charge.status === "vencida"
                                    ? "red"
                                    : charge.status === "prevista"
                                        ? "yellow"
                                        : charge.status === "paga" && "blue"
                                    }`}>
                                    {charge.status.charAt(0).toUpperCase() + charge.status.slice(1)}</td>
                                <td className='table-td'>{charge.descricao === null ? '' : `${charge.descricao.split(' ').slice(0, 5).join(' ')} ...`}</td>
                                <td className='table-td'><img src={EditTable} alt="edittableicon" className='buttons' /></td>
                                <td className='table-td' onClick={() => {
                                    setOpenEditChargeModal(true);
                                    setModalCharge({ ...charge });
                                }}><img src={DeleteTable} alt="deletetableicon" className='buttons' /></td>
                            </tr>
                        ))

                        ) : chargeType === "vencidas" ? (

                            chargesDue.map((charge, index) => (
                                <tr key={index} className='table-tr'>
                                    <td className='table-td'>{charge.nome}</td>
                                    <td className='table-td'>{charge.cobranca_id.substring(0, 8)}</td>
                                    <td className='table-td'>{Real.format(charge.valor)}</td>
                                    <td className='table-td'>{format(new Date(charge.data_vencimento), "dd/MM/yyyy")}</td>
                                    <td className='table-td status red'>Vencida</td>
                                    <td className='table-td'>{charge.descricao === null ? '' : `${charge.descricao.split(' ').slice(0, 5).join(' ')} ...`}</td>
                                    <td className='table-td'><img src={EditTable} alt="edittableicon" className='buttons' /></td>
                                    <td className='table-td' onClick={() => {
                                        setOpenEditChargeModal(true);
                                        setModalCharge({ ...charge });
                                    }}><img src={DeleteTable} alt="deletetableicon" className='buttons' /></td>
                                </tr>
                            ))
                        ) : chargeType === "previstas" ? (

                            chargesExpired.map((charge, index) => (
                                <tr key={index} className='table-tr'>
                                    <td className='table-td'>{charge.nome}</td>
                                    <td className='table-td'>{charge.cobranca_id.substring(0, 8)}</td>
                                    <td className='table-td'>{Real.format(charge.valor)}</td>
                                    <td className='table-td'>{format(new Date(charge.data_vencimento), "dd/MM/yyyy")}</td>
                                    <td className='table-td status yellow'>Prevista</td>
                                    <td className='table-td'>{charge.descricao === null ? '' : `${charge.descricao.split(' ').slice(0, 5).join(' ')} ...`}</td>
                                    <td className='table-td' onClick={() => {
                                        setOpenEditChargeModal(true);
                                        setModalCharge({ ...charge });
                                    }}><img src={EditTable} alt="edittableicon" className='buttons' /></td>
                                    <td className='table-td'><img src={DeleteTable} alt="deletetableicon" className='buttons' /></td>
                                </tr>
                            ))

                        ) : chargeType === "pagas" ? (

                            chargesPaid.map((charge, index) => (
                                <tr key={index} className='table-tr'>
                                    <td className='table-td'>{charge.nome}</td>
                                    <td className='table-td'>{charge.cobranca_id.substring(0, 8)}</td>
                                    <td className='table-td'>{Real.format(charge.valor)}</td>
                                    <td className='table-td'>{format(new Date(charge.data_vencimento), "dd/MM/yyyy")}</td>
                                    <td className='table-td status blue'>Paga</td>
                                    <td className='table-td'>{charge.descricao === null ? '' : `${charge.descricao.split(' ').slice(0, 5).join(' ')} ...`}</td>
                                    <td className='table-td' onClick={() => {
                                        setOpenEditChargeModal(true);
                                        setModalCharge({ ...charge });
                                    }}><img src={EditTable} alt="edittableicon" className='buttons' /></td>
                                    <td className='table-td'><img src={DeleteTable} alt="deletetableicon" className='buttons' /></td>
                                </tr>
                            ))

                        ) : orderCharges === "ordenar" ? (

                            sortedCharges.map((charge, index) => (
                                <tr key={index} className='table-tr'>
                                    <td className='table-td'>{charge.nome}</td>
                                    <td className='table-td'>{charge.cobranca_id.substring(0, 8)}</td>
                                    <td className='table-td'>{Real.format(charge.valor)}</td>
                                    <td className='table-td'>{format(new Date(charge.data_vencimento), "dd/MM/yyyy")}</td>
                                    <td className={`table-td status ${charge.status === "vencida"
                                        ? "red"
                                        : charge.status === "prevista"
                                            ? "yellow"
                                            : charge.status === "paga" && "blue"
                                        }`}>
                                        {charge.status.charAt(0).toUpperCase() + charge.status.slice(1)}</td>
                                    <td className='table-td'>{charge.descricao === null ? '' : `${charge.descricao.split(' ').slice(0, 5).join(' ')} ...`}</td>
                                    <td className='table-td' onClick={() => {
                                        setOpenEditChargeModal(true);
                                        setModalCharge({ ...charge });
                                    }}><img src={EditTable} alt="edittableicon" className='buttons' /></td>
                                    <td className='table-td'><img src={DeleteTable} alt="deletetableicon" className='buttons' /></td>
                                </tr>
                            ))

                        ) : chargesData.map((charge, index) => (
                            <tr key={index} className='table-tr'>
                                <td className='table-td'>{charge.nome}</td>
                                <td className='table-td'>{charge.cobranca_id.substring(0, 8)}</td>
                                <td className='table-td'>{Real.format(charge.valor)}</td>
                                <td className='table-td'>{format(new Date(charge.data_vencimento), "dd/MM/yyyy")}</td>
                                <td className={`table-td status ${charge.status === "vencida"
                                    ? "red"
                                    : charge.status === "prevista"
                                        ? "yellow"
                                        : charge.status === "paga" && "blue"
                                    }`}>
                                    {charge.status.charAt(0).toUpperCase() + charge.status.slice(1)}</td>
                                <td className='table-td'>{charge.descricao === null ? '' : `${charge.descricao.split(' ').slice(0, 5).join(' ')} ...`}</td>
                                <td className='table-td' onClick={() => {
                                    setOpenEditChargeModal(true);
                                    setModalCharge({ ...charge });
                                }}><img src={EditTable} alt="edittableicon" className='buttons' /></td>
                                <td className='table-td'><img src={DeleteTable} alt="deletetableicon" className='buttons' /></td>
                            </tr>
                        ))
                    }

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
