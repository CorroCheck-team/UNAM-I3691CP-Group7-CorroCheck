import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { enableScreens } from "react-native-screens";
import { Ionicons } from "@expo/vector-icons";

import ForgotPasswordScreen from "../Screens/Auth/ForgotPasswordScreen";
import LoginScreen from "../Screens/Auth/LoginScreen";
import SignUpScreen from "../Screens/Auth/SignUpScreen";
import SplashScreen from "../Screens/splashscreen";
import HistoryDetailsScreen from "../Screens/History/HistoryDetailsScreen";
import HistoryScreen from "../Screens/History/HistoryScreen";
import HomeScreen from "../Screens/Home/HomeScreen";
import ProfileScreen from "../Screens/Profile/ProfileScreen";
import ResultScreen from "../Screens/Upload/ResultScreen";
import UploadScreen from "../Screens/Upload/SubmissionScreen";

enableScreens(true);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E8EDF2",
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#1A3050",
        tabBarInactiveTintColor: "#8AAAC8",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "500",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Upload") {
            iconName = focused ? "cloud-upload" : "cloud-upload-outline";
          } else if (route.name === "History") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Upload" component={UploadScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          animation: "none",
          headerShown: false,
        }}
      >
        {/* Auth Screens */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

        {/* Main App - Bottom Tabs */}
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* Screens that sit on top of tabs */}
        <Stack.Screen name="Results" component={ResultScreen} />
        <Stack.Screen name="HistoryDetails" component={HistoryDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

