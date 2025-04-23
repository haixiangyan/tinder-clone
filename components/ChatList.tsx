import { collection, onSnapshot, query, where } from '@firebase/firestore';
import { randomUUID } from 'expo-crypto';
import db from 'firebase';
import useAuth from 'hooks/useAuth';
import { FC, useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

import ChatRow from './ChatRow';

const ChatList: FC = () => {
  const [matches, setMatches] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, 'matches'),
        where('usersMatched', 'array-contains', user?.user || randomUUID())
      ),
      (snapshot: any) => {
        setMatches(snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() })));
      }
    );
  }, [user]);

  return matches.length > 0 ? (
    <FlatList
      className="h-full"
      data={matches}
      keyExtractor={(m: any) => m.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View>
      <Text>No matches yet</Text>
    </View>
  );
};

export default ChatList;
