import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter, useFocusEffect } from 'expo-router';
import { useEffect } from 'react';
import axios from 'axios';

export default function HomeScreen() {
  const router = useRouter();

  return (
   <div style={{backgroundColor:"black", height:"100%", width:"100%"}}>
        <p style={{fontSize:"50px", color:"white", marginLeft:"30px"}}>X</p>
        <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", alignItems:"center", height:"100px"}}>
          <button onClick={() => {router.replace('/login');}} 
          style={{display: "flex", justifyContent:"center", alignItems:"center", height:"45px", width:"250px", borderRadius:"24px", border:"0px", backgroundColor:"white"}}> 
              Login
          </button>
          <button onClick={() => {router.replace('/register');}} 
          style={{display: "flex", justifyContent:"center", alignItems:"center", height:"45px", width:"250px", borderRadius:"24px", backgroundColor:"lightblue", border:"0px"}}> 
              Criar conta
          </button>
        </div>
   </div>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
