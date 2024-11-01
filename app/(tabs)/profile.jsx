import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../constants/Colors'
import { useAuth, useUser } from '@clerk/clerk-expo'
import Ionicons from '@expo/vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';


export default function Profile() {
  const Menu = [
    {
      id:1,
      name: 'Adicionar novo Pet',
      icon: 'add-circle',
      path: '/add-new-pet'
    },
    {
      id:2,
      name: 'Minhas Postagens',
      icon: 'bookmark',
      path: '/user-post'
    },
    {
      id:3,
      name: 'Favoritos',
      icon: 'heart',
      path: '/(tabs)/favorite'
    },
    {
      id:4,
      name: 'Mensagens',
      icon: 'chatbox',
      path: '/(tabs)/inbox'
    },
    {
      id:5,
      name: 'Sair',
      icon: 'exit',
      path: '/(tabs)/home'
    }
  ]

  const {user} = useUser();
  const router = useRouter();
  const { signOut, isSignedIn } = useAuth();

  const onPressMenu = async (menu) => {
    if (menu === "logout") {
      await signOut(); // Aguarda a finalização do logout
      if (!isSignedIn) { // Confirma que o usuário foi deslogado
        router.replace("/login"); // Redireciona para a tela de login
      }
      return;
    }
    router.push(menu.path);
  };

  useEffect(() => {
    if (!isSignedIn) {
      router.replace("/login");
    }
  }, [isSignedIn]);

  return (
    <View style={{
      padding:20,
      marginTop:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30,
        color:Colors.backgroundGradientStart
      }}>Perfil</Text>

      <View style={{
        display:'flex',
        alignItems:'center',
        marginVertical:25
      }}>
        <Image source={{uri: user?.imageUrl}} style={{
          width:80,
          height:80,
          borderRadius:99,
        }}/>
          <Text style={{
            fontFamily:'outfit-bold',
            fontSize: 20,
            marginTop:6
          }}>{user?.fullName}</Text>
          <Text style={{
            fontFamily:'outfit',
            fontSize:16,
            color: Colors.GRAY
          }}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>

      <FlatList
        data={Menu}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => onPressMenu(item)} 
            key={item.id}
            style={{
            marginVertical:10,
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:10,
            backgroundColor:Colors.WHITE,
            padding:10,
            borderRadius:10
          }}>
            <Ionicons 
            name={item?.icon} size={30}
            color={Colors.backgroundGradientEnd}
            style={{
              padding:10,
              backgroundColor:Colors.backgroundGradientStart,
              borderRadius:10
            }}
            />
            <Text style={{
              fontFamily:'outfit-medium',
              fontSize:20
            }}>{item?.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}