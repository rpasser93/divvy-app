import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getExpenseById } from '../data/expenses/get-expense-by-id';

export const ExpenseHistoryScreen = ({ route, navigation }) => {
  const { history } = route.params;

  const renderHistory = () => {
    return history.map((log, index) => {
      return (
        <View key={index}>
          <Text>{log.text}</Text>
          <Text>{log.dateTime}</Text>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.secondaryText}>History:</Text>
        {renderHistory()}
      </ScrollView>
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
