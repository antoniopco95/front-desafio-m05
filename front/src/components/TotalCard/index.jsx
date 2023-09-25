import React from 'react'
import './styles.css'

function TotalCard({ totalCardIcon, totalCardType, totalCardValue, totalCardColor }) {

    return (
        <div className={`total-card ${totalCardColor}`}>
            <img className='total-icon' src={totalCardIcon} alt="totalcardicon" />
            <div className='total-main'>
                <span className='total-title'>{`Cobranças ${totalCardType}`}</span>
                <span className='total-value'>{`${totalCardValue}`}</span>
            </div>
            <div></div>
        </div>
    )
};

export default TotalCard;