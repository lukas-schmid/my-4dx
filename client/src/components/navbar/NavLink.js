import React from 'react';
import { Link } from 'react-router-dom';
import { useNavContext } from '../../navContext';

export default function NavLink({...rest}) {
    const { setShowMenu, setActiveMenu } = useNavContext();

    return (
        <Link {...rest} onClick={() => {
            setActiveMenu('main');
            setShowMenu(false);
        }}></Link>
    )
}
