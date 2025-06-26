"use client"

import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions, Modal } from "react-native"
import { useNavigation } from "@react-navigation/native"

const { width } = Dimensions.get("window")

// Dados das listas de junho
const listasJunho = {
  listas: [
    {
      id: "lista_junho_1",
      data: "15/06/2024",
      supermercado: "ABC",
      itens: [
        {
          id: "1",
          nome: "Arroz Branco 5kg",
          categoria: "Alimentos Básicos",
          preco: 18.9,
          quantidade: 2,
        },
        {
          id: "2",
          nome: "Feijão Preto 1kg",
          categoria: "Alimentos Básicos",
          preco: 7.5,
          quantidade: 3,
        },
        {
          id: "19",
          nome: "Água Mineral 1,5L",
          categoria: "Bebidas",
          preco: 2.5,
          quantidade: 6,
        },
        {
          id: "27",
          nome: "Carne Bovina Alcatra 1kg",
          categoria: "Carnes",
          preco: 45.9,
          quantidade: 1,
        },
        {
          id: "35",
          nome: "Sabonete Líquido 250ml",
          categoria: "Higiene",
          preco: 8.5,
          quantidade: 2,
        },
      ],
      total: 130.8,
    },
    {
      id: "lista_junho_2",
      data: "18/06/2024",
      supermercado: "Barbosão",
      itens: [
        {
          id: "3",
          nome: "Aç��car Cristal 1kg",
          categoria: "Alimentos Básicos",
          preco: 4.2,
          quantidade: 2,
        },
        {
          id: "11",
          nome: "Biscoito Cream Cracker",
          categoria: "Biscoito e Salgadinhos",
          preco: 3.8,
          quantidade: 4,
        },
        {
          id: "20",
          nome: "Refrigerante Cola 2L",
          categoria: "Bebidas",
          preco: 8.9,
          quantidade: 2,
        },
        {
          id: "28",
          nome: "Frango Inteiro 1kg",
          categoria: "Carnes",
          preco: 12.8,
          quantidade: 2,
        },
        {
          id: "43",
          nome: "Banana Prata 1kg",
          categoria: "Frutas",
          preco: 6.5,
          quantidade: 3,
        },
      ],
      total: 78.3,
    },
    {
      id: "lista_junho_3",
      data: "22/06/2024",
      supermercado: "Bernadão",
      itens: [
        {
          id: "4",
          nome: "Óleo de Soja 900ml",
          categoria: "Alimentos Básicos",
          preco: 5.8,
          quantidade: 3,
        },
        {
          id: "12",
          nome: "Biscoito Recheado Chocolate",
          categoria: "Biscoito e Salgadinhos",
          preco: 4.5,
          quantidade: 5,
        },
        {
          id: "21",
          nome: "Suco de Laranja 1L",
          categoria: "Bebidas",
          preco: 6.5,
          quantidade: 3,
        },
        {
          id: "36",
          nome: "Shampoo Anticaspa 400ml",
          categoria: "Higiene",
          preco: 15.9,
          quantidade: 1,
        },
        {
          id: "44",
          nome: "Maçã Vermelha 1kg",
          categoria: "Frutas",
          preco: 8.9,
          quantidade: 2,
        },
      ],
      total: 78.6,
    },
    {
      id: "lista_junho_4",
      data: "25/06/2024",
      supermercado: "BH",
      itens: [
        {
          id: "5",
          nome: "Farinha de Trigo 1kg",
          categoria: "Alimentos Básicos",
          preco: 3.9,
          quantidade: 2,
        },
        {
          id: "13",
          nome: "Salgadinho Batata Frita",
          categoria: "Biscoito e Salgadinhos",
          preco: 6.9,
          quantidade: 3,
        },
        {
          id: "22",
          nome: "Cerveja Lata 350ml",
          categoria: "Bebidas",
          preco: 3.2,
          quantidade: 12,
        },
        {
          id: "29",
          nome: "Linguiça Calabresa 500g",
          categoria: "Carnes",
          preco: 18.5,
          quantidade: 2,
        },
        {
          id: "37",
          nome: "Pasta de Dente 90g",
          categoria: "Higiene",
          preco: 4.2,
          quantidade: 3,
        },
      ],
      total: 108.9,
    },
    {
      id: "lista_junho_5",
      data: "28/06/2024",
      supermercado: "KamelMegaMix",
      itens: [
        {
          id: "8",
          nome: "Leite Integral 1L",
          categoria: "Alimentos Básicos",
          preco: 4.8,
          quantidade: 4,
        },
        {
          id: "14",
          nome: "Biscoito Wafer Morango",
          categoria: "Biscoito e Salgadinhos",
          preco: 3.2,
          quantidade: 6,
        },
        {
          id: "23",
          nome: "Energético 250ml",
          categoria: "Bebidas",
          preco: 7.8,
          quantidade: 4,
        },
        {
          id: "32",
          nome: "Presunto Fatiado 200g",
          categoria: "Carnes",
          preco: 8.9,
          quantidade: 3,
        },
        {
          id: "45",
          nome: "Laranja Pêra 1kg",
          categoria: "Frutas",
          preco: 4.2,
          quantidade: 5,
        },
      ],
      total: 109.4,
    },
  ],
}

