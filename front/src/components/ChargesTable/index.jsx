import React from 'react';
import './styles.css'
import ChargesIcon from '../../assets/ChargesIcon.svg';
import FilterIcon from '../../assets/FilterIcon.svg';
import SearchIcon from '../../assets/SearchIcon.svg';
import EditTable from '../../assets/EditTable.svg';
import DeleteTable from '../../assets/DeleteTable.svg';

function ChargesTable() {

    return (
        <div className='chargestable-box'>
            <div className='chargestable-header'>
                <div className='chargestable-iconandtitle'>
                    <img className='chargestable-icon' src={ChargesIcon} alt='chargesicon' />
                    <span className='chargestable-title'>Cobranças</span>
                </div>
                <div className='chargestable-filterandinput'>
                    <button className='chargestable-filterbutton'><img src={FilterIcon} alt="filtericon" /></button>
                    <div className='chargestable-search'>
                        <input className='chargestable-searchinput' type="text" placeholder='Pesquisa'></input>
                        <img src={SearchIcon} alt="searchicon" />
                    </div>
                </div>
            </div>
            <table className='chargestable-table'>
                <thead className='table-titles'>
                    <tr>
                        <th className='table-th'>Cliente</th>
                        <th className='table-th'>ID Cob.</th>
                        <th className='table-th'>Valor</th>
                        <th className='table-th'>Data de venc.</th>
                        <th className='table-th'>Status</th>
                        <th className='table-th desc'>Descrição</th>
                        <th className='table-th'></th>
                        <th className='table-th'></th>
                    </tr>
                </thead>
                <tbody className='table-body'>
                    <tr className='table-tr'>
                        <td className='table-td'>Sara da Silva</td>
                        <td className='table-td'>248563147</td>
                        <td className='table-td'>R$ 500,00</td>
                        <td className='table-td'>26/01/2021</td>
                        <td className={`table-td status red`}>Vencida</td>
                        <td className='table-td'>lorem ipsum lorem ipsum lorem ...</td>
                        <td className='table-td'><img src={EditTable} alt="edittableicon" className='buttons' /></td>
                        <td className='table-td'><img src={DeleteTable} alt="deletetableicon" className='buttons' /></td>
                    </tr>
                    <tr className='table-tr'>
                        <td className='table-td'>Carlos Prado</td>
                        <td className='table-td'>368563147</td>
                        <td className='table-td'>R$ 700,00</td>
                        <td className='table-td'>27/11/2021</td>
                        <td className={`table-td status yellow`}>Pendente</td>
                        <td className='table-td'>lorem ipsum lorem ipsum lorem ...</td>
                        <td className='table-td'><img src={EditTable} alt="edittableicon" className='buttons' /></td>
                        <td className='table-td'><img src={DeleteTable} alt="deletetableicon" className='buttons' /></td>
                    </tr>
                    <tr className='table-tr'>
                        <td className='table-td'>Carlos Prado</td>
                        <td className='table-td'>578563147</td>
                        <td className='table-td'>R$ 300,00</td>
                        <td className='table-td'>22/01/2021</td>
                        <td className={`table-td status blue`}>Paga</td>
                        <td className='table-td'>lorem ipsum lorem ipsum lorem ...</td>
                        <td className='table-td'><img src={EditTable} alt="edittableicon" className='buttons' /></td>
                        <td className='table-td'><img src={DeleteTable} alt="deletetableicon" className='buttons' /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
};

export default ChargesTable;