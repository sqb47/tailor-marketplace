import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, NavBar, Input, Block, Radio, Icon } from 'galio-framework';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Search from './screens/Search';
import Account from './screens/Account';
import Cart from './screens/Cart'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';



const Stack = createStackNavigator();


function MyStack() {
  return (
    
    <Stack.Navigator>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Login" component={Login} 
      options={{ tabBarIcon:()=>(<View><Icon name="user" family="Feather" color="black" size={25} /></View>) }}
      />
      <Tab.Screen name="Signup" component={Signup}
      options={{ tabBarIcon:()=>(<View><Icon name="user" family="Feather" color="black" size={25} /></View>) }}
      /> */}
      <Tab.Screen name="Home" component={Home}
      options={{ tabBarIcon:()=>(<View><Icon name="home" family="Feather" color="black" size={25} /></View>) }}
      />
      <Tab.Screen name="Search" component={Search}
      options={{ tabBarIcon:()=>(<View><Icon name="search" family="Feather" color="black" size={25} /></View>) }}
      />
      <Tab.Screen name="Account" component={MyStack}
      options={{ tabBarIcon:()=>(<View><Icon name="user" family="Feather" color="black" size={25} /></View>) }}
      />
      <Tab.Screen name="Cart" component={Cart}
      options={{ tabBarIcon:()=>(<View><Icon name="shopping-cart" family="Feather" color="black" size={25} /></View>) }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); console.log("kk") }} >
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    </TouchableWithoutFeedback>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent:'center'
    
    
  },
  text:{
    width:100,
    borderColor: "#ff0c00"
  }
});
