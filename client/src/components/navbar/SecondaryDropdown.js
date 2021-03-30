import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useNavContext } from '../../navContext';
// Import components
import NavLink from './NavLink';
// Import icons
import { IoArrowBackCircleSharp } from "react-icons/io5";

export default function SecondaryDropdown({ menuName, linksObj }) {
    const { activeMenu, setActiveMenu, calcHeight } = useNavContext();

    const ulRef = useRef(null);

    return (
        <CSSTransition
            in={activeMenu === menuName}
            timeout={500}
            classNames="menu-secondary"
            unmountOnExit
            nodeRef={ulRef}
            onEnter={() => calcHeight(ulRef)}
        >
            <ul ref={ulRef}>
                <li onClick={() => {setActiveMenu('main')}}>
                    <IoArrowBackCircleSharp />
                    Back
                </li>
                <hr />
                {linksObj && linksObj.map((linkItem, index) => {
                    return <li key={index}>{linkItem.icon} <NavLink to={linkItem.url}>{linkItem.label}</NavLink></li>;
                })}
            </ul>
        </CSSTransition>
    )
}
