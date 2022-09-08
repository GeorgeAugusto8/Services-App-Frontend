import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Metrics } from '../constants/Metrics';

const renderServiceCard = (isFinished) => {
  return (
    <View style={{marginTop : 5}}>
      <Text style={{ marginLeft: 5 }}>há 3 horas</Text>
      <View style={styles.card}>

        <View style={{ flexDirection: 'row', width: '100%' }}>
          <Image style={styles.resultImage} source={{ uri: 'https://www.cambe.pr.leg.br/anonimo.jpg/image_preview' }} />
          <View style={{ marginLeft: Metrics.baseWidth * 0.5 }}>
            <Text style={{ fontWeight: 'bold' }}>reforma quarto medio</Text>
            <Text>João da Silva</Text>
          </View>
        </View>

        <Text >10/05/2021  09:00 - 14:00 • R$ 300,00</Text>

        <View style={{ width: '100%', height: 0.5, backgroundColor: '#363431', margin: 10 }} />

        <Text style={{ fontSize: 16, color: '#fca311' }}>{isFinished ? 'Excluir' : 'Cancelar'}</Text>
      </View>
    </View>
  )
}

export default () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 10, alignSelf: 'flex-start' }}>Serviços aguardando resposta : </Text>

        <View style={{ width: '95%', height: 0.5, backgroundColor: '#363431', marginBottom: 10, alignSelf: 'center' }} />

        {renderServiceCard(false)}

        <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 10,alignSelf: 'flex-start' }}>Serviços agendados : </Text>

        <View style={{ width: '95%', height: 0.5, backgroundColor: '#363431', marginBottom: 10, alignSelf: 'center' }} />

        {renderServiceCard(false)}
        {renderServiceCard(false)}

        <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 10,alignSelf: 'flex-start' }}>Serviços recusados : </Text>

        <View style={{ width: '95%', height: 0.5, backgroundColor: '#363431', marginBottom: 10, alignSelf: 'center' }} />

        {renderServiceCard(true)}

        <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 10,alignSelf: 'flex-start' }}>Serviços finalizados : </Text>

        <View style={{ width: '95%', height: 0.5, backgroundColor: '#363431', marginBottom: 10, alignSelf: 'center' }} />

        {renderServiceCard(true)}

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    width: Metrics.screenWidth * 0.92,
    elevation: 1
  },
  resultImage: {
    height: Metrics.baseHeight * 0.4,
    width: Metrics.baseHeight * 0.4,
    borderRadius: Metrics.baseHeight * 0.2,
    borderWidth: 0.5,
    borderColor: '#363431',
    margin: 5
  }
});

