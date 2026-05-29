import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState } from "react";

import ForgotPasswordScreen from "../Screens/Auth/ForgotPasswordScreen";
import LoginScreen from "../Screens/Auth/LoginScreen";
import SignUpScreen from "../Screens/Auth/SignUpScreen";
import HistoryDetailsScreen from "../Screens/History/HistoryDetailsScreen";
import HistoryScreen from "../Screens/History/HistoryScreen";
import HomeScreen from "../Screens/Home/HomeScreen";
import ProfileScreen from "../Screens/Profile/ProfileScreen";
import ResultScreen from "../Screens/Upload/ResultScreen";
import UploadScreen from "../Screens/Upload/SubmissionScreen";
import SplashScreen from "../Screens/splashscreen";

const Stack = createStackNavigator();

export default function AppNavigation() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          animation: "none",
          animationEnabled: false,
          headerShown: false,
          cardStyle: { backgroundColor: "#f4f4f4" },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="Results" component={ResultScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="HistoryDetails" component={HistoryDetailsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
