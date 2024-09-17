import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, Button, Modal} from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';


export default function TabOneScreen() {
    const [isModalVisible, setIsModalVisible] = useState(true);
    let handleModal = () => setIsModalVisible(() => !isModalVisible);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Image source={{uri: 'https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/15231691/453801468.0.0.1421786380.jpg'}}
      style={styles.image} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Counter/>
<View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} />
      <Button title="button" onPress={handleModal} />
      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1 }}>
          <Text>Hello!</Text>
          <Button title="Hide modal" onPress={handleModal} />
        </View>
      </Modal>
    </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  separatorSmall: {
      marginVertical: 10,
      height: 1,
      width: '80%',
  },
  separatorTiny: {
      marginVertical: 5,
      height: 1,
      width: '80%',
  },
  image: {
      height: 400,
      width: 400
  },
});

const Counter = () => {
    const [count, setCount] = useState(0);
   return (
        <View>
           <Button
             onPress={() => {setCount(count + 1)}} title="Click Me"
           />
           <View style={styles.separatorSmall} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
           <Button
             onPress={() => {setCount(0)}} title="Reset"
           />
           <View style={styles.separatorTiny} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
           <Text>You clicked me {count} times</Text>
       </View>
   );
}
