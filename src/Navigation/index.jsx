import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/AuthScreens/Login';
import SignUp from '../screens/AuthScreens/SignUp';
import LandingScreen from '../screens/AuthScreens/LandingScreen';
import ForgotPassword from '../screens/AuthScreens/ForgotPassword';
import {Colors, mainTab} from '../Global/GlobalCSS';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StudentHome from '../screens/Home/StudentHome';
import Setting from '../screens/Setting';
import {View} from 'react-native';
const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: mainTab,
        activeTintColor: Colors.primary,
        inactiveTintColor: Colors.primary,
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
            const colors = focused ? Colors.primary : '#E0E0E0';
            return <EntypoIcons name="home" size={25} color={colors} />;
          },
        }}
      />
      <Tab.Screen
        name="ScanQR"
        component={StudentHome}
        options={{
          headerShown: null,
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({focused, color, size}) => {
            const colors = focused ? Colors.primary : Colors.disable;

            return (
              <View
                style={[
                  mainTab,
                  {
                    position: 'absolute',
                    top: -33,
                    padding: 12,
                    backgroundColor: Colors.secondary,
                    borderRadius: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Fontisto
                  name="search"
                  size={35}
                  color={colors}
                  style={{right: -3}}
                />
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
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          headerShown: null,
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({focused, color, size}) => {
            const colors = focused ? Colors.primary : Colors.disable;
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
      <Stack.Navigator initialRouteName="Home">
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
