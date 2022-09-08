import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (data) => {
    return AsyncStorage.setItem('token', data)
}

export const getToken = async () => {
    return AsyncStorage.getItem('token')
}

export const setUserType = async (data) => {
    return AsyncStorage.setItem('userType', data)
}

export const getUserType = async () => {
    return AsyncStorage.getItem('userType')
}