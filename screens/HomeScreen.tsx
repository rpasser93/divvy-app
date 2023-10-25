import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { saveUserIdToStorage } from '../helpers/save-user-id-to-storage';
import React, { useEffect, useState } from 'react';
import { getUserById } from '../data/users/get-user-by-id';
import { useFocusEffect } from '@react-navigation/native';

export const HomeScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSignOut = async () => {
    await saveUserIdToStorage('');
    navigation.navigate('Login');
    return;
  };

  const retrieveUser = async () => {
    setLoading(true);
    const retrievedUser = await getUserById(userId);
    if (!retrievedUser.success) {
      handleSignOut();
    }
    setUser(retrievedUser.data);
    setLoading(false);
    return;
  };

  useFocusEffect(
    React.useCallback(() => {
      retrieveUser();
    }, [])
  );

  return loading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <SafeAreaView>
      <Text style={styles.mainText}>Active Expenses:</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  mainText: {
    marginTop: 34,
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
