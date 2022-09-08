import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Metrics } from '../constants/Metrics';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { Carousel } from '@fnando/react-native-carousel';
import { getToken } from '../services/AsyncStorage';
import axios from "axios";

export default ({ navigation, setModal, item, setSelectedPhoto, userType }) => {
    const [like, setLike] = useState(false);

    useEffect( () => {
        setLike(item.liked)
    },[] )

    const returnTime = (time) => {
        var now = moment()
        return moment.duration(now.diff(time)).humanize()
    }

    const likeRequest = async () => {
        const token = await getToken()
        return axios.post(`http://10.0.2.2:3000/posts/like`, { postID : item._id }, {'headers': { 'auth-token': token } } )
            .then((response) => { return response })
            .catch(e => { return e })
    }

    const unLikeRequest = async () => {
        const token = await getToken()
        return axios.delete(`http://10.0.2.2:3000/posts/like`,{ data: { postID : item._id }, headers: { 'auth-token': token } })
            .then((response) => { return response })
            .catch(e => { return e })
    }

    const onClickLike = async () => {
        setLike(!like)
        
        if(item.liked || like) unLikeRequest()
        else likeRequest() 

    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Pressable onPress={() => navigation.navigate('Details')}>
                    <Image style={styles.resultImage} source={{ uri: item.userImage ? item.userImage : 'https://www.cambe.pr.leg.br/anonimo.jpg/image_preview' }} />
                </Pressable>
                <View>
                    <Pressable onPress={() => navigation.navigate('Details')}>
                        <Text style={styles.name}>{item.userName}</Text>
                    </Pressable>
                    <Text>{returnTime(item.date)}</Text>
                </View>


                    <View style={{ flexDirection: 'row', position: 'absolute', right: 15, top: 15 }}>
                        <Text style={{ marginRight: 4 }}>{!item.liked && like ? item.likes + 1 : item.liked && !like ? item.likes - 1 : item.likes}</Text>
                        <AntDesign name={like || userType === "ServiceProvider" ? "like1" : "like2"} color={like  ? '#fca311' : '#000000'} 
                        size={18} onPress={() => userType === "Client" && onClickLike()} />
                    </View>
                

            </View>

            <Text>
                {item.text}
            </Text>

            {item.images.length > 1 ?
                <Carousel
                    renderIndicator={({ currentPage, index }) => (
                        <View
                            key={index}
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: 10,
                                marginTop: 4,
                                marginHorizontal: 5,
                                backgroundColor: currentPage === index ? "#fca311" : "#ccc",
                            }}
                        />
                    )}
                >
                    {item.images.map(image =>
                        <Pressable key={image} onPress={() => { setModal(true), setSelectedPhoto(image) }}>
                            <Image style={{ width: Metrics.screenWidth * 0.92, height: Metrics.baseHeight * 3, marginTop: 5, resizeMode: 'cover' }} source={{ uri: image }} />
                        </Pressable>
                    )}
                </Carousel>

                :

                <Pressable onPress={() => { setModal(true), setSelectedPhoto(item.images[0]) }}>
                    <Image style={{ width: Metrics.screenWidth * 0.92, height: Metrics.baseHeight * 3, marginTop: 5, resizeMode: 'cover' }} source={{ uri: item.images[0] }} />
                </Pressable>
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 0.5,
        margin: 5,
        backgroundColor: '#ffffff',
        padding: 10

    },
    resultImage: {
        margin: 10,
        height: Metrics.baseHeight * 0.5,
        width: Metrics.baseHeight * 0.5,
        borderRadius: Metrics.baseHeight * 0.25,
        borderWidth: 0.5,
        borderColor: '#363431',
    },
    name: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'bold',
    },

});

