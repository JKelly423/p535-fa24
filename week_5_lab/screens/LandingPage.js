import React, {useState, useEffect, useRef } from 'react';
import { View, Text, Button, ScrollView, Image, useNavigation , TouchableOpacity, ActivityIndicator, Animated, PanResponder } from 'react-native';
import InfoSection from '../components/InfoSection'
import PictureSection from '../components/PictureSection'
import FollowPeople from '../components/FollowPeople'
import {auth, firestore} from '../firebase'
import { doc, getDoc } from 'firebase/firestore';
var moment = require('moment');



export default function LandingPage({ navigation, styles}) {
const [userData, setUserData] = useState(null);
const [loading, setLoading] = useState(true);

const pan = useRef(new Animated.ValueXY()).current;

const handleLogOut = () => {
    auth
        .signOut()
        .then(()=> {
            navigation.replace("SignIn")
        })
        .catch(err => alert(err.message));
    }

const FadeInView = props => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(()=> {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.View
            style ={{
                ...props.style,
                opacity: fadeAnim,
            }}>
            {props.children}
        </Animated.View>
    );
};


const panResponder = useRef(
    PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}],
            {useNativeDriver: false}
        ),
        onPanResponderRelease: () => {
            pan.extractOffset();
        },
    }),
).current;


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

    <FadeInView
        style={{
            width: 250,
            height: 115,

        }}>
            <Text style={styles.appTitle}>Jack's Awesome App</Text>
        </FadeInView>

        <View style={styles.container}>
            <Text style={styles.title}>Drag this Box!</Text>
            <Animated.View
                style={{
                    transform: [{translateX: pan.x}, {translateY: pan.y}],
                }}
                {...panResponder.panHandlers}>
                    <View style = {styles.box} />
                </Animated.View>
            </View>

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
