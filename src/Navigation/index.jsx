import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect } from 'react'
import { View } from 'react-native';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors, mainTab } from '../Global/GlobalCSS';
import ForgotPassword from '../screens/AuthScreens/ForgotPassword';
import LandingScreen from '../screens/AuthScreens/LandingScreen';
import Login from '../screens/AuthScreens/Login';
import SignUp from '../screens/AuthScreens/SignUp';
import ChangePassword from '../screens/ChangePassword';
import StudentHome from '../screens/Home/StudentHome';
import SearchByLocation from '../screens/SearchByLocation';
import SelectedCourse from '../screens/SelectedCourse';
import SelectedTutor from '../screens/SelectedTutor';
import SelectedStudent from '../screens/SelectedStudent';
import TutorJobs from '../screens/TutorJobs';
import SelectCourse from '../screens/SelectCourse';
import SelectJob from '../screens/SelectJob';
import JobCompleted from '../screens/JobCompleted';
import SelectPaymentMethod from '../screens/SelectPaymentMethod';
import SearchScreen from '../screens/SearchScreen';
import Setting from '../screens/Setting';
import UpdateProfile from '../screens/UpdateProfile';
import { useSelector } from 'react-redux';
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
          tabBarIcon: ({ focused, color, size }) => {
            const colors = focused ? Colors.primary : '#E0E0E0';
            return <EntypoIcons name="home" size={25} color={colors} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: null,
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: ({ focused, color, size }) => {
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
                  style={{ right: -3 }}
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
          tabBarIcon: ({ focused, color, size }) => {
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
  const loginDetails = useSelector(state => state?.login)
  useEffect(() => {

  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={loginDetails.accessToken ? "Home" : "LandingScreen"}>
        <Stack.Screen
          name="LoginScreen"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={MyTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfile}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="SearchByLocation"
          component={SearchByLocation}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="SelectCourse"
          component={SelectCourse}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="SelectedCourse"
          component={SelectedCourse}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="SelectedTutor"
          component={SelectedTutor}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="SelectPaymentMethod"
          component={SelectPaymentMethod}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="TutorJobs"
          component={TutorJobs}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="SelectJob"
          component={SelectJob}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="SelectedStudent"
          component={SelectedStudent}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="JobCompleted"
          component={JobCompleted}
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'slide_from_right',
          }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
