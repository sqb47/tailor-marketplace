import React, { useState, useEffect } from "react";
import {
  Button,
  NavBar,
  Input,
  Block,
  Radio,
  Card,
  Icon,
  Text,
} from "galio-framework";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { placeOrder } from '../apis/apis'

export default function Cart({ navigation }) {
  function empty(params) {
    setData([]);
    global.cart = [];
  }
  async function checkout(){
    for (var product in global.cart)
    {
      console.log('-----', product._id)
    }
    // var date = new Date();
    // var data={
    //   id:global.userData._id,
    //   date:''+date,
    //   email:global.userData.email,
    //   productid:item._id,
    //   status:'pending',
    //   tid:item.tid,
    //   tname:item.tname,
    //   temail:item.temail,
    //   productname:item.name,
    // }
    // await placeOrder(data)
  }
  const [data, setData] = useState([]);
  const [refresh,setrefresh]=useState('')
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setData(global.cart);
      console.log("cart", global.cart);
      console.log("cart", data);
      console.log("length", global.cart.length);
      // The screen is focused
      // Call any action and update data
      setTimeout(function(){ console.log('---') }, 1000);
      navigation.navigate('Cart')
      setrefresh('0')
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return global.cart.length !=0 ? (
    <View>
      <View style={styles.header}></View>
      <View style={styles.body}>
        <FlatList
          style={styles.products}
          data={data}
          keyExtractor={(e) => e._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: "data:image/jpeg;base64," + item.image }}
                style={styles.image}
              />
              <Text h5 color="grey">
                {item.name}
              </Text>
              <Text p color="grey">
                {item.description}
              </Text>
              <View style={styles.cardFooter}>
                <Text p color="#19ce0f">
                  Rs: {item.price}
                </Text>
                <Text p color="#19ce0f">
                  Days to complete: {item.days}
                </Text>
              </View>
            </View>
          )}
        />
        <View style={styles.rowAlign}>
          <Button
            round
            color="warning"
            style={styles.button}
            onPress={() => empty()}
          >
            Empty Cart
          </Button>

          <Button
            round
            color="success"
            style={styles.button}
            onPress={() => checkout()}
          >
            Checkout
          </Button>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <Icon
        style={styles.icon}
        name="shopping-cart"
        family="Feather"
        color="red"
        size={75}
      />
      <Text style={styles.text}>Cart is empty</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 300,
    paddingLeft: 25,
  },
  input: {},
  text: {
    fontSize: 50,
    color: "red",
  },
  icon: {
    paddingLeft: 100,
  },
  title: {
    fontSize: 30,
    padding: 10,
    margin: 20,
  },
  stretch: {
    width: 400,
    height: 100,
    resizeMode: "stretch",
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
    height: "75%",
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
    width: 155,
    marginVertical: 30,
    alignSelf: "center",
  },
  valid: {
    borderColor: "black",
  },
  invalid: {
    borderColor: "red",
  },
});
