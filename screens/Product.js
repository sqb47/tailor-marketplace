import React, {useState, useEffect} from 'react';
import { Button, NavBar, Input, Block, Radio, Card, Text } from 'galio-framework';
import { StyleSheet, View, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import AsyncStorage from "@react-native-community/async-storage";
import Toast from 'react-native-toast-message';




export default function Product({ navigation, route }) {

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
    var product = route.params
    console.log(product)

    function cart() {
      global.cart.push(product)
      console.log(global.userData)
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Added to cart',
        text2: 'Product added to cart, please check cart',
        visibilityTime: 3000,
        autoHide: true,
        bottomOffset: 10,
      }); 

    }

    function Buttons() {
      if(global.userData.accounttype == 'Tailor'){
        return(
          <View style={styles.options}>
            <Button
            onlyIcon
            icon="edit"
            iconFamily="AntDesign"
            iconSize={25}
            iconColor="white"
            style={{ width: 50, height: 50 }}
            round
            color='warning'
            onPress={() => {
              clearValues();
              setModalVisible(true);
            }}>
              Delete
            </Button>

            <Button
            onlyIcon
            icon="delete"
            iconFamily="AntDesign"
            iconSize={25}
            iconColor="white"
            style={{ width: 50, height: 50 }}
            round
            color='red'
            onPress={() => console.log('sk')}>
              update
            </Button>
          </View>
        )
      } else {
        return(
          <Button
            round
            color='success'
            style={styles.button}
            onPress={() => cart()}>
              Add to Cart
            </Button>
          )
      }
      
    }

    var imgs=[
      {uri:'data:image/jpeg;base64,' +product.image},
      {uri:'data:image/jpeg;base64,' +product.image},
      {uri:'data:image/jpeg;base64,' +product.image},
      {uri:'data:image/jpeg;base64,' +product.image},
      
    ]
    return(
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

            

            
            <Toast ref={(ref) => Toast.setRef(ref)} />
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
                Update Product{" "}
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
    )
}


const styles = StyleSheet.create({
    container: {
      flex:1
    },
    options: {
      width: "100%",
      height: 70,
      flexDirection: "row",
      alignItems: "center",
      justifyContent:'flex-end',
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
      marginVertical: 20,
      marginHorizontal:5,
      borderRadius: 10,
      borderColor: "lightgrey",
    },
    image: {
      width: "100%",
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
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
      alignSelf:'center'
    },
    valid: {
      borderColor: "black",
    },
    invalid: {
      borderColor: "red",
    },
  });