import React from 'react';
import {useColorScheme} from 'react-native';

import Home from './src/views/Home';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import NewList from './src/views/NewList';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MenuProvider} from 'react-native-popup-menu';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Mis tareas'}}
          />
          <Stack.Screen
            name="NewList"
            component={NewList}
            options={{title: 'Nueva lista'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

export default App;
