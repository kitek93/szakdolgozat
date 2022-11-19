import map from 'lodash/map';
import React, {Dispatch, FC, SetStateAction} from 'react';
import {Text, TextInput, View} from 'react-native';
import CustomButton from '../components/button';
import {Colors, FontSize} from '../theme/theme';
import {Question} from './utils';

const QuestionAnswer: FC<{
  question: Question;
  setAnswer: Dispatch<SetStateAction<string>>;
  answer: string;
}> = ({question, setAnswer, answer}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{fontSize: FontSize.xxl, color: Colors.Black, marginBottom: 48}}>
        {question?.question}
      </Text>
      {!!question?.options ? (
        map(question.options, (value, key) => (
          <CustomButton
            key={key}
            title={value.toString()}
            onPress={() => setAnswer(key)}
            buttonStyle={{
              borderWidth: 1,
              borderColor: answer === key ? Colors.Green : Colors.Orange,
              backgroundColor: answer === key ? Colors.Green : undefined,
              marginBottom: 16,
            }}
            textStyle={{color: answer === key ? Colors.White : Colors.Black}}
          />
        ))
      ) : (
        <TextInput
          onChangeText={setAnswer}
          value={answer}
          keyboardType="numeric"
          placeholder="Válasz megadása"
          placeholderTextColor={Colors.Black}
          style={{
            paddingVertical: 16,
            paddingHorizontal: 48,
            borderWidth: 1,
            borderColor: Colors.Orange,
            borderRadius: 8,
            textAlign: 'center',
          }}
        />
      )}
    </View>
  );
};

export default QuestionAnswer;
