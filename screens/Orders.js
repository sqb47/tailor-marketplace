import React, { useState, useEffect } from "react";
import {
  Button,
  NavBar,
  Input,
  Block,
  Radio,
  Card,
  Text,
  Icon,
} from "galio-framework";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-toast-message";
import { updateOrderStatus } from "../apis/apis";

export default function Product({ navigation, route }) {

  const [loading,setloading]=useState(false)
  const [reload,setreload]=useState('')

  async function accept(item) {
    setloading(true)
    var data = {
      productid: item.productid,
      cid: item.cid,
      status: "Accepted",
      tid: item.tid,
      email: item.email,
    };
    console.log(data);
    await updateOrderStatus(data)
    setloading(false)
  }

  async function reject(item) {
    setloading(true)
    var data = {
      productid: item.productid,
      cid: item.cid,
      status: "Rejected",
      tid: item.tid,
      email: item.email,
    };
    console.log(data);
    await updateOrderStatus(data)
    setloading(false)
  }

  function Buttons(item) {
    if (global.userData.accounttype == "Tailor") {
      return (
        <View style={styles.rowAlign}>
          <Button
            round
            color="red"
            style={styles.button}
            onPress={() => reject(item)}
          >
            Reject order
          </Button>

          <Button
            round
            color="success"
            style={styles.button}
            onPress={() => accept(item)}
          >
            Accept order
          </Button>
          
        </View>
      );
    } else {
      return <View></View>;
    }
  }

  return (
    <View style={styles.containor}>
      <View style={styles.header}>
        <View>
          <Text color="#19ce0f" h4>
            {" "}
            Orders{" "}
          </Text>
        </View>

        <View style={styles.rowAlign}>
        <ActivityIndicator size='large' color='black' animating={loading} />
          <Button
            onlyIcon
            icon="reload1"
            iconFamily="AntDesign"
            iconSize={20}
            color="success"
            iconColor="#fff"
            style={{ width: 40, height: 40 }}
            onPress={() => setreload('')}
          />
        </View>
      </View>
      <View style={styles.body}>
        <FlatList
          style={styles.products}
          data={global.userData.orders}
          keyExtractor={(e) => e._id}
          renderItem={({ item }) => (
            <View style={styles.list}>
              <Text>order id: {item._id}</Text>
              <Text>product name: {item.productname}</Text>
              <Text>tailor name: {item.tname}</Text>
              <Text>customer email: {item.email}</Text>
              <Text>status: {item.status}</Text>
              {Buttons(item)}
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    margin: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
  },
  container: {
    backgroundColor: "red",
    height: 1000,
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
    justifyContent: "center",
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
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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
    width: 120,
    marginTop: 30,
  },
  valid: {
    borderColor: "black",
  },
  invalid: {
    borderColor: "red",
  },
  options: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    borderBottomWidth: 1,
    borderColor: "grey",
  },
});
