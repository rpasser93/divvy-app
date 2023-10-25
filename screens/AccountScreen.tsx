import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { saveUserIdToStorage } from '../helpers/save-user-id-to-storage';
import { getUserById } from '../data/users/get-user-by-id';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export const AccountScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fullName: string =
    user && user['first_name'] && user['last_name']
      ? `${user['first_name']} ${user['last_name']}`
      : '---';

  const handleSignOut = async () => {
    await saveUserIdToStorage('');
    navigation.navigate('Login');
    return;
  };

  const retrieveUser = async () => {
    setLoading(true);
    const retrievedUser = await getUserById(userId);
    if (!retrievedUser['success']) {
      handleSignOut();
    }
    setUser(retrievedUser['data']);
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
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.mainText}>Account Settings</Text>
        <Text style={styles.secondaryText}>Username:</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.secondaryTextBold}>{user['username']}</Text>
          </View>
          <View style={styles.editButton}>
            <TouchableOpacity onPress={() => console.log('editing')}>
              <FontAwesome name='pencil-square-o' size={16} color={'black'} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.secondaryText}>Full Name:</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.secondaryTextBold}>{fullName}</Text>
          </View>
          <View style={styles.editButton}>
            <TouchableOpacity onPress={() => console.log('editing')}>
              <FontAwesome name='pencil-square-o' size={16} color={'black'} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.secondaryText}>Password:</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.secondaryTextBold}>**********</Text>
          </View>
          <View style={styles.editButton}>
            <TouchableOpacity onPress={() => console.log('editing')}>
              <FontAwesome name='pencil-square-o' size={16} color={'black'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => handleSignOut()}
        >
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.deleteAccountButton}
          onPress={() => {
            console.log('Delete Account');
          }}
        >
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
  },
  mainText: {
    marginTop: 34,
    marginBottom: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryText: {
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 24,
  },
  secondaryTextBold: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 24,
    marginBottom: 24,
  },
  logoutButton: {
    marginHorizontal: 125,
    marginVertical: 12,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    elevation: 3,
    backgroundColor: 'red',
  },
  deleteAccountButton: {
    marginVertical: 12,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    elevation: 3,
  },
  buttonText: {
    padding: 12,
    fontSize: 14,
    textAlign: 'center',
  },
  bottomContainer: {
    marginBottom: 24,
  },
  editButton: {
    marginLeft: 24,
  },
});
