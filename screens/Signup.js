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

import RadioForm from 'react-native-radio-form'

var emailValidationMessage = "Please Enter Valid E-Mail";
var phoneValidationMessage = "Please Enter Valid Phone Number";
var validMessage=''

const mockData = [
  {
      label: 'Customer'
  },
  {
      label: 'Tailor'
  },
];

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [accountType, setAccountType] = useState("Customer")

  const [emailValid, setEmailValidation] = useState(true);
  const [passwordValid, setPasswordValidation] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValidation] = useState(
    true
  );
  const [phoneValid, setPhoneValidation] = useState(true);

  function validate() {
console.log(accountType)

    setPhoneValidation(true);
    setEmailValidation(true);
    setPasswordValidation(true);
    setConfirmPasswordValidation(true);

    if (emptyFields(email, phone, password, confirmPassword)) {
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
      if( !(passwordValidation(password, confirmPassword))){
        validMessage = "Password do not match"
        alert(validMessage)
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
            style={emailValid?styles.input:styles.inputInvalid}
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
          style={phoneValid?styles.input:styles.inputInvalid}
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
          />

          <Input
            style={passwordValid?styles.input:styles.inputInvalid}
            rounded
            placeholder="Enter your password"
            password
            viewPass
            placeholderTextColor="#928988"
            label="Password"
            onChangeText={(text) => setPassword(text)}
            hellp=''
            bottomHelp
          />

          <Input
            style={confirmPasswordValid?styles.input:styles.inputInvalid}
            rounded
            placeholder="Conform password"
            password
            viewPass
            placeholderTextColor="#928988"
            label="Password"
            onChangeText={(text) => setConfirmPassword(text)}
          />

          <RadioForm
            style={{ width: 350 - 30 }}
            dataSource={mockData}
            itemShowKey="label"
            itemRealKey="value"
            circleSize={16}
            formHorizontal={true}
            labelHorizontal={true}
            onPress={({label}) => setAccountType(label)} 
            innerColor="#19ce0f"
            outerColor='#19ce0f'
            initial={0}
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
