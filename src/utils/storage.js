// Utilitário para armazenamento que funciona no React Native
const memoryStorage = {}

class StorageUtil {
  async getItem(key) {
    try {
      // Tentar usar AsyncStorage se disponível
      try {
        const AsyncStorage = require("@react-native-async-storage/async-storage").default
        return await AsyncStorage.getItem(key)
      } catch (asyncError) {
        // Se AsyncStorage não estiver disponível, usar memória
        console.log("AsyncStorage não disponível, usando memória")
        return memoryStorage[key] || null
      }
    } catch (error) {
      console.error("Erro ao buscar item:", error)
      return memoryStorage[key] || null
    }
  }

  async setItem(key, value) {
    try {
      // Tentar usar AsyncStorage se disponível
      try {
        const AsyncStorage = require("@react-native-async-storage/async-storage").default
        await AsyncStorage.setItem(key, value)
        return true
      } catch (asyncError) {
        // Se AsyncStorage não estiver disponível, usar memória
        console.log("AsyncStorage não disponível, salvando em memória")
        memoryStorage[key] = value
        return true
      }
    } catch (error) {
      console.error("Erro ao salvar item:", error)
      // Fallback para memória
      memoryStorage[key] = value
      return true
    }
  }

  async removeItem(key) {
    try {
      // Tentar usar AsyncStorage se disponível
      try {
        const AsyncStorage = require("@react-native-async-storage/async-storage").default
        await AsyncStorage.removeItem(key)
        return true
      } catch (asyncError) {
        // Se AsyncStorage não estiver disponível, usar memória
        console.log("AsyncStorage não disponível, removendo da memória")
        delete memoryStorage[key]
        return true
      }
    } catch (error) {
      console.error("Erro ao remover item:", error)
      // Fallback para memória
      delete memoryStorage[key]
      return true
    }
  }
}

export const storage = new StorageUtil()