// Dados das listas de dezembro (com inflação)
const listasDezembo = {
  listas: [
    {
      id: "lista_dezembro_1",
      data: "15/12/2024",
      supermercado: "ABC",
      itens: [
        {
          id: "1",
          nome: "Arroz Branco 5kg",
          categoria: "Alimentos Básicos",
          preco: 22.5,
          quantidade: 2,
        },
        {
          id: "2",
          nome: "Feijão Preto 1kg",
          categoria: "Alimentos Básicos",
          preco: 9.2,
          quantidade: 3,
        },
        {
          id: "19",
          nome: "Água Mineral 1,5L",
          categoria: "Bebidas",
          preco: 2.8,
          quantidade: 6,
        },
        {
          id: "27",
          nome: "Carne Bovina Alcatra 1kg",
          categoria: "Carnes",
          preco: 52.9,
          quantidade: 1,
        },
        {
          id: "35",
          nome: "Sabonete Líquido 250ml",
          categoria: "Higiene",
          preco: 9.8,
          quantidade: 2,
        },
      ],
      total: 151.4,
    },
    {
      id: "lista_dezembro_2",
      data: "18/12/2024",
      supermercado: "Barbosão",
      itens: [
        {
          id: "3",
          nome: "Açúcar Cristal 1kg",
          categoria: "Alimentos Básicos",
          preco: 5.1,
          quantidade: 2,
        },
        {
          id: "11",
          nome: "Biscoito Cream Cracker",
          categoria: "Biscoito e Salgadinhos",
          preco: 4.2,
          quantidade: 4,
        },
        {
          id: "20",
          nome: "Refrigerante Cola 2L",
          categoria: "Bebidas",
          preco: 10.5,
          quantidade: 2,
        },
        {
          id: "28",
          nome: "Frango Inteiro 1kg",
          categoria: "Carnes",
          preco: 14.9,
          quantidade: 2,
        },
        {
          id: "43",
          nome: "Banana Prata 1kg",
          categoria: "Frutas",
          preco: 7.8,
          quantidade: 3,
        },
      ],
      total: 91.5,
    },
    {
      id: "lista_dezembro_3",
      data: "22/12/2024",
      supermercado: "Bernadão",
      itens: [
        {
          id: "4",
          nome: "Óleo de Soja 900ml",
          categoria: "Alimentos Básicos",
          preco: 7.2,
          quantidade: 3,
        },
        {
          id: "12",
          nome: "Biscoito Recheado Chocolate",
          categoria: "Biscoito e Salgadinhos",
          preco: 5.8,
          quantidade: 5,
        },
        {
          id: "21",
          nome: "Suco de Laranja 1L",
          categoria: "Bebidas",
          preco: 7.9,
          quantidade: 3,
        },
        {
          id: "36",
          nome: "Shampoo Anticaspa 400ml",
          categoria: "Higiene",
          preco: 18.5,
          quantidade: 1,
        },
        {
          id: "44",
          nome: "Maçã Vermelha 1kg",
          categoria: "Frutas",
          preco: 10.2,
          quantidade: 2,
        },
      ],
      total: 93.3,
    },
    {
      id: "lista_dezembro_4",
      data: "25/12/2024",
      supermercado: "BH",
      itens: [
        {
          id: "5",
          nome: "Farinha de Trigo 1kg",
          categoria: "Alimentos Básicos",
          preco: 4.5,
          quantidade: 2,
        },
        {
          id: "13",
          nome: "Salgadinho Batata Frita",
          categoria: "Biscoito e Salgadinhos",
          preco: 8.2,
          quantidade: 3,
        },
        {
          id: "22",
          nome: "Cerveja Lata 350ml",
          categoria: "Bebidas",
          preco: 3.8,
          quantidade: 12,
        },
        {
          id: "29",
          nome: "Linguiça Calabresa 500g",
          categoria: "Carnes",
          preco: 21.5,
          quantidade: 2,
        },
        {
          id: "37",
          nome: "Pasta de Dente 90g",
          categoria: "Higiene",
          preco: 4.9,
          quantidade: 3,
        },
      ],
      total: 125.3,
    },
    {
      id: "lista_dezembro_5",
      data: "28/12/2024",
      supermercado: "KamelMegaMix",
      itens: [
        {
          id: "8",
          nome: "Leite Integral 1L",
          categoria: "Alimentos Básicos",
          preco: 5.5,
          quantidade: 4,
        },
        {
          id: "14",
          nome: "Biscoito Wafer Morango",
          categoria: "Biscoito e Salgadinhos",
          preco: 3.9,
          quantidade: 6,
        },
        {
          id: "23",
          nome: "Energético 250ml",
          categoria: "Bebidas",
          preco: 8.9,
          quantidade: 4,
        },
        {
          id: "32",
          nome: "Presunto Fatiado 200g",
          categoria: "Carnes",
          preco: 10.5,
          quantidade: 3,
        },
        {
          id: "45",
          nome: "Laranja Pêra 1kg",
          categoria: "Frutas",
          preco: 4.8,
          quantidade: 5,
        },
      ],
      total: 125.9,
    },
  ],
}

