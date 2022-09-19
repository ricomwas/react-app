import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from './screens/Login';
import Home from './screens/Home'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Provider } from 'react-redux';
import Store   from './redux/store';

  

 const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator()
// const Tab = createMaterialTopTabNavigator();
// const Drawer = createDrawerNavigator();



const App = () => {

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#F5FFFA'},
            headerTintColor: '#000',
            
          }}

          >

          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: 'Login Page',
              headerShown: false
            }}
          />

          <Stack.Screen
            name="Home"
            component={Home} 
          />

        </Stack.Navigator>
      
      </NavigationContainer>
    </Provider>
 
  );

};


export default App;
