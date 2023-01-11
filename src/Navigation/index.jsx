import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/AuthScreens/Login';
import SignUp from '../screens/AuthScreens/SignUp';
import LandingScreen from '../screens/AuthScreens/LandingScreen';
import ForgotPassword from '../screens/AuthScreens/ForgotPassword';
import {mainTab} from '../Global/GlobalCSS';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StudentHome from '../screens/Home/StudentHome';
import {Image, Text, View} from 'react-native';
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: mainTab,
        activeTintColor: '#0A1A2E',
        inactiveTintColor: '#0A1A2E',
      }}>
      <Tab.Screen
        name="Home"
        component={StudentHome}
        options={{
          headerShown: null,
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({focused, color, size}) => {
            const colors = focused ? '#0A1A2E' : '#E0E0E0';
            return <EntypoIcons name="home" size={25} color={colors} />;
          },
        }}
      />
      {/* <Tab.Screen
        name="Analytics"
        component={StudentHome}
        options={{
          headerShown: null,
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({focused, color, size}) => {
            const colors = focused ? '#0A1A2E' : '#E0E0E0';
            return (
              <MaterialCommunityIcons
                name="google-analytics"
                size={25}
                color={colors}
              />
            );
          },
        }}
      /> */}
      <Tab.Screen
        name="ScanQR"
        component={StudentHome}
        options={{
          // tabBarStyle: {display: 'none'},
          headerShown: null,
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({focused, color, size}) => {
            const colors = focused ? '#0A1A2E' : '#E0E0E0';

            return (
              // <View
              // // onStartShouldSetResponder={haptic}
              // >
              <View
                style={{
                  width: '40%',
                  height: '200%',
                  // justifyContent: 'cen',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    height: '60%',
                    backgroundColor: '#FBB718',
                    width: '100%',
                    borderRadius: 30,
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Fontisto name="search" size={35} color={colors} />
                </View>
              </View>
            );
          },
          navigationOptions: () => {
            return {
              tabBarVisible: false,
            };
          },
        }}
      />
      {/* <Tab.Screen
        name="Themes"
        component={Themes}
        options={{
          headerShown: null,
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({focused, color, size}) => {
            const colors = focused ? '#003087' : '#E0E0E0';
            return <FontAwesomeIcon5 name="brush" size={25} color={colors} />;
          },
        }}
      /> */}
      <Tab.Screen
        name="Settings"
        component={StudentHome}
        options={{
          headerShown: null,
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({focused, color, size}) => {
            const colors = focused ? '#0A1A2E' : '#E0E0E0';
            return <Ionicons name="settings" size={25} color={colors} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingScreen">
        <Stack.Screen
          name="LoginScreen"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={MyTabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
