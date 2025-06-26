import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Certifique-se de importar isso
import { TextoPadrao } from '../../components'; // ajuste se necessário

export const TelaInicial = () => {
  const navigation = useNavigation();
  const [showButton, setShowButton] = useState(true); // Você pode ajustar conforme quiser

  const handleTelaCriarLista = () => {
    navigation.navigate('TelaCriarLista');
  };

  const handleTelaHistoricoDeListas = () => {
    navigation.navigate('TelaHistoricoDeListas');
  };

  const handleIrParaGrafico = () => {
    navigation.navigate('TelaGraficoDeInflacao');
  };

  return (
    <View style={styles.container}>
      {/* Logo circular */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/icon1.png')}
          style={styles.logo}
        />
      </View>

      {/* Botões */}
      <TouchableOpacity style={styles.botao} onPress={handleTelaCriarLista}>
        <Text style={styles.botaoTexto}>Criar Lista</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={handleTelaHistoricoDeListas}>
        <Text style={styles.botaoTexto}>Histórico de Listas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={handleIrParaGrafico}>
        <Text style={styles.botaoTexto}>Gráfico de Inflação</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 40,
    borderRadius: 50,
  },
  logo: {
    width: 75,
    height: 75,
    borderRadius: 25,
  },
  botao: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 14,
    paddingHorizontal: 30,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  botaoTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
