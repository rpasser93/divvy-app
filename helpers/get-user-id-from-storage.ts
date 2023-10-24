import * as SecureStore from 'expo-secure-store';

export const getUserIdFromStorage = async () => {
  const result: string = await SecureStore.getItemAsync('userId');
  if (result) {
    return result.toString();
  }
  return null;
};
