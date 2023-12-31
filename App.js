import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { HomeScreen } from './screens/HomeScreen';
import { AccountScreen } from './screens/AccountScreen';
import { AddExpenseScreen } from './screens/AddExpenseScreen';
import { ExpenseDetailsScreen } from './screens/ExpenseDetailsScreen';
import { ExpenseHistoryScreen } from './screens/ExpenseHistoryScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({route}) => {
  const { userId } = route.params;

  return (
    <Stack.Navigator initialRouteName={"Dashboard"} screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={HomeScreen} initialParams={{userId: userId}}/>
      <Stack.Screen name="ExpenseDetails" component={ExpenseDetailsScreen} />
      <Stack.Screen name="ExpenseHistory" component={ExpenseHistoryScreen} />
    </Stack.Navigator>
  )
}

const HomeTabs = ({route}) => {
  const { user } = route.params;
  const userId = user._id['$oid'];

  return (
    <Tab.Navigator initialRouteName={"Home"} screenOptions={{headerShown: false}}>
      <Tab.Screen name="Account" component={AccountScreen} initialParams={{userId: userId}} />
      <Tab.Screen name="Home" component={HomeStack} initialParams={{userId: userId}} />
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
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}