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

export default function Cart({ navigation }) {
  function empty(params) {
    setData([])
    global.cart=[]
  }
  const [data, setData] = useState([]);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setData(global.cart);
      console.log("cart", global.cart);
      console.log("cart", data);
      console.log("length", data.length);
      // The screen is focused
      // Call any action and update data
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return data.length != 0 ? (
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
                source={require("../assets/placeholder.jpeg")}
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
        <Button round color='success' style={styles.button}
        onPress={() => empty()}>
        Empty Cart
      </Button>

      
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
    width: 270,
    marginVertical: 30,
    alignSelf:'center'
  },
  valid: {
    borderColor: "black",
  },
  invalid: {
    borderColor: "red",
  },
});
