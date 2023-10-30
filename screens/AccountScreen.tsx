import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { saveUserIdToStorage } from '../helpers/save-user-id-to-storage';
import { getUserById } from '../data/users/get-user-by-id';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

export const AccountScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const [editNameModalVisible, setEditNameModalVisible] = useState(false);
  const [changePasswordModalVisible, setChangePasswordModalVisible] =
    useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);
  const [editedFirstName, setEditedFirstName] = useState('');
  const [editedLastName, setEditedLastName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');
  const [deleteAccountText, setDeleteAccountText] = useState('');
  const [editNameErrorText, setEditNameErrorText] = useState('');
  const [changePasswordErrorText, setChangePasswordErrorText] = useState('');
  const [loading, setLoading] = useState(true);

  const fullName: string =
    user && user.first_name && user.last_name
      ? `${user.first_name} ${user.last_name}`
      : '---';

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
    setEditedFirstName(retrievedUser.data.first_name);
    setEditedLastName(retrievedUser.data.last_name);
    setLoading(false);
    return;
  };

  const handleEditName = async () => {
    console.log(editedFirstName);
    console.log(editedLastName);
    setEditNameModalVisible(false);
  };

  const handleChangePassword = async () => {
    console.log(currentPassword);
    console.log(newPassword);
    console.log(newPasswordAgain);
    setChangePasswordModalVisible(false);
  };

  const handleDeleteAccount = async () => {
    console.log(deleteAccountText);
    setDeleteAccountModalVisible(false);
  };

  const handleCancelUpdateName = () => {
    setEditNameModalVisible(false);
    setEditedFirstName(user.first_name);
    setEditedLastName(user.last_name);
  };

  const handleCancelChangePassword = () => {
    setChangePasswordModalVisible(false);
    setCurrentPassword('');
    setNewPassword('');
    setNewPasswordAgain('');
  };

  const handleCancelDeleteAccount = () => {
    setDeleteAccountModalVisible(false);
    setDeleteAccountText('');
  };

  const editNameModal = () => {
    return (
      <View>
        <Modal
          isVisible={editNameModalVisible}
          onBackdropPress={() => handleCancelUpdateName()}
        >
          <View style={styles.modalView}>
            <Text>Edit Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'First name'}
              value={editedFirstName}
              onChangeText={(text) => {
                setEditNameErrorText('');
                setEditedFirstName(text);
              }}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'Last name'}
              value={editedLastName}
              onChangeText={(text) => {
                setEditNameErrorText('');
                setEditedLastName(text);
              }}
            />
            <Text>{editNameErrorText}</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleEditName()}
              >
                <Text>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancelUpdateName()}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const editPasswordModal = () => {
    return (
      <View>
        <Modal
          isVisible={changePasswordModalVisible}
          onBackdropPress={() => handleCancelChangePassword()}
        >
          <View style={styles.modalView}>
            <Text>Change Password</Text>
            <TextInput
              style={styles.textInput}
              placeholder={'Current password'}
              onChangeText={(text) => {
                setChangePasswordErrorText('');
                setCurrentPassword(text);
              }}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'New password'}
              onChangeText={(text) => {
                setChangePasswordErrorText('');
                setNewPassword(text);
              }}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'New password'}
              onChangeText={(text) => {
                setChangePasswordErrorText('');
                setNewPasswordAgain(text);
              }}
            />
            <Text>{changePasswordErrorText}</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleChangePassword()}
              >
                <Text>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => handleCancelChangePassword()}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  const deleteAccountModal = () => {
    return (
      <View>
        <Modal
          isVisible={deleteAccountModalVisible}
          onBackdropPress={() => handleCancelDeleteAccount()}
        >
          <View style={styles.modalView}>
            <Text>Delete your account?</Text>
            <Text>Type "delete" below.</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => setDeleteAccountText(text)}
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleCancelDeleteAccount()}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            {deleteAccountText.toLowerCase() === 'delete' ? (
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleDeleteAccount()}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </Modal>
      </View>
    );
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
        <Text style={styles.secondaryTextBold}>{user.username}</Text>
        <Text style={styles.secondaryText}>Full Name:</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.secondaryTextBold}>{fullName}</Text>
          </View>
          <View style={styles.editButton}>
            <TouchableOpacity onPress={() => setEditNameModalVisible(true)}>
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
            <TouchableOpacity
              onPress={() => setChangePasswordModalVisible(true)}
            >
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
      {editNameModal()}
      {editPasswordModal()}
      {deleteAccountModal()}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.deleteAccountButton}
          onPress={() => {
            setDeleteAccountModalVisible(true);
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
  modalView: {
    margin: 50,
    padding: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 22,
  },
  textInput: {
    height: 55,
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 10,
    margin: 4,
    borderRadius: 20,
  },
  saveButton: {
    alignItems: 'center',
    borderRadius: 2,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
    width: 100,
    margin: 8,
  },
  cancelButton: {
    alignItems: 'center',
    borderRadius: 2,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
    width: 100,
    margin: 8,
  },
});
