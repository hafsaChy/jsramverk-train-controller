import React, { View, Text, TextInput, Button } from "react";
import { Typography, Forms, Base } from '../../styles';
import { showMessage } from 'react-flash-message';

export default function AuthFields({ auth, setAuth, title, submit, navigation}) {

    function validatePassword(text) {
        const pattern = /^(?=.\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-]).(?=.{4,})$/
        if (!text.match(pattern)) {
            showMessage({
                message: "nonPassword",
                description: "ej giltigt",
                type: "warning"
            })
        }
    }
    function validateEmail(text) {
        const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!text.match(pattern)) {
            showMessage({
                message: "nonEmail",
                description: "ej giltigt",
                type: "warning"
            })
        }
    }

    return (
        <View style={Base.containerTabell}>
            <Text style={Typography.label}>E-post</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content) => {
                    validateEmail(content)
                    setAuth({ ...auth, email: content })
                }}
                value={auth?.email}
                keyboardType="email-address"
                testID="email-field"
            />
            <Text style={Typography.label}>Lösenord</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content) => {
                    validatePassword(content)
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
                testID="password-field"
            />
            <Button
                title={title}
                color="#2870F0"
                onPress={() => {
                    submit();
                }}
            />
            <Text/>
            {title === "Logga in" &&
                <Button
                    title="Registrera istället"
                    color="#2870F0"
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                />
            }
        </View>
    );
};
