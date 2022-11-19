import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {FC} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Home from '../screens/home';
import Levels from '../screens/levels';
import {Colors} from '../theme/theme';

const BottomTabs = createBottomTabNavigator();

const Tabs: FC = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName="Home"
      screenOptions={{tabBarStyle: {backgroundColor: Colors.DarkYellow}}}>
      <BottomTabs.Screen
        name="Home"
        options={{
          title: '',
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/home.png')}
              style={{height: 24, width: 24, opacity: focused ? 1 : 0.5}}
            />
          ),
        }}
        component={Home}
      />
      <BottomTabs.Screen
        name="Kérdések"
        options={{
          title: '',
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/progress.png')}
              style={{height: 24, width: 24, opacity: focused ? 1 : 0.5}}
            />
          ),
        }}
        component={Levels}
      />
      <BottomTabs.Screen
        name="Kilépés"
        options={({navigation}) => ({
          title: '',
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../assets/logout.png')}
              style={{height: 24, width: 24, opacity: focused ? 1 : 0.5}}
            />
          ),
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              onPress={() => navigation.navigate('Logout')}
            />
          ),
        })}
        children={() => <View />}
      />
    </BottomTabs.Navigator>
  );
};

export default Tabs;
