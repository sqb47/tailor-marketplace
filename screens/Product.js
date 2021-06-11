import React, { useState, useEffect } from "react";
import {
  Button,
  NavBar,
  Input,
  Block,
  Radio,
  Card,
  Text,
} from "galio-framework";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-toast-message";

export default function Product({ navigation, route }) {

  const [people, setPeople] = useState([
    { name: "name", key: "1" },
    { name: "name", key: "2" },
    { name: "name", key: "3" },
    { name: "name", key: "4" },
    { name: "name", key: "5" },
    { name: "name", key: "6" },
    { name: "name", key: "7" },
    { name: "name", key: "8" },
    { name: "name", key: "9" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [name, setname] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [imageData, setaimageData] = useState("");

  const [nameValid, setnameValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [priceValid, setPriceValid] = useState(true);
  const [timeValid, setTimeValid] = useState(true);

  // const [product, setproduct] = useState(data);

  const pickImage = async () => {
    permitions();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      width: 500,
      height: 500,
      aspect: [4, 3],
      quality: 0.1,
    });

    console.log(result);

    const compressImage = async (uri, format = SaveFormat.JPEG) => {
      // SaveFormat.PNG
      const result = await manipulateAsync(
        uri,
        [{ resize: { width: 800, height: 600 } }],
        { compress: 0.7, format }
      );
      console.log("result in function", result);
      const base64 = await FileSystem.readAsStringAsync(result.uri, {
        encoding: "base64",
      });
      console.log(base64);
      setaimageData(base64);
      // return  { name: `${Date.now()}.${format}`, type: `image/${format}`, ...result };
      // return: { name, type, width, height, uri }
    };

    console.log(compressImage(result.uri));
    // const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' })
    // console.log(base64)

    if (!result.cancelled) {
      // setImage(result.uri);
    }
  };

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
    console.log("---------");
    setLoading(true);
    resetValidation();
    var upload = false;

    console.log("before:", nameValid, descriptionValid, priceValid, timeValid);
    console.log("values:", name, description, price, time);
    if (emptyFields(name, description, price, time)) {
      setnameValid(emptyField(name));
      setDescriptionValid(emptyField(description));
      setPriceValid(emptyField(price));
      setTimeValid(emptyField(time));
    } else {
      upload = numberValidation(price) && numberValidation(time);
      setPriceValid(numberValidation(price));
      setTimeValid(numberValidation(time));
    }
    var date = new Date();

    var data = {
      id: global.userData._id,
      name: name,
      description: description,
      date: "" + date,
      image: imageData,
      price: price,
      days: time,
    };

    console.log("=======data===========\n", data);
    console.log("uploaad variable", upload);
    if (upload) {
      await uploadproducts(data);
    }

    setLoading(false);
  }
  var product = route.params;
  console.log(product);

  function cart() {
    global.cart.push(product);

    console.log(global.cart[0]._id);
    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Added to cart",
      text2: "Product added to cart, please check cart",
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 10,
    });
  }

  function Buttons() {
    if (global.userData.accounttype == "Tailor") {
      return <View></View>;
    } else {
      return (
        <Button
          round
          color="success"
          style={styles.button}
          onPress={() => cart()}
        >
          Add to Cart
        </Button>
      );
    }
  }

  var imgs = [
    { uri: "data:image/jpeg;base64," + product.image },
    { uri: "data:image/jpeg;base64," + product.image },
    { uri: "data:image/jpeg;base64," + product.image },
    { uri: "data:image/jpeg;base64," + product.image },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* <Image source={require("../assets/placeholder.jpeg")} style={styles.image} /> */}
        <SliderBox images={imgs} />
        <Text h5 color="grey">
          {product.name}
        </Text>
        <Text p color="grey">
          {product.description}
        </Text>
        <View style={styles.cardFooter}>
          <Text p color="#19ce0f">
            Rs: {product.price}
          </Text>
          <Text p color="#19ce0f">
            Days to complete: {product.days}
          </Text>
        </View>
      </View>

      <Buttons></Buttons>

      <FlatList
        horizontal
        data={global.products}
        renderItem={({ item }) => (
          <View style={{width:200, height:220}}>
            <TouchableOpacity onPress={() =>navigation.navigate('Product',item)}>
              <View style={styles.card}>
                <Image
                  source={{uri:'data:image/jpeg;base64,' +item.image}}
                  style={styles.image}
                />
                <Text h5 color="grey">
                  {item.name}
                </Text>
                <View style={styles.cardFooter}>
                  <Text p color="#19ce0f">
                    Rs: {item.price}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          
        )}
        showsHorizontalScrollIndicator={false}
      />

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  options: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
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
    marginHorizontal: 5,
    borderRadius: 10,
    borderWidth:1,
    borderColor: "lightgrey",
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 141,
    resizeMode: 'contain',
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
    alignSelf: "center",
  },
  valid: {
    borderColor: "black",
  },
  invalid: {
    borderColor: "red",
  },
});
