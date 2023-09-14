import './styles.css'
import VerticalHeader from '../../components/VerticalHeader'
import * as React from 'react';
import AccountLogin from '../../components/AccountLogin';

function Dashboard() {

    return (
        <div className='box-size'>
            <VerticalHeader />
            <div className='login-header'>
                <AccountLogin />
            </div>
        </div>
    )
};

export default Dashboard
