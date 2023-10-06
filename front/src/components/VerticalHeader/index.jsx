import HomeIcon from '../../assets/HomeIcon.svg';
import ClientsIcon from '../../assets/ClientsIcon.svg';
import ChargesIcon from '../../assets/ChargesIcon.svg';
import './styles.css'

function VerticalHeader({ home, clients, charges, toggleHome, toggleClients, toggleCharges }) {

    return (
        <div className='vertical-header'>
            <button className={`header-button ${home ? 'selected-module' : null}`}
                onClick={toggleHome}>
                <img className={home ? 'selected-icon' : null}
                    onClick={toggleHome} src={HomeIcon} alt="homeicon" />
                <span>Home</span>
                <i className={home ? 'pink-line' : null}></i>
            </button>
            <button className={`header-button secondary ${clients ? 'selected-module' : null}`}
                onClick={toggleClients}>
                <img className={clients ? 'selected-icon' : null}
                    onClick={toggleClients} src={ClientsIcon} alt="homeicon" />
                <span>Clientes</span>
                <i className={clients ? 'pink-line' : null}></i>
            </button>
            <button className={`header-button secondary ${charges ? 'selected-module' : null}`}
                onClick={toggleCharges}>
                <img className={charges ? 'selected-icon' : null}
                    onClick={toggleCharges} src={ChargesIcon} alt="homeicon" />
                <span>Cobranças</span>
                <i className={charges ? 'pink-line' : null}></i>
            </button>
        </div >
    )
}

export default VerticalHeader;
