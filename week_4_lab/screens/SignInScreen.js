import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import {auth, signInWithEmailAndPassword} from '../firebase'

export default function SignInScreen({ navigation, setIsLoggedIn, isSignedUp, styles }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // probably would validate user input here in real prod. app
    console.log('Username:', username);
    console.log('Password:', password);

    console.log(auth)
    // simulate login
    setIsLoggedIn(true);
  };

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user){
            navigation.replace("LandingPage")
        }
    })
    return unsubscribe;
}, [])

const handleLogin = async (username, password) => {
        try{
              //console.log(auth)
              console.log('username: ',username)
              console.log('password: ', password)

            const userCrediential = await signInWithEmailAndPassword(auth, username, password);
            const user = userCrediential.user;
            console.log('User Signed in: ', user);
            setIsLoggedIn(true);
            return user;
        } catch (err){
            console.log(err);
            throw(err);
        }
    };

  return (
    <View style={styles.container}>
    <Text style={styles.appTitle}>Jack's Awesome App</Text>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Button title="Sign In" onPress={handleLogin(username, password)} />
      {!isSignedUp &&
      (<>
        <Text style={styles.title}>Or</Text>
        <Button title="Take Me to Sign Up Page" onPress={() => navigation.navigate('SignUp')} />
      </>
      )}
    </View>
  );
}
