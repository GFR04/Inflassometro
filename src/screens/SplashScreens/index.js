import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Animated, Easing, TouchableOpacity } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextoPadrao, LogoPadrao } from '../../components';

export const SplashScreens = () => {
  const navigation = useNavigation();
  const progress = useRef(new Animated.Value(0)).current;
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
      }).start(() => {
      setShowButton(true);
    });
  }, []);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const handleAcessar = () => {
    navigation.navigate('TelaInicial');
  };

  return (
    <View style={styles.container}>
      <LogoPadrao />
      <TextoPadrao color="white">Inflassômetro</TextoPadrao>

      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBar, { width: widthInterpolated }]} />
      </View>

      {showButton && (
        <TouchableOpacity style={styles.button} onPress={handleAcessar}>
          <TextoPadrao color="#161616">Acessar</TextoPadrao>
        </TouchableOpacity>
      )}

      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  progressBarContainer: {
    width: '80%',
    height: 6,
    backgroundColor: '#333',
    borderRadius: 5,
    marginTop: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  button: {
    marginTop: 25,
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
});
