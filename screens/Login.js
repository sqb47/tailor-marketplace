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

let correct = false;

function temp () {
  fetch("http://192.168.10.3:3001/login",{method: 'GET'})
  .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
      })
    .catch((error) => {
      console.error(error);
    });
}

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <Icon name="user" family="Feather" color="black" size={100} />
      <Input
        style={(styles.input, correct ? styles.valid : styles.invalid)}
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
        onPress={() => alert("pressed")}
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

      <Button round uppercase color="success"
      onPress={() => temp()}
      >
        login
      </Button>
      <Text>OR</Text>
      <Button
        round
        uppercase
        color="success"
        onPress={() => navigation.navigate("Signup")}
      >
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
  valid: {
    width: 300,
    borderColor: "black",
  },
  invalid: {
    width: 300,
    borderColor: "red",
  },
});
