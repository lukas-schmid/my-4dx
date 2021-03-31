import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNavContext } from '../../navContext';
import { useGlobalContext } from '../../appContext';
// Import components
import NavLink from './NavLink';
import SecondaryDropdown from './SecondaryDropdown';
// Import icons
import { BiLogOut } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { GiConsoleController } from 'react-icons/gi';

export default function Dropdown() {
    const { isAdmin, logOutUser } = useGlobalContext();

    const {
        activeMenu, 
        setActiveMenu, 
        menuHeight,  
        dropdownRef,
        calcHeight,
        menulinks,
        removeEventListeners
    } = useNavContext();

    const mainRef = useRef(null);

    const links_main = menulinks.find(linkObj => linkObj.section === 'main');
    const links_personal = menulinks.find(linkObj => linkObj.section === 'personal');

    let links_setup = [];
    let links_admin = [];
    if (isAdmin) {
        links_setup = menulinks.find(linkObj => linkObj.section === '4dx setup');
        links_admin = menulinks.find(linkObj => linkObj.section === 'admin');
    }

    return (
        <nav style={{ height: menuHeight }} ref={dropdownRef} className="dropdown">
            <CSSTransition
                in={activeMenu === "main"}
                timeout={500}
                classNames="menu-primary"
                unmountOnExit
                nodeRef={mainRef}
                onEnter={() => calcHeight(mainRef)}
            >
                <ul ref={mainRef}>
                    {links_main && links_main.links.map((linkItem, index) => {
                        return <li key={index}>{linkItem.icon} <NavLink to={linkItem.url}>{linkItem.label}</NavLink></li>
                    })}

                    {isAdmin && <>
                        <hr />
                        <li onClick={() => {setActiveMenu('setup')}}><FiSettings />4dx setup</li>
                        <li onClick={() => {setActiveMenu('admin')}}><RiAdminFill />admin</li>
                        <hr />
                    </>}
                    
                    {links_personal && links_personal.links.map((linkItem, index) => {
                        return <li key={index}>{linkItem.icon} <NavLink to={linkItem.url}>{linkItem.label}</NavLink></li>
                    })}

                    <li><BiLogOut /><a href="#" onClick={e => {
                        e.preventDefault();
                        logOutUser();
                    }}>logout</a></li>
                </ul>
            </CSSTransition>

            {isAdmin && <>
                <SecondaryDropdown menuName="setup" linksObj={links_setup.links}/>
                <SecondaryDropdown menuName="admin" linksObj={links_admin.links}/>
            </>}
        </nav>
    )
}
