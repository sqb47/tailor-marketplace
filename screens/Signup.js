import React, { useState } from "react";
import {
  Button,
  NavBar,
  Input,
  Block,
  Radio,
  Text,
  Icon,
} from "galio-framework";
import { StyleSheet, View, ScrollView } from "react-native";

import {
  emptyFields,
  emailValidation,
  phoneValidation,
  passwordValidation,
} from "../validation/validation";

var emailValidationMessage = "Please Enter Valid E-Mail";
var passwordValidationMessage = "";
var phoneValidationMessage = "Please Enter Valid Phone Number";
var validMessage=''

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [emailValidation, setEmailValidation] = useState(true);
  const [passwordValidation, setPasswordValidation] = useState(true);
  const [confirmPasswordValidation, setConfirmPasswordValidation] = useState(
    true
  );
  const [phoneValidation, setPhoneValidation] = useState(true);

  function validate() {
    setPhoneValidation(true);
    setEmailValidation(true);
    setPasswordValidation(true);
    setConfirmPasswordValidation(true);

    if (emptyFields(email, phone, password, confirmPassword)) {
      passwordValidationMessage = "Please Enter Password"
      if (email == "") {
        setEmailValidation(false);
      }
      if (password == "") {
        setPasswordValidation(false);
      }
      if (confirmPassword == "") {
        setConfirmPasswordValidation(false);
      }
      if (phone == "") {
        setPhoneValidation(false);
      }
    } else {
      setEmailValidation(emailValidation(email));
      if(passwordValidation(password, confirmPassword)){
        passwordValidationMessage = "Password do not match"
        setPasswordValidation(false);
        setConfirmPasswordValidation(false);
      }
      setPhoneValidation(phoneValidation(phone));
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.fullWidth}>
        <View style={styles.form}>
          <Icon name="user" family="Feather" color="black" size={100} />
          <Input
            style={emailValidation?styles.input:styles.inputInvalid}
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
            // help= 'djfdksfjslkj'
            // bottomHelp
          />

          <Input
          style={phoneValidation?styles.input:styles.inputInvalid}
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
            onChangeText={(text) => setPhone(text)}
            // help={phoneValidationMessage}
            // bottomHelp
          />

          <Input
            style={passwordValidation?styles.input:styles.inputInvalid}
            rounded
            placeholder="Enter your password"
            password
            viewPass
            placeholderTextColor="#928988"
            label="Password"
            onChangeText={(text) => setPassword(text)}
            hellp=''
            bottomHelp
            // help={passwordValidationMessage}
            // bottomHelp
          />

          <Input
            style={confirmPasswordValidation?styles.input:styles.inputInvalid}
            rounded
            placeholder="Conform password"
            password
            viewPass
            placeholderTextColor="#928988"
            label="Password"
            onChangeText={(text) => setConfirmPassword(text)}
            // help={passwordValidationMessage}
            // bottomHelp
          />

          <Button
            round
            uppercase
            color="success"
            style={styles.button}
            onPress={() => validate()}
          >
            Signup
          </Button>
        </View>
      </ScrollView>
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
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  fullWidth: {
    width: "100%",
  },
  input: {
    width: 300,
  },
  inputInvalid: {
    width: 300,
    borderColor:'red'
  },
  button: {
    marginBottom: 70,
  },
});
