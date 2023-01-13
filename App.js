import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

//screens and components
import ManageGoal from "./screens/ManageGoal";
import ViewGoals from "./screens/ViewGoals";
import ManageTask from "./screens/ManageTask";
import Information from "./screens/Information";
import CompletedGoals from "./screens/CompletedGoals";
import DailyFocus from "./screens/DailyFocus";
import { GlobalStyles } from "./constants/colors";
import IconButton from "./components/UI/IconButton";
import GoalContextProvider from "./storage/goal-context";
import GoalDetails from "./screens/GoalDetails";
import User from "./screens/User";

const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AgileLifeDevelopmentOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.layer1 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.layer1 },
        tabBarActiveTintColor: GlobalStyles.colors.white,
        //tabBarInactiveTintColor: GlobalStyles.colors.layer4,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon={"person"}
            size={30}
            color={tintColor}
            onPress={() => {
              navigation.navigate("User");
            }}
          />
        ),
        headerLeft: ({ tintColor }) => (
          <IconButton
            icon={"information-circle-outline"}
            size={30}
            color={tintColor}
            onPress={() => {
              navigation.navigate("Information");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="Focus"
        component={DailyFocus}
        options={{
          titile: "Focus",
          tabBarLabel: "Focus",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Goals"
        component={ViewGoals}
        options={{
          titile: "Goals",
          tabBarLabel: "Goals",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="git-merge" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Completed goals"
        component={CompletedGoals}
        options={{
          titile: "Completed",
          tabBarLabel: "Completed",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-circle" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

// options headerShown: false hides the 'Aim' header but it will show in a stack screen- a 'stacked' overlay screen.
// make the header dynamic to show the goal name?

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <GoalContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={({ navigation }) => ({
              headerStyle: { backgroundColor: GlobalStyles.colors.layer1 },
              headerTintColor: "#fff",
              // headerRight: ({ tintColor }) => (
              //   <IconButton icon={"close"} size={30} color={tintColor}
              //   onPress={() => {navigation.goBack()}} />
              // ),
            })}
          >
            <Stack.Screen
              name="Back"
              component={AgileLifeDevelopmentOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Manage Goal"
              component={ManageGoal}
              options={{
                presentation: "modal",
              }}
            />
            <Stack.Screen name="Manage Task" component={ManageTask} />
            <Stack.Screen name="Information" component={Information} />
            <Stack.Screen
              name="GoalDetails"
              component={GoalDetails}
              options={{
                presentation: "modal",                
              }}
            />
            <Stack.Screen name="User" component={User} />
          </Stack.Navigator>
        </NavigationContainer>
      </GoalContextProvider>
    </>
  );
}

// use navigation desturctureing - pressable goal to open manage goal - to open manage task in a goal.
// make a + button under the goals to open manage goal- repeat for manage task.
// replace + in header with info screen
