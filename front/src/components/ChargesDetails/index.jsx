import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ChargesIcon from '../../assets/ChargesIcon.svg'
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
                            <span className="chargesdetails-span">-</span>
                        </div>
                        <div>
                            <p className="chargesdetails-p">Descrição</p>
                            <span className="chargesdetails-desc">-</span>
                        </div>
                        <div className="chargesdetails-fourboxes">
                            <div className="chargesdetails-minorbox">
                                <p className="chargesdetails-p">Vencimento</p>
                                <span className="chargesdetails-span">-</span>
                            </div>
                            <div className="chargesdetails-minorbox">
                                <p className="chargesdetails-p">Valor</p>
                                <span className="chargesdetails-span">-</span>
                            </div>
                        </div>
                        <div className="chargesdetails-fourboxes">
                            <div className="chargesdetails-minorbox">
                                <p className="chargesdetails-p">ID cobranças</p>
                                <span className="chargesdetails-span">-</span>
                            </div>
                            <div className="chargesdetails-minorbox">
                                <p className="chargesdetails-p">Status</p>
                                <span className="chargesdetails-status chargesdetails-red">-</span>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    )
};