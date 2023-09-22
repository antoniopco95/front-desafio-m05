import React from 'react';
import './styles.css'
import ClientsIcon from '../../assets/ClientsIcon.svg';
import FilterIcon from '../../assets/FilterIcon.svg';
import SearchIcon from '../../assets/SearchIcon.svg';
import AddCharge from '../../assets/AddCharge.svg';

function ClientsTable({ handleOpenAdd, handleOpenCreateCharges }) {

    return (
        <div className='clientstable-box'>
            <div className='clientstable-header'>
                <div className='clientstable-iconandtitle'>
                    <img className='clientstable-icon' src={ClientsIcon} alt='clientsicon' />
                    <span className='clientstable-title'>Clientes</span>
                </div>
                <button className='clientstable-addbutton' onClick={handleOpenAdd}>+ Adicionar cliente</button>
                <button className='clientstable-filterbutton'><img src={FilterIcon} alt="filtericon" /></button>
                <div className='clientstable-search'>
                    <input className='clientstable-searchinput' type="text" placeholder='Pesquisa'></input>
                    <img src={SearchIcon} alt="searchicon" />
                </div>
            </div>
            <table className='clientstable-table'>
                <thead className='table-titles'>
                    <tr>
                        <th className='table-th'>Cliente</th>
                        <th className='table-th'>CPF</th>
                        <th className='table-th'>E-mail</th>
                        <th className='table-th'>Telefone</th>
                        <th className='table-th'>Status</th>
                        <th className='table-th'>Criar Cobrança</th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    <tr className='table-tr'>
                        <td className='table-td'>Sara da Silva</td>
                        <td className='table-td'>054 365 255 87</td>
                        <td className='table-td'>sarasilva@cubos.io</td>
                        <td className='table-td'>71 9 9462 8654</td>
                        <td className={`table-td status red`}>Inadimplente</td>
                        <td className='table-td'><img className='addcharge-icon' src={AddCharge} alt="addchargeicon" onClick={handleOpenCreateCharges} /></td>
                    </tr>
                    <tr className='table-tr'>
                        <td className='table-td'>Cameron Williamson</td>
                        <td className='table-td'>054 365 255 87</td>
                        <td className='table-td'>cameronw@cubos.io</td>
                        <td className='table-td'>71 9 9662 8653</td>
                        <td className={`table-td status blue`}>Em dia</td>
                        <td className='table-td'><img className='addcharge-icon' src={AddCharge} alt="addchargeicon" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default ClientsTable;