import AsyncStorage from "@react-native-community/async-storage";

//------------------------- login ----------------------------------------
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
//-----------------------------------------------------------------

//---------------------------- signup -------------------------------------
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
      global.signup=data
      console.log(data);
    })
    .catch((error) => {
      alert("something went wrong");
      console.error(error);
    });
}
//-----------------------------------------------------------------

//--------------------------- update measurement --------------------------------------
export async function updateMeasurements(object) {
  console.log("update measurement");
  console.log(object)

  await fetch("https://tailor-marketplace-apis.herokuapp.com/measurement", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      global.userData=data
    })
    .catch((error) => {
      alert("something went wrong");
      console.error(error);
    });
}
//-----------------------------------------------------------------

//--------------------------- upload product  --------------------------------------
export async function uploadproducts(object) {
  console.log("update productts");

  await fetch("https://tailor-marketplace-apis.herokuapp.com/products", {
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
      global.userData=data
    })
    .catch((error) => {
      alert("something went wrong");
      console.error(error);
    });
}
//-----------------------------------------------------------------

//--------------------------- update product  --------------------------------------
export async function updateproduct(object) {
  console.log("update productts");

  await fetch("https://tailor-marketplace-apis.herokuapp.com/products", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      global.userData=data
    })
    .catch((error) => {
      alert("something went wrong");
      console.error(error);
    });
}
//-----------------------------------------------------------------

//----------------------------delete product -------------------------------------
export async function deleteproducts(object) {
  console.log("delete productts");

  await fetch("https://tailor-marketplace-apis.herokuapp.com/products", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      global.userData=data
    })
    .catch((error) => {
      alert("something went wrong");
      console.error(error);
    });
}
//-----------------------------------------------------------------

//------------------------get all tailor-----------------------------------------
export async function getTailors() {
  var tailors
  console.log("get tailors");

  await fetch("https://tailor-marketplace-apis.herokuapp.com/tailors", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      tailors=data
    })
    .catch((error) => {
      alert("something went wrong");
      console.error(error);
    });
    return tailors
}
//-----------------------------------------------------------------

//------------------------- get user ----------------------------------------
export async function getUser(object) {
  var userData;
  console.log("getUser working");

  await fetch("https://tailor-marketplace-apis.herokuapp.com/user", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
    .then((response) => response.json())
    .then((data) => {
      userData=data
      console.log('responce from apisssss============',data);
    })
    .catch((error) => {
      alert("something went wrong");
      console.error(error);
    });
    console.log('responce from apisssss++++++++++++++++',userData);
    global.userData=userData
}
//-----------------------------------------------------------------

//--------------------------- place order --------------------------------------
export async function placeOrder(object) {
  var userData;
  console.log("place order");

  await fetch("https://tailor-marketplace-apis.herokuapp.com/order", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  })
    .then((response) => response.json())
    .then((data) => {
      userData=data
      console.log('responce from apisssss============',data);
    })
    .catch((error) => {
      alert("something went wrong");
      console.error(error);
    });
    console.log('responce from apisssss++++++++++++++++',userData);
    global.userData=userData
}
//-----------------------------------------------------------------