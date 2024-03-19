import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PlayerAttributesConfigurationScreen } from './screens/ConfigurationScreen.tsx';
import { PlayerScreen } from './screens/PlayerScreen.tsx';
import { IntroductionScreen } from './screens/IntroductionScreen.tsx';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="IntroductionScreen">
      <Stack.Screen name="IntroductionScreen" component={IntroductionScreen} />
      <Stack.Screen name="PlayerAttributesConfigurationScreen" component={PlayerAttributesConfigurationScreen} />
      <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
    </Stack.Navigator>
  );
};

export default App;