import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getExpenseById } from '../data/expenses/get-expense-by-id';
import { FontAwesome } from '@expo/vector-icons';

export const ExpenseDetailsScreen = ({ route, navigation }) => {
  const { expenseId } = route.params;
  const [expense, setExpense] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [loading, setLoading] = useState(false);

  const renderOwedParty = () => {
    const owedParty = expense.owed_party;
    return owedParty.map((member, index) => {
      return (
        <View key={index}>
          <Text>{`${member.first_name} ${member.last_name}`}</Text>
          <Text>Owed: ${member.amount_owed}</Text>
          <Text>Received: ${member.amount_received}</Text>
        </View>
      );
    });
  };

  const renderIndebtedParty = () => {
    const indebtedParty = expense.indebted_party;
    return indebtedParty.map((member, index) => {
      return (
        <View key={index}>
          <Text>{`${member.first_name} ${member.last_name}`}</Text>
          <Text>Owes: ${member.amount_owed}</Text>
          <Text>Paid: ${member.amount_received}</Text>
        </View>
      );
    });
  };

  const retrieveExpense = async () => {
    setLoading(true);
    const retrievedExpense = await getExpenseById(expenseId);
    if (!retrievedExpense.success) {
      console.log('error receiving expense...');
    }
    setExpense(retrievedExpense.data);
    setLoading(false);
    return;
  };

  useEffect(() => {
    retrieveExpense();
  }, []);

  return loading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      {expense ? (
        <View>
          <View style={styles.row3Items}>
            <View style={styles.block3row}>
              <FontAwesome
                style={styles.backArrow}
                name='chevron-left'
                size={24}
                color={'black'}
              />
            </View>
            <Text style={styles.mainText}>{expense.name}</Text>
            <View style={styles.block3row}></View>
          </View>
          <Text style={styles.secondaryText}>Status:</Text>
          <Text style={styles.secondaryTextBold}>{expense.status}</Text>
          <Text style={styles.secondaryText}>Date:</Text>
          <Text style={styles.secondaryTextBold}>{expense.date}</Text>
          <Text style={styles.secondaryText}>Notes:</Text>
          <Text style={styles.secondaryTextBold}>{expense.description}</Text>

          <Text style={styles.secondaryText}>Split By:</Text>
          <Text style={styles.secondaryTextBold}>{expense.split_by}</Text>
          <Text style={styles.secondaryText}>Owed Party:</Text>
          {renderOwedParty()}
          <Text style={styles.secondaryText}>Indebted Party:</Text>
          {renderIndebtedParty()}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ExpenseHistory', {
                history: expense.history,
              })
            }
          >
            <Text style={styles.secondaryText}>History</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View></View>
      )}
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
  row3Items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  block3row: {
    width: '33%',
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
  backArrow: {
    marginLeft: 24,
  },
  historyButton: {},
});
