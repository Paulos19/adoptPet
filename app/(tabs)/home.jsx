import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import PetListByCategory from '../../components/Home/PetListByCategory'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Colors from '../../constants/Colors'
import { TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'

export default function home() {
  return (
    <View style={{
      padding:20,
      marginTop:20,
    }}>


      {/* Header */}
          <Header/>
      {/* Slider */}
          <Slider/>
      {/* PetList + Category */}
          <PetListByCategory/>
      {/*Adicionar Novo Pet*/}
          <Link href={'/add-new-pet'}
          style={styles.addNewPetContainer}>
            <MaterialCommunityIcons name="dog" size={24} color={Colors.PRIMARY} />
            <Text style={{
              fontFamily:'outfit-bold',
              fontSize: 20,
              color: Colors.PRIMARY
            }}>
              Adicionar Novo Pet
            </Text>
          </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  addNewPetContainer: {
    display:'flex',
    flexDirection:'row',
    gap:10,
    alignItems:'center',
    padding:20,
    marginTop:20,
    textAlign:'center',
    backgroundColor: Colors.backgroundGradientEnd,
    borderWidth:1,
    borderColor: Colors.backgroundGradientStart,
    borderRadius:15,
    justifyContent:'center'
  }
})
