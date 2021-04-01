import React, { useState, useContext, useEffect, useRef } from 'react';
import { useGlobalContext } from './appContext';
// Import assets
import menulinks from './assets/menulinks';

const NavContext = React.createContext();

const NavProvider = ({ children }) => {
    const { isLoggedIn } = useGlobalContext();

    const [showMenu, setShowMenu] = useState(false);
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);

    const dropdownRef = useRef(null);
    const burgerRef = useRef(null);
  
    useEffect(() => {
        setShowMenu(false);
        setMenuHeight(0);
    }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            if (showMenu) {
                document.addEventListener('mouseup', handleClickOutside);
                document.addEventListener('keyup', handleKeyUp);
    
                setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
                burgerRef.current.style.transform = 'rotate(90deg)';
            } else {
                document.removeEventListener('mouseup', handleClickOutside);
                document.removeEventListener('keyup', handleKeyUp);
    
                setMenuHeight(0);
                burgerRef.current.style.transform = 'rotate(0deg)';
            }
            return () => {
                document.removeEventListener('mouseup', handleClickOutside);
                document.removeEventListener('keyup', handleKeyUp);
            };
        } else {
            document.removeEventListener('mouseup', handleClickOutside);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [showMenu])

    const handleClickOutside = e => {
        if (!dropdownRef.current || !burgerRef.current || !e.target) return;
        if (dropdownRef.current.contains(e.target) || burgerRef.current.contains(e.target)) {
            return;
        } else {
            setActiveMenu('main');
            setShowMenu(false);
            document.removeEventListener('mouseup', handleClickOutside);
        }
    }

    const handleKeyUp = e => {
        if (e.keyCode === 27) {
            setActiveMenu('main');
            setShowMenu(false);
            document.removeEventListener('keyup', handleKeyUp);
        }
    };

    const calcHeight = ref => {
        const height = ref.current.offsetHeight;
        setMenuHeight(height);
    }

    return (
        <NavContext.Provider value={{
            showMenu,
            setShowMenu,
            activeMenu,
            setActiveMenu,
            menuHeight,
            setMenuHeight,
            dropdownRef,
            burgerRef,
            handleClickOutside,
            handleKeyUp,
            calcHeight,
            menulinks
        }}>
            {children}
        </NavContext.Provider>
    )
}
// make sure use
export const useNavContext = () => {
    return useContext(NavContext)
};

export { NavContext, NavProvider };
