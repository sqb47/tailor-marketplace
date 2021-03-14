import React, {useState} from "react";
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
import { AsyncStorage } from '@react-native-community/async-storage';
import { emptyFields, emailValidation } from '../validation/validation'

let correct = false;




// function temp () {
//   fetch("http://192.168.10.3:3001/login",{method: 'GET'})
//   .then((response) => response.json())
//       .then((responseJson) => {
//         console.log(responseJson);
//       })
//     .catch((error) => {
//       console.error(error);
//     });
//   AsyncStorage.getItem('UID123', (err, result) => {
//     console.log('consoool',result);
//   });
//   AsyncStorage.clear( (err, result) => {
//     console.log('clear',result);
//   });
// }



export default function Login({ navigation }) {
  const [email, setEmail]=useState('');
  const [password, setPassword]= useState('')

  const [passwordValid, setPasswordValid]= useState(true)
  const [emailValid, setEmailValid]= useState(true)
  

  function validate() {
    setEmailValid(true)
    setPasswordValid(true)

    if (emptyFields(email, password)){
      if (email==''){
        setEmailValid(false)
      }
      if (password==''){
        setPasswordValid(false)
      }
    }else{
      setEmailValid(emailValidation(email))
    }
    
  }

  return (
    <View style={styles.container}>
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

      <Button round uppercase color="success"
      onPress={() => validate()}
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
