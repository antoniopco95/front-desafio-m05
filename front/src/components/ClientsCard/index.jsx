import React from 'react'
import './styles.css'

function ClientsCard({ clientsName, clientsNumber, clientsColor, iconChoose }) {

    return (
        <div className='clients-card'>
            <div className='clients-title border-bottom'>
                <div className='clients-iconandtitle'>
                    <img src={iconChoose} alt="person" />
                    <span className='clients-name'>{`Clientes ${clientsName}`}</span>
                </div>
                <span className={`clients-number ${clientsColor}`}>{clientsNumber}</span>
            </div>
            <table className='clients-table'>
                <thead className='clients-head'>
                    <tr className='border-bottom'>
                        <th className='clients-left'>Clientes</th>
                        <th className='clients-middle'>ID do clie.</th>
                        <th className='clients-right'>CPF</th>
                    </tr>
                </thead>
                <tbody className='clients-body'>
                    <tr className='border-bottom'>
                        <td className='clients-left'>Cameron Williamson</td>
                        <td className='clients-middle'>223456787</td>
                        <td className='clients-right'>041.477.456-56</td>
                    </tr>
                    <tr className='border-bottom'>
                        <td className='clients-left'>Savannah Nguyen</td>
                        <td className='clients-middle'>223456787</td>
                        <td className='clients-right'>041.477.456-56</td>
                    </tr>
                    <tr className='border-bottom'>
                        <td className='clients-left'>Darlene Robertson</td>
                        <td className='clients-middle'>223456787</td>
                        <td className='clients-right'>041.477.456-56</td>
                    </tr>
                    <tr className='border-bottom'>
                        <td className='clients-left'>Marvin McKinney</td>
                        <td className='clients-middle'>223456787</td>
                        <td className='clients-right'>041.477.456-56</td>
                    </tr>
                </tbody>
            </table>
            <span className='see-all'><a className='link' href="">Ver todos</a></span>
        </div>

    )
};

export default ClientsCard;