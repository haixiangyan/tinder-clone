import { Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import useAuth from 'hooks/useAuth';
import { useRef } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';

const data = [
  {
    id: '1',
    firstName: 'Sonny',
    lastName: 'Sangha',
    job: 'Software Engineer',
    photoURL: 'https://avatars.githubusercontent.com/u/24712956?v=4',
    age: 27,
  },
  {
    id: '2',
    firstName: 'Elon',
    lastName: 'Musk',
    job: 'Software Engineer',
    photoURL: 'https://avatars.githubusercontent.com/u/17061654?v=4',
    age: 40,
  },
  {
    id: '3',
    firstName: 'Haha',
    lastName: 'Jack',
    job: 'Software Engineer',
    photoURL: 'https://avatars.githubusercontent.com/u/1500684?v=4',
    age: 30,
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();

  const swiperRef = useRef<Swiper<any>>(null);

  return (
    <SafeAreaView className="flex-1">
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

      <View className="-mt-6 flex-1">
        <Swiper
          ref={swiperRef}
          containerStyle={{ backgroundColor: 'transparent' }}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          cards={data}
          onSwipedLeft={(item) => {
            console.log('Swiped left', item);
          }}
          onSwipedRight={(item) => {
            console.log('Swiped right', item);
          }}
          backgroundColor="#4FD0E9"
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  textAlign: 'right',
                  color: 'red',
                },
              },
            },
            right: {
              title: 'MATCH',
              style: {
                label: {
                  color: '#4DED30',
                },
              },
            },
          }}
          renderCard={(card) => (
            <View key={card.id} className="relative h-3/4 rounded-xl bg-white">
              <Image
                className=" absolute top-0 h-full w-full rounded-xl"
                source={{ uri: card.photoURL }}
              />

              <View className="absolute bottom-0 h-20 w-full flex-row items-center justify-between rounded-b-xl bg-white px-6 py-2 shadow-sm">
                <View>
                  <Text className="text-xl font-bold">
                    {card.firstName} {card.lastName}
                  </Text>

                  <Text>{card.job}</Text>
                </View>

                <Text className="text-2xl font-bold">{card.age}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <View className="flex flex-row justify-evenly">
        <TouchableOpacity
          className="z-10 h-16 w-16 items-center justify-center rounded-full bg-red-200"
          onPress={() => swiperRef.current?.swipeLeft()}>
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          className="z-10 h-16 w-16 items-center justify-center rounded-full bg-green-200"
          onPress={() => swiperRef.current?.swipeRight()}>
          <Entypo name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
