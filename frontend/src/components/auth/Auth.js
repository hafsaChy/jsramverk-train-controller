import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Login';
import Register from './Register';

const Stack = createNativeStackNavigator();

export default function Deliveries(props) {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" options={{headerStyle: {
            backgroundColor: '#20232a',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white'
            },}}>
                {(screenProps) => <Login {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={Register} options={{headerStyle: {
            backgroundColor: '#20232a',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white'
            },}}/>
        </Stack.Navigator>
    );
};
