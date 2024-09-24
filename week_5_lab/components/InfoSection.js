import React from 'react';
import { View, Text } from 'react-native';

export default function InfoSection({userData, styles}) {
    return(
        <View style={styles.container}>
          <Text style={styles.title}>Welcome, {userData.name}!</Text>
          <Text style={styles.header}>Here is Some of your information:</Text>

          <Text style={styles.textContent}>Email: {userData.email}</Text>
          <Text style={styles.textContent}>Name: {userData.name}</Text>
          <Text style={styles.textContent}>Birthdate: {userData.birthdate}</Text>
          <Text style={styles.textContent}>Country: {userData.country}</Text>
          <Text style={styles.textContent}>Gender: {userData.gender}</Text>
          <Text style={styles.textContent}>Biography: {userData.biography}</Text>
          <Text style={styles.textContent}>University: {userData.university}</Text>
        </View>
    )
}
