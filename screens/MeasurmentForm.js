import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Block, DeckSwiper, Text, Icon, Button, Input } from "galio-framework";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { numberValidation, emptyFields } from "../validation/validation";
import { updateMeasurements } from "../apis/apis";

// console.log('personal info',global.userData.fullname)
//console.log(userInfo)

export default function MeasurmentForm({ navigation }) {
  const [neck,setNeck]=useState('')
  const [shoulder,setShoulder]=useState('')
  const [chest,setChest]=useState('')
  const [waist,setWaist]=useState('')
  const [hips,setHips]=useState('')
  const [sleve,setSleve]=useState('')
  const [length,setLength]=useState('')
  const [ghera,setGhera]=useState('')
  const [shalwar,setShalwar]=useState('')

  const [neckValid,setNeckValid]=useState(true)
  const [shoulderValid,setShoulderValid]=useState(true)
  const [chestValid,setChestValid]=useState(true)
  const [waistValid,setWaistValid]=useState(true)
  const [hipsValid,setHipsValid]=useState(true)
  const [sleveValid,setSleveValid]=useState(true)
  const [lengthValid,setLengthValid]=useState(true)
  const [gheraValid,setGheraValid]=useState(true)
  const [shalwarValid,setShalwarValid]=useState(true)

  const [buttonLoading,setButtonloading]=useState(false)

  async function update() {
    setButtonloading(true)

    setNeckValid(true)
    setShoulderValid(true)
    setChestValid(true)
    setWaistValid(true)
    setHipsValid(true)
    setSleveValid(true)
    setLengthValid(true)
    setGheraValid(true)
    setShalwarValid(true)

    var isEmpty=emptyFields(neck, shoulder, chest, waist, hips, sleve, length, ghera, shalwar)
    if (isEmpty){
      alert('empty fields')
      setNeckValid(neck==""?false:true)
      setShoulderValid(shoulder==""?false:true)
      setChestValid(chest==""?false:true)
      setWaistValid(waist==""?false:true)
      setHipsValid(hips==""?false:true)
      setSleveValid(sleve==""?false:true)
      setLengthValid(length==""?false:true)
      setGheraValid(ghera==""?false:true)
      setShalwarValid(shalwar==""?false:true)
      return
    }else{
      setNeckValid(numberValidation(neck))
      setShoulderValid(numberValidation(shoulder))
      setChestValid(numberValidation(chest))
      setWaistValid(numberValidation(waist))
      setHipsValid(numberValidation(hips))
      setSleveValid(numberValidation(sleve))
      setLengthValid(numberValidation(length))
      setGheraValid(numberValidation(ghera))
      setShalwarValid(numberValidation(shalwar))
      if (!(
        neckValid &&
        shoulderValid &&
        chestValid &&
        waistValid &&
        hipsValid &&
        sleveValid &&
        lengthValid &&
        gheraValid &&
        shalwarValid
      )) {
        return
      }
    }

    var data={
      id:global.userData._id,
      neck:neck,
      shoulder:shoulder,
      chest:chest,
      waist:waist,
      hips:hips,
      slevelength:sleve ,
      length:length, 
      ghera:ghera,
      salwarlength:shalwar
    }
    console.log(data)
    await updateMeasurements(data)

    setButtonloading(false)
  }
  

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
          onChangeText={(text) => setNeck(text)}
          style={neckValid?styles.valid:styles.invalid}
        />

        <Input
        type="number-pad"
          rounded
          placeholder=" Enter sholder measurment in inches"
          placeholderTextColor="#928988"
          label="2. Shoulder"
          onChangeText={(text) => setShoulder(text)}
          style={shoulderValid?styles.valid:styles.invalid}
        />

        <Input
        type="number-pad"
          rounded
          placeholder=" Enter chest measurment in inches"
          placeholderTextColor="#928988"
          label="3. Chest"
          onChangeText={(text) => setChest(text)}
          style={chestValid?styles.valid:styles.invalid}
        />

        <Input
        type="number-pad"
          rounded
          placeholder=" Enter waist measurment in inches"
          placeholderTextColor="#928988"
          label="4. Waist"
          onChangeText={(text) => setWaist(text)}
          style={waistValid?styles.valid:styles.invalid}
        />

        <Input
        type="number-pad"
          rounded
          placeholder=" Enter hips Measurment in inches"
          placeholderTextColor="#928988"
          label="5. Hips"
          onChangeText={(text) => setHips(text)}
          style={hipsValid?styles.valid:styles.invalid}
        />

        <Input
        type="number-pad"
          rounded
          placeholder=" Enter sleve length in inches"
          placeholderTextColor="#928988"
          label="6. Sleve length"
          onChangeText={(text) => setSleve(text)}
          style={sleveValid?styles.valid:styles.invalid}
        />

        <Input
        type="number-pad"
          rounded
          placeholder=" Enter length in inches"
          placeholderTextColor="#928988"
          label="7. Length"
          onChangeText={(text) => setLength(text)}
          style={lengthValid?styles.valid:styles.invalid}
        />

        <Input
        type="number-pad"
          rounded
          placeholder=" Enter ghera length in inches"
          placeholderTextColor="#928988"
          label="8. Ghera"
          onChangeText={(text) => setGhera(text)}
          style={gheraValid?styles.valid:styles.invalid}
        />

        <Input
        type="number-pad"
          rounded
          placeholder=" Enter Shalwar length in inches"
          placeholderTextColor="#928988"
          label="9. Shalwar Length"
          onChangeText={(text) => setShalwar(text)}
          style={shalwarValid?styles.valid:styles.invalid}
        />

        <Button round color="success" style={styles.button}
        onPress={() => update()}
        loading={buttonLoading}>
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
  valid: {
    borderColor: "black",
  },
  invalid: {
    borderColor: "red",
  },
});
