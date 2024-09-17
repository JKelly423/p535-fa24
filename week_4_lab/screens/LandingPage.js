import React, {useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Image, useNavigation } from 'react-native';
import InfoSection from '../components/InfoSection'
import {auth} from '../firebase'

export default function LandingPage({ navigation, styles, formData }) {

const handleLogOut = () => {
    auth
        .signOut()
        .then(()=> {
            navigation.replace("SignIn")
        })
        .catch(err => alert(err.message));
    }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.appTitle}>Jack's Awesome App</Text>
        <Button title="Log Out" onPress={handleLogOut} />
        <InfoSection formData={formData} styles={styles}/>

       <Text style={styles.title}>Scroll Down to View Cute Animals!</Text>

       <Image
        source={{uri: 'https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/15231691/453801468.0.0.1421786380.jpg'}}
        style={styles.image}
       />

       <Image
        source={{uri: 'https://t4.ftcdn.net/jpg/03/14/63/79/360_F_314637926_l9QOB96R8ND39INSwRQWQ2znKEm6bPdC.jpg'}}
        style={styles.image}
       />

       <Image
        source={{uri: 'https://i.redd.it/9tcx0mrypor01.jpg'}}
        style={styles.image}
       />
    </ScrollView>
  );
}

