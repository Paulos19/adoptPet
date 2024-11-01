import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

export default function PetSubinfoCard({icon, title, value}) {
  return (
    <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: Colors.WHITE,
        padding:10,
        margin:5,
        borderRadius:8,
        gap:10,
        flex: 1
    }}>
        <Image source={icon}
        style={{
            width:40,
            height:40,
            backgroundColor: Colors.backgroundGradientStart,
            borderRadius:99
        }}
        />
        <View style={{
            flex:1
        }}>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:16,
            }}>{title}</Text>
            <Text style={{
                fontFamily:'outfit',
                fontSize:15
            }}>{value}</Text>
        </View>
    </View>
  )
}