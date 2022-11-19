import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import create from 'zustand';
import {immer} from 'zustand/middleware/immer';

type IState = {
  uid: string;
  email: string;
  name: string;
  level: number;
};

type Actions = {
  register(email: string, password: string): Promise<void>;
  login(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
  fetchUser(uid: string): Promise<void>;
  updateUser(key: string, value: string | number): Promise<void>;
  setUser(data: any): void;
  getLatestLevel(): number | undefined;
  updateLevel(): Promise<void>;
};

const initialState = {
  uid: '',
  email: '',
  name: '',
  level: 0,
};

const useUserStore = create<Actions & IState>()(
  immer((set, get) => ({
    ...initialState,
    register: async (email: string, password: string) => {
      try {
        const data = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );

        await firestore().collection('users').doc(data.user.uid).set({
          email: data.user.email,
          uid: data.user.uid,
          level: 0,
        });

        set(state => {
          state.uid = data.user.uid;
          state.email = data.user.email!;
        });
      } catch (error) {
        Alert.alert('Hiba!', error.message);
      }
    },
    login: async (email: string, password: string) => {
      try {
        const data = await auth().signInWithEmailAndPassword(email, password);

        set(state => {
          state.uid = data.user.uid;
          state.email = data.user.email!;
        });
      } catch (error) {
        Alert.alert('Hiba!', error.message);
      }
    },
    logout: async () => {
      try {
        await auth().signOut();

        set(initialState);
      } catch (error) {
        console.log(error);
      }
    },
    fetchUser: async uid => {
      const ref = firestore().collection('users').doc(uid);

      try {
        const user = await ref.get();

        set(user.data() as IState);
      } catch (error) {
        console.log(error);
      }
    },
    updateUser: async <T extends keyof IState>(key: T, value: IState[T]) => {
      try {
        await firestore()
          .collection('users')
          .doc(get().uid)
          .update({[key]: value});

        set(state => {
          state[key] = value;
        });
      } catch (error) {
        console.log(error);
      }
    },
    updateLevel: async () => {
      try {
        await firestore()
          .collection('users')
          .doc(get().uid)
          .update({level: firestore.FieldValue.increment(1)});

        set(state => {
          ++state.level;
        });
      } catch (error) {
        console.log(error);
      }
    },
    setUser: data => set(data),
    getLatestLevel: () => get().level,
  })),
);

export default useUserStore;
