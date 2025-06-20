import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const supermercados = [
  { id: '1', nome: 'ABC', imagem: require('../../../assets/icon1.png') },
  { id: '2', nome: 'Barbosão', imagem: require('../../../assets/icon1.png') },
  { id: '3', nome: 'Bernadão', imagem: require('../../../assets/icon1.png') },
  { id: '4', nome: 'BH', imagem: require('../../../assets/icon1.png') },
  { id: '5', nome: 'KamelMegaMix', imagem: require('../../../assets/icon1.png') },
];

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // Ajuste o valor para ajustar o card com as margens
const handleTelaInicial = () => {
Navegation.navigate('TelaInicial'); // Certifique-se de que a navegação esteja configurada corretamente
}

function Card({ nome, imagem, selecionado, onPress }) {
  return (
    <View style={styles.card}>
      <Image source={imagem} style={styles.imagem} resizeMode="cover" />
      <View style={styles.footer}>
        <Text style={styles.nome}>{nome}</Text>
        <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
          <View style={[styles.circulo, selecionado && styles.circuloSelecionado]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const TelaRealizarCompra = () => {
  const [selecionados, setSelecionados] = useState({});

  const toggleSelecionado = (id) => {
    setSelecionados((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={supermercados}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <Card
            nome={item.nome}
            imagem={item.imagem}
            selecionado={!!selecionados[item.id]}
            onPress={() => toggleSelecionado(item.id)}
          />
        )}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 20 }}
        contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 15 }}
      />

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botao} onPress={handleTelaInicial}>
          <Text style={styles.textBotao}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao}>
          <Text style={styles.textBotao}>Selecionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card: {
    width: cardWidth,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#000',
    overflow: 'visible',
    marginBottom: 15, // Garantir espaçamento entre os cards
  },
  imagem: {
    height: 100,
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderTopColor: '#000',
  },
  nome: {
    fontSize: 14,
  },
  checkboxContainer: {
    padding: 5,
  },
  circulo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: 'transparent',
  },
  circuloSelecionado: {
    width: 20,
    height: 20,
    borderWidth: 2,
    backgroundColor: '#B0E0E6',
    borderColor: '#B0E2FF',
    opacity: 1, // Aplica a borda opaca no círculo selecionado
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  botao: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 25,
  },
  textBotao: {
    fontSize: 14,
  },
});
