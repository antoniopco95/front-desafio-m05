import { Link } from 'react-router-dom';
import './styles.css'

function ChargesCard({ chargesName, chargesNumber, chargesColor, user, onSeeAllClick, }) {


    let Real = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    });

    const handleSeeAllClick = () => {
        onSeeAllClick();
    }

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
                    {user.slice(0, 5).map((charge) => {
                        return (
                            <tr key={charge.cobranca_id} className='border-bottom'>
                                <td className='charges-left'>{charge.nome}</td>
                                <td className='charges-middle'>{charge.cobranca_id.substring(0, 8)}</td>
                                <td className='charges-right'>{Real.format(charge.valor)}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <span className='see-all'>

                <Link className='link' onClick={handleSeeAllClick}>Ver todos</Link>
            </span>
        </div>

    )
}

export default ChargesCard;
