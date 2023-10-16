import Auth from '../../interfaces/auth';
import { View, Text, TextInput, Button } from "react-native";
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';
import { showMessage } from 'react-native-flash-message';

export default function Register({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doRegister() {
        if (auth.email && auth.password) {

            await AuthModel.register(auth);

        } else {
            showMessage({
                message: "Invalid input",
                description: "Invalid Epost or Password",
                type: "warning"
            });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            title="register"
            navigation={navigation}
        />
    );
};
