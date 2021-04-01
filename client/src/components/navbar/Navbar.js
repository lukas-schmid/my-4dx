import React from 'react';
import { useNavContext } from '../../navContext';
import { useGlobalContext } from '../../appContext';
// Import assets && icons
import logo from '../../assets/images/logo.png';
import { GiHamburgerMenu } from "react-icons/gi";
// Import components
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const { isLoggedIn } = useGlobalContext();
    const { 
        showMenu,
        setShowMenu,
        burgerRef,
    } = useNavContext();

    return (
        <header className="navbar">
            <Link to="/"><img src={logo} alt="" className="navbar__logo"></img></Link>
            
            {isLoggedIn && <button className="navbar__button" onClick={() => setShowMenu(!showMenu)} ref={burgerRef}>
                <GiHamburgerMenu/>
            </button>}
            {isLoggedIn && <Dropdown />}
        </header>
    )
}

