import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AlertIcon from '../../assets/AlertIcon.svg'
import { removeItem } from "../../utils/storage";
import "./styles.css";

export default function DeleteChargesModal({ delChargesOpen, handleDelChargesClose, handleClickSnack, setCustomMessageApprove }) {

    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '400px',
        width: '600px',
        borderRadius: '30px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    function handleSubmit() {
        handleDelChargesClose();
        setCustomMessageApprove('Cobrança excluída com sucesso!');
        handleClickSnack();
    };

    function handleCancel() {
        removeItem("chargesId");
        handleDelChargesClose();
    };

    return (
        <>
            <Modal
                open={delChargesOpen}
                onClose={handleCancel}
            >
                <Box sx={style}>
                    <div className='delcharges-div'>
                        <img src={AlertIcon} alt="alerticon" className='delcharges-icon' />
                        <p className='delcharges-p'>Tem certeza que deseja excluir esta cobrança?</p>
                        <div>
                            <button onClick={handleCancel} className='delcharges-cancel'>
                                Não
                            </button>
                            <button onClick={handleSubmit} className='delcharges-confirm'>
                                Sim
                            </button>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
