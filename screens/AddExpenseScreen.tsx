import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { createNewExpense } from '../data/expenses/create-new-expense';
import { saveUserIdToStorage } from '../helpers/save-user-id-to-storage';
import { getUserById } from '../data/users/get-user-by-id';
import { useFocusEffect } from '@react-navigation/native';

export const AddExpenseScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState(null);
  const scrollViewRef = useRef(null);
  const [firstSectionDone, setFirstSectionDone] = useState(false);
  const [secondSectionDone, setSecondSectionDone] = useState(false);
  const [thirdSectionDone, setThirdSectionDone] = useState(false);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState(null);
  const [members, setMembers] = useState([]);
  const [paidBy, setPaidBy] = useState(null);
  const [divviedBy, setDivviedBy] = useState('Equal Amounts');
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

  const resetFields = () => {
    setExpenseName('');
    setExpenseAmount('');
    setExpenseDate(null);
    setMembers([]);
    setPaidBy(null);
    setDivviedBy('Equal Amounts');
  };

  const addMember = () => {
    const newMember = {
      firstName: 'Firstname',
      lastName: 'Lastname',
    };
    setMembers([...members, newMember]);
  };

  const deleteMember = (index) => {
    const adjustedMembers = [...members];
    adjustedMembers.splice(index, 1);
    setMembers(adjustedMembers);
  };

  const handleDatePicker = () => {
    const dateText = moment().format('MMM Do, YYYY');
    setExpenseDate(dateText);
  };

  const handleSaveExpense = async () => {
    const newExpense = await createNewExpense(
      expenseName,
      'test desc',
      '2023-10-25T17:08:31.159Z',
      divviedBy,
      user._id['$oid']
    );

    if (newExpense.success) {
      navigation.navigate('Dashboard');
      return;
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      retrieveUser();
      resetFields();
    }, [])
  );

  useEffect(() => {
    if (!expenseName || !expenseAmount || !expenseDate) {
      setFirstSectionDone(false);
      setSecondSectionDone(false);
      setThirdSectionDone(false);
      return;
    }
    setFirstSectionDone(true);

    if (members.length == 0) {
      setSecondSectionDone(false);
      setThirdSectionDone(false);
      return;
    }
    setSecondSectionDone(true);

    if (!paidBy) {
      setThirdSectionDone(false);
      return;
    }
    setThirdSectionDone(true);
  }, [expenseName, expenseAmount, expenseDate, members, paidBy]);

  const renderMembers = () => {
    return members.map((member, index) => {
      const fullName = `${member.firstName} ${member.lastName}`;
      return (
        <View key={index}>
          <TouchableOpacity
            style={styles.member}
            onPress={() => deleteMember(index)}
          >
            <Text>{fullName}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  const dateInput = () => {
    return expenseName && expenseAmount ? (
      <View style={styles.rowLeft}>
        <Text style={styles.secondaryText}>When: </Text>
        {expenseDate ? (
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => handleDatePicker()}
          >
            <Text style={styles.secondaryTextBold}>{expenseDate}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.calendarButton}
            onPress={() => handleDatePicker()}
          >
            <FontAwesome name='calendar' size={20} color={'black'} />
          </TouchableOpacity>
        )}
      </View>
    ) : null;
  };

  const secondSection = () => {
    return firstSectionDone ? (
      <View>
        <View style={styles.hr}></View>
        <Text style={styles.secondaryText}>
          With <Text style={styles.secondaryTextBold}>you</Text> and:
        </Text>
        <View style={styles.row}>{renderMembers()}</View>
        <TouchableOpacity style={styles.addMember} onPress={() => addMember()}>
          <FontAwesome name='plus-circle' size={48} color={'green'} />
        </TouchableOpacity>
      </View>
    ) : null;
  };

  const thirdSection = () => {
    return secondSectionDone ? (
      <View>
        <View style={styles.hr}></View>
        <Text style={styles.secondaryText}>Paid by:</Text>
        <TouchableOpacity
          style={styles.paidBy}
          onPress={() => setPaidBy('You')}
        >
          <Text style={styles.secondaryTextBold}>{paidBy ?? 'Select...'}</Text>
        </TouchableOpacity>
      </View>
    ) : null;
  };

  const fourthSection = () => {
    return thirdSectionDone ? (
      <View>
        <View style={styles.hrInvis}></View>
        <Text style={styles.secondaryText}>Divvied by:</Text>
        <TouchableOpacity
          style={styles.divviedBy}
          onPress={() => console.log('Change divvy type.')}
        >
          <Text style={styles.secondaryTextBold}>{divviedBy}</Text>
        </TouchableOpacity>
        <View style={styles.hr}></View>
      </View>
    ) : null;
  };

  return loading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
      >
        <View>
          <Text style={styles.mainText}>Add New Expense</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder={'Enter a name for the expense'}
              onChangeText={(text) => setExpenseName(text)}
            />
            <View style={styles.row}>
              <Text style={styles.dollarSign}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder={'0.00'}
                onChangeText={(text) => setExpenseAmount(text)}
              />
            </View>
            {dateInput()}
          </View>
          {secondSection()}
          {thirdSection()}
          {fourthSection()}
        </View>
        {thirdSectionDone ? (
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.bottomButtons}
              onPress={() => console.log('breakdown')}
            >
              <Text style={styles.secondaryText}>View Breakdown</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomButtons}
              onPress={() => console.log('notes')}
            >
              <Text style={styles.secondaryText}>Add Notes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveExpense}
              onPress={() => handleSaveExpense()}
            >
              <Text style={styles.saveText}>Save Expense</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
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
  secondaryTextBold: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    height: 55,
    borderColor: 'gray',
    borderWidth: 0.5,
    padding: 10,
    margin: 4,
    borderRadius: 20,
    width: '85%',
  },
  amountInput: {
    height: 55,
    borderColor: 'transparent',
    borderWidth: 0.5,
    padding: 10,
    margin: 4,
    borderRadius: 20,
    fontSize: 36,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 36,
    marginRight: 'auto',
  },
  dollarSign: {
    fontSize: 36,
  },
  inputContainer: {
    alignItems: 'center',
  },
  dateButton: {
    alignItems: 'center',
    borderRadius: 2,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 8,
    padding: 4,
  },
  calendarButton: {
    marginLeft: 12,
  },
  hr: {
    height: 1,
    width: '100%',
    backgroundColor: 'black',
    marginVertical: 24,
  },
  hrInvis: {
    height: 1,
    backgroundColor: 'transparent',
    marginVertical: 12,
  },
  addMember: {
    marginTop: 12,
    alignItems: 'center',
  },
  member: {
    alignItems: 'center',
    borderRadius: 2,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
    width: 100,
    margin: 8,
  },
  paidBy: {
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
    width: 100,
    height: 40,
    margin: 8,
  },
  divviedBy: {
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
    width: 150,
    height: 40,
    margin: 8,
  },
  bottomContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  bottomButtons: {
    elevation: 3,
    borderColor: 'black',
    padding: 4,
    marginBottom: 8,
    marginLeft: 8,
    alignSelf: 'flex-start',
  },
  saveExpense: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    elevation: 3,
    borderColor: 'black',
    borderWidth: 1,
    width: 200,
    height: 40,
    margin: 8,
    backgroundColor: 'green',
  },
  saveText: {
    fontSize: 24,
  },
});
