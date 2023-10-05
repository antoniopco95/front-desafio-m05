import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ChargesIcon from '../../assets/ChargesIcon.svg'
import registerUserFecth from "../../axios/config";
import { getItem } from '../../utils/storage';
import { format } from "date-fns";
import "./styles.css";

export default function ChargesDetails({ chargesDetailsOpen, handleCloseChargesDetails }) {

    const style = {
        display: 'flex',
        alignItems: 'top',
        justifyContent: 'left',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        borderRadius: '30px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: '40px 56px 45px 55px',
    };

    const [detailsForm, setDetailsForm] = useState({
        nome: "",
        descricao: "",
        data_vencimento: "",
        valor: "",
        cobranca_id: "",
        status: "",
    });

    let Real = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    async function getChargesDetails() {

        const token = getItem("token");
        const chargesId = getItem("chargesId");

        try {
            const response = await registerUserFecth.get(`/cobrancas/${chargesId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setDetailsForm({
                nome: response.data.nome,
                descricao: response.data.descricao,
                data_vencimento: format(new Date(parseInt(response.data.data_vencimento.substr(0, 4)), parseInt(response.data.data_vencimento.substr(5, 2) - 2), parseInt(response.data.data_vencimento.substr(8, 2))), 'dd/MM/yyyy'),
                valor: response.data.valor,
                cobranca_id: response.data.cobranca_id,
                status: response.data.status.toString(),
            })

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (chargesDetailsOpen) {
            getChargesDetails()
        }
    }, [chargesDetailsOpen]);

    return (
        <>
            <Modal
                open={chargesDetailsOpen}
                onClose={handleCloseChargesDetails}
            >
                <Box sx={style}>
                    <div className="chargesdetails-box">
                        <div className="chargesdetails-iconandtitle">
                            <img src={ChargesIcon} alt="chargesicon" className="chargesdetails-icon" />
                            <p className="chargesdetails-title"> Detalhe da Cobrança</p>
                        </div>
                        <div className="chargesdetails-pandspan">
                            <p className="chargesdetails-p">Nome</p>
                            <span className="chargesdetails-span">{detailsForm.nome}</span>
                        </div>
                        <div>
                            <p className="chargesdetails-p">Descrição</p>
                            <span className="chargesdetails-desc">{detailsForm.descricao}</span>
                        </div>
                        <div className="chargesdetails-fourboxes">
                            <div className="chargesdetails-minorbox">
                                <p className="chargesdetails-p">Vencimento</p>
                                <span className="chargesdetails-span">{detailsForm.data_vencimento}</span>
                            </div>
                            <div className="chargesdetails-minorbox">
                                <p className="chargesdetails-p">Valor</p>
                                <span className="chargesdetails-span">{Real.format(detailsForm.valor)}</span>
                            </div>
                        </div>
                        <div className="chargesdetails-fourboxes">
                            <div className="chargesdetails-minorbox">
                                <p className="chargesdetails-p">ID cobranças</p>
                                <span className="chargesdetails-span">{detailsForm.cobranca_id.substring(0, 8)}</span>
                            </div>
                            <div className="chargesdetails-minorbox">
                                <p className="chargesdetails-p">Status</p>
                                <span
                                    className={`chargesdetails-status chargesdetails-red ${detailsForm.status === "Vencida"
                                        ? "chargesdetails-red"
                                        : detailsForm.status === "Prevista"
                                            ? "chargesdetails-yellow"
                                            : detailsForm.status === "Paga" && "chargesdetails-blue"
                                        }`}
                                >{detailsForm.status}</span>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
};