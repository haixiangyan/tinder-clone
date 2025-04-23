import { Entypo, Ionicons } from '@expo/vector-icons';
import {
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
  doc,
  serverTimestamp,
} from '@firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { randomUUID } from 'expo-crypto';
import db from 'firebase';
import useAuth from 'hooks/useAuth';
import generateId from 'libs/generateId';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';

// mock data
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

  const [profiles, setProfiles] = useState<any[]>([]);

  useLayoutEffect(() => {
    onSnapshot(doc(db, 'users', user?.user || randomUUID()), (snapshot) => {
      if (!snapshot.exists()) {
        navigation.navigate('Modal');
      }
    });
  }, []);

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = (
        await getDocs(collection(db, 'users', user?.user || randomUUID(), 'passes'))
      ).docs.map((doc) => doc.id);
      const passedUserIds = passes.length > 0 ? passes : ['test'];

      const swipes = (
        await getDocs(collection(db, 'users', user?.user || randomUUID(), 'swipes'))
      ).docs.map((doc) => doc.id);
      const swipedUserIds = swipes.length > 0 ? swipes : ['test'];

      unsub = onSnapshot(
        query(collection(db, 'users'), where('id', 'not-in', [...passedUserIds, ...swipedUserIds])), // 过滤 passed 掉的用户
        (snapshot) => {
          console.log(
            'Snapshot',
            snapshot.docs.map((doc) => doc.data())
          );

          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user?.user)
              .map((doc) => {
                return {
                  ...doc.data(),
                };
              })
          );
        }
      );
    };

    fetchCards();
  }, []);

  const swipeLeft = async (index: number) => {
    if (!profiles[index]) return;

    const userSwiped = profiles[index];

    console.log('You swiped left', userSwiped.displayName);

    // 添加到 passes 集合
    setDoc(doc(db, 'users', user?.user || randomUUID(), 'passes', userSwiped.id), {
      pass: true,
    });
  };

  const swipeRight = async (index: number) => {
    if (!profiles[index]) return;

    const userSwiped = profiles[index];

    const loggedInProfile = await (
      await getDoc(doc(db, 'users', user?.user || randomUUID()))
    ).data();

    console.log('loggedInProfile', loggedInProfile);

    console.log('userSwiped', userSwiped, user?.user);

    getDoc(doc(db, 'users', userSwiped.id, 'swipes', user?.user || randomUUID())).then(
      (document) => {
        console.log('Document', document.data());
        if (document.exists()) {
          // Create a match
          console.log('Match!');

          setDoc(doc(db, 'users', user?.user || randomUUID(), 'swipes', userSwiped.id), userSwiped);

          // Create a match
          setDoc(doc(db, 'matches', generateId(user?.user || randomUUID(), userSwiped.id)), {
            users: {
              [user?.user || randomUUID()]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user?.user || randomUUID(), userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigation.navigate('Match', {
            loggedInProfile,
            userSwiped,
          });
        } else {
          console.log('You swiped right', userSwiped.displayName);

          setDoc(doc(db, 'users', user?.user || randomUUID(), 'swipes', userSwiped.id), {
            userSwiped,
          });
        }
      }
    );
  };

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

        <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
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
          cards={profiles}
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            swipeRight(cardIndex);
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
          renderCard={(card) =>
            card ? (
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
            ) : (
              <View className="relative h-3/4 items-center justify-center rounded-xl bg-white shadow-sm">
                <Text className="pb-5 font-bold">No more profiles</Text>

                <Image
                  className="h-20 w-20"
                  height={100}
                  width={100}
                  source={{ uri: 'https://links.papareact.com/6gb' }}
                />
              </View>
            )
          }
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
