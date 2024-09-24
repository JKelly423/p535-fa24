import React from 'react';
import { View, Text } from 'react-native';

export default function HelloName({name, styles}) {
    return(
        <View>
          <Text style={styles.title}>Hello, {name}!</Text>
        </View>
    )
}
