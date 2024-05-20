import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { PlayerAttributesConfigurationScreen } from './screens/ConfigurationScreen.tsx';
import { PlayerScreen } from './screens/PlayerScreen.tsx';
import { IntroductionScreen } from './screens/IntroductionScreen.tsx';
import { MiniPlayerConfigurationScreen } from './screens/MiniPlayerConfigurationScreen.tsx';
import { BannerConfigurationScreen } from './screens/BannerConfigurationScreen.tsx';
import { MiniPlayerCornerConfigurationScreen } from './screens/MiniPlayerCornerConfigurationScreen.tsx';

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
    <Stack.Screen name="MiniPlayerConfigurationScreen" component={MiniPlayerConfigurationScreen} />
    <Stack.Screen name="BannerConfigurationScreen" component={BannerConfigurationScreen} />
    <Stack.Screen name="MiniPlayerCornerConfigurationScreen" component={MiniPlayerCornerConfigurationScreen} />
    <Stack.Screen name="PlayerScreen" component={PlayerScreen} />
  </Stack.Navigator>
  );
};

export default App;