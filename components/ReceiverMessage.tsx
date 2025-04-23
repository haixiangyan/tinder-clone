import { Image, View, Text } from 'react-native';

interface Props {
  message: any;
}

const ReceiverMessage = (props: Props) => {
  const { message } = props;

  return (
    <View
      className="mx-3 my-2 ml-14 rounded-lg rounded-tl-none bg-red-400 px-5 py-3"
      style={{ alignSelf: 'flex-start' }}>
      <Image
        className="absolute -left-14 top-0 h-12 w-12 rounded-full"
        source={{ uri: message.photoURL }}
      />

      <Text className="text-white">{message.message}</Text>
    </View>
  );
};

export default ReceiverMessage;
