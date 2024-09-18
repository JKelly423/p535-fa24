import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, useNavigation } from 'react-native';
import {auth, signInWithEmailAndPassword} from '../firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SignInScreen({ navigation, setIsLoggedIn, isSignedUp, styles }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user){
        setIsLoggedIn(true);
            navigation.replace("LandingPage")
        } else{
        setIsLoggedIn(false);
        }
    })
    return unsubscribe;
}, [])

const handleLogin = async () => {
    if (email != '' && password != ''){
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
        placeholder="Email"
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
      {!isSignedUp &&
      (<>
        <Text style={styles.title}>Or</Text>
        <Button title="Take Me to Sign Up Page" onPress={() => navigation.navigate('SignUp')} />
      </>
      )}
    </View>
  );
}
