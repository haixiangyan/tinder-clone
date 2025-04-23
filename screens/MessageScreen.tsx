import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from '@firebase/firestore';
import { useRoute } from '@react-navigation/native';
import Header from 'components/Header';
import ReceiverMessage from 'components/ReceiverMessage';
import SenderMessage from 'components/SenderMessage';
import db from 'firebase';
import useAuth from 'hooks/useAuth';
import getMatchedUseInfo from 'libs/getMatchedUseInfo';
import { FC, useEffect, useState } from 'react';
import {
  View,
  Button,
  TextInput,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

const MessageScreen: FC = () => {
  const { params } = useRoute();
  const { matchDetails } = params;

  const { user } = useAuth();

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');

  // 获取信息
  useEffect(() => {
    return onSnapshot(
      query(collection(db, 'matches', matchDetails.id, 'messages'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );
  }, [matchDetails]);

  const sendMessage = () => {
    addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
      timestamp: serverTimestamp(),
      userId: user?.user,
      displayName: user?.fullName?.familyName,
      photoURL: matchDetails.users[user?.user].photoURL,
      message: input,
    });

    setInput('');
  };

  return (
    <SafeAreaView className="flex-1">
      <Header title={getMatchedUseInfo(matchDetails.users, user?.user).displayName} callEnabled />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={10}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            inverted
            keyExtractor={(item: any) => item.id}
            className="pl-4"
            renderItem={({ item: message }) =>
              message.userId === user?.user ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View className="flex-row items-center justify-between border-t border-gray-200 bg-white px-5 py-2">
          <TextInput
            className="h-10 text-lg"
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />

          <Button title="Send" color="#FF5864" onPress={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default MessageScreen;
