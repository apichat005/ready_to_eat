import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { First, Login, Regis, RegisCustomer, RegisStore, MemberType, HomeCustomer, HomeStore, ListProductCustomer, ListProductStore, AddProduct, Useraccount , Edit_profile_stores } from "./src";
import { PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [status, setStatus] = useState<string>('');
  const [dataDetail, setDataDetail] = useState<string[]>();

  useEffect(() => {
    AsyncStorage.getItem('data').then((value) => {
      if (value != null) {
        const data = JSON.parse(value);
        setStatus(data[0]['role']);
      }
    })
  }, [])

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
          }}
        >
          {
            status == '' || status == 'c' ? (
              <Stack.Screen name="Home_customer" component={HomeCustomer}
                initialParams={{ dataDetail: dataDetail }}
              />
            )
              : (
                <Stack.Screen name="Home_store" component={HomeStore}
                  initialParams={{ dataDetail: dataDetail }}
                />
              )
          }

          <Stack.Screen name="Home" component={First} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Regis" component={Regis} />
          <Stack.Screen name="Regis_customer" component={RegisCustomer} />
          <Stack.Screen name="Regis_store" component={RegisStore} />
          <Stack.Screen name="Member_type" component={MemberType} />
          <Stack.Screen name="List_product_customer" component={ListProductCustomer} />
          <Stack.Screen name="List_product_store" component={ListProductStore} />
          <Stack.Screen name="Add_product" component={AddProduct} />
          <Stack.Screen name="Edit_profile_stores" component={Edit_profile_stores} />
          <Stack.Screen
            name="Useraccount"
            component={Useraccount}
            initialParams={{ dataDetail: dataDetail }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}