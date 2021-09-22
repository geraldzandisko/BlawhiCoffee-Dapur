import 'react-native-gesture-handler';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  View,
  Dimensions,
  LogBox,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Monitor
} from './src/views';

LogBox.ignoreLogs([
  'Warning: Can',
  'Please report: Exce'
])

const screenHeight = Dimensions.get('window').height;
const Stack = createStackNavigator();

function AppRun() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MonitorScreen">
        <Stack.Screen
          name="MonitorScreen"
          component={Monitor}
          options={{
            title: "Aplikasi Dapur",
            headerStyle: {
							height: 60,
						},
						headerTitleStyle: {
							fontSize: 22,
							alignSelf: 'center'
						},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <View>
      <StatusBar />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
      >
        <View style={{height: screenHeight + 1500}}>
          <AppRun />
        </View>
      </ScrollView>
    </View>
  );
};

export default App;
