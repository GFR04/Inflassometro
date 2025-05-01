import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native'; // Adicionei 'Image' na importação
import LogoImagem from './assets/icon1.png'; // Importando corretamente a imagem
import { useFonts } from '@expo-google-fonts/montserrat/useFonts';
import { Montserrat_100Thin } from '@expo-google-fonts/montserrat/100Thin';

export default function App() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={LogoImagem} /> 
      <Text style={styles.text}>Inflassometro</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    alignItems: 'center',
    fontFamily: "Montserrat_100Thin",
  },
  logo: {
    height: 64, // Ajustei as dimensões para algo mais visível
    width: 64,  // Ajustei as dimensões para algo mais visível
  },
});
