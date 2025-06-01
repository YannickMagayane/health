import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    const checkUserToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          // Simulate API call or token validation
          setTimeout(() => {
            navigation.replace('App'); // Navigate to AppStack if token exists
          }, 1000);
        } else {
          setTimeout(() => {
            navigation.replace('SignIn'); // Navigate to SignIn if no token
          }, 1000);
        }
      } catch (e) {
        console.error('Failed to load user token', e);
        setTimeout(() => {
          navigation.replace('SignIn'); // Navigate to SignIn on error
        }, 1000);
      }
    };

    checkUserToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthLoadingScreen;
