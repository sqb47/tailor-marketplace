import React, { Component, useState } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Table, Row, Rows, Col, cols } from 'react-native-table-component';

var cars = ["Saab", "Volvo"];
var items = [
    [1, 2],
    [3, 4],
    [5, 6]
  ];

  let UID123_object = {
    name: 'Chris',
    age: 30,
    traits: { hair: 'brown', eyes: 'brown' }
  };
  // You only need to define what will be added or updated
  let UID123_delta = {
    age: 31,
    traits: { eyes: 'blue', shoe_size: 10 }
  };
  
 
export default class ExampleOne extends Component {
  

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Rows data={items} textStyle={styles.text}/>
        </Table>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, textAlign:'center' }
});