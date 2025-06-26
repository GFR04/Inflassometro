import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { storage } from "../../utils/storage"

export const TelaTotal = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { itensCarrinho, total, supermercado } = route.params || {}

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemNome}>{item.nome}</Text>
        <Text style={styles.itemDetalhes}>
          Quantidade: {item.quantidade} | Preço unitário: R$ {item.preco.toFixed(2).replace(".", ",")}
        </Text>
      </View>
      <Text style={styles.itemTotal}>R$ {(item.preco * item.quantidade).toFixed(2).replace(".", ",")}</Text>
    </View>
  )

  const handleFinalizarCompra = async () => {
    try {
      // Criar objeto da compra
      const novaCompra = {
        id: Date.now().toString(),
        data: new Date().toLocaleDateString("pt-BR"),
        supermercado: supermercado?.nome || "Supermercado",
        itens: itensCarrinho,
        total: total,
        timestamp: Date.now(),
      }

      // Buscar histórico existente
      const historicoExistente = await storage.getItem("historicoCompras")
      const historico = historicoExistente ? JSON.parse(historicoExistente) : []

      // Adicionar nova compra
      historico.unshift(novaCompra) // Adiciona no início da lista

      // Manter apenas as últimas 20 compras
      const historicoLimitado = historico.slice(0, 20)

      // Salvar no storage
      const sucesso = await storage.setItem("historicoCompras", JSON.stringify(historicoLimitado))

      if (sucesso) {
        alert("Compra finalizada e salva no histórico!")
      } else {
        alert("Compra finalizada com sucesso!")
      }

      navigation.navigate("TelaInicial")
    } catch (error) {
      console.error("Erro ao salvar compra:", error)
      alert("Compra finalizada com sucesso!")
      navigation.navigate("TelaInicial")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Text style={styles.textoBotaoVoltar}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Total da Compra</Text>
      </View>

      <View style={styles.supermercadoInfo}>
        <Text style={styles.supermercadoNome}>{supermercado?.nome}</Text>
      </View>

      <FlatList
        data={itensCarrinho}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.lista}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.totalContainer}>
        <View style={styles.totalInfo}>
          <Text style={styles.totalTexto}>Total: R$ {total.toFixed(2).replace(".", ",")}</Text>
          <Text style={styles.itensTexto}>
            {itensCarrinho.length} {itensCarrinho.length === 1 ? "produto" : "produtos"}
          </Text>
        </View>

        <TouchableOpacity style={styles.botaoFinalizar} onPress={handleFinalizarCompra}>
          <Text style={styles.textoBotaoFinalizar}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  botaoVoltar: {
    marginRight: 15,
  },
  textoBotaoVoltar: {
    fontSize: 16,
    color: "#007AFF",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  supermercadoInfo: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  supermercadoNome: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  lista: {
    flex: 1,
    paddingHorizontal: 15,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemNome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  itemDetalhes: {
    fontSize: 12,
    color: "#666",
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 2,
    borderTopColor: "#000",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  totalInfo: {
    alignItems: "center",
    marginBottom: 15,
  },
  totalTexto: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  itensTexto: {
    fontSize: 14,
    color: "#666",
  },
  botaoFinalizar: {
    backgroundColor: "#000",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  textoBotaoFinalizar: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})
