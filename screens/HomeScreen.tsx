import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useAuth from 'hooks/useAuth';
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  return (
    <SafeAreaView>
      <View className="relative flex-row items-center justify-between px-5">
        <TouchableOpacity onPress={logout}>
          <View className="h-10 w-10 justify-center rounded-full bg-gray-400">
            <Text className="text-center text-lg text-white">
              {user?.fullName?.givenName || user?.user[0]}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image className="h-14 w-14" source={require('../logo.jpg')} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
