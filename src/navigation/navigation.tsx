import firestore from '@react-native-firebase/firestore';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import useUserStore from '../auth/utils';
import Questions from '../questions/questions';
import Logout from '../screens/logout';
import Tabs from './tabs';

export type StackProps = {
  Tabs: undefined;
  Questions: {category: string; level: number};
  Logout: undefined;
};

const Stack = createNativeStackNavigator<StackProps>();

const Navigation = () => {
  const setUser = useUserStore(state => state.setUser);
  const userId = useUserStore(state => state.uid);

  useEffect(() => {
    const ref = firestore().collection('users').doc(userId);

    ref.get().then(res => {
      if (!res.exists) return;

      const user = res.data();

      setUser(user);
    });
  }, [userId]);

  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Questions" component={Questions} />
      <Stack.Screen name="Logout" component={Logout} />
    </Stack.Navigator>
  );
};

export default Navigation;
