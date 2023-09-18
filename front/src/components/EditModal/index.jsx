import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './styles.css'
import { IMaskInput } from "react-imask";

const style = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '30px',
    bgcolor: 'background.paper',
    p: 4,
};

export default function EditModal({ openEdit, handleCloseEdit }) {

    const [inputValue, setInputValue] = useState('');
    const [showError, setShowError] = useState(false);

    const handleInputChange = (e) => {
        e.preventDefault()

        const value = e.target.value;
        setInputValue(value);

        if (value.trim() === '') {
            setShowError(true);
        } else {
            setShowError(false);
        }
    };

    return (
        <div>
            <Modal
                open={openEdit}
                onClose={handleCloseEdit}
            >
                <Box sx={style}>
                    <form className='editmodal-box'>
                        <label className='editmodal-title'>Edite seu Cadastro</label>
                        <div className='editmodal-textfield'>
                            <label className='editmodal-span'>Nome*</label>
                            <input value={inputValue}
                                onChange={handleInputChange}
                                className={`editmodal-input ${showError ? 'border-red' : ''}`} placeholder='Digite seu nome' type="text" id='nome' />
                            {showError && <p style={{ color: 'red', fontFamily: 'Nunito', fontSize: '14px', marginTop: '6px' }}>Este campo deve ser preenchido</p>}
                        </div>
                        <div className='editmodal-textfield'>
                            <label className='editmodal-span'>E-mail*</label>
                            <input
                                value={inputValue}
                                onChange={handleInputChange}
                                className={`editmodal-input ${showError ? 'border-red' : ''}`}
                                placeholder='Digite seu e-mail' type="email" id='email' />
                            {showError && <p style={{ color: 'red', fontFamily: 'Nunito', fontSize: '14px', marginTop: '6px' }}>Este campo deve ser preenchido</p>}
                        </div>
                        <div className='editmodal-telandcpf'>
                            <div className='editmodal-textfield middle'>
                                <label className='editmodal-span'>CPF</label>
                                <IMaskInput className='editmodal-input middle-input' placeholder='Digite seu CPF' type="text" id='cpf' mask="000.000.000-00" />
                            </div>
                            <div className='editmodal-textfield'>
                                <label className='editmodal-span'>Telefone</label>
                                <IMaskInput className='editmodal-input middle-input' placeholder='Digite seu Telefone' type="text" id='telefone' mask="(00) 00000-0000" />
                            </div>
                        </div>
                        <div className='editmodal-textfield'>
                            <label className='editmodal-span'>Nova Senha*</label>
                            <input
                                className={`editmodal-input ${showError ? 'border-red' : ''}`}
                                placeholder='••••••••' type="password" id='senha'
                            />
                            {showError && <p style={{ color: 'red', fontFamily: 'Nunito', fontSize: '14px', marginTop: '6px' }}>Este campo deve ser preenchido</p>}
                        </div>
                        <div className='editmodal-textfield'>
                            <label className='editmodal-span'>Confirmar Senha*</label>
                            <input className={`editmodal-input ${showError ? 'border-red' : ''}`}
                                placeholder='••••••••' type="password" id='confirmarsenha' />
                            {showError && <p style={{ color: 'red', fontFamily: 'Nunito', fontSize: '14px', marginTop: '6px' }}>Este campo deve ser preenchido</p>}
                        </div>
                        <button className='editmodal-button' type='submit' id='aplicar'>Aplicar</button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}