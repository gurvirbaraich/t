import { useFonts } from 'expo-font';
import Onboarding from './screens/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from 'react-native';
import { getItemAsync, setItemAsync } from "expo-secure-store";
import React from 'react';
import Home from './screens/Home';
import CountDown from './screens/CountDown';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    "poppins": require("./assets/fonts/poppins/Poppins-Regular.ttf"),
    "bungee": require("./assets/fonts/bungee/BungeeInline-Regular.ttf"),
    "poppins-thin": require("./assets/fonts/poppins/Poppins-Light.ttf"),
    "poppins-bold": require("./assets/fonts/poppins/Poppins-SemiBold.ttf"),
  }); 

  const getValue = async function () {
    return await getItemAsync("finished_onboarding");
  }

  const [fonboarding] = React.useState(getValue());

  if (!loaded) {
    return (
      <Text>Loading Fonts...</Text>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={fonboarding._j == "true" ? "home" : "onboarding"} screenOptions={{ headerShown: false }}>
        <Stack.Screen name='home' component={Home} />
        <Stack.Screen name='onboarding' component={Onboarding} />
        <Stack.Screen name='countdown' component={CountDown} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// setItemAsync("finished_onboarding", "f");