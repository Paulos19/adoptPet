import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'

export default function AboutPet({pet}) {

    const [readMore, setReadMore] = useState(true);

  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:20,
        color: Colors.backgroundGradientStart
      }}>Sobre {pet?.name}</Text>
      <Text numberOfLines={readMore?3:20} style={{
        fontFamily:'outfit-medium',
        fontSize: 16
      }}>{pet?.about}</Text>
      {readMore&&
      <Pressable onPress={() => setReadMore(false)}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:14,
        color: Colors.backgroundGradientStart
      }}>Leia Mais</Text>
      </Pressable>}
    </View>
  )
}