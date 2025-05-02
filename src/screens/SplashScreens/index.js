import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { TextoPadrao, LogoPadrao } from '../../components';

export const SplashScreens = () => {
  return (
    <View style={styles.container}>
      <LogoPadrao />
      <TextoPadrao color ="blue">Inflassômetro</TextoPadrao>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
