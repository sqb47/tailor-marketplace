import React, {useState} from 'react';
import { Button, NavBar, Input, Block, Radio, Card } from 'galio-framework';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function Home({ navigation }) {
    
    return(
        <View style={styles.container}>
          <View style={styles.username}>
            <Text>Not logged in yet</Text>
            <Button round uppercase color="success" onPress={() => navigation.navigate("Login")} >login</Button>
          </View>
          <View style={styles.info}>
            <TouchableOpacity>
              <Text style={styles.options}>Cart</Text>
              
            </TouchableOpacity>
            <TouchableOpacity >
              <Text style={styles.options}>Notifications</Text>
            </TouchableOpacity>
            
          </View>
          <View style={styles.userinfo} >
            <TouchableOpacity onPress={() => navigation.navigate("Personal Information")}>
              <Text style={styles.options}>Personal Information</Text>
              
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.options}>Saved Address</Text>
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
          <TouchableOpacity>
            <Text style={styles.options}>Logout</Text>
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
      },
      info:{
        flex:2,
        margin:5,
        backgroundColor:"#e3e3e3",
        borderRadius:20,
        justifyContent:"center",
      },
      userinfo:{
        flex:2,
        margin:5,
        backgroundColor:"#e3e3e3",
        borderRadius:20,
        justifyContent:"center",
      },
      contactInfo:{
        flex:3,
        margin:5,
        backgroundColor:"#e3e3e3",
        borderRadius:20,
        justifyContent:"center",
      },
      logout:{
        flex:1,
        margin:3,
        backgroundColor:"#e3e3e3",
        borderRadius:20,
        justifyContent:"center",
      },
      options:{
        fontSize:18,
        margin:10,
        
      }
     });