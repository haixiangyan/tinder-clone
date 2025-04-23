import ChatList from 'components/ChatList';
import Header from 'components/Header';
import { View, Text, SafeAreaView } from 'react-native';

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Chat" callEnabled />
      <ChatList />
    </SafeAreaView>
  );
};

export default ChatScreen;
