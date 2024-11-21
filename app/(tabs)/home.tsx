import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

type Post = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  isOfensive: boolean;
  author: { id: number; name: string };
  comments: Array<{ id: number; content: string; author: { id: number; name: string } }>;
}

const App = () => {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    const fetchPosts = async () => {
      const BASE_URL = process.env.API_URL || 'http://localhost:3000';
      try{
        const response = await axios.get(`${BASE_URL}/posts`)
        setPosts(response.data);
      }catch(err){
        console.error(err);
      }
      
    }
    fetchPosts();
  }, [])
  
  const renderPost = ({ item }) => (
    <View style={[styles.postContainer, item.isOfensive ? styles.offensivePost : null]}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <Text style={styles.postAuthor}>Autor: {item.author.name}</Text>
      {!item.published && <Text style={styles.unpublishedLabel}>Não Publicado</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Feed</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
        contentContainerStyle={styles.feedContainer}
      />
      <TouchableOpacity style={styles.button}>
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
    color: 'white',
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'center',
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

export default App;
