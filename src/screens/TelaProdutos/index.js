"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, SafeAreaView } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"

// Dados dos produtos diretamente no arquivo para evitar problemas de import
const produtosData = {
  produtos: [
    {
      id: "1",
      nome: "Arroz Branco 5kg",
      categoria: "Alimentos Básicos",
      preco: 18.9,
      imagem: "https://via.placeholder.com/80x80/cccccc/000000?text=Arroz",
    },
    {
      id: "2",
      nome: "Feijão Preto 1kg",
      categoria: "Alimentos Básicos",
      preco: 7.5,
      imagem: "https://via.placeholder.com/80x80/cccccc/000000?text=Feijao",
    },
    {
      id: "3",
      nome: "Açúcar Cristal 1kg",
      categoria: "Alimentos Básicos",
      preco: 4.2,
      imagem: "https://via.placeholder.com/80x80/cccccc/000000?text=Acucar",
    },
    {
      id: "11",
      nome: "Biscoito Cream Cracker",
      categoria: "Biscoito e Salgadinhos",
      preco: 3.8,
      imagem: "https://via.placeholder.com/80x80/cccccc/000000?text=Biscoito",
    },
    {
      id: "12",
      nome: "Biscoito Recheado Chocolate",
      categoria: "Biscoito e Salgadinhos",
      preco: 4.5,
      imagem: "https://via.placeholder.com/80x80/cccccc/000000?text=Recheado",
    },
    {
      id: "19",
      nome: "Água Mineral 1,5L",
      categoria: "Bebidas",
      preco: 2.5,
      imagem: "https://via.placeholder.com/80x80/cccccc/000000?text=Agua",
    },
    {
      id: "20",
      nome: "Refrigerante Cola 2L",
      categoria: "Bebidas",
      preco: 8.9,
      imagem: "https://via.placeholder.com/80x80/cccccc/000000?text=Refri",
    },
    {
      id: "27",
      nome: "Carne Bovina Alcatra 1kg",
      categoria: "Carnes",
      preco: 45.9,
      imagem: "https://via.placeholder.com/80x80/cccccc/000000?text=Alcatra",
    },
    {
      id: "28",
      nome: "Frango Inteiro 1kg",
      categoria: "Carnes",
      preco: 12.8,
      imagem: "https://via.placeholder.com/80x80/cccccc/000000?text=Frango",
    },
    {
      id: "35",
      nome: "Sabonete Líquido 250ml",
      categoria: "Higiene",
      preco: 8.5,
      imagem: "https://via.placeholder.com/80x80/cccccc/000000?text=Sabonete",
    },
    {
      id: "36",
      nome: "Shampoo Anticaspa 400ml",
      categoria: "Higiene",
      preco: 15.9,
      imagem: "https://via.placeholder.com/80x80/cccccc/000000?text=Shampoo",
    },
    {
      id: "43",
      nome: "Banana Prata 1kg",
      categoria: "Frutas",
      preco: 6.5,
      imagem: "https://via.placeholder.com/80x80/cccccc/000000?text=Banana",
    },
    {
      id: "44",
      nome: "Maçã Vermelha 1kg",
      categoria: "Frutas",
      preco: 8.9,
      imagem: "https://via.placeholder.com/80x80/cccccc/000000?text=Maca",
    },
  ],
}

const categorias = ["Todos", "Alimentos Básicos", "Biscoito e Salgadinhos", "Bebidas", "Carnes", "Higiene", "Frutas"]

