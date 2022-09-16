import React,  {useState, useEffect } from 'react'
/* import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack' */
import AsyncStorage from '@react-native-async-storage/async-storage'
import GlobalStyle from '../utils/GlobalStyle';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    Alert
  } from 'react-native';
import CustomButton from '../utils/CustomButton';
import SQLite from 'react-native-sqlite-storage'
import { useSelector, useDispatch } from 'react-redux'
import { setName, setAge } from '../redux/actions'

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default'
  },
  () => {},
  error =>{ console.log(error) }
);
 

const Home = ({navigation, route}) => {
  const { name, age } = useSelector(state => state.userReducer)
  const dispatch = useDispatch();

  /* const [name, setName] = useState('');
  const [age, setAge] = useState(''); */

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    try {
     /*  AsyncStorage.getItem('UserData')
        .then(value => {
          if (value != null) {
            let user = JSON.parse(value);
            setName(user.Name)
            setAge(user.Age)
          }
        }) */
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT Name, Age FROM Users",
          [],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              var userName = results.rows.item(0).Name;
              var userAge = results.rows.item(0).Age;
              dispatch(setName(name))
              dispatch(setAge(age))
            }
          }
          
        )
      })

    } catch (error) {
        console.log(error);

    }
  }

  const updateData = async () => {
    if (name.length == 0){
        Alert.alert('Warning!', 'Please write your name')
    } else {
        try {
            /* await AsyncStorage.setItem('UserName', name) */
            db.transaction((tx) => {
              tx.executeSql(
                "UPDATE Users SET Name=?",
                [name],
                () => { Alert.alert('Success!', 'Your data has been updated.') },
                error => { console.log(error) }
              )
            })

        } catch (error) {
            console.log(error);
        }

    }
  }

  const removeData = async () => {
    try {
      /* await AsyncStorage.clear(); */
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM Users",
          [],
          () => { navigation.navigate('Login') },
          error => { console.log(error) }
        )

      })
    } catch (error) {
        console.log(error);
    }
  }

    return (
       <View style={styles.body}>
            <Text style={
              GlobalStyle.CustomFont
              }>
                Welcome {name} !
            </Text>

            <Text style={
              GlobalStyle.CustomFont
              }>
                Your age is: {age} !
            </Text>

            <TextInput 
              style={styles.input}
              placeholder='Enter your name'
              value={name}
              onChangeText={(value) => dispatch(setName(value))}
            />

            <CustomButton
              title='Update'
              color="#841584"
              onPressFunction={updateData}
            />
            <CustomButton
              title='Remove'
              color='#006400'
              onPressFunction={removeData}
            />
        
        </View>
    )
}

const styles = StyleSheet.create({
     body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 40,
      fontWeight: 'bold',
      margin: 10,
      

    },
    input: {
      width: 300,
      borderWidth: 1,
      borderColor: '#555',
      borderRadius: 10,
      backgroundColor: '#fff',
      textAlign: 'center',
      fontSize: 20,
      marginTop: 130,
      marginBottom: 10     
  },
  
});

export default Home