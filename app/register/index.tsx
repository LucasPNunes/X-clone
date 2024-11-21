import { Image, StyleSheet, Platform, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../authContext';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const { register } = useContext(AuthContext);
  const router = useRouter();
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (name: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (data.password !== data.confirmPassword) {
      alert('As senhas devem ser iguais!');
      return;
    }
    try{
        await register(data, event);
        router.push('/login');
    } catch (error) {
    alert('Falha ao registrar. Tente novamente!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>X</Text>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Crie sua conta</Text>
        <TextInput
          placeholder="Digite seu nome"
          value={data.name}
          onChangeText={(value) => handleChange('name', value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Digite seu email"
          value={data.email}
          onChangeText={(value) => handleChange('email', value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Digite sua senha"
          value={data.password}
          onChangeText={(value) => handleChange('password', value)}
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Confirme sua senha"
          value={data.confirmPassword}
          onChangeText={(value) => handleChange('confirmPassword', value)}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footerText}>Já possui conta?</Text>
      <TouchableOpacity onPress={() => router.replace('/')} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 50,
    color: 'white',
    marginBottom: 20,
  },
  formContainer: {
    height: 350,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 30,
    marginBottom: 10,
  },
  input: {
    height: 45,
    width: 250,
    borderRadius: 24,
    backgroundColor: 'white',
    marginVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 0,
  },
  button: {
    height: 45,
    width: 250,
    borderRadius: 24,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 0,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  footerText: {
    color: 'white',
    marginTop: 10,
  },
});
