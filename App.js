import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from '@expo-google-fonts/montserrat/useFonts';
import { Montserrat_100Thin } from '@expo-google-fonts/montserrat/100Thin';
import { SplashScreens } from './src/screens/SplashScreens';
import { TelaInicial } from './src/screens/TelaInicial';
import { TelaGraficoDeInflacao } from './src/screens/TelaGraficoDeInflacao';
import { TelaHistoricoDeCompras } from './src/screens/TelaHistoricoDeCompras';
import { TelaRealizarCompra } from './src/screens/TelaRealizarCompra';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_100Thin,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreens} />
        <Stack.Screen name="TelaInicial" component={TelaInicial} />
        <Stack.Screen name="TelaGraficoDeInflacao" component={TelaGraficoDeInflacao}/>
        <Stack.Screen name="TelaRealizarCompra" component={TelaRealizarCompra}/>
        <Stack.Screen name="TelaHistoricoDeCompras" component={TelaHistoricoDeCompras}/>
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}