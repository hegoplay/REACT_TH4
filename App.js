import { StatusBar } from 'expo-status-bar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './screens/MainScreen.js'
import { View } from 'react-native';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='MainScreen' component={MainScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}


