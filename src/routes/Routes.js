import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';

import  AuthStack  from './AuthStack';
import AppStack from './AppStack';
import { AuthContext } from './AuthProvider';

const Routes = () => {

    const {user, setUser} = useContext(AuthContext);
    const [initilizing, setInitializing] = useState(true);

    const onAuthStateChanged = (user) => {
        setUser(user);
        if(initilizing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    }, []);

    if(initilizing) return null;

    return (
        <NavigationContainer>
            <StatusBar backgroundColor="#FAFAFA" barStyle="dark-content" />
            {user ? <AppStack/> : <AuthStack/>}
        </NavigationContainer>
    );
}

export default Routes;





