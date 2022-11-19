import {useNavigation} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useEffect, useMemo} from 'react';
import {Alert, Image, Text, View} from 'react-native';
import prompt from 'react-native-prompt-android';
import useUserStore from '../auth/utils';
import CustomButton from '../components/button';
import TabContainer from '../components/tabContainer';
import useImageSource from '../hooks/useImageSource';
import {StackProps} from '../navigation/navigation';
import useQuestionsStore from '../questions/utils';
import {Colors, FontSize} from '../theme/theme';

const Home: FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackProps>>();
  const name = useUserStore(state => state.name);
  const updateUser = useUserStore(state => state.updateUser);
  const actualLevel = useUserStore(state => state.level);
  const fetchQuestions = useQuestionsStore(state => state.fetch);
  const imageSource = useImageSource(actualLevel);

  const category = useMemo(() => {
    if (actualLevel < 2) return 'ötös számkör';
    if (actualLevel < 6) return 'tízes számkör';
    if (actualLevel < 11) return 'húszas számkör';

    return 'kitekintés százig';
  }, [actualLevel]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <TabContainer>
      <View style={{flex: 1, alignItems: 'center'}}>
        {!name ? (
          <CustomButton
            onPress={() =>
              prompt(
                'Info',
                'Add meg a neved',
                async text => await updateUser('name', text),
              )
            }
            title="Add meg a neved!"
            buttonStyle={{backgroundColor: Colors.Orange}}
            textStyle={{color: Colors.White}}
          />
        ) : (
          <>
            <Text style={{fontSize: FontSize.xl, color: Colors.Black}}>
              Szia,
            </Text>
            <Text style={{fontSize: FontSize.xl, color: Colors.Black}}>
              {name}
            </Text>
          </>
        )}
        {actualLevel < 2 ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 24,
              marginBottom: 48,
            }}>
            <Text
              style={{
                fontSize: FontSize.xxl,
                textAlign: 'center',
                color: Colors.Black,
              }}>
              Jelenleg még nem értél el szintet!
            </Text>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 24,
              marginBottom: 48,
            }}>
            <Image
              source={imageSource}
              style={{
                width: 150,
                height: 150,
                borderColor: Colors.DarkYellow,
                borderWidth: 8,
              }}
            />
          </View>
        )}
        {actualLevel === 13 ? (
          <CustomButton
            onPress={() => {
              Alert.alert(
                'Info',
                'Gratulálok, végeztél a játékkal! Szeretnéd újrakezdeni?',
                [
                  {
                    text: 'Nem',
                  },
                  {
                    text: 'Igen',
                    onPress: async () => {
                      await updateUser('level', 0);
                    },
                  },
                ],
              );
            }}
            title="Következő játék"
            buttonStyle={{
              backgroundColor: Colors.Orange,
              position: 'absolute',
              bottom: 48,
            }}
            textStyle={{color: Colors.White}}
          />
        ) : (
          <CustomButton
            onPress={() =>
              navigation.navigate('Questions', {
                category,
                level: (actualLevel! || 0) + 1,
              })
            }
            title="Következő játék"
            buttonStyle={{
              backgroundColor: Colors.Orange,
              position: 'absolute',
              bottom: 48,
            }}
            textStyle={{color: Colors.White}}
          />
        )}
      </View>
    </TabContainer>
  );
};

export default Home;
