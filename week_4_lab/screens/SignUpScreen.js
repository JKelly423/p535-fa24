import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {createUserWithEmailAndPassword, auth } from '../firebase'

export default function SignUpScreen({navigation, formData, setFormData, setIsSignedUp}) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSignUp = () => {
    // would validate here in prod app
    setIsSignedUp(true);
    console.log('User Data:', formData);
    navigation.navigate('SignIn')
  };

const handleRegister = () => {
createUserWithEmailAndPassword(auth, formData.email, formData.password)
    .then((userCredientials) => {
        //signed in
        const user = userCredientials.user;
        console.log('User Registered Successfully: ', user);
        navigation.navigate('SignIn')
    })
    .catch((err) => {
            alert(err.message)
    });
};

useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user){
            navigation.replace("LandingPage")
        }
    })
    return unsubscribe;
}, [])

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || formData.birthdate;
    setShowDatePicker(false);
    setFormData({ ...formData, birthdate: currentDate });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.appTitle}>Jack's Awesome App</Text>

      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />

      <Button title="Select Birthdate" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={formData.birthdate}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <Picker
        selectedValue={formData.country}
        onValueChange={(itemValue) => setFormData({ ...formData, country: itemValue })}
      >
        <Picker.Item label="Select Country" value="" />
        <Picker.Item label="USA" value="USA" />
        <Picker.Item label="Canada" value="Canada" />
        <Picker.Item label="UK" value="UK" />
      </Picker>

      <Picker
        selectedValue={formData.gender}
        onValueChange={(itemValue) => setFormData({ ...formData, gender: itemValue })}
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Biography"
        value={formData.biography}
        onChangeText={(text) => setFormData({ ...formData, biography: text })}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="University"
        value={formData.university}
        onChangeText={(text) => setFormData({ ...formData, university: text })}
        multiline
      />

      <Button title="Sign Up" onPress={handleRegister} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',

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
        width: 400
    },
  });