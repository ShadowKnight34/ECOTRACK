import React, { useState, createContext } from 'react';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

// Export AuthContext so screens can toggle the mock auth state
export const AuthContext = createContext();

export default function AppNavigator() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ setIsAuthenticated }}>
            {isAuthenticated ? <TabNavigator /> : <AuthNavigator />}
        </AuthContext.Provider>
    );
}
