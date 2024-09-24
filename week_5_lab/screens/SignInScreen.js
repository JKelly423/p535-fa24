import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, useNavigation, ActivityIndicator } from 'react-native';
import {auth, signInWithEmailAndPassword} from '../firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreen({ navigation, setIsLoggedIn, isSignedUp, styles }) {
  const [email, setEmail] = useState('Email');
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("Name");
  const [loading, setLoading] = useState(true);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user){
            navigation.replace("LandingPage")
        }
    })

    const loadUserData = async () => {
        try{
            const savedName = await AsyncStorage.getItem('userName');
            const savedEmail = await AsyncStorage.getItem('userEmail');

            if (savedName){
                setName(savedName);
            }

            if (savedEmail){
                setEmail(savedEmail);
            console.log('User has email saved: ', savedEmail)
            }

        } catch (error){
            console.error('Failed to load user data from AsyncStorage: ', error);
        }
    };

    loadUserData();

    return unsubscribe;
}, [])

const handleLogin = async () => {
    if (email != '' && email != 'Email' && password != ''){
        try {
              //console.log(auth)
              console.log('email: ',email)
              console.log('password: ', password)

            const userCrediential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCrediential.user;
            console.log('User Signed in: ', user);
            return user;
        } catch (err) {
            console.log('err handling login\n',err);
            alert(err.message)
        }
    }
};

  return (
    <View style={styles.container}>
    <Text style={styles.appTitle}>Jack's Awesome App</Text>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder={email}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <MaterialCommunityIcons
          name={showPassword ? 'eye-off' : 'eye'}
          size={24}
          color="#aaa"
          style={styles.icon}
          onPress={toggleShowPassword}
      />

      <Button title="Sign In" onPress={handleLogin} />
        <Text style={styles.title}>Or</Text>
        <Button title="Take Me to Sign Up Page" onPress={() => navigation.navigate('SignUp')} />

    </View>
  );
 }
