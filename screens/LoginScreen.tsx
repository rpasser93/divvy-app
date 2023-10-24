import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { useEffect, useState } from 'react';
import { attemptLogin } from '../data/users/attempt-login';
import { saveUserIdToStorage } from '../helpers/save-user-id-to-storage';
import { getUserIdFromStorage } from '../helpers/get-user-id-from-storage';
import { getUserById } from '../data/users/get-user-by-id';

export const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const checkStorageForUserId = async () => {
    const storedUserId: string = await getUserIdFromStorage();
    if (!storedUserId) {
      return;
    }

    const registeredUser: object = getUserById(storedUserId);
    if (!registeredUser) {
      return;
    }

    navigation.navigate('HomeTabs', { userId: storedUserId });
    return;
  };

  const handleChangeUsername = (text: string) => {
    setErrorText('');
    setUsername(text);
  };

  const handleChangePassword = (text: string) => {
    setErrorText('');
    setPassword(text);
  };

  const handleLoginAttempt = async () => {
    const loggedInUserId: string = await attemptLogin(username, password);

    if (loggedInUserId) {
      saveUserIdToStorage(loggedInUserId);
      navigation.navigate('HomeTabs', { userId: loggedInUserId });
      return;
    }
    setErrorText('Invalid login credentials.');
  };

  useEffect(() => {
    checkStorageForUserId();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainText}>Login Screen:</Text>
      <TextInput
        style={styles.textInput}
        placeholder={'Username'}
        onChangeText={(text) => handleChangeUsername(text)}
        onFocus={() => setErrorText('')}
      />
      <TextInput
        style={styles.textInput}
        placeholder={'Password'}
        onChangeText={(text) => handleChangePassword(text)}
        onFocus={() => setErrorText('')}
      />
      <Button title='Log In' onPress={() => handleLoginAttempt()} />
      <Text style={styles.mainText}>{errorText}</Text>
      <Text style={styles.secondaryText}>
        Don't have an account?{' '}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate('Signup')}
        >
          Sign Up
        </Text>
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
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
  textInput: {
    height: 55,
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 10,
    margin: 4,
    borderRadius: 20,
  },
  linkText: {
    margin: 24,
    fontSize: 14,
    textAlign: 'center',
    color: '#0000ff',
    textDecorationLine: 'underline',
  },
});
