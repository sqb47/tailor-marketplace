import React, {useState} from 'react';
import { Button, NavBar, Input, Block, Radio, Card, Icon } from 'galio-framework';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

function title(){
    return(
        <Text p style={styles.title}>Search</Text>
    );
}

export default function Search({ navigation }) {
    const [items, setPeople] = useState([
        { name:'name', key:'1' },
        { name:'name', key:'2' },
        { name:'name', key:'3' },
        { name:'name', key:'4' },
        { name:'name', key:'5' },
        { name:'name', key:'6' },
        { name:'name', key:'7' },
        { name:'name', key:'8' },
        { name:'name', key:'9' },
        { name:'name', key:'10' },
        { name:'name', key:'11' },
        { name:'name', key:'12' },
        { name:'name', key:'13' },
        { name:'name', key:'14' },
        { name:'name', key:'15' },
        { name:'name', key:'16' },
        { name:'name', key:'17' },
        { name:'name', key:'18' },
      ]);
 return(
     <View style={styles.container}>
        <NavBar title={title()}/>
        <View style={styles.search}>
            <Input 
                style={styles.input} 
                rounded 
                placeholder="Search" 
                placeholderTextColor="#928988"
                icon="search" iconColor="black" family="feather" right iconeSize={13} 
                // onChangeText={({cars}) => console.log(cars)}
            />
            <Text style={{ fontSize:20 }}>Search Results:</Text>
            <View style={styles.results}>
                <FlatList
                    data={items}
                    renderItem={({ item }) => (
                        <TouchableOpacity>
                            <View style={styles.resultItems}>
                                <Text style={{ fontSize:17 }}>{item.name}</Text>
                            </View>
                            
                        </TouchableOpacity>
                    )}
                />
            </View>
            
        </View>
     </View>
 );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop:20
    },
    input:{
    },
    title:{
        fontSize:25,
        padding:10,
        margin:20
      },
    search:{
        marginLeft:10,
        marginRight:10
    },
    results:{
        borderRadius:20,
        margin:5,
        padding:5,
        height:450,
        backgroundColor:"#d1d1d1"
    },
    resultItems:{
        flexDirection:'row',
        margin:5,
        padding:5,
    }
  });