import React from 'react';
import { View, Text } from 'react-native';

export default function InfoSection({formData, styles}) {
    return(
        <View style={styles.container}>
          <Text style={styles.title}>Welcome, {formData.name}!</Text>
          <Text style={styles.header}>Here is Some of your information:</Text>

          <Text style={styles.textContent}>Email: {formData.email}</Text>
          <Text style={styles.textContent}>Name: {formData.name}</Text>
          <Text style={styles.textContent}>Birthdate: {formData.birthdate.toDateString()}</Text>
          <Text style={styles.textContent}>Country: {formData.country}</Text>
          <Text style={styles.textContent}>Gender: {formData.gender}</Text>
          <Text style={styles.textContent}>Biography: {formData.biography}</Text>
          <Text style={styles.textContent}>University: {formData.university}</Text>
        </View>
    )
}
