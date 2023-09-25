import React, { useState, useEffect } from 'react';
import ChargesCard from '../../components/ChargesCard'
import ClientsCard from '../ClientsCard';
import TotalCard from '../TotalCard';
import './styles.css'
import PersonAdd from '../../assets/PersonAdd.svg'
import PersonRemove from '../../assets/PersonRemove.svg'
import ChargePaid from '../../assets/ChargePaid.svg'
import ChargeDelayed from '../../assets/ChargeDelayed.svg'
import ChargePending from '../../assets/ChargePending.svg'

import { getItem } from '../../utils/storage';
import registerUserFecth from '../../axios/config';

function HomeComponent() {

    const [chargesDueData, setchargesDueData] = useState([]);
    const [chargesToPay, setChargesToPay] = useState([]);
    const [chargesPaid, setChargesPaid] = useState([]);


    useEffect(() => {

        const fetchData = async () => {

            const token = getItem('token');

            if (token) {

                try {
                    const response = await registerUserFecth.get('/cobrancas/vencidas', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const data = response.data;
                    console.log(data);

                    setChargesDue(data.cobrancas_vencidas);






                } catch (error) {
                    console.error(error)
                    console.log(error);
                }

            }

        };
        fetchData();

    }, [])



    return (
        <>
            <div className='homecomponent-box'>
                <span className='home-title'>Resumo das cobranças</span>
                <div className='totalcard-box'>
                    <TotalCard totalCardIcon={ChargePaid} totalCardType='Pagas' totalCardValue='30.000' totalCardColor='blue' />
                    <TotalCard totalCardIcon={ChargeDelayed} totalCardType='Vencidas' totalCardValue='7.000' totalCardColor='red' />
                    <TotalCard totalCardIcon={ChargePending} totalCardType='Previstas' totalCardValue='10.000' totalCardColor='yellow' />
                </div>
                <div className='homecard-box'>
                    <ChargesCard chargesName='Vencidas' chargesNumber='08' chargesColor='red' chargeDue={chargesDueData} />
                    <ChargesCard chargesName='Previstas' chargesNumber='05' chargesColor='yellow' />
                    <ChargesCard chargesName='Pagas' chargesNumber='10' chargesColor='blue' />
                </div>
                <div className='clientscard-box'>
                    <ClientsCard clientsName='Inadimplentes' clientsNumber='08' clientsColor='red' iconChoose={PersonRemove} />
                    <ClientsCard clientsName='em dia' clientsNumber='08' clientsColor='blue' iconChoose={PersonAdd} />
                </div>
            </div>
        </>
    )
};

export default HomeComponent;