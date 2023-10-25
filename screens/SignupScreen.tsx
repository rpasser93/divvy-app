import { useState } from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { createNewAccount } from '../data/users/create-new-account';
import { saveUserIdToStorage } from '../helpers/save-user-id-to-storage';

export const SignupScreen = ({ navigation }) => {
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

  const handleSignUpAttempt = async () => {
    const newUser = await createNewAccount(username, password);

    if (newUser.success) {
      const newUserId = newUser.data._id['$oid'].toString();
      await saveUserIdToStorage(newUserId);
      navigation.navigate('HomeTabs', { user: newUser.data });
      return;
    }
    setErrorText(newUser.data ?? 'Invalid username.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainText}>Signup Screen:</Text>
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
      <Button title='Sign Up' onPress={() => handleSignUpAttempt()} />
      <Text style={styles.mainText}>{errorText}</Text>
      <Text style={styles.secondaryText}>
        Already have an account?{' '}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate('Login')}
        >
          Log In
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
  textInput: {
    height: 55,
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 10,
    margin: 4,
    borderRadius: 20,
  },
  secondaryText: {
    margin: 24,
    fontSize: 14,
    textAlign: 'center',
  },
  linkText: {
    margin: 24,
    fontSize: 14,
    textAlign: 'center',
    color: '#0000ff',
    textDecorationLine: 'underline',
  },
});
