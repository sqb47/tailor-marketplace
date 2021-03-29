import AsyncStorage from "@react-native-community/async-storage";

export async function login(object) {
  var userData;
  await fetch("https://tailor-marketplace-apis.herokuapp.com/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
    .then((response) => response.json())
    .then((data) => {
      userData = data;
    })
    .catch((error) => {
      alert("something went wrong");
      console.error(error);
    });

    global.userData=userData
  try {
    await AsyncStorage.clear()
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    
  } catch (err) {
    console.log(err);
  }console.log(global.userData) 
}

export async function signup(object) {
  console.log("signup working");

  await fetch("https://tailor-marketplace-apis.herokuapp.com/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      alert("something went wrong");
      console.error(error);
    });
}

export async function updateMeasurements(object) {}