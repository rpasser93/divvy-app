import * as SecureStore from 'expo-secure-store';

export const saveUserIdToStorage = async (userId?: string) => {
  await SecureStore.setItemAsync('userId', userId);
};
