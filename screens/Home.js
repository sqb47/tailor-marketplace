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
import { getTailors } from "../apis/apis";
import { ReloadInstructions } from "react-native/Libraries/NewAppScreen";

function logo() {
  return (
    <View style={styles.search}>
      <Text>logo</Text>
    </View>
  );
}

export default function Home({ navigation }) {
  console.log("djsfhsjdgfngfvgfuhndksf");
  const [data, setData] = useState([]);
  var done = false;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      var temp = [
        { name: "name", key: "1" },
        { name: "name", key: "2" },
        { name: "name", key: "3" },
        { name: "name", key: "4" },
        { name: "name", key: "5" },
        { name: "name", key: "6" },
        { name: "name", key: "7" },
        { name: "name", key: "8" },
        { name: "name", key: "9" },
      ];
      temp.forEach(myFunction);

      function myFunction(value, index, array) {
        console.log(value, index);
      }
      console.log("jkbgfdjksafjkegfejksbgf");
      //setData(getTailors())
      // The screen is focused
      // Call any action and update data
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  async function reload() {
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
    setData(products);
  }

  function search(navigation) {
    return (
      <View style={styles.search}>
        <Button
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
        style={StyleSheet.navbar}
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
            <TouchableOpacity onPress={() => alert("Simple Button pressed")}>
              <View style={styles.card}>
                <Image
                  source={require("../assets/placeholder.jpeg")}
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
      {/* <View style={styles.body}>
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
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
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
  card: {
    margin: 10,
  },
  cardImage: {
    width: 340,
    height: 250,
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
});
