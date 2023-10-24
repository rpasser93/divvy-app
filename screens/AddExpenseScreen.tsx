import { SafeAreaView, StyleSheet, Text } from 'react-native';

export const AddExpenseScreen = ({ route }) => {
  const { user } = route.params;

  return (
    <SafeAreaView>
      <Text style={styles.mainText}>Add New Expense</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  mainText: {
    marginTop: 34,
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryText: {
    margin: 24,
    fontSize: 14,
    textAlign: 'center',
  },
});
