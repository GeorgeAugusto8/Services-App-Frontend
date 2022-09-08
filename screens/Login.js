import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { Metrics } from '../constants/Metrics';
import { setToken, setUserType } from '../services/AsyncStorage';
import axios from "axios";
import Toast from 'react-native-root-toast';

export default ({ navigation }) => {
    const [email, setEmail] = useState(null);
    const [password, setPasswork] = useState(null);

    const apiRequest = async () => {
        return axios.post('http://10.0.2.2:3000/auth/login', { email: email, password: password })
        .then( (response) => {return response} )
        .catch(e => {return e} )
    }

    const login = async () => {
        const response = await apiRequest()
        if (response && response.status === 200) {
            setEmail(null)
            setPasswork(null)
            setToken(response.headers["auth-token"])
            setUserType(response.data.userType)
            navigation.navigate('Explore')
        } else {
            Toast.show('Email ou senha incorretos',
                {
                    duration: Toast.durations.LONG, position: Toast.positions.BOTTOM, opacity: 1, shadow: true,
                    backgroundColor: 'rgb(200,0,0)', textColor: '#ffffff'
                }
            )
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>APP SERVIÇOS</Text>
            <TextInput placeholder="Email" style={styles.input} onChangeText={text => setEmail(text)} />
            <TextInput placeholder="Senha" style={styles.input} secureTextEntry={true} onChangeText={text => setPasswork(text)} />

            <Pressable onPress={() => login()} >
                <Text style={{ color: '#fca311', fontSize: 18, marginTop: 5 }}>ENTRAR</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("Register")} >
                <Text style={{ color: '#ffffff', fontSize: 12 }}>Não possui cadastro ? Registre-se</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#14213d'

    },
    title: {
        color: '#ffffff',
        fontSize: 26,
        marginBottom: 15
    },
    input: {
        width: '90%',
        borderWidth: 2,
        borderColor: '#d3d3d3',
        padding: 10,
        height: Metrics.screenHeight * 0.080,
        borderRadius: 5,
        backgroundColor: '#ffffff',
        marginBottom: 15,
        marginTop: 15
    },

});

