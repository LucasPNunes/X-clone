"use client";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import React, {
  createContext,
  FormEvent,
  ReactNode,
  useEffect,
  useState,
} from "react";

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: userData | null;
  signIn: (data: signInData, event: FormEvent) => Promise<void>;
  register: (data: registerData, event: FormEvent) => Promise<void>;
};

type signInData = {
  email: string;
  password: string;
};

type registerData = {
  name: string;
  email: string;
  password: string;
};

type userData = {
  id: number;
  name: string;
  email: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<userData | null>(null);
  const router = useRouter();
  const isAuthenticated = !!user;

  const signIn = async ({ email, password }: signInData, event?: FormEvent) => {
    event?.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/signin",
        {
          email,
          password
        }
      );

      const responseData = response.data;
      await AsyncStorage.setItem('myToken', responseData.token);
      setUser({
        id: responseData.usuario.id,
        name: responseData.usuario.name,
        email: responseData.usuario.email
      });

      console.log("Login realizado com sucesso");
      console.log(responseData.usuario);
      router.replace("/home");
    } catch (error) {
      alert("Usuario ou senha incorretos");
      console.error("Erro no login:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
      } else {
        console.error("Erro desconhecido.");
      }
    }
  };

  const register = async (
    { name, email, password }: registerData,
    event: FormEvent
  ) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/signup",
        {
          name,
          email,
          password
        }
      );
      await signIn({ email, password });
    } catch (error) {
      console.error("Erro no registro: ", error);
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data.message);
      } else {
        console.error("Erro desconhecido.");
      }
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
       const token = await AsyncStorage.getItem('myToken');
        if (token) {
          const response = await axios.post(
            "http://localhost:3000/auth/me",
            { token }
          );
          const responseData = response.data;
          setUser(responseData.user);
        }
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
        if (axios.isAxiosError(err) && err.response) {
          console.error(err.response.data.message);
        } else {
          console.error("Erro desconhecido.");
        }
      }
    };
    getUser();
    console.log(user)
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, register }}>
      {children}
    </AuthContext.Provider>
  );
}
