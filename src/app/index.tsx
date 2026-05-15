import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#eee' }}>
    <View style={styles.container}>
      {/* TODO: trocar por uma logo real */}
      <Text style={{ fontSize: 60, marginBottom: 20 }}>💻</Text>

      <Text style={styles.titulo}>DevCard</Text>
      <Text style={styles.subtitulo}>
        Seu cartão de visita digital{'\n'}de dev mobile
      </Text>

      {/* activeOpacity deixa o botao mais bonito quando clica */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push('/cadastro')}
        activeOpacity={0.85}
      >
        <Text style={styles.botaoTexto}>Criar meu cartão</Text>
      </TouchableOpacity>

      {/* coloquei o nome da materia aqui so pra nao ficar vazio embaixo */}
      <Text style={styles.rodape}>Aplicações Móveis</Text>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  titulo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 12,
  },
  subtitulo: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 48,
  },
  botao: {
    backgroundColor: '#6C63FF',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
    elevation: 4,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rodape: {
    fontSize: 13,
    color: '#aaa',
    position: 'absolute',
    bottom: 40,
  },
});
