import React, {useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, Image, useNavigation , TouchableOpacity, ActivityIndicator} from 'react-native';
import InfoSection from '../components/InfoSection'
import PictureSection from '../components/PictureSection'
import FollowPeople from '../components/FollowPeople'
import {auth, firestore} from '../firebase'
import { doc, getDoc } from 'firebase/firestore';
var moment = require('moment');

export default function LandingPage({ navigation, styles, formData, setIsLoggedIn, isLoggedIn}) {
const [userData, setUserData] = useState(null);
const [loading, setLoading] = useState(true);

const handleLogOut = () => {
    setIsLoggedIn(false);
    auth
        .signOut()
        .then(()=> {
            navigation.replace("SignIn")
        })
        .catch(err => alert(err.message));
    }

useEffect( () => {
    const fetchUserData = async () => {
        try {
            const user = auth.currentUser;
            if(user){
                const userDoc = await getDoc(doc(firestore, 'users', user.uid));
                if (userDoc.exists()){
                setUserData(userDoc.data());
                console.log(userDoc.data())
                } else {
                    console.log('No such document!');
                }
            }
        } catch (error){
            console.error('Error fetching user data: ', error)
        } finally {
            setLoading(false);
        }
    };

    fetchUserData();
}, []);

if (loading){
    return <ActivityIndicator size='large' color='#0782F9' />;
}

  return (
    <ScrollView contentContainerStyle={styles.container}>
    {(
    <>
            <Text style={styles.appTitle}>Jack's Awesome App</Text>

            <Button title="Log Out" onPress={handleLogOut} />

            {userData &&  (
            <InfoSection userData={userData} styles={styles}/>
            )}
    </>
//            <PictureSection styles={styles} />
//            <FollowPeople styles={styles} />

    )}
    </ScrollView>
  );
}
