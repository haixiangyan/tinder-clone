import { Foundation, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  title: string;
  callEnabled?: boolean;
}

const Header: FC<Props> = (props) => {
  const { title, callEnabled } = props;

  const navigation = useNavigation();

  return (
    <View className="flex-row items-center justify-between p-2">
      <View className="flex flex-row items-center">
        <TouchableOpacity className="p-2" onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </TouchableOpacity>
        <Text className="pl-2 text-2xl font-bold">{title}</Text>
      </View>

      {callEnabled && (
        <TouchableOpacity className="mr-4 rounded-full bg-red-200 p-3">
          <Foundation className="" name="telephone" size={20} color="red" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
