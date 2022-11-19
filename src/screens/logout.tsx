import React, {FC} from 'react';
import {ScrollView, Text} from 'react-native';
import useUserStore from '../auth/utils';
import CustomButton from '../components/button';
import TabContainer from '../components/tabContainer';
import {Colors, FontSize} from '../theme/theme';

const Logout: FC = () => {
  const logout = useUserStore(state => state.logout);
  return (
    <TabContainer>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 184,
        }}>
        <Text>Biztos ki akarsz lépni?</Text>
        <CustomButton
          onPress={() => logout()}
          title="Kilépés"
          textStyle={{
            color: Colors.White,
            fontWeight: '400',
            fontSize: FontSize.xxl,
          }}
          buttonStyle={{backgroundColor: Colors.Blue, marginTop: 64}}
        />
      </ScrollView>
    </TabContainer>
  );
};

export default Logout;
