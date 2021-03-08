import React, {useState} from 'react';
import { Button, NavBar, Input, Block, Radio, Card, Icon } from 'galio-framework';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

export default function Cart() {
    
    return(
        <View style={styles.container}>
            <Icon style={styles.icon} name="shopping-cart" family="Feather" color="red" size={75} />
            <Text style={styles.text}>Cart is empty</Text>
        </View>
    );
   }
   
   const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop:300,
        paddingLeft:25
      },
      input:{
      },
      text:{
        fontSize:50,
        color:"red",
      },
      icon:{
        paddingLeft:100,
      },
      title:{
        fontSize:30,
        padding:10,
        margin:20
      },
      stretch:{
        width:400,
        height:100,
        resizeMode:"stretch",
      }
        
     });