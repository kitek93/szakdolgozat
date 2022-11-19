import React, {FC, useState} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import CustomButton from '../components/button';
import {Colors} from '../theme/theme';
import useUserStore from './utils';

const Auth: FC = () => {
  const {width, height} = useWindowDimensions();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const register = useUserStore(state => state.register);
  const login = useUserStore(state => state.login);

  return (
    <ScrollView
      contentContainerStyle={{
        width,
        height,
        paddingHorizontal: 16,
        paddingBottom: 80,
        paddingTop: 60,
        justifyContent: 'space-between',
      }}>
      <ImageBackground
        source={require('../assets/background.jpg')}
        style={{width, height, position: 'absolute'}}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={require('../assets/login_header.png')} />
      </View>
      <View>
        <TextInput
          placeholder="Email"
          placeholderTextColor={Colors.Black}
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
          style={{
            backgroundColor: Colors.White,
            borderColor: Colors.DarkOrange,
            borderWidth: 1,
            borderRadius: 6,
            paddingLeft: 40,
          }}
        />
        <TextInput
          placeholder="Jelszó"
          placeholderTextColor={Colors.Black}
          value={password}
          onChangeText={text => setPassword(text)}
          autoCapitalize="none"
          secureTextEntry
          style={{
            backgroundColor: Colors.White,
            borderColor: Colors.Orange,
            borderWidth: 1,
            borderRadius: 6,
            marginTop: 36,
            paddingLeft: 40,
          }}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        <CustomButton
          onPress={() => login(email, password)}
          title="Belépés"
          buttonStyle={{backgroundColor: Colors.Orange}}
          textStyle={{color: Colors.White}}
        />
        <CustomButton
          onPress={() => register(email, password)}
          title="Regisztráció"
          buttonStyle={{backgroundColor: Colors.Orange, marginTop: 40}}
          textStyle={{color: Colors.White}}
        />
      </View>
    </ScrollView>
  );
};

export default Auth;
