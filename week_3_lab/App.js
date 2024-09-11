import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text } from 'react-native';
import LandingPage from './screens/LandingPage';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    birthdate: new Date(),
    country: '',
    gender: '',
    biography: '',
    university: '',
  });
  const styles = StyleSheet.create({
      container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },
      appTitle: {
        fontSize: 36,
        marginBottom: 20,
        textAlign: 'center',
        color: '#8833ff'
      },
      title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
      },
      header: {
        fontSize: 18,
        marginBottom: 12,
        textAlign: 'center',
      },
      input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        width: '100%',
      },
      image: {
          height: 400,
          width: 400,
          margin: 4
      },
      infoItemContainer: {
        marginBottom: 12,
        paddingHorizontal: 16,
        width: '100%',
      },
    });
  return (
    <NavigationContainer>
      <Stack.Navigator>

        {!isLoggedIn ? (
          <>

            <Stack.Screen name="SignIn">
              {(props) => (
                <SignInScreen
                  {...props}
                  setIsLoggedIn={setIsLoggedIn}
                  isSignedUp={isSignedUp}
                  styles={styles}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="SignUp">
              {(props) => <SignUpScreen {...props} formData={formData} setFormData={setFormData}
              setIsSignedUp={setIsSignedUp}/>}
            </Stack.Screen>

          </>
        ) : (
          <Stack.Screen name="LandingPage">
            {(props) => <LandingPage {...props} styles={styles} formData={formData} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
