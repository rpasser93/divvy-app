import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export const ExpenseDetailsScreen = ({ route, navigation }) => {
  const { expenseId } = route.params;
  const [loading, setLoading] = useState(false);

  const retrieveExpense = async () => {
    setLoading(true);
    setLoading(false);
    return;
  };

  useFocusEffect(
    React.useCallback(() => {
      retrieveExpense();
    }, [])
  );

  return loading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <Text style={styles.mainText}>Expense Details</Text>
      <Text style={styles.secondaryText}>Expense Id:</Text>
      <Text style={styles.secondaryTextBold}>{expenseId ?? 'n/a'}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
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
  bottomContainer: {
    marginBottom: 24,
  },
});
