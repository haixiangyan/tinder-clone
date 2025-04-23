import { doc, setDoc, serverTimestamp } from '@firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { randomUUID } from 'expo-crypto';
import db from 'firebase';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';

const ModalScreen = () => {
  const { user } = useAuth();

  const navigation = useNavigation();

  const [image, setImage] = useState('');
  const [job, setJob] = useState('');
  const [age, setAge] = useState('');

  const incompleteForm = !image || !job || !age;

  const updateUserProfile = () => {
    setDoc(doc(db, 'users', user?.user || randomUUID()), {
      id: user?.user || randomUUID(),
      displayName: user?.fullName?.familyName || randomUUID() + '-Jack',
      photoURL: image || 'https://avatars.githubusercontent.com/u/8536173?s=80&v=4',
      job,
      age: parseInt(age, 10) || 18,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View className="flex-1 items-center pt-1">
      <Image
        className="h-20 w-full"
        resizeMode="contain"
        source={{ uri: 'https://links.papareact.com/2pf' }}
      />

      <Text className="p-2 text-xl font-bold text-gray-500">Welcome {user?.authorizationCode}</Text>

      <Text className="p-4 text-center font-bold text-red-400">Step 1: The Profile Pic</Text>
      <TextInput
        value={image}
        className="pb-2 text-center text-xl"
        placeholder="Enter a profile pic"
        onChangeText={(text) => setImage(text)}
      />

      <Text className="p-4 text-center font-bold text-red-400">Step 2: The Job</Text>
      <TextInput
        value={job}
        className="pb-2 text-center text-xl"
        placeholder="Enter your job"
        onChangeText={setJob}
      />

      <Text className="p-4 text-center font-bold text-red-400">Step 3: The Age</Text>
      <TextInput
        value={age}
        className="pb-2 text-center text-xl"
        placeholder="Enter your age"
        onChangeText={setAge}
        keyboardType="numeric"
        maxLength={2}
      />

      <TouchableOpacity
        onPress={updateUserProfile}
        disabled={incompleteForm}
        className={`absolute bottom-10 w-64 rounded-xl p-3 ${incompleteForm ? 'bg-gray-400' : 'bg-red-400'}`}>
        <Text className="text-center text-xl text-white">Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
