import React, { useState, useEffect } from "react";
import {
  Button,
  NavBar,
  Input,
  Block,
  Radio,
  Card,
  Icon,
  Text,
} from "galio-framework";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
import { getTailors, getUser } from "../apis/apis";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";
import AsyncStorage from "@react-native-community/async-storage";

function logo() {
  return (
    <View style={styles.search}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
      />
    </View>
  );
}

export default function Home({ navigation }) {
  console.log("djsfhsjdgfngfvgfuhndksf");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  var done = false;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      
      //setData(getTailors())
      // The screen is focused
      // Call any action and update data
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  async function reload() {
    setLoading(true)
    var temp = await getTailors();
    var products = [];
    temp.forEach(myFunction);

    function myFunction(value, index, array) {
      if (value.products.length) {
        value.products.forEach(saveData);
      }
      function saveData(value, index, array) {
        products.push(value);
      }
    }
    var userid
    try {
      userid = await AsyncStorage.getItem('userData');
      if (userid !== null) {
        // We have data!!
        console.log('hello===========\n',userid);
        var data={
          id:userid
        }
        // await getUser(data)

      }else{
        console.log('hello+++++++++++\n',userid);
        navigation.navigate("Account")
      }
    } catch (error) {
      // Error retrieving data
      console.log('hello===========\n',error);
      navigation.navigate("Account")
    }
    setData(products);
    
    setLoading(false)
  }

  function search(navigation) {
    return (
      <View style={styles.search}>
        <Button
        loading={loading}
          onlyIcon
          icon="reload1"
          iconFamily="AntDesign"
          iconSize={20}
          color="grey"
          iconColor="black"
          style={{ width: 35, height: 35 }}
          onPress={() => reload()}
        />

        <Button
          onlyIcon
          icon="search"
          iconFamily="feather"
          iconSize={25}
          color="grey"
          iconColor="black"
          style={{ width: 35, height: 35 }}
          onPress={() => navigation.navigate("Search")}
        />
      </View>
    );
  }
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

  return (
    <View style={styles.container}>
      <NavBar
        style={styles.header}
        title=""
        left={logo()}
        right={search(navigation)}
        onRightPress={() => alert("jjj")}
      />

      <FlatList
        style={styles.products}
        data={data}
        keyExtractor={(e) => e._id}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={() =>navigation.navigate('Product',item)}>
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
  );
}

const styles = StyleSheet.create({
  header:{
    marginTop:-25
  },
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 100,
    borderColor: "#ff0c00",
  },
  cardImage: {
    resizeMode: "stretch",
  },
  navbar: {
    backgroundColor: "black",
    borderBottomWidth: 2,
  },
  search: {
    marginTop: 10,
    flexDirection: "row",
  },
  card: {
    borderWidth: 1,
    marginVertical: 20,
    marginHorizontal:10,
    
    borderRadius: 10,
    borderColor: "lightgrey",
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 250,
  },
  logo:{
    resizeMode: "stretch",
    width:40,
    height:40
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
});
