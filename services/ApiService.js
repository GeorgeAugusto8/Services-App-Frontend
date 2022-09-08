import { getToken } from '../services/AsyncStorage';
import axios from "axios";
var RNFS = require('react-native-fs');
var FileUpload = require('NativeModules').FileUpload;


const copyFile = async (data) => {
    RNFS.copyFile(data.uri, `${RNFS.DocumentDirectoryPath}/${data.name}`).then(res => {
        data.uri = `file://file://${RNFS.DocumentDirectoryPath}/${data.name}`

    })
}

export const profileImage = async (data) => {
    let formData = new FormData();
    formData.append("file", data)

    try {
        const response = await fetch('http://10.0.2.2:3000/users/profileimage', {
            headers: {
                'Content-Type': 'multipart/form-data ',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: formData
        })
        console.log(JSON.stringify(response))
        return response

    } catch (e) {
        return e
    }

}