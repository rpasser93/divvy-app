import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
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
  const [loading, setLoading] = useState(true);

  const checkStorageForUserId = async () => {
    const storedUserId = await getUserIdFromStorage();
    if (!storedUserId) {
      setLoading(false);
      return;
    }

    const registeredUser = await getUserById(storedUserId);
    if (!registeredUser.success) {
      await saveUserIdToStorage('');
      setLoading(false);
      return;
    }

    navigation.navigate('HomeTabs', { user: registeredUser.data });
    setLoading(false);
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
    const loggedInUser = await attemptLogin(username, password);

    if (loggedInUser.success) {
      const loggedInUserId = loggedInUser.data._id['$oid'].toString();
      await saveUserIdToStorage(loggedInUserId);
      navigation.navigate('HomeTabs', { user: loggedInUser.data });
      return;
    }
    setErrorText(loggedInUser.data ?? 'Invalid credentials.');
  };

  useEffect(() => {
    checkStorageForUserId();
  }, []);

  return loading ? (
    <View>
      <ActivityIndicator style={styles.spinner} />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainText}>Login Screen:</Text>
      <Image style={styles.logo} source={require('../assets/divvylogo.png')} />
      <TextInput
        style={styles.textInput}
        placeholder={'Username'}
        onChangeText={(text) => handleChangeUsername(text)}
        onFocus={() => setErrorText('')}
      />
      <TextInput
        style={styles.textInput}
        placeholder={'Password'}
        secureTextEntry={true}
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
  logo: {
    width: 250,
    height: undefined,
    aspectRatio: 1132 / 824,
    alignSelf: 'center',
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
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
