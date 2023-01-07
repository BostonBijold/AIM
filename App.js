import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from '@expo/vector-icons';

//screens and components
import ManageGoal from "./screens/ManageGoal";
import ViewGoals from "./screens/ViewGoals";
import ManageTask from "./screens/ManageTask";
import Information from "./screens/Information";

import { GlobalStyles } from "./constants/colors";

const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AgileLifeDevelopmentOverview() {
  return  <BottomTabs.Navigator screenOptions={{
    headerStyle: {backgroundColor: GlobalStyles.colors.layer1},
    headerTintColor: 'white',
    tabBarStyle: {backgroundColor: GlobalStyles.colors.layer1},
    tabBarActiveTintColor: GlobalStyles.colors.white,
    tabBarInactiveTintColor: GlobalStyles.colors.layer4
  }}>
      <BottomTabs.Screen name="Goals" component={ViewGoals}
      options={{
        titile: 'Goals',
        tabBarLabel: 'Goals', 
        tabBarIcon: ({color, size}) => <Ionicons name='git-merge' size={size} color={color} />
      }}
      />
      <BottomTabs.Screen name="Information" component={Information} 
            options={{
              titile: 'Info',
              tabBarLabel: 'Info', 
              tabBarIcon: ({color, size}) => <Ionicons name='information-circle-outline' size={size} color={color} />
            }}
      />
    </BottomTabs.Navigator>
  
}

// options headerShown: false hides the 'Aim' header but it will show in a stack screen- a 'stacked' overlay screen. 
// make the header dynamic to show the goal name? 

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          
          <Stack.Screen name="AIM" component={AgileLifeDevelopmentOverview} options={{headerShown: false}} />
          <Stack.Screen name="Manage Task" component={ManageTask} />
          <Stack.Screen name="Manage Goal" component={ManageGoal} />


        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
