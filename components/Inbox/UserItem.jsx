import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';
import { Link } from 'expo-router';

export default function UserItem({ userInfos }) {
  return (
    <Link href={'/chat?id='+userInfos.docId}>
    <View style={{ 
      marginVertical: 7,
      display:'flex', 
      flexDirection: 'row', 
      alignItems: 'center',
      gap:10,

      }}>
      <Image 
        source={{ uri: userInfos?.imageUrl }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 99
        }}
      />
      <Text style={{
        fontFamily:'outfit',
        fontSize:22
      }}>{userInfos?.name}</Text>
    </View>
    <View style={{
        borderWidth:1,
        marginVertical:7,
        borderColor: Colors.backgroundGradientStart
      }}></View>
    </Link>
  );
}
