import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "@/screens/Home";
import OnboardingScreen from "@/screens/OnboardingScreen";
import { NavigationContainer } from "@react-navigation/native";
export default function Index() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
