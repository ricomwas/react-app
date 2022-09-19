import React, { useState, useEffect} from 'react'
import { View, StyleSheet, Image, Text, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import CustomButton from '../utils/CustomButton'
// import AsyncStorage  from '@react-native-async-storage/async-storage'
import SQLite from 'react-native-sqlite-storage'
import { useSelector, useDispatch } from 'react-redux'
import { setName, setAge} from '../redux/actions'

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default'
  },
  () => {},
  error =>{ console.log(error) }
);


const Login = ({navigation}) => {

  // const { name, age } = useSelector(state => state.rootReducer)
  const name = useSelector(state => state.name)
  const age = useSelector(state => state.age)

  const dispatch = useDispatch();

  /* const [name, setName] = useState('')
  const [age, setAge] = useState(''); */

  useEffect(() => {
    createTable();
    getData();
  }, [])

  const createTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS "
        + "Users "
        + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Age INTEGER);"
      )
    })
  }

  const getData = () => {
    try {
     /*  AsyncStorage.getItem('UserData')
        .then(value => {
          if (value != null) {
            navigation.navigate('Home')
          }
        }) */

        db.transaction((tx) => {
          tx.executeSql(
            "SELECT Name, Age FROM Users",
            [],
            (tx, results) => {
              var len = results.rows.length;
              if (len > 0) {
                navigation.navigate('Home')
              }
            }
            
          )
        })

    } catch (error) {
        console.log(error);

    }
  }


  const setData = async () => {
    if (name.length == 0 || age.length == 0 ){
        Alert.alert('Warning!', 'Please write your name')
    } else {
        try {
          dispatch(setName(name))
          dispatch(setAge(age))
          /*   var user = {
              Name: name,
              Age: age
            }

            await AsyncStorage.setItem('UserData', JSON.stringify(user)) */
            await db.transaction((tx) => {
              /* tx.exeuteSql(
                "INSERT INTO users (Name, Age) VALUES ('" + name + "', " + age + ")"
              ); */
              tx.executeSql(
                "INSERT INTO Users (Name, Age) VALUES (?,?)",
                [name, age]
              );  
            })
            navigation.navigate('Home')

        } catch (error) {
            console.log(error);

        }

    }
  }


  return (
    <View style={styles.body}>  
     {/*  <Image
        style={styles.logo}
        source={require('../../assets/react-redux.png')}
      />  */}
      <Text style={styles.text}>
        Redux
      </Text>
      <TextInput 
        style={styles.input}
        placeholder='Enter your name'
        onChangeText={(value) => dispatch(setName(value))}
      />
      <TextInput 
        style={styles.input}
        placeholder='Enter your age'
        onChangeText={(value) => dispatch(setAge(value))}
      />
      <CustomButton
        title= 'Login'
        color='red'
        onPressFunction={setData}
      />
    
    </View>
  )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#0080ff'
    },
    logo: {
        width: 150,
        height: 150,
        margin: 20
    },
    text: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 100,

    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#fff',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10     
    }

});

export default Login