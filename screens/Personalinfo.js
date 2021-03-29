import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Block, DeckSwiper, Text, Icon } from "galio-framework";
import AsyncStorage from "@react-native-community/async-storage";


console.log('personal info',global.userData.fullname)
//console.log(userInfo)

export default function PersonalInfo({ navigation }) {
  return (
    <View style={styles.container}>
      <Icon name="user" family="Entypo" color="#19ce0f" size={80} />

      <View style={styles.userInfo}>
        <View style={styles.field}>
          <Text h5 color="#19ce0f">
            Name
          </Text>
          <Text p>{global.userData.fullname}</Text>
        </View>

        <View style={styles.field}>
          <Text h5 color="#19ce0f">
            Email
          </Text>
          <Text p>{global.userData.email}</Text>
        </View>

        <View style={styles.field}>
          <Text h5 color="#19ce0f">
            Phone Number
          </Text>
          <Text p>{global.userData.number}</Text>
        </View>

        <View style={styles.field}>
          <Text h5 color="#19ce0f">
            Account Type
          </Text>
          <Text p>{global.userData.accounttype}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
  },
  userInfo: {
    width: "100%",
  },
  field: {
    marginVertical: 10,
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
});
