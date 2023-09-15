import React from 'react';
import ChargesCard from '../../components/ChargesCard'
import './styles.css'

function HomeComponent() {

    return (
        <div className='homecomponent-box'>
            <ChargesCard chargesName='Vencidas' chargesNumber='08' chargesColor='red' />
            <ChargesCard chargesName='Previstas' chargesNumber='05' chargesColor='yellow' />
            <ChargesCard chargesName='Pagas' chargesNumber='10' chargesColor='blue' />
        </div>
    )
};

export default HomeComponent;