import React, { useState } from "react";
import { Button, Input, Icon } from "galio-framework";
import { StyleSheet, View, ScrollView } from "react-native";
import RadioForm from "react-native-radio-form";
import Toast from 'react-native-toast-message';

import {
  emptyFields,
  emailValidation,
  phoneValidation,
  passwordValidation,
  nameValidation,
} from "../validation/validation";
import { signup } from "../apis/apis";

var emailValidationMessage = "Please Enter Valid E-Mail";
var phoneValidationMessage = "Please Enter Valid Phone Number";
var validMessage = "";

const radioData = [
  {
    label: "Customer",
  },
  {
    label: "Tailor",
  },
];

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [accountType, setAccountType] = useState("Customer");

  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [nameValid, setnameValidation] = useState(true);
  const [phoneValid, setPhoneValid] = useState(true);
  const [confirmPasswordValid, setConfirmPasswordValidation] = useState(true);

  const [loading, setLoading] = useState(false);

  async function validate() {
    
    setLoading(true);
    setPhoneValid(true);
    setnameValidation(true);
    setEmailValid(true);
    setPasswordValid(true);
    setConfirmPasswordValidation(true);

    if (emptyFields(email, phone, password, confirmPassword, name)) {
      if (email == "") {
        setEmailValid(false);
      }
      if (name == "") {
        setnameValidation(false);
      }
      if (password == "") {
        setPasswordValid(false);
      }
      if (confirmPassword == "") {
        setConfirmPasswordValidation(false);
      }
      if (phone == "") {
        setPhoneValid(false);
      }
    } else {
      setEmailValid(emailValidation(email));

      if (!passwordValidation(password, confirmPassword)) {
        validMessage = "Password do not match";
        alert(validMessage);
        setPasswordValid(false);
        setConfirmPasswordValidation(false);
      }

      setPhoneValid(phoneValidation(phone));
      setnameValidation(nameValidation(name));
    }
    if (
      emailValid &&
      passwordValid &&
      nameValid &&
      phoneValid &&
      confirmPasswordValid
    ) {
      var object = {
        fullname: name,
        email: email,
        number: phone,
        password: password,
        accounttype: accountType,
      };
      await signup(object);

      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'success',
        text2: 'Account registered successfully',
        visibilityTime: 4000,
        autoHide: true,
        bottomOffset: 40,
      });
    }
    setLoading(false);
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'success',
      text2: 'Account registered successfully',
      visibilityTime: 2000,
      autoHide: true,
      bottomOffset: 10,
    }); 
    //navigation.navigate("Login")
  }

  return (
    <View style={styles.container}>
      
      <ScrollView style={styles.fullWidth}>
        <View style={styles.form}>
          <Icon name="user" family="Feather" color="black" size={100} />
          <Input
            style={nameValid ? styles.input : styles.inputInvalid}
            rounded
            placeholder="Enter Your Full Name"
            placeholderTextColor="#928988"
            label="Full Name"
            icon="user"
            iconColor="black"
            family="Entypo"
            right
            iconeSize={13}
            onChangeText={(text) => setName(text)}
          />

          <Input
            style={emailValid ? styles.input : styles.inputInvalid}
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
            style={phoneValid ? styles.input : styles.inputInvalid}
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
            style={passwordValid ? styles.input : styles.inputInvalid}
            rounded
            placeholder="Enter your password"
            password
            viewPass
            placeholderTextColor="#928988"
            label="Password"
            onChangeText={(text) => setPassword(text)}
            hellp=""
            bottomHelp
          />

          <Input
            style={confirmPasswordValid ? styles.input : styles.inputInvalid}
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
            dataSource={radioData}
            itemShowKey="label"
            itemRealKey="value"
            circleSize={16}
            formHorizontal={true}
            labelHorizontal={true}
            onPress={({ label }) => setAccountType(label)}
            innerColor="#19ce0f"
            outerColor="#19ce0f"
            initial={0}
          />

          <Button
            round
            uppercase
            color="success"
            style={styles.button}
            loading={loading}
            onPress={() => validate()}
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
    borderColor: "red",
  },
  button: {
    marginBottom: 80,
    marginTop: 20,
    width: 300,
  },
});
