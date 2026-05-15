import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function Sucesso() {
  const router = useRouter()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
    <View style={styles.container}>
      <View style={styles.conteudo}>
        <View style={styles.iconeFundo}>
          <Text style={styles.iconeCheck}>✓</Text>
        </View>

        <Text style={styles.titulo}>Cartão criado{'\n'}com sucesso!</Text>
        <Text style={styles.subtitulo}>
          Seu cartão de visita digital está pronto.{'\n'}Compartilhe com a galera!
        </Text>
      </View>

      <View style={styles.rodape}>
        {/* TODO: colocar opcao de salvar ou compartilhar aqui */}
        <TouchableOpacity
          style={styles.botao}
          onPress={() => router.replace('/')}
          activeOpacity={0.85}
        >
          <Text style={styles.botaoTexto}>Criar outro cartão</Text>
        </TouchableOpacity>

        {/* esse link faz a mesma coisa que o botao de cima, deixei por garantia */}
        <TouchableOpacity onPress={() => router.replace('/')} activeOpacity={0.7}>
          <Text style={styles.linkVoltar}>Voltar ao início</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  conteudo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rodape: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 40,
  },
  iconeFundo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#27AE60',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  iconeCheck: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitulo: {
    fontSize: 15,
    color: '#888',
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
    marginBottom: 20,
    elevation: 4,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkVoltar: {
    fontSize: 15,
    color: '#6C63FF',
    textDecorationLine: 'underline',
  },
});
