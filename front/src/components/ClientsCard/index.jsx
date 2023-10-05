import { Link } from 'react-router-dom';
import './styles.css'
import { useClients } from '../../context/clientsContext';

function ClientsCard({ clientsName, clientsNumber, clientsColor, iconChoose, filterStatus, onSeeAllStatus }) {

    const { clientsData, formatCPF } = useClients();

    const filteredClients = clientsData.filter(client => client.status === filterStatus)


    const handleSeeAllStatus = () => {
        onSeeAllStatus();
    }

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
                    {filteredClients.slice(0, 5).map((client) => {
                        return (

                            <tr key={client.cliente_id} className='border-bottom'>
                                <td className='clients-left'>{client.nome}</td>
                                <td className='clients-middle'>{client.cliente_id}</td>
                                <td className='clients-right'>{formatCPF(client.cpf)}</td>
                            </tr>

                        )
                    })}

                </tbody>
            </table>
            <span
                className='see-all'>

                <Link className='link' onClick={handleSeeAllStatus}>Ver todos</Link>

            </span>
        </div>

    )
}

export default ClientsCard;