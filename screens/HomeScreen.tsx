import { useNavigation } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title="Go to Chat Screen" onPress={() => navigation.navigate('Chat')} />
    </View>
  );
};

export default HomeScreen;
