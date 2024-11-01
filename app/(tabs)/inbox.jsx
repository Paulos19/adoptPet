import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import Colors from '../../constants/Colors';
import UserItem from '../../components/Inbox/UserItem';

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) {
      GetUserList();
    }
  }, [user]);

  // Lista de Usuários
  const GetUserList = async () => {
    setLoader(true)
    setUserList([]);
    const q = query(
      collection(db, 'Chat'),
      where('usersId', 'array-contains', user?.primaryEmailAddress?.emailAddress)
    );

    const querySnapshot = await getDocs(q);
    const newUserList = [];

    querySnapshot.forEach((doc) => {
      newUserList.push({ id: doc.id, ...doc.data() });
    });

    setUserList(newUserList);
    setLoader(false);
  };

  // Filtro
  const MapOtherUserList = () => {
    const list = [];

    userList.forEach((record) => {
      // Filtra para encontrar o outro usuário
      const otherUser = record.users?.find(
        (u) => u.email !== user?.primaryEmailAddress?.emailAddress
      );

      if (otherUser) {
        const result = {
          docId: record.id,
          ...otherUser,
        };
        list.push(result);
      }
    });

    return list;
  };

  return (
    <View style={{ padding: 20, marginTop: 20 }}>
      <Text
        style={{
          fontFamily: 'outfit-medium',
          fontSize: 25,
          color: Colors.backgroundGradientStart,
        }}
      >
        Mensagens
      </Text>

      <FlatList
        data={MapOtherUserList()}
        refreshing={loader}
        onRefresh={GetUserList}
        style={{
          marginTop:20
        }}
        renderItem={({ item }) => 
        <UserItem userInfos={item} key={item.docId} />}
        keyExtractor={(item) => item.docId}
      />
    </View>
  );
}
