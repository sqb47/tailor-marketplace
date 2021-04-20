import React, {useState, useEffect} from 'react';
import { Button, NavBar, Input, Block, Radio, Card, Text } from 'galio-framework';
import { StyleSheet, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import Toast from 'react-native-toast-message';




export default function Product({ navigation, route }) {
  
  
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

    return(
        <View style={styles.container}>
            <View style={styles.card}>
              <Image source={require("../assets/placeholder.jpeg")} style={styles.image} />
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

            <Button
            round
            color='success'
            style={styles.button}
            onPress={() => cart()}>
              Add to Cart
            </Button>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex:1
    },
    header: {
      width: "100%",
      height: 70,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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
      borderWidth: 1,
      marginVertical: 20,
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