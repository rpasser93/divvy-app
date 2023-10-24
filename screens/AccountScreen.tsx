import { SafeAreaView, StyleSheet, Text } from 'react-native';

export const AccountScreen = ({ route }) => {
  const { user } = route.params;

  return (
    <SafeAreaView>
      <Text style={styles.mainText}>Account Settings</Text>
      <Text style={styles.secondaryText}>Full name</Text>
      <Text style={styles.secondaryText}>Password</Text>
      <Text style={styles.secondaryText}>Log Out</Text>
      <Text style={styles.secondaryText}>Delete Account</Text>
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
    textAlign: 'left',
  },
});
