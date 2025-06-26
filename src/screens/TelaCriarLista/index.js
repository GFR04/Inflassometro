"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions, Image, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"

const supermercados = [
  { id: "1", nome: "ABC", imagem: require("../../../assets/ABC.jpg") },
  { id: "2", nome: "Barbosão", imagem: require("../../../assets/Barsosao.png") },
  { id: "3", nome: "Bernadão", imagem: require("../../../assets/Bernadao.png") },
  { id: "6", nome: "Bahamas", imagem: require("../../../assets/Bahamas.png") },
  { id: "4", nome: "BH", imagem: require("../../../assets/BH.jpg") },
  { id: "5", nome: "KamelMegaMix", imagem: require("../../../assets/KamelMegamix.png") },
]

const { width } = Dimensions.get("window")

function Card({ nome, imagem, selecionado, onPress }) {
  return (
    <View style={styles.card}>
      <View style={styles.imagemContainer}>
        <Image source={imagem} style={styles.imagem} resizeMode="contain" />
      </View>
      <View style={styles.footer}>
        <Text style={styles.nome}>{nome}</Text>
        <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
          <View style={[styles.circulo, selecionado && styles.circuloSelecionado]} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const TelaCriarLista = () => {
  const navigation = useNavigation()
  const [selecionados, setSelecionados] = useState({})

  const toggleSelecionado = (id) => {
    setSelecionados((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const handleTelaInicial = () => {
    navigation.navigate("TelaInicial")
  }

  const handleSelecionar = () => {
    const supermercadoSelecionado = Object.keys(selecionados).find((id) => selecionados[id])

    console.log("Supermercados selecionados:", selecionados)
    console.log("ID do supermercado selecionado:", supermercadoSelecionado)

    if (supermercadoSelecionado) {
      const supermercado = supermercados.find((s) => s.id === supermercadoSelecionado)
      console.log("Dados do supermercado:", supermercado)

      try {
        navigation.navigate("TelaProdutos", { supermercado })
        console.log("Navegação executada com sucesso!")
      } catch (error) {
        console.error("Erro na navegação:", error)
        Alert.alert("Erro", "Não foi possível navegar para a tela de produtos")
      }
    } else {
      Alert.alert("Atenção", "Por favor, selecione um supermercado primeiro!")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Selecione o Supermercado: </Text>
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
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 20 }}
        contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 15 }}
      />

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botao} onPress={handleTelaInicial}>
          <Text style={styles.textBotao}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={handleSelecionar}>
          <Text style={styles.textBotao}>Selecionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
  },
  titulo: {
    fontSize: Math.min(width * 0.12, 48),
    textAlign: "center",
    color: "#fff",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  card: {
    width: (width - 50) / 2, // Largura responsiva: (largura da tela - padding total) / 2 colunas
    height: width * 0.45, // Altura proporcional à largura da tela
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#fff",
    overflow: "hidden", // Mudança de "visible" para "hidden"
    marginBottom: 10,
    backgroundColor: "#fff",
    marginHorizontal: 5, // Adicionar margem horizontal para espaçamento
  },
  imagemContainer: {
    height: "75%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8", // Fundo sutil para destacar a imagem
  },
  imagem: {
    height: "75%",
    width: "100%",
    resizeMode: "contain", // Mudança para "contain" para manter a imagem dentro do card
  },
  footer: {
    flexDirection: "row",
    paddingVertical: width * 0.02, // Padding responsivo
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 2,
    borderTopColor: "#fff",
    height: "25%", // Altura fixa em porcentagem
  },
  nome: {
    fontSize: Math.min(width * 0.035, 16), // Tamanho responsivo
    fontWeight: "bold",
    flex: 1,
  },
  checkboxContainer: {
    padding: 5,
  },
  circulo: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "transparent",
  },
  circuloSelecionado: {
    width: 20,
    height: 20,
    borderWidth: 2,
    backgroundColor: "#B0E0E6",
    borderColor: "#B0E2FF",
    opacity: 1,
  },
  botoesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.08, // Padding responsivo
    paddingVertical: 15,
  },
  botao: {
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: width * 0.06, // Padding responsivo
    minWidth: width * 0.25, // Largura mínima responsiva
    alignItems: "center",
  },
  textBotao: {
    fontSize: 14,
    color: "#fff",
  },
})
