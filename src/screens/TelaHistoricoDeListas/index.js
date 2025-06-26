"use client"

import { useState, useCallback } from "react"
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Alert } from "react-native"
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { storage } from "../../utils/storage"

export const TelaHistoricoDeListas = () => {
  const navigation = useNavigation()
  const [historico, setHistorico] = useState([])
  const [loading, setLoading] = useState(true)

  const carregarHistorico = async () => {
    try {
      setLoading(true)
      const historicoSalvo = await storage.getItem("historicoCompras")
      if (historicoSalvo) {
        const dados = JSON.parse(historicoSalvo)
        setHistorico(dados)
      } else {
        setHistorico([])
      }
    } catch (error) {
      console.error("Erro ao carregar histórico:", error)
      setHistorico([])
    } finally {
      setLoading(false)
    }
  }

  // Recarregar histórico sempre que a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      carregarHistorico()
    }, []),
  )

  const handleVerDetalhes = (compra) => {
    navigation.navigate("TelaDetalhesCompra", { compra })
  }

  const handleLimparHistorico = () => {
    Alert.alert("Limpar Histórico", "Tem certeza que deseja limpar todo o histórico de compras?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Limpar",
        style: "destructive",
        onPress: async () => {
          try {
            await storage.removeItem("historicoCompras")
            setHistorico([])
            Alert.alert("Sucesso", "Histórico limpo com sucesso!")
          } catch (error) {
            console.error("Erro ao limpar histórico:", error)
            Alert.alert("Erro", "Não foi possível limpar o histórico")
          }
        },
      },
    ])
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleVerDetalhes(item)}>
      <Text style={styles.itemData}>Data: {item.data}</Text>
      <Text style={styles.itemSupermercado}>Supermercado: {item.supermercado}</Text>
      <Text style={styles.itemTotal}>Total: R$ {item.total.toFixed(2).replace(".", ",")}</Text>
    </TouchableOpacity>
  )

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
            <Text style={styles.textoBotaoVoltar}>← Voltar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando histórico...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Text style={styles.textoBotaoVoltar}>← Voltar</Text>
        </TouchableOpacity>
        {historico.length > 0 && (
          <TouchableOpacity style={styles.botaoLimpar} onPress={handleLimparHistorico}>
            <Text style={styles.textoBotaoLimpar}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.titulo}>Últimas Listas Criadas:</Text>

        {historico.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma compra realizada ainda.</Text>
            <Text style={styles.emptySubtext}>Suas compras aparecerão aqui após serem finalizadas.</Text>
          </View>
        ) : (
          <FlatList
            data={historico}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listaContainer}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  botaoVoltar: {
    padding: 5,
  },
  textoBotaoVoltar: {
    fontSize: 16,
    color: "#fff",
  },
  botaoLimpar: {
    padding: 5,
  },
  textoBotaoLimpar: {
    fontSize: 16,
    color: "#ff4444",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
    textAlign: "left",
  },
  listaContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: "#fff",
    borderRadius: 25,
    borderWidth: 3,
    borderColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemData: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  itemSupermercado: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  itemTotal: {
    fontSize: 14,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#fff",
  },
})
