import { View, Text, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import Colors from './../../constants/Colors';
import MarkFav from '../MarkFav';

export default function PetInfo({ pet }) {
  // Modifica a URL apenas para renderização, sem alterar o original
  const modifiedImageUrl = pet?.imageUrl?.replace(/(PetAdopt\/)/, 'PetAdopt%2F');

  // Log para verificar a imageUrl modificada
  console.log('Modified Image URL:', modifiedImageUrl);

  return (
    <View>
      {modifiedImageUrl ? ( // Verifica se a imageUrl modificada está disponível
        <Image
          source={{ uri: modifiedImageUrl }}
          style={{
            width: '100%',
            height: 400,
            resizeMode: 'cover'
          }}
        />
      ) : (
        <ActivityIndicator size="large" color={Colors.backgroundGradientStart} />
      )}
      <View style={{
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <View>
          <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 27,
            color: Colors.backgroundGradientStart
          }}>{pet?.name}</Text>

          <Text style={{
            fontFamily: 'outfit',
            fontSize: 16,
            color: Colors.GRAY
          }}>{pet?.address}</Text>
        </View>
        <MarkFav pet={pet} />
      </View>
    </View>
  );
}
