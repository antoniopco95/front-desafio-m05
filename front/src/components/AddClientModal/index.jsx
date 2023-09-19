import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './styles.css'
import ClientsIcon from '../../assets/ClientsIcon.svg';
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

export default function AddClientModal({ openAdd, handleCloseAdd }) {

    const [inputName, setInputName] = useState('');
    const [inputPhone, setInputPhone] = useState('');

    const [showErrorName, setShowErrorName] = useState(false);
    const [showErrorPhone, setShowErrorPhone] = useState(false);
    const cleanInput = (e) => {
        e.preventDefault();

        setInputName('')
        setInputPhone('')

        handleCloseAdd()
    };

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

    const handleChangePhone = (e) => {
        e.preventDefault()

        const value = e.target.value;
        setInputPhone(value);

        if (value.trim() === '') {
            setShowErrorPhone(true);
        } else {
            setShowErrorPhone(false);
        }
    };

    return (
        <div>
            <Modal
                open={openAdd}
                onClose={handleCloseAdd}
            >
                <Box className='add-box' sx={style}>
                    <form className='addclientmodal-box'>
                        <div className='addclientmodal-fulltitle'>
                            <img src={ClientsIcon} className='clients-icon' alt="clientsicon" />
                            <label className='addclientmodal-title'>Cadastro do Cliente</label>
                        </div>
                        <div className='addclientmodal-textfield'>
                            <label className='addclientmodal-span'>Nome*</label>
                            <input
                                onChange={handleChangeName}
                                value={inputName}
                                className={`addclientmodal-input ${showErrorName ? 'border-red' : ''}`} placeholder='Digite seu nome' type="text" id='nome' />
                            {showErrorName && <p style={{ color: 'red', fontFamily: 'Nunito', fontSize: '8.4px', marginTop: '4.2px' }}>Este campo deve ser preenchido</p>}
                        </div>
                        <div className='addclientmodal-textfield'>
                            <label className='addclientmodal-span'>E-mail*</label>
                            <input
                                className='addclientmodal-input'
                                placeholder='Digite seu e-mail' type="email" id='email' />
                        </div>
                        <div className='addclientmodal-telandcpf'>
                            <div className='addclientmodal-textfield middle'>
                                <label className='addclientmodal-span'>CPF*</label>
                                <IMaskInput className='addclientmodal-input middle-input-both' placeholder='Digite seu CPF' type="text" id='cpf' mask="000.000.000-00" />
                            </div>
                            <div className='addclientmodal-textfield'>
                                <label className='addclientmodal-span'>Telefone*</label>
                                <IMaskInput
                                    onChange={handleChangePhone}
                                    value={inputPhone}
                                    className={`addclientmodal-input middle-input-both ${showErrorPhone ? 'border-red' : ''}`} placeholder='Digite seu Telefone' type="text" id='telefone' mask="(00) 00000-0000" />
                                {showErrorPhone && <p style={{ color: 'red', fontFamily: 'Nunito', fontSize: '8.4px', marginTop: '4.2px' }}>Este campo deve ser preenchido</p>}
                            </div>
                        </div>


                        <div className='addclientmodal-textfield'>
                            <label className='addclientmodal-span'>Endereço</label>
                            <input className='addclientmodal-input' placeholder='Digite o endereço' type="text" id='endereco' />
                        </div>
                        <div className='addclientmodal-textfield'>
                            <label className='addclientmodal-span'>Complemento</label>
                            <input className='addclientmodal-input' placeholder='Digite o complemento' type="text" id='complemento' />
                        </div>

                        <div className='addclientmodal-telandcpf'>
                            <div className='addclientmodal-textfield middle'>
                                <label className='addclientmodal-span'>CEP:</label>
                                <IMaskInput className='addclientmodal-input middle-input-both' placeholder='Digite o CEP' type="text" id='cep' mask="00000-000" />
                            </div>
                            <div className='addclientmodal-textfield'>
                                <label className='addclientmodal-span'>Bairro</label>
                                <input className='addclientmodal-input middle-input-both' placeholder='Digite o bairro' type="text" id='bairro' />
                            </div>
                        </div>
                        <div className='addclientmodal-telandcpf'>
                            <div className='addclientmodal-textfield middle'>
                                <label className='addclientmodal-span'>Cidade</label>
                                <IMaskInput className='addclientmodal-input middle-city' placeholder='Digite a cidade' type="text" id='cep' mask="00000-000" />
                            </div>
                            <div className='addclientmodal-textfield'>
                                <label className='addclientmodal-span'>UF</label>
                                <input className='addclientmodal-input middle-uf' placeholder='Digite a UF' type="text" id='uf' maxLength='2' />
                            </div>
                        </div>
                        <div className='addclientmodal-buttons'>
                            <button className='addclientmodal-cancelbtn' onClick={cleanInput} id='aplicar'>Cancelar</button>
                            <button className='addclientmodal-button' type='submit' id='aplicar'>Aplicar</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}