import React, { useEffect, useState } from 'react';
import ChargesCard from '../../components/ChargesCard';
import ClientsCard from '../ClientsCard';
import TotalCard from '../TotalCard';
import './styles.css'
import PersonAdd from '../../assets/PersonAdd.svg'
import PersonRemove from '../../assets/PersonRemove.svg'
import ChargePaid from '../../assets/ChargePaid.svg'
import ChargeDelayed from '../../assets/ChargeDelayed.svg'
import ChargePending from '../../assets/ChargePending.svg'
import { getItem } from '../../utils/storage'
import registerUserFecth from './../../axios/config';
import { useClients } from '../../context/clientsContext';

function HomeComponent() {

    const { setHome, setClients, setCharges, clientsData, updateChargeType, updateClientStatus } = useClients();

    const inadimplentes = clientsData.filter(client => client.status === "Inadimplente")

    const emDia = clientsData.filter(client => client.status === "Em dia")

    const [chargesDue, setChargesDue] = useState([])
    const [chargesExpired, setChargesExpired] = useState([])
    const [chargesPaid, setChargesPaid] = useState([])
    const [totalPaga, setPagas] = useState('')
    const [totalPrevista, setPrevista] = useState('')
    const [totalVencida, setVencida] = useState('')

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
                    setVencida(data.Total_Vencido)
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
                    const data = response.data;
                    setPrevista(data.total_previsto)
                    setChargesExpired(data.cobrancas_previstas);
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
                    setPagas(data.total_pago)
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchData();
    }, []);

    const handleChargesCardClick = (type) => {
        updateChargeType(type);

        setHome(false);
        setClients(false);
        setCharges(true);
    };

    const handleClientsCardClick = (status) => {
        updateClientStatus(status);

        setHome(false);
        setClients(true);
        setCharges(false);
    };

    return (
        <>
            <div className='homecomponent-box'>
                <span className='home-title'>Resumo das cobranças</span>
                <div className='totalcard-box'>
                    <TotalCard totalCardIcon={ChargePaid} totalCardType='Pagas' totalCardValue={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPaga)} totalCardColor='blue' />
                    <TotalCard totalCardIcon={ChargeDelayed} totalCardType='Vencidas' totalCardValue={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalVencida)} totalCardColor='red' />
                    <TotalCard totalCardIcon={ChargePending} totalCardType='Previstas' totalCardValue={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrevista)} totalCardColor='yellow' />
                </div>
                <div className='homecard-box'>

                    <ChargesCard user={chargesPaid} chargesName='Pagas' chargesNumber={chargesPaid.length} chargesColor='blue' onSeeAllClick={() => handleChargesCardClick('pagas')} />
                    <ChargesCard user={chargesDue} chargesName='Vencidas' chargesNumber={chargesDue.length} chargesColor='red' onSeeAllClick={() => handleChargesCardClick('vencidas')} />
                    <ChargesCard user={chargesExpired} chargesName='Previstas' chargesNumber={chargesExpired.length} chargesColor='yellow' onSeeAllClick={() => handleChargesCardClick('previstas')} />

                </div>

                <div className='clientscard-box'>
                    <ClientsCard filterStatus="Inadimplente" clientsName='Inadimplentes' clientsNumber={inadimplentes.length} clientsColor='red' iconChoose={PersonRemove}
                        onSeeAllStatus={() => handleClientsCardClick('Inadimplente')} />

                    <ClientsCard filterStatus="Em dia" clientsName='em dia' clientsNumber={emDia.length} clientsColor='blue' iconChoose={PersonAdd}
                        onSeeAllStatus={() => handleClientsCardClick('Em dia')} />
                </div>

            </div>


        </>
    )
}

export default HomeComponent;