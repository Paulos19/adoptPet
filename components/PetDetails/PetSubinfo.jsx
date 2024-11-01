import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import PetSubinfoCard from './PetSubinfoCard'

export default function PetSubinfo({pet}) {
  return (
    <View style={{
        paddingHorizontal:20
    }}>
      <View style={{
        display:'flex',
        flexDirection:'row'
      }}>
       <PetSubinfoCard 
       icon={require('./../../assets/images/ring-calendar.png')}
       title={'Idade'}
       value={pet?.age+' Ano(s)'}
       />
       <PetSubinfoCard 
       icon={require('./../../assets/images/raca-pura.png')}
       title={'Raça'}
       value={pet?.breed}
       />
      </View>

      <View style={{
        display:'flex',
        flexDirection:'row'
      }}>
       <PetSubinfoCard 
       icon={require('./../../assets/images/sexo.png')}
       title={'Sexo'}
       value={pet?.sex}
       />
       <PetSubinfoCard 
       icon={require('./../../assets/images/quilograma.png')}
       title={'Peso'}
       value={pet?.weight}
       />
      </View>
    </View>
  )
}