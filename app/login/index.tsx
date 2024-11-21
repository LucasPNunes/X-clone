import { Image, StyleSheet, Platform, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../authContext';

type FormData ={
  email: string;
  password: string;
}
export default function Login() {
  const { signIn } = useContext(AuthContext);
  const router = useRouter();
  const [data, setData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (
    name: string,
    value: string | { value: string; label: string } | null
  ) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    try{
      await signIn(data, event);
    }catch(error){
      alert(error);
      return;
    }
    console.log(data)
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>X</Text>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Acesse sua conta</Text>
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
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footerText}>Não possui conta?</Text>
      <TouchableOpacity onPress={() => router.replace('/')} style={styles.button}>
        <Text style={styles.buttonText}>Criar conta</Text>
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
    height: 250,
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