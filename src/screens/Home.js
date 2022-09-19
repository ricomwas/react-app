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
    Alert,
    FlatList
  } from 'react-native';
import CustomButton from '../utils/CustomButton';
import SQLite from 'react-native-sqlite-storage'
import { useSelector, useDispatch } from 'react-redux'
import { setName, setAge, increaseAge, getCities } from '../redux/actions'

const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default'
  },
  () => {},
  error =>{ console.log(error) }
);
 

const Home = ({navigation, route}) => {
  // const { name, age } = useSelector(state => state.rootReducer)
  const name = useSelector(state => state.name)
  const age = useSelector(state => state.age)
  const cities = useSelector(state => state.cities)

  const dispatch = useDispatch();

  /* const [name, setName] = useState('');
  const [age, setAge] = useState(''); */

  useEffect(() => {
    getData();
    dispatch(getCities());
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
              dispatch(setName(userName))
              dispatch(setAge(userAge))
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
            
            <FlatList
              data={cities}
              renderItem={({ item }) => ( 
                <View style={styles.item}>
                  <Text style={styles.title}>{item.country}</Text>
                  <Text style={styles.subtitle}>{item.city}</Text>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
            
            /> 

          {/*   <Text style={
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

            <CustomButton
              title='Increaase Age'
              color='#0080ff'
              onPressFunction={() => {dispatch(increaseAge())}}
            />
         */}
        </View>
    )
}

const styles = StyleSheet.create({
     body: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 20
      /* marginTop: 130,
      marginBottom:700 */ 

    },
    /* text: {
      fontSize: 40,
      fontWeight: 'bold',
      margin: 10,
      
    }, */
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
  item: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderCOlor: '#cccccc',
    borderRadius: 5,
    margin: 7,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center'

  },
  title: {
    fontSize: 15,
    margin: 10,
    fontWeight: 'bold',
    color: '#000'

  },
  subtitle: {
    fontSize: 12,
    margin: 10,
    color: '#999999'

  }
  
});

export default Home