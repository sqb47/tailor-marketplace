import React, {useState, useEffect} from 'react';
import { Button, NavBar, Input, Block, Radio, Card, Text } from 'galio-framework';
import { StyleSheet, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import AsyncStorage from "@react-native-community/async-storage";
import Toast from 'react-native-toast-message';




export default function Product({ navigation, route }) {

  var imgs=[
    require("../assets/placeholder.jpeg"),
    require("../assets/placeholder.jpeg"),
    require("../assets/placeholder.jpeg"),
    require("../assets/placeholder.jpeg"),
  ]
  
    var product = route.params
    console.log(product)

    function cart() {
      global.cart.push(product)
      console.log(global.userData)
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Added to cart',
        text2: 'Product added to cart, please check cart',
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 10,
      }); 

    }

    function Buttons() {
      if(global.userData.accounttype == 'Tailor'){
        return(
          <View style={styles.options}>
            <Button
            onlyIcon
            icon="edit"
            iconFamily="AntDesign"
            iconSize={25}
            iconColor="white"
            style={{ width: 50, height: 50 }}
            round
            color='warning'
            onPress={() => console.log('sk')}>
              Delete
            </Button>

            <Button
            onlyIcon
            icon="delete"
            iconFamily="AntDesign"
            iconSize={25}
            iconColor="white"
            style={{ width: 50, height: 50 }}
            round
            color='red'
            onPress={() => console.log('sk')}>
              update
            </Button>
          </View>
        )
      } else {
        return(
          <Button
            round
            color='success'
            style={styles.button}
            onPress={() => cart()}>
              Add to Cart
            </Button>
          )
      }
      
    }

    return(
        <View style={styles.container}>
            <View style={styles.card}>
              {/* <Image source={require("../assets/placeholder.jpeg")} style={styles.image} /> */}
              <SliderBox images={imgs} />
              <Text h5 color="grey">
                {product.name}
              </Text>
              <Text p color="grey">
                {product.description}
              </Text>
              <View style={styles.cardFooter}>
                <Text p color="#19ce0f">
                  Rs: {product.price}
                </Text>
                <Text p color="#19ce0f">
                  Days to complete: {product.days}
                </Text>
              </View>
            </View>

            <Buttons></Buttons>

            

            
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex:1
    },
    options: {
      width: "100%",
      height: 70,
      flexDirection: "row",
      alignItems: "center",
      justifyContent:'flex-end',
      elevation: 1,
    },
    rowAlign: {
      flexDirection: "row",
    },
    body: {
      width: "100%",
      paddingHorizontal: 10,
    },
    card: {
      marginVertical: 20,
      marginHorizontal:5,
      borderRadius: 10,
      borderColor: "lightgrey",
    },
    image: {
      width: "100%",
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      height: 250,
      resizeMode: "stretch",
    },
    cardFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderColor: "lightgrey",
      borderTopWidth: 1,
    },
    footerText: {
      color: "#19ce0f",
    },
    products: {
      height: "87%",
      width: "100%",
    },
    modal: {
      alignSelf: "center",
      width: 320,
      height: "93%",
      backgroundColor: "white",
      borderRadius: 20,
    },
    closeButton: {
      width: 25,
      height: 25,
      marginBottom: 35,
    },
    modalBody: {
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    button: {
      width: 270,
      alignSelf:'center'
    },
    valid: {
      borderColor: "black",
    },
    invalid: {
      borderColor: "red",
    },
  });