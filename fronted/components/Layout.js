import React from 'react';
import Header from './Header'

const Layout = ({ children }) => {
    return (
        // To have more than one element inside.
        <React.Fragment>
            <Header/>
                { children }
        </React.Fragment>
    );
};

export default Layout;