import firestore from '@react-native-firebase/firestore';
import sampleSize from 'lodash/sampleSize';
import create from 'zustand';
import {immer} from 'zustand/middleware/immer';

export type Question = {
  answer: string;
  category: string;
  id: string;
  options?: {
    [key: string]: number;
  };
  question: string;
  type: number;
};

type IState = {
  questions?: Question[];
};

type Actions = {
  fetch(): Promise<void>;
  getSampleByLevel(category: string): Question[];
};

const initialState = {};

const useQuestionsStore = create<IState & Actions>()(
  immer((set, get) => ({
    ...initialState,
    fetch: async () => {
      const ref = firestore().collection('questions');
      try {
        const query = await ref.get();

        if (query.empty) return;

        set(state => {
          state.questions = query.docs.map(d => d.data() as Question);
        });
      } catch (error) {
        console.log(error);
      }
    },
    getSampleByLevel: category =>
      sampleSize(
        get().questions?.filter(q => q.category === category),
        10,
      ),
  })),
);

export default useQuestionsStore;
