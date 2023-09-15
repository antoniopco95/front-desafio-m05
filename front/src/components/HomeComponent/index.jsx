import React from 'react';
import ChargesCard from '../../components/ChargesCard'
import ClientsCard from '../ClientsCard';
import './styles.css'
import PersonAdd from '../../assets/PersonAdd.svg'
import PersonRemove from '../../assets/PersonRemove.svg'

function HomeComponent() {

    return (
        <>
            <div className='homecard-box'>
                <ChargesCard chargesName='Vencidas' chargesNumber='08' chargesColor='red' />
                <ChargesCard chargesName='Previstas' chargesNumber='05' chargesColor='yellow' />
                <ChargesCard chargesName='Pagas' chargesNumber='10' chargesColor='blue' />
            </div>
            <div className='clientscard-box'>
                <ClientsCard clientsName='Inadimplentes' clientsNumber='08' clientsColor='red' iconChoose={PersonRemove} />
                <ClientsCard clientsName='em dia' clientsNumber='08' clientsColor='blue' iconChoose={PersonAdd} />
            </div>
        </>
    )
};

export default HomeComponent;