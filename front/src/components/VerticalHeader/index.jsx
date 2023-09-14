import React from 'react';
import { useState } from "react";
import HomeIcon from '../../assets/HomeIcon.svg';
import ClientsIcon from '../../assets/ChargesIcon.svg';
import ChargesIcon from '../../assets/ClientsIcon.svg';
import './styles.css'

function VerticalHeader() {
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

    return (
        <div className='vertical-header'>
            <button className={`header-button ${home ? 'selected-module' : null}`}
                onClick={toggleHome}>
                <img className={home ? 'selected-icon' : null}
                    onClick={toggleHome} src={HomeIcon} alt="homeicon" />
                <span>Home</span>
                <line className={home ? 'pink-line' : null}></line>
            </button>
            <button className={`header-button secondary ${clients ? 'selected-module' : null}`}
                onClick={toggleClients}>
                <img className={clients ? 'selected-icon' : null}
                    onClick={toggleClients} src={ClientsIcon} alt="homeicon" />
                <span>Clientes</span>
                <line className={clients ? 'pink-line' : null}></line>
            </button>
            <button className={`header-button secondary ${charges ? 'selected-module' : null}`}
                onClick={toggleCharges}>
                <img className={charges ? 'selected-icon' : null}
                    onClick={toggleCharges} src={ChargesIcon} alt="homeicon" />
                <span>Cobranças</span>
                <line className={charges ? 'pink-line' : null}></line>
            </button>
        </div >
    )
};

export default VerticalHeader
