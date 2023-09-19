import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './styles.css'
import EyeOff from '../../assets/EyeOff.svg';
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

    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputConfirm, setInputConfirm] = useState('');

    const [showErrorName, setShowErrorName] = useState(false);
    const [showErrorEmail, setShowErrorEmail] = useState(false);
    const [showErrorPassword, setShowErrorPassword] = useState(false);
    const [showErrorConfirm, setShowErrorConfirm] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!inputName || !inputEmail || !inputPassword || !inputConfirm) {

        } else {
            handleCloseEdit();
        }
    }

    const handleChangeName = (e) => {
        e.preventDefault()

        const value = e.target.value;
        setInputName(value);

        if (value.trim() === '') {
            setShowErrorName(true);
        } else {
            setShowErrorName(false);
        }
    };

    const handleChangeEmail = (e) => {
        e.preventDefault()

        const value = e.target.value;
        setInputEmail(value);

        if (value.trim() === '') {
            setShowErrorEmail(true);
        } else {
            setShowErrorEmail(false);
        }
    };

    const handleChangePassword = (e) => {
        e.preventDefault()

        const value = e.target.value;
        setInputPassword(value);

        if (value.trim() === '') {
            setShowErrorPassword(true);
        } else {
            setShowErrorPassword(false);
        }
    };

    const handleChangeConfirm = (e) => {
        e.preventDefault()

        const value = e.target.value;
        setInputConfirm(value);

        if (value.trim() === '') {
            setShowErrorConfirm(true);
        } else {
            setShowErrorConfirm(false);
        }
    };

    return (
        <div>
            <Modal
                open={openEdit}
                onClose={handleCloseEdit}
            >
                <Box className='edit-box' sx={style}>
                    <form className='editmodal-box' onSubmit={handleSubmit}>
                        <label className='editmodal-title'>Edite seu Cadastro</label>
                        <div className='editmodal-textfield'>
                            <label className='editmodal-span'>Nome*</label>
                            <input
                                onChange={handleChangeName}
                                value={inputName}
                                className={`editmodal-input ${showErrorName ? 'border-red' : ''}`} placeholder='Digite seu nome' type="text" id='nome' />
                            {showErrorName && <p style={{ color: 'red', fontFamily: 'Nunito', fontSize: '14px', marginTop: '6px' }}>Este campo deve ser preenchido</p>}
                        </div>
                        <div className='editmodal-textfield'>
                            <label className='editmodal-span'>E-mail*</label>
                            <input
                                onChange={handleChangeEmail}
                                value={inputEmail}
                                className={`editmodal-input ${showErrorEmail ? 'border-red' : ''}`}
                                placeholder='Digite seu e-mail' type="email" id='email' />
                            {showErrorEmail && <p style={{ color: 'red', fontFamily: 'Nunito', fontSize: '14px', marginTop: '6px' }}>Este campo deve ser preenchido</p>}
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
                            <div>
                                <input
                                    value={inputPassword}
                                    onChange={(e) => setInputPassword(e.target.value)}
                                    className={`editmodal-input ${showErrorPassword ? 'border-red' : ''}`}
                                    placeholder='••••••••' type={showPassword ? 'text' : 'password'} id='senha'
                                />
                                <button onClick={(e) => setShowPassword(!showPassword)} className='editmodal-hidebtn1'><img src={EyeOff} alt="eyeofficon" /></button>
                            </div>
                            {showErrorPassword && <p style={{ color: 'red', fontFamily: 'Nunito', fontSize: '14px', marginTop: '6px' }}>Este campo deve ser preenchido</p>}
                        </div>
                        <div className='editmodal-textfield'>
                            <label className='editmodal-span'>Confirmar Senha*</label>
                            <div>
                                <input className={`editmodal-input ${showErrorConfirm ? 'border-red' : ''}`}
                                    onChange={(e) => setInputConfirm(e.target.value) && handleChangeConfirm}
                                    value={inputConfirm} placeholder='••••••••' type={showConfirm ? 'text' : 'password'} id='confirmarsenha' />
                                <button onClick={(e) => setShowConfirm(!showConfirm)} className='editmodal-hidebtn2'><img src={EyeOff} alt="eyeofficon" /></button>
                            </div>
                            {showErrorConfirm && <p style={{ color: 'red', fontFamily: 'Nunito', fontSize: '14px', marginTop: '6px' }}>Este campo deve ser preenchido</p>}
                        </div>
                        <button className='editmodal-button' type='submit' id='aplicar'>Aplicar</button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}