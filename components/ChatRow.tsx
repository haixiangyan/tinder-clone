import { useNavigation } from '@react-navigation/native';
import { randomUUID } from 'expo-crypto';
import useAuth from 'hooks/useAuth';
import getMatchedUseInfo from 'libs/getMatchedUseInfo';
import { FC, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

interface Props {
  matchDetails: any;
}

const ChatRow: FC<Props> = (props) => {
  const { matchDetails } = props;

  const navigation = useNavigation();
  const [matchedUserInfo, setMatchedUserInfo] = useState<any>(null);

  const { user } = useAuth();

  useEffect(() => {
    setMatchedUserInfo(getMatchedUseInfo(matchDetails.users, user?.user || randomUUID()));
  }, [matchDetails, user]);

  useEffect(() => {}, []);

  return (
    <TouchableOpacity className="mx-3 my-1 flex-row items-center rounded-lg bg-white px-5 py-3 shadow-sm">
      <Image className="mr-4 h-16 w-16 rounded-full" source={{ uri: matchedUserInfo?.photoURL }} />

      <View>
        <Text className="text-lg font-semibold">{matchedUserInfo?.displayName}</Text>
        <Text>Say Hi</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;
