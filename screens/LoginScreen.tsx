import { StatusBar } from 'expo-status-bar';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { useState } from 'react';
import { attemptLogin } from '../data/users/attempt-login';
import { saveUserIdToStorage } from '../helpers/save-user-id-to-storage';

export const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleChangeUsername = (text: string) => {
    setErrorText('');
    setUsername(text);
  };

  const handleChangePassword = (text: string) => {
    setErrorText('');
    setPassword(text);
  };

  const handleLoginAttempt = async () => {
    const loggedInUserId = await attemptLogin(username, password);

    if (loggedInUserId) {
      saveUserIdToStorage(loggedInUserId);
      navigation.navigate('Home', { userId: loggedInUserId });
      return;
    }
    setErrorText('Invalid login credentials.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.maintext}>Log In:</Text>
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
      <Button title='Log in' onPress={() => handleLoginAttempt()} />
      <Text style={styles.maintext}>{errorText}</Text>
      <StatusBar style='auto' />
      <Button title={'Sign Up'} onPress={() => navigation.navigate('Signup')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
  maintext: {
    marginTop: 34,
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
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
});
