// import * as React from "react";
// import { View, Text, Button } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate("Details")}
//       />
//     </View>
//   );
// }

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// function DetailsScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Details Screen</Text>
//     </View>
//   );
// }

// function DetailsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Details Screen</Text>
//       <Button
//         title="Go to Details... again"
//         onPress={() => navigation.push("Details")}
//       />
//       <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// const Stack = createNativeStackNavigator();

// function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
// <Stack.Screen name="Details" component={DetailsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;

// ========================================================================
// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

// function HomeStackScreen() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Settings" component={SettingsScreen} />
//     </Stack.Navigator>
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeStackScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// ----------------------------------------------------------------------------

// import * as React from "react";
// import { Text, View, Button } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// function DetailsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//       <Text>Details Screen</Text>
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

// function ProfileScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Profile!</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate("Details")}
//       />
//     </View>
//   );
// }

// const Stack = createNativeStackNavigator();

// function HomeStackScreen() {
//   return (
//     <Stack.Navigator initialRouteName="Profile">
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//       <Stack.Screen name="Details" component={DetailsScreen} />
//     </Stack.Navigator>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="HomeStack" component={HomeStackScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

// задание

import * as React from "react";
import { Text, View, Button, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function MainPage({ navigation }) {
  return (
    <View>
      <Button title="Bank" onPress={() => navigation.navigate("BankPage")} />
      <Button title="Support" />
      <Button
        title="Profile"
        onPress={() => navigation.navigate("ProfilePage")}
      />
    </View>
  );
}

function ProfilePage() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [profileInfo, setProfileInfo] = useState("");

  useEffect(() => {
    (async () => {
      const profileInfo = await AsyncStorage.getItem("profileInfo");
      if (profileInfo === null) {
        setProfileInfo("");
      } else {
        setProfileInfo(JSON.parse(profileInfo));
      }
    })();
  }, []);

  const saveInfo = async () => {
    const info = {
      name: name,
      surname: surname,
      email: email,
      number: number,
    };
    setProfileInfo(info);
    await AsyncStorage.setItem("profileInfo", JSON.stringify(info));
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Name"
        placeholderTextColor="white"
        style={{
          width: "100%",
          backgroundColor: "gray",
          color: "white",
          marginBottom: 10,
          padding: 10,
        }}
        value={profileInfo ? profileInfo.name : name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Surname"
        placeholderTextColor="white"
        style={{
          width: "100%",
          backgroundColor: "gray",
          color: "white",
          marginBottom: 10,
          padding: 10,
        }}
        value={profileInfo ? profileInfo.surname : surname}
        onChangeText={(text) => setSurname(text)}
      />
      <TextInput
        placeholder="Phone number"
        placeholderTextColor="white"
        style={{
          width: "100%",
          backgroundColor: "gray",
          color: "white",
          marginBottom: 10,
          padding: 10,
        }}
        value={profileInfo ? profileInfo.number : number}
        onChangeText={(text) => setNumber(text)}
      />
      <TextInput
        placeholder="Email"
        placeholderTextColor="white"
        style={{
          width: "100%",
          backgroundColor: "gray",
          color: "white",
          marginBottom: 10,
          padding: 10,
        }}
        value={profileInfo ? profileInfo.email : email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button
        title="Save"
        disabled={!name || !surname || !email || !number}
        onPress={saveInfo}
      />
    </View>
  );
}

function BankPage() {
  const [inputValue, setInputValue] = useState("");
  const [bankMoney, setBankMoney] = useState(0);

  useEffect(() => {
    (async () => {
      const bankMoney = await AsyncStorage.getItem("bankMoney");
      if (bankMoney === null) {
        setBankMoney(0);
      } else {
        setBankMoney(JSON.parse(bankMoney));
      }
    })();
  }, []);

  const setMoneyIntoBank = async () => {
    if (!isNaN(+inputValue)) {
      const finalSum = bankMoney + +inputValue;
      setBankMoney(finalSum);
      setInputValue("");
      await AsyncStorage.setItem("bankMoney", JSON.stringify(finalSum));
    }
  };

  const getMoneyFromBank = async () => {
    if (!isNaN(+inputValue)) {
      const finalSum = bankMoney - +inputValue;
      setBankMoney(finalSum);
      setInputValue("");
      await AsyncStorage.setItem("bankMoney", JSON.stringify(finalSum));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ padding: 10 }}>{bankMoney}$</Text>
      <TextInput
        inputMode="numeric"
        keyboardType="numeric"
        placeholder="Sum"
        placeholderTextColor="white"
        style={{
          width: "100%",
          backgroundColor: "gray",
          color: "white",
          padding: 10,
        }}
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
      <Button
        title="Get money"
        onPress={getMoneyFromBank}
        disabled={!inputValue}
      />
      <Button
        title="Set money"
        onPress={setMoneyIntoBank}
        disabled={!inputValue}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="BankPage" component={BankPage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
