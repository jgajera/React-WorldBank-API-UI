import React from 'react';

import logo from './logo.svg';


const Header = () => {
    return(
        <div className="header">
            <img src={logo} className="App-logo" alt="logo" />
            <header className="App-header">
            <h1>
                Country Explorer
            </h1>
            <p>
                WorldBank API UI
            </p>
            </header>
        </div>
    );
}


export default Header;