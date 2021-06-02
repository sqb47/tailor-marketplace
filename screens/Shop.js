import React, { useState } from "react";
import { Button, Input, Text, Icon, Card } from "galio-framework";
import { StyleSheet, View, ScrollView, Image, FlatList } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";

import {
  emptyFields,
  numberValidation,
  emptyField,
} from "../validation/validation";
import { updateproducts } from "../apis/apis";
import { TouchableOpacity } from "react-native-gesture-handler";

let data=[]
try{
data = global.userData.products;
}catch(e){
  console.log(e)
}



export default function Shop({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [name, setname] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");

  const [nameValid, setnameValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [priceValid, setPriceValid] = useState(true);
  const [timeValid, setTimeValid] = useState(true);

  const [product, setproduct] = useState(data);

  function clearValues() {
    setname("");
    setDescription("");
    setPrice("");
    setTime("");
  }

  function resetValidation(params) {
    setnameValid(true);
    setDescriptionValid(true);
    setPriceValid(false);
    setTimeValid(true);
  }

  async function upload() {
    console.log("---------")
    setLoading(true);
    resetValidation()
    var upload=false
    

    console.log("before:",nameValid , descriptionValid , priceValid , timeValid)
    console.log("values:",name, description, price, time)
    if (emptyFields(name, description, price, time)) {
      setnameValid(emptyField(name));
      setDescriptionValid(emptyField(description));
      setPriceValid(emptyField(price));
      setTimeValid(emptyField(time));
    } else {
      upload=numberValidation(price) && numberValidation(time)
      setPriceValid(numberValidation(price));
      setTimeValid(numberValidation(time));
    }
    var date = new Date();

    var data = {
      id: global.userData._id,
      name: name,
      description: description,
      date: "" + date,
      image: "#",
      price: price,
      days: time,
    };

    console.log("=======data===========\n",data);
    console.log('uploaad variable',upload)
    if (upload) {
      await updateproducts(data);
    }
    

    
    setLoading(false);
  }

  try{
    return (
    <View style={styles.containor}>
      <View style={styles.header}>
        <View>
          <Text color="#19ce0f" h4>
          {" "}
          user name shop{" "}
        </Text>
        <View style={{flexDirection:"row"}}>
        <Text p>
          {" "}
          Average reviews:{" "}
        </Text>
          <Icon name="star" family="Entypo" color='yellow' size={22} />
        </View>
        
        </View>
        
        <View style={styles.rowAlign}>
          <Button
            onlyIcon
            icon="reload1"
            iconFamily="AntDesign"
            iconSize={20}
            color="success"
            iconColor="#fff"
            style={{ width: 40, height: 40 }}
            onPress={() => setproduct(global.userData.products)}
          />

          <Button
            onlyIcon
            icon="plus"
            iconFamily="Entypo"
            iconSize={30}
            color="success"
            iconColor="#fff"
            style={{ width: 40, height: 40 }}
            onPress={() => {
              clearValues();
              setModalVisible(true);
            }}
          />
        </View>
      </View>
      <View style={styles.body}>
        <FlatList
          style={styles.products}
          data={product}
          keyExtractor={(e) => e._id}
          renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() =>navigation.navigate('Product',item)}>
              <View style={styles.card}>
              <Image source={require("../assets/placeholder.jpeg")} style={styles.image} />
              <Text h5 color="grey">
                {item.name}
              </Text>
              <Text p color="grey">
                {item.description}
              </Text>
              <View style={styles.cardFooter}>
                <Text p color="#19ce0f">
                  Rs: {item.price}
                </Text>
                <Text p color="#19ce0f">
                  Days to complete: {item.days}
                </Text>
              </View>
            </View>
            </TouchableOpacity>
            
          )}
        />
      </View>
      <Modal
        transparent={true}
        isVisible={modalVisible}
        avoidKeyboard
        onBackdropPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text color="#19ce0f" h4>
              {" "}
              Add New Product{" "}
            </Text>
            <Button
              onlyIcon
              icon="close"
              iconFamily="FontAwesome"
              iconSize={20}
              color="red"
              iconColor="#fff"
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            />
          </View>
          <KeyboardAwareScrollView>
            <View style={styles.modalBody}>
              <Input
                style={nameValid ? styles.valid : styles.invalid}
                rounded
                placeholder="Enter Product Name"
                placeholderTextColor="#928988"
                label="Name"
                onChangeText={(text) => setname(text)}
              />

              <Input
                style={descriptionValid ? styles.valid : styles.invalid}
                rounded
                placeholder="Enter Product Description"
                placeholderTextColor="#928988"
                label="Description"
                onChangeText={(text) => setDescription(text)}
              />

              <Input
                type="numeric"
                style={priceValid ? styles.valid : styles.invalid}
                rounded
                placeholder="Enter Product Price"
                placeholderTextColor="#928988"
                label="Price"
                onChangeText={(text) => setPrice(text)}
              />

              <Input
                type="numeric"
                style={timeValid ? styles.valid : styles.invalid}
                rounded
                placeholder="Enter days to complete Task"
                placeholderTextColor="#928988"
                label="Days"
                onChangeText={(text) => setTime(text)}
              />

              <Button
                round
                uppercase
                color="success"
                style={styles.button}
                loading={loading}
                onPress={() => upload()}
              >
                Upload
              </Button>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </Modal>
    </View>
  );
  }catch(e){
    console.log(e)
    return(
      <View>
        <Text>
          please login
        </Text>
        
      </View>
    )
  }

  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    height: 1000,
  },
  header: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 1,
  },
  rowAlign: {
    flexDirection: "row",
  },
  body: {
    width: "100%",
    paddingHorizontal: 10,
  },
  card: {
    borderWidth: 1,
    marginVertical: 20,
    borderRadius: 10,
    borderColor: "lightgrey",
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 250,
    resizeMode: "stretch",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "lightgrey",
    borderTopWidth: 1,
  },
  footerText: {
    color: "#19ce0f",
  },
  products: {
    height: "87%",
    width: "100%",
  },
  modal: {
    alignSelf: "center",
    width: 320,
    height: "93%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  closeButton: {
    width: 25,
    height: 25,
    marginBottom: 35,
  },
  modalBody: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  button: {
    width: 270,
    marginVertical: 30,
  },
  valid: {
    borderColor: "black",
  },
  invalid: {
    borderColor: "red",
  },
});
