import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter, useFocusEffect } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  return (
   <div style={{backgroundColor:"black", height:"100%", width:"100%"}}>
        <button onClick={() => {router.replace('/login');}} style={{display: "flex", justifyContent:"center", alignItems:"center", height:"45px", width:"150px", borderRadius:"24px", backgroundColor:"white"}}> 
            Login
        </button>
        <button onClick={() => {router.replace('/login');}} style={{display: "flex", justifyContent:"center", alignItems:"center", height:"45px", width:"150px", borderRadius:"24px", backgroundColor:"white"}}> 
            Criar conta
        </button>
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
