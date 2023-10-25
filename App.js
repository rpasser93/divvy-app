import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { HomeScreen } from './screens/HomeScreen';
import { AccountScreen } from './screens/AccountScreen';
import { AddExpenseScreen } from './screens/AddExpenseScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabScreen = ({route}) => {
  const { user } = route.params;
  const userId = user._id['$oid'];

  return (
    <Tab.Navigator initialRouteName={"Home"} screenOptions={{headerShown: false}}>
      <Tab.Screen name="Account" component={AccountScreen} initialParams={{userId: userId}} />
      <Tab.Screen name="Home" component={HomeScreen} initialParams={{userId: userId}} />
      <Tab.Screen name="Add Expense" component={AddExpenseScreen} initialParams={{userId: userId}} />
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