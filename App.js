import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MainScreen from "./screens/MainScreen.js";
import { View } from "react-native";
import LoginScreen from "./screens/LoginScreen.js";
import UserProvider from "./stores/UserContext.js";
import Register from './screens/RegisterScreen.js'
import UpdateDeleteScreen from './screens/UpdateDeleteScreen.js'
import dotenv from 'dotenv'
import ManagerScreen from "./screens/ManagerScreen.jsx";
import UpdateManagerScreen from "./screens/UpdateManagerScreen.js";


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ManagerScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="RegisterScreen" component={Register} />
          <Stack.Screen name="UpdateDeleteScreen" component={UpdateDeleteScreen} />
          <Stack.Screen name="ManagerScreen" component={ManagerScreen} />
          <Stack.Screen name="UpdateManagerScreen" component={UpdateManagerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
