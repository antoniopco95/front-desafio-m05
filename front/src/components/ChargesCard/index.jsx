import React from 'react'
import './styles.css'

function ChargesCard({ chargesName, chargesNumber, chargesColor }) {

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
                    <tr className='border-bottom'>
                        <td className='charges-left'>Sara Silva</td>
                        <td className='charges-middle'>223456787</td>
                        <td className='charges-right'>{`R$ ${'1000,00'}`}</td>
                    </tr>
                    <tr className='border-bottom'>
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
                    </tr>
                </tbody>
            </table>
            <span className='see-all'><a className='link' href="">Ver todos</a></span>
        </div>

    )
};

export default ChargesCard;