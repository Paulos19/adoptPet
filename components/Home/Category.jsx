import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import {db} from './../../config/FirebaseConfig'
import Colors from './../../constants/Colors'

export default function Category({category}) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('coelho')
  useEffect(() =>{
    GetCategories();
  }, [])

   const GetCategories = async () => {
    setCategoryList([])
    const snapshot = await getDocs(collection(db, 'Category'));
    snapshot.forEach((doc) =>{
      setCategoryList(categoryList => [...categoryList,doc.data()])
    })
   }

  return (
    <View style={{
        marginTop:20,

    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize: 20
      }}>Categorias</Text>

      <FlatList
        data={categoryList}
        numColumns={4}
        renderItem={({item, index}) => (
            <TouchableOpacity
            onPress={() => {setSelectedCategory(item.name);
              category(item.name)
            }}
            style={{
                flex:1
            }}>
                <View style={[styles.container, selectedCategory == item.name&&styles.selectedCategoryContainer]}>
                    <Image source={{uri: item?.imageUrl}}
                        style={{
                            width:40,
                            height:40
                        }}
                    />
                </View>
                <Text style={{
                    textAlign: 'center',
                    fontFamily:'outfit'
                }}>{item?.name}</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundGradientStart,
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 99,
    borderColor: Colors.backgroundGradientEnd,
    margin:5
  },
  selectedCategoryContainer: {
    backgroundColor: Colors.backgroundGradientEnd
  }
})
