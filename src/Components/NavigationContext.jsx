// contexts/NavigationContext.jsx
import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState('home');

    return (
        <NavigationContext.Provider value={{ activeSection, setActiveSection }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation must be used within NavigationProvider');
    }
    return context;
};