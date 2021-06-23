import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Navigation,
  NavigatorIOS,
  TextInput,
  FlatList,
  ScrollView,
  SafeAreaView,
  Image,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import axios from 'axios';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
import { SocialIcon } from 'react-native-elements';

const CustomSidebarMenu = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Top Large Image */}

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

function firstScreenStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Users">
      <Stack.Screen
        name="Users"
        component={Users}
        options={{
          title: 'Users Details', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: 'blue', //Set Header color
          },
          headerTintColor: 'white', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function secondScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Todos"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: 'blue', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Todos"
        component={Todos}
        options={{
          title: 'Todos', //Set Header Title
        }}
      />
      <Stack.Screen
        name="Albums"
        component={Albums}
        options={{
          title: 'Albums', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

function thirdScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Todos"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: 'blue', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="Albums"
        component={Albums}
        options={{
          title: 'Albums', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

function User_Display({ navigation }) {
  const [user_data, set_user_data] = useState([]);
  const [reloading, set_reloading] = useState(true);

  const localObj = user_data;

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => {
        return set_user_data(json);
      })
      .catch((error) => console.error(error))
      .finally(() => set_reloading(false));
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <FlatList
            data={localObj.sort((a, b) => a.name.localeCompare(b.name))}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.display_view}
                  onPress={() => {
                    navigation.navigate('User infromation', {
                      paramkey_user: item,
                    });
                  }}
                  >
                  <View style={styles.display_text}>
                    <Text>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.username}
          />
        </View>
      </View>
    </ScrollView>
  );
}

function User_infinformation({ navigation, route }) {
  const user_information = route.params.paramkey_user;
  return (
    <View style={styles.container}>
      <View style={styles.padding}>
        <Text style={styles.text1}> Email: {user_information.email}</Text>
      </View>

      <View style={styles.padding}>
        <Text style={styles.text1}>
          {' '}
          Street:{user_information.address.street}
        </Text>
      </View>

      <View style={styles.padding}>
        <Text style={styles.text1}>
          {' '}
          Suite:{user_information.address.suite}
        </Text>
      </View>

      <View style={styles.padding}>
        <Text style={styles.text1}> City: {user_information.address.city}</Text>
      </View>

      <View style={styles.padding}>
        <Text style={styles.text1}>
          {' '}
          Zipcode :{user_information.address.zipcode}
        </Text>
      </View>
    </View>
  );
}

function Users({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User Display"
        component={User_Display}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="User infromation" component={User_infinformation} />
    </Stack.Navigator>
  );
}

function Todos({ navigation }) {
  return <View></View>;
}

function Albums({ navigation }) {
  return <View></View>;
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: 'white',
          backgroundColor: 'white',
          itemStyle: { marginVertical: 5 },
          activeBackgroundColor: 'blue',
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}>
        <Drawer.Screen
          name="Users"
          options={{ drawerLabel: 'Users' }}
          component={firstScreenStack}
        />
        <Drawer.Screen
          name="Todos"
          options={{ drawerLabel: 'Todos' }}
          component={secondScreenStack}
        />
        <Drawer.Screen
          name="Albums "
          options={{ drawerLabel: 'Albums' }}
          component={thirdScreenStack}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  text1: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'blue',
    borderWidth: 3,
    borderColor: 'blue',
  },
  padding: {
    paddingTop: 10,
  },

  display_view: {
    backgroundColor: 'blue',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  display_text: {
    backgroundColor: 'white',
    width: 250,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
});
