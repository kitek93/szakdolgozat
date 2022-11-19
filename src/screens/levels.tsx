import React, {FC} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import useUserStore from '../auth/utils';
import TabContainer from '../components/tabContainer';
import {Colors, FontSize} from '../theme/theme';

export const levels = [
  {key: 'level1', max: 2, games: 2, source: require('../assets/level1.png')},
  {key: 'level2', max: 6, games: 4, source: require('../assets/level2.png')},
  {key: 'level3', max: 11, games: 5, source: require('../assets/level3.png')},
  {key: 'level4', max: 13, games: 2, source: require('../assets/level4.png')},
];

const Levels: FC = () => {
  const actualLevel = useUserStore(state => state.level);

  return (
    <TabContainer>
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
          <Text style={{fontSize: FontSize.xl, color: Colors.Black}}>
            Szintjeid
          </Text>
          {levels.map((level, index) => (
            <View
              key={index}
              style={{
                marginTop: !index ? 80 : 24,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Image
                  source={level.source}
                  style={{
                    width: 100,
                    height: 100,
                    marginRight: 36,
                    borderColor: Colors.DarkYellow,
                    borderWidth: 8,
                  }}
                />
                {actualLevel < level.max && (
                  <Image
                    source={require('../assets/lock.png')}
                    style={{
                      position: 'absolute',
                      zIndex: 99,
                      width: 100,
                      height: 100,
                      marginRight: 36,
                      borderColor: Colors.DarkYellow,
                      borderWidth: 8,
                    }}
                  />
                )}
              </View>
              <Text
                style={{
                  fontSize: FontSize.xl,
                  fontWeight: 'bold',
                  color: Colors.Black,
                }}>
                {actualLevel > level.max
                  ? level.games
                  : Math.max(0, level.games - (level.max - actualLevel))}
                /{level.games}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </TabContainer>
  );
};

export default Levels;