export const TelaGraficoDeInflacao = () => {
  const navigation = useNavigation()
  const [produtoSelecionado, setProdutoSelecionado] = useState("todos")
  const [dadosInflacao, setDadosInflacao] = useState([])
  const [produtos, setProdutos] = useState([])
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    calcularInflacao()
  }, [produtoSelecionado])

  const calcularInflacao = () => {
    // Extrair todos os produtos únicos
    const produtosUnicos = new Map()

    // Processar listas de junho
    listasJunho.listas.forEach((lista) => {
      lista.itens.forEach((item) => {
        if (!produtosUnicos.has(item.id)) {
          produtosUnicos.set(item.id, {
            id: item.id,
            nome: item.nome,
            categoria: item.categoria,
            precoJunho: item.preco,
            precoDezembo: null,
          })
        }
      })
    })

    // Processar listas de dezembro
    listasDezembo.listas.forEach((lista) => {
      lista.itens.forEach((item) => {
        if (produtosUnicos.has(item.id)) {
          const produto = produtosUnicos.get(item.id)
          produto.precoDezembo = item.preco
        }
      })
    })

    // Calcular inflação apenas para produtos que existem em ambos os períodos
    const dadosComInflacao = Array.from(produtosUnicos.values())
      .filter((produto) => produto.precoJunho && produto.precoDezembo)
      .map((produto) => {
        const variacao = ((produto.precoDezembo - produto.precoJunho) / produto.precoJunho) * 100
        return {
          ...produto,
          variacao: variacao,
          variacaoFormatada: variacao.toFixed(2),
        }
      })
      .sort((a, b) => b.variacao - a.variacao) // Ordenar por maior variação

    // Filtrar por produto se selecionado
    let dadosFiltrados = dadosComInflacao
    if (produtoSelecionado !== "todos") {
      dadosFiltrados = dadosComInflacao.filter((produto) => produto.id === produtoSelecionado)
    }

    setDadosInflacao(dadosFiltrados)
    setProdutos(dadosComInflacao)
  }

  const renderBarraInflacao = (produto, index) => {
    const maxVariacao = Math.max(...dadosInflacao.map((p) => Math.abs(p.variacao)))
    const larguraBarra = Math.abs(produto.variacao / maxVariacao) * (width * 0.3)
    const corBarra = produto.variacao >= 0 ? "#ff4444" : "#44ff44"

    return (
      <View key={produto.id} style={styles.itemGrafico}>
        <View style={styles.infoContainer}>
          <Text style={styles.nomeProduto}>{produto.nome}</Text>
          <View style={styles.precoContainer}>
            <Text style={styles.precoTexto}>Jun: R$ {produto.precoJunho.toFixed(2).replace(".", ",")}</Text>
            <Text style={styles.precoTexto}>Dez: R$ {produto.precoDezembo.toFixed(2).replace(".", ",")}</Text>
          </View>
        </View>
        <View style={styles.barraContainer}>
          <View
            style={[
              styles.barra,
              {
                width: Math.max(larguraBarra, 20), // Largura mínima
                backgroundColor: corBarra,
              },
            ]}
          />
          <Text style={[styles.variacaoTexto, { color: corBarra }]}>
            {produto.variacao >= 0 ? "+" : ""}
            {produto.variacaoFormatada}%
          </Text>
        </View>
      </View>
    )
  }

  const calcularInflacaoMedia = () => {
    if (dadosInflacao.length === 0) return 0
    const soma = dadosInflacao.reduce((acc, produto) => acc + produto.variacao, 0)
    return (soma / dadosInflacao.length).toFixed(2)
  }

  const contarProdutosAumento = () => {
    return dadosInflacao.filter((produto) => produto.variacao > 0).length
  }

  const contarProdutosDiminuicao = () => {
    return dadosInflacao.filter((produto) => produto.variacao < 0).length
  }

  const getProdutoSelecionadoNome = () => {
    if (produtoSelecionado === "todos") return "Todos os produtos"
    const produto = produtos.find((p) => p.id === produtoSelecionado)
    return produto ? produto.nome : "Produto não encontrado"
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Text style={styles.textoBotaoVoltar}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.titulo}>Gráfico de Inflação</Text>
      </View>

      <View style={styles.resumoContainer}>
        <Text style={styles.resumoTitulo}>Comparação Jun/2024 vs Dez/2024</Text>
        <View style={styles.estatisticas}>
          <View style={styles.estatisticaItem}>
            <Text style={styles.estatisticaNumero}>{calcularInflacaoMedia()}%</Text>
            <Text style={styles.estatisticaLabel}>Inflação Média</Text>
          </View>
          <View style={styles.estatisticaItem}>
            <Text style={[styles.estatisticaNumero, { color: "#ff4444" }]}>{contarProdutosAumento()}</Text>
            <Text style={styles.estatisticaLabel}>Produtos em Alta</Text>
          </View>
          <View style={styles.estatisticaItem}>
            <Text style={[styles.estatisticaNumero, { color: "#44ff44" }]}>{contarProdutosDiminuicao()}</Text>
            <Text style={styles.estatisticaLabel}>Produtos em Baixa</Text>
          </View>
        </View>
      </View>

      <View style={styles.filtroContainer}>
        <Text style={styles.filtroLabel}>Filtrar por produto:</Text>
        <TouchableOpacity style={styles.seletorContainer} onPress={() => setModalVisible(true)}>
          <Text style={styles.seletorTexto}>{getProdutoSelecionadoNome()}</Text>
          <Text style={styles.seletorSeta}>▼</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.graficoContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.legenda}>
          <View style={styles.legendaItem}>
            <View style={[styles.legendaCor, { backgroundColor: "#ff4444" }]} />
            <Text style={styles.legendaTexto}>Aumento de preço</Text>
          </View>
          <View style={styles.legendaItem}>
            <View style={[styles.legendaCor, { backgroundColor: "#44ff44" }]} />
            <Text style={styles.legendaTexto}>Diminuição de preço</Text>
          </View>
        </View>

        {dadosInflacao.length > 0 ? (
          dadosInflacao.map((produto, index) => renderBarraInflacao(produto, index))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum dado de inflação disponível</Text>
          </View>
        )}
      </ScrollView>

      {/* Modal de seleção de produto */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Selecionar Produto</Text>
            <ScrollView style={styles.modalLista}>
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setProdutoSelecionado("todos")
                  setModalVisible(false)
                }}
              >
                <Text style={styles.modalItemTexto}>Todos os produtos</Text>
              </TouchableOpacity>
              {produtos.map((produto) => (
                <TouchableOpacity
                  key={produto.id}
                  style={styles.modalItem}
                  onPress={() => {
                    setProdutoSelecionado(produto.id)
                    setModalVisible(false)
                  }}
                >
                  <Text style={styles.modalItemTexto}>{produto.nome}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.modalBotaoFechar} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalBotaoTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  resumoContainer: {
    backgroundColor: "#333",
    margin: 15,
    padding: 15,
    borderRadius: 10,
  },
  resumoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
  estatisticas: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  estatisticaItem: {
    alignItems: "center",
  },
  estatisticaNumero: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  estatisticaLabel: {
    fontSize: 12,
    color: "#ccc",
    textAlign: "center",
    marginTop: 5,
  },
  filtroContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  filtroLabel: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  seletorContainer: {
    backgroundColor: "#333",
    borderRadius: 5,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seletorTexto: {
    color: "#fff",
    fontSize: 16,
  },
  seletorSeta: {
    color: "#fff",
    fontSize: 16,
  },
  graficoContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  legenda: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  legendaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  legendaCor: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  legendaTexto: {
    color: "#fff",
    fontSize: 12,
  },
  itemGrafico: {
    backgroundColor: "#333",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  infoContainer: {
    marginBottom: 10,
  },
  nomeProduto: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  precoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  precoTexto: {
    fontSize: 12,
    color: "#ccc",
  },
  barraContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  barra: {
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  variacaoTexto: {
    fontSize: 14,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
  },
  // Estilos do Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxHeight: "70%",
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
  },
  modalLista: {
    maxHeight: 300,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  modalItemTexto: {
    color: "#fff",
    fontSize: 16,
  },
  modalBotaoFechar: {
    backgroundColor: "#ff4444",
    padding: 15,
    borderRadius: 5,
    marginTop: 15,
    alignItems: "center",
  },
  modalBotaoTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
})
