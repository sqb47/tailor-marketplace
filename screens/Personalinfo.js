import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Block, DeckSwiper, Text, Icon, Button } from "galio-framework";
import AsyncStorage from "@react-native-community/async-storage";
import { ScrollView } from "react-native-gesture-handler";

// console.log('personal info',global.userData.fullname)
//console.log(userInfo)

export default function PersonalInfo({ navigation }) {
  return (
    <ScrollView style={styles.scrollview}>
      <View style={styles.container}>

        <Icon name="user" family="Entypo" color="#19ce0f" size={80} />

        <View style={styles.section}>

          <Text h5 color="#19ce0f">
            User Info
          </Text>

          <View style={styles.sectionBody}>
            <View style={styles.field}>
              <Text p color="#000">
                Name:
              </Text>
              <Text p>
                {global.userData == undefined
                  ? "-------"
                  : global.userData.fullname}
              </Text>
            </View>

            <View style={styles.field}>
              <Text p color="#000">
                Email:
              </Text>
              <Text p>
                {global.userData == undefined
                  ? "-------"
                  : global.userData.email}
              </Text>
            </View>

            <View style={styles.field}>
              <Text p color="#000">
                Phone Number:
              </Text>
              <Text p>
                {global.userData == undefined
                  ? "-------"
                  : global.userData.fullname}
              </Text>
            </View>

            <View style={styles.field}>
              <Text p color="#000">
                Account Type:
              </Text>
              <Text p>
                {global.userData == undefined
                  ? "-------"
                  : global.userData.accounttype}
              </Text>
            </View>

            {/* <View style={styles.fieldButton}>
              <Button round color="success">Edit</Button>
            </View> */}

          </View>
        </View>

        <View style={styles.section}>

          <Text h5 color="#19ce0f">
            User Measurment
          </Text>

          <View style={styles.sectionBody}>

            <View style={styles.field}>
              <Text p color="#000">
                Neck Collar:
              </Text>
              <Text p>{global.userData == undefined
                  ? "-------"
                  : global.userData.measurement.neck}</Text>
            </View>

            <View style={styles.field}>
              <Text p color="#000">
                Shoulder:
              </Text>
              <Text p>{global.userData == undefined
                  ? "-------"
                  : global.userData.measurement.shoulder}</Text>
            </View>

            <View style={styles.field}>
              <Text p color="#000">
                Chest:
              </Text>
              <Text p>{global.userData == undefined
                  ? "-------"
                  : global.userData.measurement.chest}</Text>
            </View>

            <View style={styles.field}>
              <Text p color="#000">
                Waist:
              </Text>
              <Text p>{global.userData == undefined
                  ? "-------"
                  : global.userData.measurement.waist}</Text>
            </View>

            <View style={styles.field}>
              <Text p color="#000">
                Hips:
              </Text>
              <Text p>{global.userData == undefined
                  ? "-------"
                  : global.userData.measurement.hips}</Text>
            </View>

            <View style={styles.field}>
              <Text p color="#000">
                Sleve Length:
              </Text>
              <Text p>{global.userData == undefined
                  ? "-------"
                  : global.userData.measurement.slevelength}</Text>
            </View>

            <View style={styles.field}>
              <Text p color="#000">
                Length:
              </Text>
              <Text p>{global.userData == undefined
                  ? "-------"
                  : global.userData.measurement.length}</Text>
            </View>

            <View style={styles.field}>
              <Text p color="#000">
                Ghera:
              </Text>
              <Text p>{global.userData == undefined
                  ? "-------"
                  : global.userData.measurement.ghera}</Text>
            </View>

            <View style={styles.field}>
              <Text p color="#000">
                Shalwar Length:
              </Text>
              <Text p>{global.userData == undefined
                  ? "-------"
                  : global.userData.measurement.salwarlength}</Text>
            </View>
            
            <View style={styles.fieldButton}>
              <Button round color="success" onPress={() => navigation.navigate('MeasurmentForm')}>
                Edit
              </Button>
            </View>

          </View>
        </View>
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
  section: {
    marginVertical: 10,
    width: "100%",
  },
  sectionBody: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: "lightgrey",
    padding: 15,
  },
  field: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fieldButton:{
    alignSelf:'center'
  },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  text: { margin: 6 },
});
