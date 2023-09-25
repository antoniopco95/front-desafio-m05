import React, { useEffect } from 'react';
import './styles.css';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ChargesIcon from '../../assets/ChargesIcon.svg';
import CheckIcon from '../../assets/CheckIcon.svg';
import { IMaskInput } from "react-imask";

export default function CreateCharges({ openCreateCharges, handleCloseCreateCharges, handleClickSnack, setCustomMessageApprove }) {

    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        handleCloseCreateCharges();
        handleClickSnack();
        setCustomMessageApprove('Cobrança cadastrada com sucesso');
    };

    const BpIcon = styled('span')(({ theme }) => ({
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        backgroundColor: '#C8C8D7',
    }));

    const BpCheckedIcon = styled(BpIcon)({
        backgroundColor: '#0E8750',
        backgroundImage: `url(${CheckIcon})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
    });

    return (
        <>
            <Modal
                open={openCreateCharges}
                onClose={handleCloseCreateCharges}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    borderRadius: '30px',
                    bgcolor: 'background.paper',
                    fontFamily: 'Nunito',
                    p: '48px 57px 40px 57px',
                }}>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className='createcharges-iconandtitle'>
                                <img className='createcharges-icon' src={ChargesIcon} alt="chargesicon" />
                                <p className='createcharges-title'>Cadastro de Cobrança</p>
                            </div>
                            <div className='createcharges-inputandp'>
                                <p className='createcharges-p'>Nome*</p>
                                <input className='createcharges-input' type="text" placeholder='Digite o nome' />
                            </div>
                            <div className='createcharges-inputandp'>
                                <p className='createcharges-p'>Descrição*</p>
                                <textarea className='createcharges-input createcharges-desc' type="text" placeholder='Digite a descrição' size='100' />
                            </div>
                            <div>
                                <div className='createcharges-valueandexpire'>
                                    <div className='createcharges-inputandp'>
                                        <p className='createcharges-p'>Vencimento:*</p>
                                        <IMaskInput className='createcharges-input createcharges-middleinput' type="text" placeholder='Data de Vencimento' mask="00/00/00" />
                                    </div>
                                    <div className='createcharges-inputandp'>
                                        <p className='createcharges-p'>Valor:*</p>
                                        <input className='createcharges-input createcharges-middleinput' type="text" placeholder='Digite o valor' />
                                    </div>
                                </div>
                                <div className='createcharges-inputandp'>
                                    <p className='createcharges-p'>Status*</p>
                                    <div className='createcharges-inputandradio'>
                                        <Radio checked={selectedValue === 'a'} onChange={handleChange} value="a" name="radio-buttons" inputProps={{ 'aria-label': 'A' }} checkedIcon={<BpCheckedIcon />}
                                            icon={<BpIcon />} />
                                        <label className='createcharges-label'>Cobrança Paga</label>
                                    </div>
                                    <div className='createcharges-inputandradio'>
                                        <Radio checked={selectedValue === 'b'} onChange={handleChange} value="b" name="radio-buttons" inputProps={{ 'aria-label': 'B' }} checkedIcon={<BpCheckedIcon />}
                                            icon={<BpIcon />} />
                                        <label className='createcharges-label'>Cobrança Pendente</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='createcharges-buttons'>
                            <button className='createcharges-button createcharges-cancel' onClick={handleCloseCreateCharges}>Cancelar</button>
                            <button className='createcharges-button createcharges-apply' onClick={handleSubmit}>Aplicar</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
};