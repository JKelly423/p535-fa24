import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function SignInScreen({ navigation, setIsLoggedIn, isSignedUp, styles }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // probably would validate user input here in real prod. app
    console.log('Username:', username);
    console.log('Password:', password);

    // simulate login
    setIsLoggedIn(true);
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

      <Button title="Sign In" onPress={handleSignIn} />
      {!isSignedUp &&
      (<>
        <Text style={styles.title}>Or</Text>
        <Button title="Take Me to Sign Up Page" onPress={() => navigation.navigate('SignUp')} />
      </>
      )}
    </View>
  );
}
