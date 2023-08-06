import { NativeRouter, Routes, Route, Link, useNavigate } from "react-router-native";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ImageBackground, Image } from 'react-native';
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Main , Login , Regis , RegisCustomer , RegisStore , Membertype } from "./src";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="Home" component={Main} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Regis" component={Regis} />
            <Stack.Screen name="Regis_customer" component={RegisCustomer} />
            <Stack.Screen name="Regis_store" component={RegisStore} />
            <Stack.Screen name="Member_type" component={MemberType} />
          </Stack.Navigator>
        </NavigationContainer>
  );
}