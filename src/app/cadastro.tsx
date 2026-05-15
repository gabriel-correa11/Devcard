import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

type Erros = {
  nome: string;
  cargo: string;
  anos: string;
  tecnologia: string;
}

export default function Cadastro() {
  const router = useRouter()
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [anos, setAnos] = useState('');
  const [tecnologia, setTecnologia] = useState('');
  const [cor, setCor] = useState('azul');

  const [erros, setErros] = useState<Erros>({
    nome: '',
    cargo: '',
    anos: '',
    tecnologia: '',
  });

  // nao mexer aqui
  function validar() {
    let valido = true;
    const novosErros = { nome: '', cargo: '', anos: '', tecnologia: '' };

    if (nome.trim() === '' || nome.trim().length < 3) {
      novosErros.nome = 'Nome obrigatório (mínimo 3 caracteres)';
      valido = false;
    }

    if (cargo.trim() === '') {
      novosErros.cargo = 'Cargo é obrigatório';
      valido = false;
    }

    // TODO: aceitar so inteiro aqui (parseInt quebra com '1.5')
    if (anos.trim() === '' || isNaN(parseInt(anos)) || parseInt(anos) <= 0) {
      novosErros.anos = 'Informe um número válido maior que 0';
      valido = false;
    }

    if (tecnologia.trim() === '') {
      novosErros.tecnologia = 'Tecnologia favorita é obrigatória';
      valido = false;
    }

    setErros(novosErros);
    return valido;
  }

  function gerarCartao() {
    if (!validar()) return;

    console.log('params:', { nome, cargo, empresa, anos, tecnologia, cor });
    router.push({
      pathname: '/preview',
      params: { nome, cargo, empresa, anos, tecnologia, cor },
    });
  }

  // tentei fazer com Switch mas ficou feio, ficou no map mesmo
  const opcoesCor = [
    { label: 'Azul', value: 'azul', hex: '#4A90D9' },
    { label: 'Verde', value: 'verde', hex: '#27AE60' },
    { label: 'Roxo', value: 'roxo', hex: '#6C63FF' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F7' }}>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding" // sem isso o teclado cobre os campos
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>Cadastro</Text>
        <Text style={styles.subtitulo}>Preencha seus dados de dev</Text>

        <View style={styles.campoContainer}>
          <Text style={styles.label}>Nome completo</Text>
          <TextInput
            style={[styles.input, erros.nome ? styles.inputErro : null]}
            placeholder="João Silva"
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
            autoCapitalize="words"
          />
          {erros.nome ? <Text style={styles.textoErro}>{erros.nome}</Text> : null}
        </View>

        <View style={styles.campoContainer}>
          <Text style={styles.label}>Cargo</Text>
          <TextInput
            style={[styles.input, erros.cargo ? styles.inputErro : null]}
            placeholder="Desenvolvedor Mobile"
            placeholderTextColor="#999"
            value={cargo}
            onChangeText={setCargo}
            autoCapitalize="words"
          />
          {erros.cargo ? <Text style={styles.textoErro}>{erros.cargo}</Text> : null}
        </View>

        <View style={styles.campoContainer}>
          <Text style={styles.label}>Empresa (opcional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Tech Solutions"
            placeholderTextColor="#aaa"
            value={empresa}
            onChangeText={setEmpresa}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.campoContainer}>
          <Text style={styles.label}>Anos de experiência</Text>
          <TextInput
            style={[styles.input, erros.anos ? styles.inputErro : null]}
            placeholder="4"
            placeholderTextColor="#999"
            value={anos}
            onChangeText={setAnos}
            keyboardType="numeric"
          />
          {erros.anos ? <Text style={styles.textoErro}>{erros.anos}</Text> : null}
        </View>

        <View style={styles.campoContainer}>
          <Text style={styles.label}>Tecnologia favorita</Text>
          <TextInput
            style={[styles.input, erros.tecnologia ? styles.inputErro : null]}
            placeholder="React Native"
            placeholderTextColor="#999"
            value={tecnologia}
            onChangeText={setTecnologia}
          />
          {erros.tecnologia ? (
            <Text style={styles.textoErro}>{erros.tecnologia}</Text>
          ) : null}
        </View>

        <View style={[styles.campoContainer, { marginBottom: 24 }]}>
          <Text style={styles.label}>Cor do cartão</Text>
          <View style={styles.coresContainer}>
            {opcoesCor.map((opcao) => (
              <TouchableOpacity
                key={opcao.value}
                style={
                  cor === opcao.value
                    ? [styles.botaoCor, styles.botaoCorSelecionado, { borderColor: opcao.hex }]
                    : styles.botaoCor
                }
                onPress={() => setCor(opcao.value)}
                activeOpacity={0.8}
              >
                <View
                  style={[styles.bolinhaCor, { backgroundColor: opcao.hex }]}
                />
                <Text
                  style={[
                    styles.textoCor,
                    cor === opcao.value && { color: opcao.hex, fontWeight: 'bold' },
                  ]}
                >
                  {opcao.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.botaoGerar}
          onPress={gerarCartao}
          activeOpacity={0.8}
        >
          <Text style={styles.botaoGerarTexto}>Gerar Cartão</Text>
        </TouchableOpacity>

        <View style={{ height: 32 }} />
      </ScrollView>
    </KeyboardAvoidingView>
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
    paddingTop: 56,
    paddingBottom: 24,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#888',
    marginBottom: 32,
  },
  campoContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  inputErro: {
    borderColor: 'red',
  },
  textoErro: {
    fontSize: 12,
    color: 'red',
    marginTop: 4,
    marginLeft: 4,
  },
  coresContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  botaoCor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#DDD',
    backgroundColor: '#fff',
  },
  botaoCorSelecionado: {
    backgroundColor: '#F0EEFF',
  },
  bolinhaCor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  textoCor: {
    fontSize: 14,
    color: '#666',
  },
  botaoGerar: {
    backgroundColor: '#6C63FF',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
    elevation: 4,
  },
  botaoGerarTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
