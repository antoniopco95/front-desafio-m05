import './styles.css'
import VerticalHeader from '../../components/VerticalHeader'
import React, { useState, useEffect } from 'react';
import AccountLogin from '../../components/AccountLogin';
import HomeComponent from '../../components/HomeComponent';
import ClientsComponent from '../../components/ClientsComponent';

function Dashboard() {

    const [home, setHome] = useState(true);
    const [clients, setClients] = useState(false);
    const [charges, setCharges] = useState(false);

    const toggleHome = (e) => {
        e.preventDefault();
        setHome(true);
        setClients(false);
        setCharges(false);
    };

    const toggleClients = (e) => {
        e.preventDefault();
        setHome(false);
        setClients(true);
        setCharges(false);
    };

    const toggleCharges = (e) => {
        e.preventDefault();
        setHome(false);
        setClients(false);
        setCharges(true);
    };

    useEffect(() => {
    }, [home, clients]);

    return (
        <div className='box-size'>
            <VerticalHeader home={home} clients={clients} charges={charges} toggleHome={toggleHome} toggleClients={toggleClients} toggleCharges={toggleCharges} />
            <div className='login-header'>
                <AccountLogin />
            </div>
            {home && <HomeComponent />}
            {clients && <ClientsComponent />}
        </div>
    )
};

export default Dashboard
