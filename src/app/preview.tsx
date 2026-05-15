import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';

type PreviewParams = {
  nome?: string;
  cargo?: string;
  empresa?: string;
  anos?: string;
  tecnologia?: string;
  cor?: string;
};

export default function Preview() {
  const router = useRouter()
  const params = useLocalSearchParams<PreviewParams>();

  // sem isso a tela quebra se acessar direto pela url
  if (!params.nome || !params.cargo || !params.anos || !params.tecnologia) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F7' }}>
      <View style={styles.semDados}>
        <Text style={styles.semDadosTitulo}>Nenhum cartão criado ainda</Text>
        <Text style={styles.semDadosTexto}>Preencha o cadastro primeiro.</Text>
        <TouchableOpacity
          style={styles.botaoFinalizar}
          onPress={() => router.replace('/')}
          activeOpacity={0.85}
        >
          <Text style={styles.botaoFinalizarTexto}>Começar agora</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
    );
  }

  const nome = params.nome as string;
  const cargo = params.cargo as string;
  const empresa = params.empresa || '';
  const anos = params.anos as string;
  const tecnologia = params.tecnologia as string;
  const cor = params.cor as string;

  const anosNumero = Number(anos) || 0; // se tirar o || 0 quebra

  let corFundo = '#4A90D9';
  if (cor === 'verde') corFundo = '#27AE60';
  if (cor === 'roxo') corFundo = '#6C63FF';

  let nivelLabel = 'Júnior';
  let nivelCor = '#B0B0B0';
  let nivelTextoCor = '#fff';

  if (anosNumero >= 6) {
    nivelLabel = 'Sênior';
    nivelCor = '#F5A623';
    nivelTextoCor = '#7A4F00';
  } else if (anosNumero >= 3) {
    nivelLabel = 'Pleno';
    nivelCor = '#4A90D9';
    nivelTextoCor = '#fff';
  }

  const inicialNome = nome.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F7' }}>
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <Text style={styles.tituloPagina}>Seu Cartão</Text>

      <View style={[styles.cartao, { backgroundColor: corFundo }]}>
        <View style={styles.brilhoMaior} />
        <View style={styles.brilhoMenor} />

        <View style={styles.avatarContainer}>
          <Text style={[styles.avatarTexto, { color: corFundo }]}>{inicialNome}</Text>
        </View>

        <Text style={styles.cartaoNome}>{nome}</Text>
        <Text style={styles.cartaoCargo}>{cargo}</Text>
        {empresa ? (
          <Text style={styles.cartaoEmpresa}>{empresa}</Text>
        ) : null}

        <View style={styles.divisor} />

        <Text style={styles.cartaoEspecialista}>Especialista em</Text>
        <Text style={styles.cartaoTecnologia}>{tecnologia}</Text>

        <View style={[styles.badge, { backgroundColor: nivelCor }]}>
          <Text style={[styles.badgeTexto, { color: nivelTextoCor }]}>
            {nivelLabel}
          </Text>
        </View>

        <Text style={styles.cartaoAnos}>{anosNumero} anos de experiência</Text>
      </View>

      {/* TODO: adicionar botao de compartilhar */}
      <TouchableOpacity
        style={[styles.botaoEditar, { borderColor: corFundo }]}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Text style={[styles.botaoEditarTexto, { color: corFundo }]}>
          Editar dados
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botaoFinalizar, { backgroundColor: corFundo }]}
        onPress={() => router.replace('/sucesso')}
        activeOpacity={0.85}
      >
        <Text style={styles.botaoFinalizarTexto}>Finalizar</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  conteudo: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  semDados: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 16,
    backgroundColor: '#F5F5F7',
  },
  semDadosTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  semDadosTexto: {
    color: '#888',
    textAlign: 'center',
  },
  tituloPagina: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  cartao: {
    width: '100%',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
  brilhoMaior: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.12)',
    right: -35,
    top: -18,
  },
  brilhoMenor: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.10)',
    right: 12,
    top: 16,
  },
  avatarContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarTexto: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  cartaoNome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  cartaoCargo: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 2,
  },
  cartaoEmpresa: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginBottom: 4,
  },
  divisor: {
    width: '70%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginVertical: 16,
  },
  cartaoEspecialista: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 2,
  },
  cartaoTecnologia: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  badge: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 10,
  },
  badgeTexto: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  cartaoAnos: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  botaoEditar: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  botaoEditarTexto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  botaoFinalizar: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 4,
  },
  botaoFinalizarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
