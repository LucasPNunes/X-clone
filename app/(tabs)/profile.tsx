import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../authContext';
import { useRouter } from 'expo-router';

type Post = {
  id: number;
  title: string;
  content: string;
  isOfensive: boolean;
  published: boolean;
  author: { name: string };
};

const Profile = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const checkToken = async () => {
      const token = await AsyncStorage.getItem('myToken');
      if (!token) {
        router.replace("/login");
        return;
      }
    };

    checkToken();

    const fetchPosts = async () => {
      if (!user) {
        router.replace("/login");
        return;
      }

      try {
        const token = await AsyncStorage.getItem('myToken');
        const BASE_URL = process.env.API_URL || 'http://localhost:3000';

        const response = await axios.get(`${BASE_URL}/users/${user.id}`, {
          headers: { authorization: `Bearer ${token}` },
        });

        setPosts(response.data.posts);
      } catch (err) {
        console.error("Erro ao buscar posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user, isMounted, router]);

  const renderPost = ({ item }: { item: Post }) => (
    <View style={[styles.postContainer, item.isOfensive ? styles.offensivePost : null]}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <Text style={styles.postAuthor}>Autor: {item.author.name}</Text>
      {!item.published && <Text style={styles.unpublishedLabel}>Não Publicado</Text>}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{user?.name}</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
        contentContainerStyle={styles.feedContainer}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log("Novo Post funcionalidade pendente!")}
      >
        <Text style={styles.buttonText}>Novo Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  heading: {
    height: 50,
    color: 'white',
    fontSize: 40,
    marginBottom: 10,
    textAlign: 'left',
  },
  feedContainer: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  offensivePost: {
    backgroundColor: '#550000',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'lightblue',
  },
  postContent: {
    fontSize: 16,
    color: 'white',
    marginVertical: 5,
  },
  postAuthor: {
    fontSize: 14,
    color: 'grey',
  },
  unpublishedLabel: {
    marginTop: 5,
    color: 'orange',
    fontSize: 12,
    fontStyle: 'italic',
  },
  button: {
    height: 45,
    width: '100%',
    borderRadius: 24,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Profile;
