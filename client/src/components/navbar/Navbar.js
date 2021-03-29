import React from 'react';
import { useNavContext } from '../../navContext';

import logo from '../../assets/images/logo.png';
import { GiHamburgerMenu } from "react-icons/gi";

import Dropdown from './Dropdown';

export default function Navbar() {
    const { 
        showMenu,
        setShowMenu,
        burgerRef,
    } = useNavContext();

    return (
        <header className="navbar">
            <img src={logo} alt="" className="navbar__logo"></img>
            
            <button className="navbar__button" onClick={() => setShowMenu(!showMenu)} ref={burgerRef}>
                <GiHamburgerMenu/>
            </button>

            <Dropdown />
        </header>
    )
}