export const TelaProdutos = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { supermercado } = route.params || {}

  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos")
  const [produtos, setProdutos] = useState(produtosData.produtos)
  const [carrinho, setCarrinho] = useState({})

  console.log("TelaProdutos carregada com supermercado:", supermercado)

  const produtosFiltrados =
    categoriaSelecionada === "Todos"
      ? produtos
      : produtos.filter((produto) => produto.categoria === categoriaSelecionada)

  const adicionarProduto = (produtoId) => {
    setCarrinho((prev) => ({
      ...prev,
      [produtoId]: (prev[produtoId] || 0) + 1,
    }))
  }

  const removerProduto = (produtoId) => {
    setCarrinho((prev) => {
      const novoCarrinho = { ...prev }
      if (novoCarrinho[produtoId] > 1) {
        novoCarrinho[produtoId] -= 1
      } else {
        delete novoCarrinho[produtoId]
      }
      return novoCarrinho
    })
  }

  const calcularTotal = () => {
    return produtos.reduce((total, produto) => {
      const quantidade = carrinho[produto.id] || 0
      return total + produto.preco * quantidade
    }, 0)
  }

  const contarItensCarrinho = () => {
    return Object.values(carrinho).reduce((total, quantidade) => total + quantidade, 0)
  }

  const handleVerTotal = () => {
    const itensCarrinho = produtos
      .filter((produto) => carrinho[produto.id] > 0)
      .map((produto) => ({
        ...produto,
        quantidade: carrinho[produto.id],
      }))

    navigation.navigate("TelaTotal", {
      itensCarrinho,
      total: calcularTotal(),
      supermercado,
    })
  }

  const renderProduto = ({ item }) => (
    <View style={styles.produtoContainer}>
      <View style={styles.produtoImagem}>
        <Text style={styles.produtoImagemTexto}>Foto do{"\n"}Produto</Text>
      </View>
      <View style={styles.produtoInfo}>
        <View style={styles.produtoNomeContainer}>
          <Text style={styles.produtoNome}>{item.nome}</Text>
          <View style={styles.linhaSublinhada} />
        </View>
        <Text style={styles.produtoPreco}>Preço: R$ {item.preco.toFixed(2).replace(".", ",")}</Text>
      </View>
      <View style={styles.botoesQuantidade}>
        <TouchableOpacity style={styles.botaoQuantidade} onPress={() => removerProduto(item.id)}>
          <Text style={styles.textoBotaoQuantidade}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantidade}>{carrinho[item.id] || 0}</Text>
        <TouchableOpacity style={styles.botaoQuantidade} onPress={() => adicionarProduto(item.id)}>
          <Text style={styles.textoBotaoQuantidade}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  const renderCategoria = (categoria) => (
    <TouchableOpacity
      key={categoria}
      style={[styles.categoriaButton, categoriaSelecionada === categoria && styles.categoriaSelecionada]}
      onPress={() => setCategoriaSelecionada(categoria)}
    >
      <Text style={[styles.categoriaTexto, categoriaSelecionada === categoria && styles.categoriaTextoSelecionado]}>
        {categoria}
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Text style={styles.textoBotaoVoltar}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.tituloSupermercado}>{supermercado?.nome || "Supermercado"}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriasContainer}
        contentContainerStyle={styles.categoriasContent}
      >
        {categorias.map(renderCategoria)}
      </ScrollView>

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderProduto}
        style={styles.listaProdutos}
        showsVerticalScrollIndicator={false}
      />
      {contarItensCarrinho() > 0 && (
        <View style={styles.totalContainer}>
          <TouchableOpacity style={styles.botaoTotal} onPress={handleVerTotal}>
            <Text style={styles.textoTotal}>
              Ver Total da Compra ({contarItensCarrinho()} {contarItensCarrinho() === 1 ? "item" : "itens"})
            </Text>
            <Text style={styles.valorTotal}>R$ {calcularTotal().toFixed(2).replace(".", ",")}</Text>
          </TouchableOpacity>
        </View>
      )}
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
    height: 60,
    marginTop:20,
  },
  botaoVoltar: {
    marginRight: 15,
  },
  textoBotaoVoltar: {
    fontSize: 16,
    color: "#007AFF",
  },
  tituloSupermercado: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  categoriasContainer: {
    flexGrow: 0,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    height:50,
  },
  categoriasContent: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    height: 30,
  },
  categoriaButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginRight: 8,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "#000",
    height: 25,
  },
  categoriaSelecionada: {
    backgroundColor: "#000",
    borderColor: "#000",
    height: 25,
  },
  categoriaTexto: {
    fontSize: 12,
    color: "#000",
    fontWeight: "bold",
  },
  categoriaTextoSelecionado: {
    color: "#fff",
    fontWeight: "bold",
  },
  listaProdutos: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  produtoContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 3,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "flex-start",
  },
  produtoImagem: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  produtoImagemTexto: {
    fontSize: 8,
    color: "#000",
    textAlign: "center",
    fontWeight: "bold",
  },
  produtoInfo: {
    flex: 1,
    marginRight: 10,
  },
  produtoNomeContainer: {
    marginBottom: 8,
  },
  produtoNome: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 2,
  },
  linhaSublinhada: {
    height: 2,
    backgroundColor: "#000",
    width: "80%",
  },
  produtoPreco: {
    fontSize: 12,
    color: "#000",
  },
  botoesQuantidade: {
    alignItems: "center",
    justifyContent: "center",
  },
  botaoQuantidade: {
    width: 20,
    height: 20,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  textoBotaoQuantidade: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  quantidade: {
    marginVertical: 4,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    minWidth: 20,
    textAlign: "center",
  },
  totalContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 2,
    borderTopColor: "#000",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  botaoTotal: {
    backgroundColor: "#000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textoTotal: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  valorTotal: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})
