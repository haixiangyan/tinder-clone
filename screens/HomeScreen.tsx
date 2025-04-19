import { useNavigation } from '@react-navigation/native';
import useAuth from 'hooks/useAuth';
import { View, Text, Button } from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { setUser } = useAuth();

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Go to Chat Screen" onPress={() => navigation.navigate('Chat')} />
      <Button title="Logout" onPress={() => setUser?.(null)} />
    </View>
  );
};

export default HomeScreen;
