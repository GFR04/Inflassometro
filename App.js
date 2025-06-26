import { StatusBar } from "expo-status-bar"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useFonts } from "@expo-google-fonts/montserrat/useFonts"
import { Montserrat_100Thin } from "@expo-google-fonts/montserrat/100Thin"
import { SplashScreens } from "./src/screens/SplashScreens"
import { TelaInicial } from "./src/screens/TelaInicial"
import { TelaGraficoDeInflacao } from "./src/screens/TelaGraficoDeInflacao"
import { TelaHistoricoDeListas } from "./src/screens/TelaHistoricoDeListas"
import { TelaCriarLista } from "./src/screens/TelaCriarLista"
import { TelaProdutos } from "./src/screens/TelaProdutos" // Caminho corrigido
import { TelaTotal } from "./src/screens/TelaTotal"
import { TelaDetalhesCompra } from "./src/screens/TelaDetalhesCompra"

const Stack = createNativeStackNavigator()

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_100Thin,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreens} />
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="TelaGraficoDeInflacao" component={TelaGraficoDeInflacao} />
        <Stack.Screen name="TelaCriarLista" component={TelaCriarLista} />
        <Stack.Screen name="TelaHistoricoDeListas" component={TelaHistoricoDeListas} />
        <Stack.Screen name="TelaProdutos" component={TelaProdutos} />
        <Stack.Screen name="TelaTotal" component={TelaTotal} />
        <Stack.Screen name="TelaDetalhesCompra" component={TelaDetalhesCompra} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  )
}
