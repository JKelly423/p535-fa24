import React from 'react';
import { View, Text, Image } from 'react-native';

export default function PictureSection({styles}) {
    return(
       <View style={styles.container}>

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

       </View>
    )
}
