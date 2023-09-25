import React, { useEffect, useState } from 'react';
import './styles.css'

// import { useClients } from '../../context/clientsContext';
import { getItem } from '../../utils/storage';
import registerUserFecth from '../../axios/config';




function ChargesCard({ chargesName, chargesNumber, chargesColor, chargeDue }) {

    const [chargeDue, setChargesDue] = useState([]);

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

    }, []);




    return (
        <div className='charges-card'>
            <div className='charges-title border-bottom'>
                <span>{`Cobranças ${chargesName}`}</span>
                <span className={`charges-number ${chargesColor}`}>{chargesNumber}</span>
            </div>
            <table className='charges-table'>
                <thead className='charges-head'>
                    <tr className='border-bottom'>
                        <th className='charges-left'>Cliente</th>
                        <th className='charges-middle'>ID da cob.</th>
                        <th className='charges-right'>Valor</th>
                    </tr>
                </thead>
                <tbody className='charges-body'>
                    {chargeDue.map(charge => (


                        <tr key={charge.cobranca_id} className='border-bottom'>
                            <td className='charges-left'>Sara</td>
                            <td className='charges-middle'>{charge.cobranca_id.substring(0, 8)}</td>
                            <td className='charges-right'>{`R$ ${charge.valor}`}</td>
                        </tr>

                    ))}
                    {/* <tr className='border-bottom'>
                        <td className='charges-left'>Carlos Prado</td>
                        <td className='charges-middle'>223456781</td>
                        <td className='charges-right'>{`R$ ${'400,00'}`}</td>
                    </tr>
                    <tr className='border-bottom'>
                        <td className='charges-left'>Lara Brito</td>
                        <td className='charges-middle'>223456781</td>
                        <td className='charges-right'>{`R$ ${'900,00'}`}</td>
                    </tr>
                    <tr className='border-bottom'>
                        <td className='charges-left'>Soraia Neves</td>
                        <td className='charges-middle'>223456787</td>
                        <td className='charges-right'>{`R$ ${'700,00'}`}</td>
                    </tr> */}
                </tbody>
            </table>
            <span className='see-all'><a className='link' href="">Ver todos</a></span>
        </div>

    )
};

export default ChargesCard;