import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { saveUserIdToStorage } from '../helpers/save-user-id-to-storage';
import React, { useEffect, useState } from 'react';
import { getUserById } from '../data/users/get-user-by-id';
import { useFocusEffect } from '@react-navigation/native';

export const HomeScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
    return;
  };

  useFocusEffect(
    React.useCallback(() => {
      retrieveUser();
    }, [])
  );

  const renderActiveExpenses = () => {
    const expenses = user.expenses;

    return expenses
      ? expenses.map((expense, index) => {
          return (
            <View key={index}>
              <TouchableOpacity
                style={styles.expense}
                onPress={() => {
                  navigation.navigate('ExpenseDetails', {
                    expenseId: expense.id,
                  });
                }}
              >
                <Text>Expense {index + 1}</Text>
                <Text>{expense.id}</Text>
              </TouchableOpacity>
            </View>
          );
        })
      : null;
  };

  return loading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.mainText}>Home</Text>
        <Text style={styles.expensesTitleText}>Your Active Expenses:</Text>
        {renderActiveExpenses()}
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity>
          <Text>View Archived Expenses</Text>
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
  mainText: {
    marginTop: 34,
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryText: {
    fontSize: 14,
    textAlign: 'center',
  },
  expensesTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  expense: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 2,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
    width: 250,
    margin: 8,
  },
  bottomContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
});
