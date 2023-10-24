import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import { saveUserIdToStorage } from '../helpers/save-user-id-to-storage';

export const HomeScreen = ({ route, navigation }) => {
  const { user } = route.params;

  const handleSignOut = async () => {
    await saveUserIdToStorage('');
    navigation.navigate('Login');
    return;
  };

  return (
    <SafeAreaView>
      <Text style={styles.mainText}>Active Expenses:</Text>
      <Text>{user.username}</Text>
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
