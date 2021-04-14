import React, { useState } from "react";
import { Button, Input, Text, Icon, Card } from "galio-framework";
import { StyleSheet, View, ScrollView, Image, FlatList } from "react-native";
import Toast from "react-native-toast-message";

import { emptyFields, emailValidation } from "../validation/validation";
import { login } from "../apis/apis";

let data = [
  { name: "name", key: "1" },
  { name: "name", key: "2" },
  { name: "name", key: "3" },
  { name: "name", key: "4" },
  { name: "name", key: "5" },
  { name: "name", key: "6" },
  { name: "name", key: "7" },
  { name: "name", key: "8" },
  { name: "name", key: "9" },
];

export default function Shop({ navigation }) {
  return (
    <View style={styles.containor}>
        
        <View style={styles.header}>
          <Text color="#19ce0f" h4>
            {" "}
            user name shop{" "}
          </Text>
          <Button
            onlyIcon
            icon="plus"
            iconFamily="Entypo"
            iconSize={30}
            color="success"
            iconColor="#fff"
            style={{ width: 40, height: 40 }}
          />
        </View>
        <View style={styles.body}>
            <FlatList
            style={styles.products}
            data={data}
            renderItem={({ item }) => (
                <View style={styles.card}>
                <Image source={require("../test.png")} style={styles.image} />
                <Text h5 color="grey">
                {item.name}
                </Text>
                <Text p color="grey">
                Description of the product here
                </Text>
                <View style={styles.cardFooter}>
                <Text p color="#19ce0f">
                    RS:00000
                </Text>
                <Text p color="#19ce0f">
                    Time required
                </Text>
                </View>
            </View>
            )}
            />
          
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  products:{
      height:'87%',
      width:'100%'
  }
});
