import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity } from 'react-native';

const MatchScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View className="h-full bg-red-500 pt-20" style={{ opacity: 0.89 }}>
      <View className="justify-center px-10 pt-20">
        <Image
          style={{ width: '100%', aspectRatio: 4.11 }}
          source={{ uri: 'https://links.papareact.com/mg9' }}
        />
      </View>

      <Text className="mt-5 text-center text-white">
        You and {userSwiped?.displayName} have liked each other!
      </Text>

      <View className="mt-5 flex-row justify-evenly">
        <View className="h-32 w-32 justify-center rounded-full bg-gray-400">
          <Text className="text-center text-lg text-white">{loggedInProfile?.displayName}</Text>
        </View>

        <View className="h-32 w-32 justify-center rounded-full bg-gray-400">
          <Text className="text-center text-lg text-white">{userSwiped?.displayName}</Text>
        </View>
      </View>

      <TouchableOpacity
        className="m-5 mt-20 rounded-full bg-white px-10 py-8"
        onPress={() => {
          navigation.goBack();
          navigation.navigate('Chat');
        }}>
        <Text className="text-center">Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;
