import React, {useContext} from 'react';
import './sidebar.scss'
import { MdLayers, MdDevicesOther, MdSelectAll} from 'react-icons/md';
import { FiUsers } from 'react-icons/fi';
import { FaUsersCog } from 'react-icons/fa';
import { BsDash } from 'react-icons/bs';
import { AiOutlineBank, AiOutlineCreditCard, AiOutlineAccountBook, AiOutlineAudit } from 'react-icons/ai';
import { RiLogoutBoxLine } from "react-icons/ri";
import { authContext } from '../../context/AuthenticationContext';
import { NavLink } from 'react-router-dom';
import {useNavigate } from 'react-router'
import logo from '../../assets/img/logo.png'

const Sidebar = (props) => {
    const navigate = useNavigate();
    const { setAuthenticationStatus } = useContext(authContext)

    const logout = () => {
        setAuthenticationStatus(false);
        localStorage.clear();
        navigate('/sign-in')
    }

    return (
        <div className="side-bar">
            <div className="logo">
                <img src={logo} alt="Logo" style={{width:'120px'}}/>
            </div>

            <div className="side-navigation-box">
                
                <ul className={props.title === 'Dashboard' ? 'side-navigation-active': 'side-navigation'}>
                    <li>
                        <MdLayers className={props.title === 'Dashboard' ? 'active-icon': 'side-icon'} size={20} /><NavLink to="/">Dashboard</NavLink>
                    </li>
                </ul>


                <ul className={props.title === 'Users'  || props.title === 'Add Users' ? 'side-navigation-active': 'side-navigation'} >
                
                    <li className="dropdown" href="#userSubmenu" data-toggle="collapse">
                        <FiUsers className={props.title === 'Users' || props.title === 'Add Users' ? 'active-icon': 'side-icon'} size={20}/><NavLink href="#">Users</NavLink>

                        <ul className="collapse list-unstyled nav-link" id="userSubmenu">

                            <li className="submenu">
                                <BsDash className="sub-icon" size={10}/>
                                <NavLink to="/add-user" activeClassName="selected">
                                    Add Users
                                </NavLink>
                            </li>

                            <li className="submenu">
                                <BsDash className="sub-icon" size={10} /><NavLink to="/users" activeClassName="selected">
                                    View Users
                                </NavLink>
                            </li>

                        </ul>
                    </li>
                </ul>
                

                <ul className={props.title === 'Merchants' || props.title === 'Add Merchants' ? 'side-navigation-active': 'side-navigation'}>
                    <li className="dropdown" href="#merchantSubmenu" data-toggle="collapse">
                        <AiOutlineBank className={props.title === 'Merchants' || props.title === 'Add Merchants' ? 'active-icon': 'side-icon'} size={20} /><NavLink to="#">Merchants</NavLink>
                        <ul className="collapse list-unstyled nav-link" id="merchantSubmenu">

                            <li className='submenu'>
                                <BsDash className='sub-icon' size={10} />
                                <NavLink to="/add-merchant" activeClassName="selected">
                                    Add Merchant
                                </NavLink>
                            </li>

                            <li className='submenu'>
                                <BsDash className='sub-icon' size={10}/>
                                <NavLink to="/merchants" activeClassName="selected">
                                    View Merchants
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>

                <ul className={props.title === 'Terminals' ? 'side-navigation-active': 'side-navigation'}>
                    <li>
                        <MdDevicesOther className={props.title === 'Terminals' ? 'active-icon' : 'side-icon'} size={20} /><NavLink to="/terminals">Terminals</NavLink>
                    </li>
                </ul>

                <ul className={props.title === 'Clients' || props.title === 'Add Client' ? 'side-navigation-active': 'side-navigation'}>
                    <li className="dropdown" href="#clientSubmenu" data-toggle="collapse">
                        <AiOutlineAudit className={props.title === 'Clients' || props.title === 'Add Client' ? 'active-icon': 'side-icon'} size={20} /><NavLink to="#">Clients</NavLink>
                        <ul className="collapse list-unstyled nav-link" id="clientSubmenu">

                            <li className='submenu'>
                                <BsDash className='sub-icon' size={10} />
                                <NavLink to="/add-client" activeClassName="selected">
                                    Add Client
                                </NavLink>
                            </li>

                            <li className='submenu'>
                                <BsDash className='sub-icon' size={10}/>
                                <NavLink to="clients" activeClassName="selected">
                                    View Clients
                                </NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>

                <div className='side-menu'>
                    <p>CONFIGURATIONS</p>
                </div>

                <ul className={props.title === 'Roles' ? 'side-navigation-active': 'side-navigation'}>
                    <li>
                        <FaUsersCog className={props.title === 'Roles' ? 'active-icon': 'side-icon'} size={20} /><NavLink to="/roles">User Roles</NavLink>
                    </li>
                </ul>

                <ul className={props.title === 'Routes' ? 'side-navigation-active' : 'side-navigation'}>
                    <li>
                        <AiOutlineCreditCard className={props.title === 'Routes' ? 'active-icon' : 'side-icon'} size={20} /><NavLink to="/routes">Routes</NavLink>
                    </li>
                </ul>

                <ul className={props.title === 'Schemes' ? 'side-navigation-active' : 'side-navigation'}>
                    <li>
                        <AiOutlineAccountBook className={props.title === 'Schemes' ? 'active-icon' : 'side-icon'} size={20} /><NavLink to="/schemes">Schemes</NavLink>
                    </li>
                </ul>

                <ul className={props.title === 'Stations' ? 'side-navigation-active' : 'side-navigation'}>
                    <li>
                        <MdSelectAll className={props.title === 'Stations' ? 'active-icon' : 'side-icon'} size={20} /><NavLink to="/stations">Stations</NavLink>
                    </li>
                </ul>



               
                <ul className='side-navigation'>
                    <li onClick = {logout}>
                        <RiLogoutBoxLine className='side-icon' size={20} /><NavLink href="#">Logout</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
