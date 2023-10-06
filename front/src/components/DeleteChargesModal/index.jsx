import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AlertIcon from '../../assets/AlertIcon.svg'
import { removeItem } from "../../utils/storage";
import { getItem } from "../../utils/storage";
import registerUserFecth from '../../axios/config';
import "./styles.css";
import { useClients } from "../../context/clientsContext";

export default function DeleteChargesModal({ delChargesOpen, handleDelChargesClose, handleClickSnack, setCustomMessageApprove, setCustomMessageReprove, handleClickSnackFail }) {

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

    const {
        chargesData
    } = useClients();

    async function handleSubmit() {

        const token = getItem("token");
        const chargesId = getItem("chargesId");

        try {
            const response = await registerUserFecth.delete(`/cobrancas/${chargesId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            handleDelChargesClose();
            setCustomMessageApprove('Cobrança excluída com sucesso!');
            handleClickSnack();

        } catch (error) {
            if (error.response.data.error === 'Cobrança não foi excluida,  já se encontra paga') {
                handleDelChargesClose();
                setCustomMessageReprove('Esta cobrança não pode ser excluída!');
                handleClickSnackFail();
            }
        }
    };

    useEffect(() => {
        if (delChargesOpen) {
            handleSubmit();
        }
    }, []);

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
