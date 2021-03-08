import React from "react";
import {
  Button,
  NavBar,
  Input,
  Block,
  Radio,
  Text,
  Icon,
} from "galio-framework";
import { StyleSheet, View } from "react-native";

export default function Signup() {
  const R1 = Radio;
  return (
    <View style={styles.container}>
      <Icon name="user" family="Feather" color="black" size={100} />
      <Input
        style={styles.input}
        rounded
        placeholder="Enter your email"
        type="email-address"
        placeholderTextColor="#928988"
        label="Email"
        icon="email"
        iconColor="black"
        family="Entypo"
        right
        iconeSize={13}
      />

      <Input
        style={styles.input}
        rounded
        placeholder="Enter your password"
        password
        viewPass
        placeholderTextColor="#928988"
        label="Password"
      />

      <Input
        style={styles.input}
        rounded
        placeholder="Enter Phone number"
        type="number-pad"
        placeholderTextColor="#928988"
        label="Mobile Number"
        icon="mobile"
        iconColor="black"
        family="Entypo"
        right
        iconeSize={13}
      />

      <Button round uppercase color="success">
        Signup
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 300,
  },
});
