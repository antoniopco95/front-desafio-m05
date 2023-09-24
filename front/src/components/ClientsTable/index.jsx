import React, { useEffect } from 'react';
import './styles.css'
import ClientsIcon from '../../assets/ClientsIcon.svg';
import FilterIcon from '../../assets/FilterIcon.svg';
import SearchIcon from '../../assets/SearchIcon.svg';
import AddCharge from '../../assets/AddCharge.svg';
import { getItem } from '../../utils/storage';
import registerUserFecth from '../../axios/config';
import { useClients } from '../../context/clientsContext';

function ClientsTable({ handleOpenAdd }) {
    const { clientsData, updateClientsData } = useClients();

    useEffect(() => {

        const fetchData = async () => {

            const token = getItem('token');

            if (token) {

                try {
                    const response = await registerUserFecth.get('/clientes', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const data = response.data;

                    updateClientsData(data)


                } catch (error) {
                    console.error(error)
                }

            }

        };
        fetchData();

    }, [updateClientsData]);




    function formatCPF(cpf) {

        const cleanedCPF = cpf.replace(/\D/g, '');


        const formattedCPF = cleanedCPF.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4'
        );

        return formattedCPF;
    }


    function formatPhoneNumber(phoneNumber) {

        const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');


        const formattedPhoneNumber = cleanedPhoneNumber.replace(
            /(\d{2})(\d{5})(\d{4})/,
            '($1) $2-$3'
        );

        return formattedPhoneNumber;
    }

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
                    {clientsData.map(client => (


                        <tr key={client.cliente_id} className='table-tr'>
                            <td className='table-td'>{client.nome}</td>
                            <td className='table-td'>
                                {formatCPF(client.cpf)}
                            </td>
                            <td className='table-td'>{client.email}</td>
                            <td className='table-td'>{formatPhoneNumber(client.telefone)}</td>
                            <td className={`table-td status red`}>Inadimplente</td>
                            <td className='table-td'><img className='addcharge-icon' src={AddCharge} alt="addchargeicon" /></td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    )

};

export default ClientsTable;