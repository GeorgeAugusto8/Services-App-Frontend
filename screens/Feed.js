import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Pressable, TextInput, Text } from 'react-native';
import { Post, ModalPhoto, ModalPost, Loading } from '../components';
import { Metrics } from '../constants/Metrics';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { getToken, getUserType } from '../services/AsyncStorage';
import axios from "axios";

export default ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [filter1, setFilter1] = useState(1);
  const [filter2, setFilter2] = useState(1);
  const [filter3, setFilter3] = useState(1);
  const [modalPost, setModalPost] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    loadPosts()
    loadUserType()
  }, [])

  const refreshData = async () => {
    const response = await postsRequest(true)
    if(response && response.status === 200 ) {
      setPosts(response.data)
      setPage(2)
    }
  }

  const postsRequest = async (refresh = false) => {
    const token = await getToken()
    return axios.get(`http://10.0.2.2:3000/posts?page=${refresh ? 1 : page}`, { 'headers': { 'auth-token': token } })
      .then((response) => { return response })
      .catch(e => { return e })
  }

  const loadPosts = async () => {
    setLoading(true)
    const response = await postsRequest()
    if(response && response.status === 200 ) {
      setPosts([...posts, ...response.data])
      setPage(page + 1)
    }
    setLoading(false)
  }

  const loadUserType = async () => {
    const userType = await getUserType()
    setUserType(userType)
  }

  return (
    <View style={styles.container}>
      <View style={{ height: Metrics.screenHeight * 0.08, width: Metrics.screenWidth, justifyContent: 'center' }}>
        {userType === "ServiceProvider" ? 
          <TextInput placeholder='Nova postagem' style={styles.input} onFocus={() => setModalPost(true)} />
          :
          <Text style={styles.titleApp}>App serviços</Text>
        }
        

        <Pressable style={styles.buttonBack} onPress={() => navigation.navigate("Conversations")}>
          <AntDesign name="wechat" color="#ffffff" size={22} />
        </Pressable>

      </View>

      <View style={{ flexDirection: 'row', height: Metrics.screenHeight * 0.08, width: Metrics.screenWidth, justifyContent: 'space-evenly', alignItems: 'center' }}>
        <View style={{ borderRadius: 10, backgroundColor: "#ffffff", width: Metrics.screenWidth * 0.3 }}>
          <Picker
            mode={'dropdown'}
            selectedValue={filter1}
            onValueChange={(itemValue) =>
              setFilter1(itemValue)
            }>
            <Picker.Item style={{ fontSize: 11 }} label="Mais Recentes" value="1" />
            <Picker.Item style={{ fontSize: 11 }} label="Mais relevantes" value="2" />
          </Picker>
        </View>

        <View style={{ borderRadius: 10, backgroundColor: "#ffffff", width: Metrics.screenWidth * 0.3 }}>
          <Picker
            mode={'dropdown'}
            selectedValue={filter2}
            onValueChange={(itemValue) =>
              setFilter2(itemValue)
            }>
            <Picker.Item style={{ fontSize: 11 }} label="Até 100 km" value="1" />
            <Picker.Item style={{ fontSize: 11 }} label="Até 50 km" value="2" />
            <Picker.Item style={{ fontSize: 11 }} label="Até 10 km" value="3" />
          </Picker>
        </View>

        <View style={{ borderRadius: 10, backgroundColor: "#ffffff", width: Metrics.screenWidth * 0.3 }}>
          <Picker
            mode={'dropdown'}
            selectedValue={filter3}
            onValueChange={(itemValue) =>
              setFilter3(itemValue)
            }>
            <Picker.Item style={{ fontSize: 11 }} label="Todas as tags" value="1" />
            <Picker.Item style={{ fontSize: 11 }} label="#pedreiro" value="2" />
            <Picker.Item style={{ fontSize: 11 }} label="#marcineiro" value="3" />
            <Picker.Item style={{ fontSize: 11 }} label="#cabelereiro" value="4" />
            <Picker.Item style={{ fontSize: 11 }} label="#faz-tudo" value="5" />
          </Picker>
        </View>

      </View>

      <View style={{ width: '100%', height: 0.5, backgroundColor: '#363431', marginVertical: 4 }} />

      <FlatList
        key="list"
        data={posts}
        renderItem={({ item }) => <Post navigation={navigation} item={item} setModal={setModal} setSelectedPhoto={setSelectedPhoto} userType={userType}/>}
        keyExtractor={item => item._id}
        refreshing={refreshing}
        onRefresh={() => refreshData()}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.2}
        onEndReached={() => loadPosts()}
        ListFooterComponent={loading && <Loading />}
      />

      <ModalPhoto visible={modal} setModal={setModal} url={selectedPhoto} />

      <ModalPost visible={modalPost} setModal={setModalPost} refreshData={refreshData} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    width: Metrics.screenWidth * 0.95,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonBack: {
    height: Metrics.baseHeight * 0.5,
    width: Metrics.baseHeight * 0.5,
    borderRadius: Metrics.baseHeight * 0.25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
    top: 12
  },
  input: {
    width: '85%',
    height: Metrics.screenHeight * 0.060,
    backgroundColor: '#ffffff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    marginLeft: 10
  },
  titleApp: {
    fontSize : 18,
    fontWeight : 'bold',
    marginLeft: Metrics.screenWidth * 0.05
  }

});

