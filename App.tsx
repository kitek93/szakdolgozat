import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import Auth from './src/auth/auth';
import useUserStore from './src/auth/utils';
import Navigation from './src/navigation/navigation';
import {Colors} from './src/theme/theme';

const App: FC = () => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const setUserValue = useUserStore(state => state.setUser);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUserValue({uid: user?.uid!});

      setUser(user);
    });

    return subscriber; // unsubscribe on unmount
  }, []);

  if (!user) return <Auth />;
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          card: Colors.White,
        },
      }}>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
