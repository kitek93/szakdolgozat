import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import useUserStore from '../auth/utils';
import CustomButton from '../components/button';
import useImageSource from '../hooks/useImageSource';
import {StackProps} from '../navigation/navigation';
import {Colors, FontSize} from '../theme/theme';
import QuestionAnswer from './questionAnswer';
import useQuestionsStore, {Question} from './utils';

const Questions: FC = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation<NativeStackNavigationProp<StackProps>>();
  const route = useRoute<RouteProp<StackProps, 'Questions'>>();
  const questions = useQuestionsStore(
    useCallback(
      state => state.getSampleByLevel(route.params.category),
      [route.params.category],
    ),
  );

  const updateLevel = useUserStore(state => state.updateLevel);
  const actualLevel = useUserStore(state => state.level);

  const [backgroundColor, setBackgroundColor] = useState<
    Colors.OrangeDarker | Colors.Green | Colors.Red
  >(Colors.OrangeDarker);
  const [score, setScore] = useState<number>(0);

  const [page, setPage] = useState<number>(1);
  const [question, setQuestion] = useState<Question>(questions[0]);
  const [answer, setAnswer] = useState<string>('');
  const [isNextLevelAchieved, setIsNextLevelAchieved] =
    useState<boolean>(false);
  const [isPlayEnded, setIsPlayEnded] = useState<boolean>(false);
  const imageSource = useImageSource(actualLevel);

  useEffect(() => {
    if (isNextLevelAchieved) {
      setTimeout(() => {
        navigation.navigate('Tabs');
      }, 3000);
    }

    if (isPlayEnded) {
      if (score >= 7) {
        updateLevel();
      }

      setTimeout(() => {
        navigation.navigate('Tabs');
      }, 3000);
    }
  }, [
    isNextLevelAchieved,
    navigation,
    route.params.level,
    updateLevel,
    score,
    isPlayEnded,
  ]);

  return (
    <View style={{flex: 1, backgroundColor}}>
      <ScrollView>
        <Modal
          isVisible={isNextLevelAchieved}
          style={{
            borderColor: Colors.Blue,
            backgroundColor: Colors.White,
            borderWidth: 8,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: Colors.Black, fontSize: FontSize.xxl}}>
              A játék véget ért.
            </Text>
            <Text style={{color: Colors.Black, fontSize: FontSize.xxl}}>
              Szintet léptél!
            </Text>
            <Text style={{color: Colors.Black, fontSize: FontSize.xxl}}>
              Eredményed:
            </Text>
            <Text
              style={{
                color: Colors.Black,
                fontSize: FontSize.xxl,
                marginTop: 24,
              }}>
              {score} / {questions.length}
            </Text>
          </View>
          {actualLevel < 2 ? (
            <View
              style={{
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
            <Image
              source={imageSource}
              style={{
                width: 150,
                height: 150,
                borderColor: Colors.DarkYellow,
                borderWidth: 8,
              }}
            />
          )}
        </Modal>
        <Modal
          isVisible={isPlayEnded}
          style={{
            borderColor: Colors.Blue,
            backgroundColor: Colors.White,
            borderWidth: 8,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: Colors.Black, fontSize: FontSize.xxl}}>
              A játék véget ért.
            </Text>
            <Text style={{color: Colors.Black, fontSize: FontSize.xxl}}>
              Eredményed:
            </Text>
            <Text
              style={{
                color: Colors.Black,
                fontSize: FontSize.xxl,
                marginTop: 24,
              }}>
              {score} / {questions.length}
            </Text>
          </View>
          {actualLevel < 2 ? (
            <View
              style={{
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
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  color: Colors.Black,
                  fontSize: FontSize.xl,
                  marginBottom: 16,
                }}>
                Az aktuális szinted:{' '}
              </Text>
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
        </Modal>
        <View
          style={{
            height: (width * 5) / 4,
            backgroundColor: Colors.White,
            marginHorizontal: 16,
            marginTop: 64,
            borderRadius: 16,
            marginBottom: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {backgroundColor === Colors.Green ||
          backgroundColor === Colors.Red ? (
            <>
              <Text
                style={{
                  fontSize: FontSize.xxl,
                  color: Colors.Black,
                  marginBottom: 48,
                }}>
                {question.question}
              </Text>
              <Text
                style={{
                  fontSize: FontSize.xl,
                  color: Colors.Black,
                  marginTop: 24,
                }}>
                Helyes válasz: {question.answer}
              </Text>
            </>
          ) : (
            <>
              <QuestionAnswer
                question={question}
                answer={answer}
                setAnswer={setAnswer}
              />
              <Text
                style={{position: 'absolute', bottom: 8, color: Colors.Black}}>
                {page}/{questions.length}
              </Text>
            </>
          )}
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {backgroundColor === Colors.Green ||
          backgroundColor === Colors.Red ? (
            <CustomButton
              title="Tovább"
              onPress={async () => {
                if (backgroundColor === Colors.Green) {
                  setScore(prevState => ++prevState);
                  setBackgroundColor(Colors.OrangeDarker);
                  setAnswer('');
                }

                if (backgroundColor === Colors.Red) {
                  setBackgroundColor(Colors.OrangeDarker);
                  setAnswer('');
                }

                if (page < 10) {
                  setQuestion(questions[page]);
                  setPage(prevState => ++prevState);
                }

                if (
                  (actualLevel === 1 ||
                    actualLevel === 5 ||
                    actualLevel === 10 ||
                    actualLevel === 12) &&
                  page === 10 &&
                  score >= 7
                ) {
                  await updateLevel();
                  setIsNextLevelAchieved(true);
                }

                if (
                  actualLevel !== 1 &&
                  actualLevel !== 5 &&
                  actualLevel !== 10 &&
                  actualLevel !== 12 &&
                  page === 10 &&
                  score >= 7
                ) {
                  setIsPlayEnded(true);
                }

                if (page === 10 && score < 7) {
                  setIsPlayEnded(true);
                }
              }}
              buttonStyle={{
                borderColor: Colors.White,
                backgroundColor: Colors.Orange,
                marginTop: 36,
                borderWidth: 1,
              }}
              textStyle={{color: Colors.White}}
            />
          ) : (
            <>
              <CustomButton
                title="Válaszolok"
                onPress={() => {
                  if (!answer.length)
                    return Alert.alert('Hiba!', 'Nem adtál meg választ!');
                  if (answer === question.answer) {
                    setBackgroundColor(Colors.Green);
                    setAnswer('');
                  } else {
                    setBackgroundColor(Colors.Red);
                  }
                }}
                buttonStyle={{
                  borderColor: Colors.White,
                  backgroundColor: Colors.Orange,
                  borderWidth: 1,
                  marginBottom: 16,
                }}
                textStyle={{color: Colors.White}}
              />
              <CustomButton
                title="Nem tudom, tovább"
                onPress={async () => {
                  if (page < 10) {
                    setQuestion(questions[page]);
                    setPage(prevState => ++prevState);
                  }

                  if (page === 10) {
                    if (
                      actualLevel === 1 ||
                      actualLevel === 5 ||
                      actualLevel === 10 ||
                      actualLevel === 12
                    ) {
                      await updateLevel();
                      setIsNextLevelAchieved(true);
                    } else {
                      setIsPlayEnded(true);
                    }
                  }
                }}
                buttonStyle={{
                  borderColor: Colors.White,
                  backgroundColor: Colors.Orange,
                  borderWidth: 1,
                }}
                textStyle={{color: Colors.White}}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Questions;
