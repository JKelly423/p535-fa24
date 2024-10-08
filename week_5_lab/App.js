import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, Text } from 'react-native';
import LandingPage from './screens/LandingPage';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import ImagePickerScreen from './screens/ImagePickerScreen';
import LocationScreen from './screens/LocationScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
      icon: {
          marginLeft: 10,
      },
      box: {
          height: 150,
          width: 150,
          backgroundColor: 'blue',
          borderRadius: 5,
      },
    });

function HomeDrawer() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home">
            {(props) => <LandingPage {...props} styles={styles}/>}
            </Drawer.Screen>
            <Drawer.Screen name="Location Page" component={LocationScreen}/>
            <Drawer.Screen name="Image Picker" component={ImagePickerScreen}/>
        </Drawer.Navigator>
    );
};

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



  return (
    <NavigationContainer>
      <Stack.Navigator>

            <Stack.Screen name="SignIn">
              {(props) => (
                <SignInScreen
                  {...props}
                  styles={styles}
                />
              )}
            </Stack.Screen>

            <Stack.Screen name="SignUp">
              {(props) => <SignUpScreen {...props} formData={formData} setFormData={setFormData}
              />}
            </Stack.Screen>


            <Stack.Screen name="LandingPage" component={HomeDrawer} options={{headerShown: false}}>
            </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
