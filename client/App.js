// In App.js in a new project

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { name as appName } from "./app.json";

// Screen
import HomeScreen from './src/Screens/HomeScreen';
import DetailsScreen from './src/Screens/DetailScreen';
import UserScreen from './src/Screens/UserScreen';
import WecomeScreen from './src/Screens/WecomeScreen';
import LoginScreen from './src/Screens/LoginScreen'
import SignUpScreen from './src/Screens/SignUpScreen'
import NewPostScreen from './src/Screens/NewPostScreen';
import ListFavouriteScreen from './src/Screens/ListFavouriteScreen'

const Stack = createNativeStackNavigator();
 
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Wecome" component={WecomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="HomeStack" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="user" component={UserScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Post" component={NewPostScreen} />
        <Stack.Screen name="Favourite" component={ListFavouriteScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;