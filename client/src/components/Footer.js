import React from 'react';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer>
            <a href="https://github.com/lukas-schmid/my-4dx" 
                target="_blank" 
                rel="noreferrer"
                className="footer-link"
            >
                <FaGithub className="footer-link__icon"/>
                Github
            </a>
        </footer>
    )
}
