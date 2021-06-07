import React, { useState } from "react";
import { Button, Input, Text, Icon, Card } from "galio-framework";
import { StyleSheet, View, ScrollView, Image, FlatList } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator'; 
import Toast from "react-native-toast-message";
import Modal from "react-native-modal";

FileSystem.readAsStringAsync()
import {
  emptyFields,
  numberValidation,
  emptyField,
} from "../validation/validation";
import { uploadproducts } from "../apis/apis";
import { TouchableOpacity } from "react-native-gesture-handler";

let data=[]
try{
data = global.userData.products;
}catch(e){
  console.log(e)
}
async function permitions() {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
  
}

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';

function getDataUrl(img) {
  document
  // Create canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  // Set width and height
  canvas.width = img.width;
  canvas.height = img.height;
  // Draw the image
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL(img.url);
}





export default function Shop({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [name, setname] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [imageData,setaimageData]=useState("");

  const [nameValid, setnameValid] = useState(true);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [priceValid, setPriceValid] = useState(true);
  const [timeValid, setTimeValid] = useState(true);

  const [product, setproduct] = useState(data);

  const pickImage = async () => {
    permitions()
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      width:500,
      height:500,
      aspect: [4, 3],
      quality: 0.1,
    });

    console.log(result);

    const compressImage = async (uri, format = SaveFormat.JPEG) => { // SaveFormat.PNG
      const result = await manipulateAsync(
          uri,
          [{ resize: { width: 800, height:600 } }],
          { compress: 0.7, format }
      );
      console.log('result in function',result)
      const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' })
      console.log(base64)
      setaimageData(base64)
      // return  { name: `${Date.now()}.${format}`, type: `image/${format}`, ...result };
      // return: { name, type, width, height, uri }
    };

    console.log(compressImage(result.uri))
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
      image: imageData,
      price: price,
      days: time,
    };

    console.log("=======data===========\n",data);
    console.log('uploaad variable',upload)
    if (upload) {
      await uploadproducts(data);
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
            <View style={{ flexDirection: "row" }}>
              <Text p> Average reviews: </Text>
              <Icon name="star" family="Entypo" color="yellow" size={22} />
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
                onPress={() => navigation.navigate("Product", item)}
              >
                <View style={styles.card}>
                  <Image
                    source={{uri:'data:image/jpeg;base64,' +item.image}}
                    style={styles.image}
                  />
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
                  color="warning"
                  style={styles.button}
                  onPress={pickImage}
                >
                  pick image
                </Button>

                {/* {image && (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 200, height: 200 }}
                  />
                )} */}

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
