import React, { useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';

export default function FollowPeople({ styles }) {
  // Define an initial list of names and follow states
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', isFollowing: false },
    { id: 2, name: 'Jane Smith', isFollowing: false },
    { id: 3, name: 'Michael Brown', isFollowing: false },
    { id: 4, name: 'Emily White', isFollowing: false },
  ]);

  // Function to toggle follow/unfollow
  const toggleFollow = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
    ));
  };

  return (
      <ScrollView>
        {users.map((user) => (
          <View key={user.id} style={styles.userContainer}>
            <Text style={styles.name}>{user.name}</Text>
            <Button
              title={user.isFollowing ? 'Unfollow' : 'Follow'}
              onPress={() => toggleFollow(user.id)}
            />
          </View>
        ))}
      </ScrollView>
  );
}
