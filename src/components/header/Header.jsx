import React from 'react'
import { userData } from '../../plugins/storage';
import './header.scss';


const Header = (props) => {
    const data = userData
    return (
        <div className="top-header">
            <div className="d-flex justify-content-between">

                <h1 className="header-page-title">
                    {props.title}
                </h1>

                <div className="header-user">
                    <p className="header-greeting">Welcome&nbsp;
                    {
                        data ?
                            <span className="header-name">{data.firstname}!</span>
                        :
                        <span className="header-name">Ayo</span>

                    } 
                    </p>
                    <div className="header-user-icon">
                        {
                            data ?
                            <h1 className="header-initials">{data.firstName ? data.firstName.substring(0, 1): 'A'}</h1>
                            :
                            <h1 className="header-initials">A</h1>

                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
