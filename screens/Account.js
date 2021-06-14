import React, {useState, useEffect} from 'react';
import { Button, NavBar, Input, Block, Radio, Card, Text } from 'galio-framework';
import { StyleSheet, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

 

async function logout(nav) {
  await AsyncStorage.clear()

  console.log(global.userData)
  global.userData=undefined
  console.log(global.userData)
  nav.navigate("Login")

}


export default function Home({ navigation }) {

  const [loginValid,setLoginValid]=useState(false)


  function checkLogin(isLoggedIn) {
    console.log('login check')
    console.log(global.userData)
    if ( isLoggedIn ){
      return(
        <View>
          <Text h3 color="#19ce0f">{global.userData == undefined 
                  ? "-------"
                  : global.userData.fullname}</Text>
            
        </View>
      )
    }else{
      return(
        <View>
          <Text>not logged in yet</Text>
            <Button round uppercase color="success" onPress={() => navigation.navigate("Login")} >login</Button>
        </View>
      )
    }
    
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus',async () => {
      global.cart=[]
      var userid=''
      try {
        userid = await AsyncStorage.getItem('userData');
        if (userid !== null) {
          // We have data!!
          console.log('hello===========\n',userid);
        }else{
          console.log('hello+++++++++++\n',userid);
          navigation.navigate("Login")
        }
      } catch (error) {
        // Error retrieving data
        console.log('hello===========\n',error);
        navigation.navigate("Login")
      }
      // The screen is focused
      // Call any action and update data
      if (global.userData==undefined){
        setLoginValid(false)
        // navigation.navigate("Login")
      }
      else{
        setLoginValid(true)
      }
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  // useEffect(() => {
  //   console.log('hello')
  // }, []);

    return(
        <View style={styles.container}>
          <View style={styles.username}>
            { checkLogin(loginValid) }
            
          </View>
          <View style={styles.info}>
            <TouchableOpacity onPress={() => navigation.navigate("Shop")}>
              <Text style={styles.options}>Shop {/*cart*/}</Text> 
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
              <Text style={styles.options}>Orders</Text>
            </TouchableOpacity>
            
          </View>
          <View style={styles.userinfo} >
            <TouchableOpacity onPress={() => navigation.navigate("Personal Information")}>
              <Text style={styles.options}>Personal Information</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("MeasurmentForm")}>
              <Text style={styles.options}>Update Measurement</Text>
            </TouchableOpacity>
            
          </View>
          <View style={styles.contactInfo}>
          <TouchableOpacity>
            <Text style={styles.options}>Rate The App</Text>
          </TouchableOpacity>

          <TouchableOpacity>
              <Text style={styles.options}>Contact Us</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.options}>FAQs</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.logout}>
          <TouchableOpacity onPress={() =>  logout(navigation)}>
            <Text style={styles.options} >Logout</Text>
          </TouchableOpacity>
            
          </View>
        </View>
    );
   }
   
   const styles = StyleSheet.create({
      container: {
        flex:1,
        paddingTop:20
      },
      input:{
      },
      title:{
        fontSize:30,
        padding:10,
        margin:20
      },
      username:{
        flex:2,
        marginLeft:5
      },
      info:{
        flex:2,
        margin:5,
        borderTopWidth:1,
        borderColor:'grey',
        justifyContent:"center",
      },
      userinfo:{
        flex:2,
        margin:5,
        borderTopWidth:1,
        borderColor:'grey',
        justifyContent:"center",
      },
      contactInfo:{
        flex:3,
        margin:5,
        borderTopWidth:1,
        borderColor:'grey',
        justifyContent:"center",
      },
      logout:{
        flex:1,
        margin:3,
        borderTopWidth:1,
        borderColor:'grey',
        justifyContent:"center",
      },
      options:{
        fontSize:18,
        margin:10,
        
      }
     });