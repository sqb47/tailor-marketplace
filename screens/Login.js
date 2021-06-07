import React, { useState } from "react";
import {
  Button,
  Input,
  Text,
  Icon,
} from "galio-framework";
import { StyleSheet, View, ScrollView } from "react-native";
import Toast from 'react-native-toast-message';

import { emptyFields, emailValidation } from "../validation/validation";
import { login } from "../apis/apis";

let correct = false;

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordValid, setPasswordValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);

  const [loading, setLoading] = useState(false);

  async function validate() {
    // Toast.show({
    //   text1: 'Hello',
    //   text2: 'This is some something 👋'
    // });
    setLoading(true);
    setEmailValid(true);
    setPasswordValid(true);
    var islogin=true

    if (emptyFields(email, password)) {
      alert('empty fields')
      if (email == "") {
        setEmailValid(false);
      }
      if (password == "") {
        setPasswordValid(false);
      }
    } else {
      setEmailValid(emailValidation(email));
    }
    if (passwordValid && emailValid) {
      var object = {
        email: email.toLowerCase(),
        password: password,
      };

      await login(object);
    }
    setLoading(false);

    navigation.navigate("Account")
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.fullWidth}>
        <View style={styles.form}>
          <Icon name="user" family="Feather" color="black" size={100} />
        <Input
          style={emailValid ? styles.valid : styles.invalid}
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
          onChangeText={(text) => setEmail(text)}
        />

        <Input
          style={passwordValid ? styles.valid : styles.invalid}
          rounded
          placeholder="Enter your password"
          password
          viewPass
          placeholderTextColor="#928988"
          label="Password"
          onChangeText={(text) => setPassword(text)}
        />

        <Button
          round
          uppercase
          color="success"
          style={styles.button}
          loading={loading}
          onPress={() => validate()}
        >
          login
        </Button>

        <Text>OR</Text>

        <Button
          style={styles.button}
          round
          uppercase
          color="success"
          onPress={() => navigation.navigate("Signup")}
        >
          Signup
        </Button>
        </View>
      </ScrollView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
  button: {
    width: 300,
  },
  form:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width:'100%',
    marginTop:50,
  },
  fullWidth:{
    width:'100%',
  }
});
