import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, NavBar, Input, Block, Radio, Icon } from 'galio-framework';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Search from './screens/Search';
import Account from './screens/Account';
import Cart from './screens/Cart';
import Shop from './screens/Shop';
import MeasurmentForm from './screens/MeasurmentForm'
import Personalinfo from './screens/Personalinfo';
import Product from './screens/Product';
import Orders from './screens/Orders'
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
      <Stack.Screen name="Personal Information" component={Personalinfo} />
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen name="MeasurmentForm" component={MeasurmentForm} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Orders" component={Orders} />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Product" component={Product} />
      
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStack}
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


