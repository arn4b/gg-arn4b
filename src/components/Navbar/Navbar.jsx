import React from 'react';
import growwlogo from '../../logo-groww.png'
import './Navbar.scss'

// const Navbar = ({ toggleTheme, isDark }) => {
const Navbar = () => {
    return (
        <div className='navbar'>
            <div className='navbar__div'>
                <img src={growwlogo} className='navbar__logo' />
                GrowwGram</div>
        </div>
    );
};

export default Navbar;
