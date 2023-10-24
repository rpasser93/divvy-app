import { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import { getUserById } from '../data/users/get-user-by-id';
import { saveUserIdToStorage } from '../helpers/save-user-id-to-storage';

export const HomeScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);

  const handleSignOut = () => {
    saveUserIdToStorage('');
    navigation.navigate('Login');
    return;
  };

  const checkUserId = async () => {
    const retrievedUser: object = await getUserById(userId);
    if (!retrievedUser) {
      handleSignOut();
    }
    setUser(retrievedUser);
  };

  useEffect(() => {
    checkUserId();
  }, []);

  return (
    <SafeAreaView>
      <Text style={styles.mainText}>Home Screen</Text>
      <Text>{user?.username}</Text>
      <Button title='Sign Out' onPress={() => handleSignOut()} />
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
    margin: 24,
    fontSize: 14,
    textAlign: 'center',
  },
});
