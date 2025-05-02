import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native'; // Adicionei 'Image' na importação
import LogoImagem from './assets/icon1.png'; // Importando corretamente a imagem
import { useFonts } from '@expo-google-fonts/montserrat/useFonts';
import { Montserrat_100Thin } from '@expo-google-fonts/montserrat/100Thin';
import { SplashScreens } from './src/screens/SplashScreens';

export default function App() {
  return (
      <SplashScreens />
  );
};