import Colors from './../../constants/Colors'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
   <Tabs
   screenOptions={{
    tabBarActiveTintColor:Colors.backgroundGradientEnd
   }}
   >
    <Tabs.Screen name='home'
    options={{
      title:'Home',
      headerShown:false,
      tabBarIcon:({color}) =>
        <Ionicons name="home" size={24} color={color} />
    }}
    />
    <Tabs.Screen name='favorite'
     options={{
      title:'Favoritos',
      headerShown:false,
      tabBarIcon:({color}) =>
        <Ionicons name="heart" size={24} color={color} />
    }}
    />
    <Tabs.Screen name='inbox'
    options={{
      title:'Inbox',
      headerShown:false,
      tabBarIcon:({color}) =>
        <Ionicons name="chatbox" size={24} color={color} />
    }}
    />
    <Tabs.Screen name='profile'
     options={{
      title:'Perfil',
      headerShown:false,
      tabBarIcon:({color}) =>
        <Ionicons name="person-circle-sharp" size={24} color={color} />
    }}
    />
   </Tabs>
  )
}