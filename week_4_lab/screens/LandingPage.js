import React, {useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Image, useNavigation } from 'react-native';
import InfoSection from '../components/InfoSection'
import PictureSection from '../components/PictureSection'
import FollowPeople from '../components/FollowPeople'
import {auth} from '../firebase'

export default function LandingPage({ navigation, styles, formData, setIsLoggedIn, isLoggedIn}) {

const handleLogOut = () => {
    setIsLoggedIn(false);
    auth
        .signOut()
        .then(()=> {
            navigation.replace("SignIn")
        })
        .catch(err => alert(err.message));
    }

  return (
    <ScrollView contentContainerStyle={styles.container}>
    { isLoggedIn && (
    <>
            <Text style={styles.appTitle}>Jack's Awesome App</Text>

            <Button title="Log Out" onPress={handleLogOut} />

            <InfoSection formData={formData} styles={styles}/>
            <PictureSection styles={styles} />
            <FollowPeople styles={styles} />
        </>
    )}
    </ScrollView>
  );
}
