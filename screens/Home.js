import React, {useState} from 'react';
import { Button, NavBar, Input, Block, Radio, Card, Icon } from 'galio-framework';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Image from "../test.png";


function search(navigation){
  return(
    <View style={styles.search}>
      <Button 
      onlyIcon 
      icon="search" 
      iconFamily="feather" 
      iconSize={25} 
      color="grey" 
      iconColor="black" 
      style={{ width: 35, height: 35 }}
      onPress={() => navigation.navigate("Search")} />
    </View>
  );
}

function logo(){
  return(
    <View style={styles.search}>
      <Text>logo</Text>
    </View>
  );
}

export default function Home({ navigation }) {
  const [people, setPeople] = useState([
    { name:'name', key:'1' },
    { name:'name', key:'2' },
    { name:'name', key:'3' },
    { name:'name', key:'4' },
    { name:'name', key:'5' },
    { name:'name', key:'6' },
    { name:'name', key:'7' },
    { name:'name', key:'8' },
    { name:'name', key:'9' },
  ]);
  
  return (
    <View style={styles.container}>
      <NavBar style={StyleSheet.navbar} title="" left={logo()} right={search(navigation)} onRightPress={() => alert("jjj")} />
      
      <FlatList
      data={people}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <TouchableOpacity onPress={() => alert('Simple Button pressed')}>
            <Card
            flex
            caption="caption"
            location="Islamabad"
            borderless
            title = {item.name}
            avatar="http://i.pravatar.cc/100?id=skater"
            imageStyle={styles.cardImage}
            image="https://images.unsplash.com/photo-1497802176320-541c8e8de98d?&w=1600&h=900&fit=crop&crop=entropy&q=300"
            />
          </TouchableOpacity>
        </View>
      )}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    alignItems:'center',
    justifyContent:'center'
    
    
  },
  input:{
    width:100,
    borderColor: "#ff0c00"
  },
  card:{
    margin:10,
  },
  cardImage:{
    width:340,
    height:250,
    resizeMode:"stretch"
  },
  navbar:{
    backgroundColor:"black",
    borderBottomWidth:2
  },
  search:{
    marginTop:10,
  },
});