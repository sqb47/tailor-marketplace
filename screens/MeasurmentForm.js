import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Block, DeckSwiper, Text, Icon, Button, Input } from "galio-framework";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";

// console.log('personal info',global.userData.fullname)
//console.log(userInfo)

export default function MeasurmentForm({ navigation }) {
  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.container}>
        <Image
          source={require("../assets/measurment.jpg")}
          style={styles.image}
        />

        <Input
        type="number-pad"
          rounded
          placeholder="Enter neck collar Length in inches"
          placeholderTextColor="#928988"
          label="1. Neck Collar"
          onChangeText={(text) => setName(text)}
        />

        <Input
        type="number-pad"
          rounded
          placeholder=" Enter sholder measurment in inches"
          placeholderTextColor="#928988"
          label="2. Shoulder"
          onChangeText={(text) => setName(text)}
        />

        <Input
        type="number-pad"
          rounded
          placeholder=" Enter chest measurment in inches"
          placeholderTextColor="#928988"
          label="3. Chest"
          onChangeText={(text) => setName(text)}
        />

        <Input
        type="number-pad"
          rounded
          placeholder=" Enter waist measurment in inches"
          placeholderTextColor="#928988"
          label="4. Waist"
          onChangeText={(text) => setName(text)}
        />

        <Input
        type="number-pad"
          rounded
          placeholder=" Enter hips Measurment in inches"
          placeholderTextColor="#928988"
          label="5. Hips"
          onChangeText={(text) => setName(text)}
        />

        <Input
        type="number-pad"
          rounded
          placeholder=" Enter sleve length in inches"
          placeholderTextColor="#928988"
          label="6. Sleve length"
          onChangeText={(text) => setName(text)}
        />

        <Input
        type="number-pad"
          rounded
          placeholder=" Enter length in inches"
          placeholderTextColor="#928988"
          label="7. Length"
          onChangeText={(text) => setName(text)}
        />

        <Input
        type="number-pad"
          rounded
          placeholder=" Enter ghera length in inches"
          placeholderTextColor="#928988"
          label="8. Ghera"
          onChangeText={(text) => setName(text)}
        />

        <Button round color="success" style={styles.button}>
          SUBMIT
        </Button>
      </View>
    </ScrollView>
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
  scrollview: {
    flex: 1,
  },
  button: {
    width: "100%",
    marginTop: 50,
    marginBottom: 20,
  },
  image: {
    width: 180,
    height: 320,
    resizeMode: "stretch",
    borderRadius: 10,
  },
});
