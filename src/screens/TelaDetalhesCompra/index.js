import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"

export const TelaDetalhesCompra = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { compra } = route.params || {}

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

  if (!compra) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
            <Text style={styles.textoBotaoVoltar}>← Voltar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Compra não encontrada</Text>
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
        <Text style={styles.titulo}>Detalhes da Compra</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoData}>Data: {compra.data}</Text>
        <Text style={styles.infoSupermercado}>Supermercado: {compra.supermercado}</Text>
        <Text style={styles.infoTotal}>Total: R$ {compra.total.toFixed(2).replace(".", ",")}</Text>
      </View>

      <Text style={styles.subtitulo}>Produtos Comprados:</Text>

      <FlatList
        data={compra.itens}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.lista}
        showsVerticalScrollIndicator={false}
      />
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
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  botaoVoltar: {
    marginRight: 15,
  },
  textoBotaoVoltar: {
    fontSize: 16,
    color: "#fff",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  infoContainer: {
    backgroundColor: "#333",
    margin: 15,
    padding: 15,
    borderRadius: 10,
  },
  infoData: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  infoSupermercado: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  infoTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginHorizontal: 15,
    marginBottom: 10,
  },
  lista: {
    flex: 1,
    paddingHorizontal: 15,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemNome: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  itemDetalhes: {
    fontSize: 12,
    color: "#ccc",
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "#fff",
  },
})
