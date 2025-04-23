import { View, Text, Image } from 'react-native';

interface Props {
  message: any;
}

const SenderMessage = (props: Props) => {
  const { message } = props;

  return (
    <View
      className="mx-3 my-2 rounded-lg rounded-tr-none bg-purple-600 px-5 py-3"
      style={{ alignSelf: 'flex-start', marginLeft: 'auto' }}>
      <Text className="text-white">{message.message}</Text>
    </View>
  );
};

export default SenderMessage;
