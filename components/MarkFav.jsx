import { View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Shared from './../Shared/Shared';
import { useUser } from '@clerk/clerk-expo';

export default function MarkFav({ pet, color='black' }) {
  const { user } = useUser();
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    if (user) {
      GetFav();
    }
  }, [user]);

  const GetFav = async () => {
    const result = await Shared.GetFavList(user);
    console.log("Lista de favoritos recuperada:", result);
    setFavList(result?.favorites || []);
  };

  const AddToFav = async () => {
    
    if (favList.includes(pet?.id)) return;

    
    const favResult = [...favList, pet?.id];
    setFavList(favResult); 

    console.log("Adicionando ID ao favorito:", pet.id);
    await Shared.UpdateFav(user, favResult); 
    await GetFav();
  };

  return (
    <View>
      {favList?.includes(pet.id) ? (
        <Pressable onPress={async () => {
          const updatedList = favList.filter(favId => favId !== pet.id);
          setFavList(updatedList);
          await Shared.UpdateFav(user, updatedList);
          await GetFav();
        }}>
          <Ionicons name="heart" size={30} color="red" />
        </Pressable>
      ) : (
        <Pressable onPress={AddToFav}>
          <Ionicons name="heart-outline" size={30} color={color} />
        </Pressable>
      )}
    </View>
  );
}
