import React, {useState, useContext, useEffect} from 'react';
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from './NavbarElements';
import logoImage from '../images/logotype.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins} from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import {faUserShield} from "@fortawesome/free-solid-svg-icons";
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import Badge from '@mui/material/Badge';
import AuthContext from "../context/AuthProvider";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import './navbar.css';
import { useSelector } from "react-redux";
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import axios from "../api/axios";


const Navbar = () => {
    const [sidebar, setSidebar] = useState(false);
    const setAuth = useContext(AuthContext);
    const [info, setInfo] = useState([]);
    const [role, setRole] = useState(0);
    const showSidebar = () => setSidebar(!sidebar);
    useEffect(async ()=>{
        const response=await axios.get(
            'http://130.193.40.81:8000/api/userInfo/',
            {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem("userData")).accessToken}`,
                },
            }
        );
        setInfo(response.data);
        console.log(info, 'Новое userInfo');

    },[role])
    const quantity = useSelector(state=>state.cart.quantity)
    // console.log(quantity)
    // console.log(info);

    return (

        <>
            <Nav>
                <NavLink to='/'>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyItems: 'center'}}>
                    <img className="logoImage" style={{width:'70px', height: '70px'}} src={logoImage} alt='logo'/>
                    Главная
                    </div>
                </NavLink>
                <IconContext.Provider value={{ color: '#00d29d' }}>
                    <div className='navbar'>
                        <NavLink to='#' className='menu-bars'>
                            <Bars onClick={showSidebar}/>
                        </NavLink>
                        {/*<NavLink to='#' className='menu-bars'>*/}
                        {/*    <FaIcons.FaBars onClick={showSidebar} />*/}
                        {/*</NavLink>*/}
                    </div>
                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items' onClick={showSidebar}>
                            <li className='navbar-toggle'>
                                <NavLink to='#' className='menu-bars'>
                                    <AiIcons.AiOutlineClose />
                                </NavLink>
                            </li>
                                    <li>
                                        {/*<NavLink id='admPanel2' to='/adm-home' activeStyle>*/}
                                        {/*    <div><FontAwesomeIcon icon={faUserShield}/></div>*/}
                                        {/*    <div>Управление</div>*/}
                                        {/*</NavLink>*/}
                                        <NavLink to='#' activeStyle>
                                            <div><button className="userBalance">
                                                balance &#129689;</button></div>
                                            <div>
                                                {/*{info.email}*/} email
                                            </div>
                                        </NavLink>
                                        <NavLink to='/orders' activeStyle>
                                            <div><FontAwesomeIcon icon={faCoins} />
                                            </div>
                                            <div>
                                                Мои ставки
                                            </div>
                                        </NavLink>
                                        <NavLink to='/adm-add' activeStyle>
                                            <Badge component="badge" id='cart_badge'  badgeContent={quantity} color='secondary'>
                                                <AddCircleOutlineIcon/>
                                            </Badge>
                                            <div>
                                                Создать аукцион
                                            </div>
                                        </NavLink>
                                        <NavLink to='/sign-in' activeStyle>
                                            <div><FontAwesomeIcon className='icon' icon={faArrowRightFromBracket} onClick={() =>
                                                localStorage.clear()}/>
                                            </div>
                                            <div>
                                                Выход
                                            </div>
                                        </NavLink>
                                    </li>
                        </ul>
                    </nav>
                </IconContext.Provider>

                <NavMenu classname='sidebar'>
                    <NavLink to='#'>
                        <div>
                            {/*{info.email}*/}email
                        </div>
                    </NavLink>
                    <NavLink to='/orders' activeStyle>
                        <div><FontAwesomeIcon icon={faCoins} />
                        </div>
                        <div>
                           Мои ставки
                        </div>
                    </NavLink>
                    <NavLink to='/adm-add' activeStyle>
                        <Badge component="badge" id='cart_badge'  badgeContent={quantity} color='secondary'>
                            <AddCircleOutlineIcon/>
                        </Badge>
                        <div>
                            Создать аукцион
                        </div>
                    </NavLink>
                    <NavLink to='/sign-in' activeStyle>
                        <div><FontAwesomeIcon className='icon' icon={faArrowRightFromBracket} onClick={() => {
                            setAuth.logout()} }/>
                        </div>
                        <div>
                            Выход
                        </div>
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
export default Navbar;
