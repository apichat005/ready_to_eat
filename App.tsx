import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { First , Login , Regis , RegisCustomer , RegisStore , MemberType , HomeCustomer } from "./src";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen name="Home" component={First} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Regis" component={Regis} />
            <Stack.Screen name="Regis_customer" component={RegisCustomer} />
            <Stack.Screen name="Regis_store" component={RegisStore} />
            <Stack.Screen name="Member_type" component={MemberType} />
            <Stack.Screen name="Home_customer" component={HomeCustomer} />
          </Stack.Navigator>
        </NavigationContainer>
  );
}