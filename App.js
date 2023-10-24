import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { HomeScreen } from './screens/HomeScreen';
import { AccountScreen } from './screens/AccountScreen';
import { AddExpenseScreen } from './screens/AddExpenseScreen';
import { useEffect, useState } from 'react';
import { getUserById } from './data/users/get-user-by-id';
import { saveUserIdToStorage } from './helpers/save-user-id-to-storage';
import { ActivityIndicator, View } from 'react-native';
import { getUserIdFromStorage } from './helpers/get-user-id-from-storage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabScreen = ({route}) => {
  const { user } = route.params;

  return (
    <Tab.Navigator initialRouteName={"Home"} screenOptions={{headerShown: false}}>
      <Tab.Screen name="Account" component={AccountScreen} initialParams={{user: user}}></Tab.Screen>
      <Tab.Screen name="Home" component={HomeScreen} initialParams={{user: user}} />
      <Tab.Screen name="Add Expense" component={AddExpenseScreen} initialParams={{user: user}}></Tab.Screen>
    </Tab.Navigator>
  );
}

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Login"} screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="HomeTabs" component={HomeTabScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}