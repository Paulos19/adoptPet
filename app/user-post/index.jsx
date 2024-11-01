import { View, Text, FlatList, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import PetListItem from './../../components/Home/PetListItem'
import { db } from '../../config/FirebaseConfig';
import Colors from '../../constants/Colors';

export default function UserPost() {

    const navigation = useNavigation();
    const {user} = useUser();
    const [userPostList, setUserPostList] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() =>{
        navigation.setOptions({
            headerTitle:'Minhas Postagens'
        })
        user && GetUserPost();
    }, [user]);

    const GetUserPost = async () => {
        setLoader(true);
        setUserPostList([]);
        const q = query(collection(db, 'Pets'), where('email', '==', user?.primaryEmailAddress?.emailAddress));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) =>{
            console.log(doc.data());
            setUserPostList(prev=>[...prev, doc.data()])
        })
        setLoader(false);
    }

    const OnDeletePost = (docId) =>{
        Alert.alert('Excluir Postagem', 'Você quer excluir essa postagem?', [
            {
                text:'Cancelar',
                onPress: ()=>console.log("Cancel Click"),
                style: 'cancel'
            },
            {
                text:'Excluir',
                onPress: ()=>deletePost(docId)
            }
        ])
    }

    const deletePost = async (docId) => {
        await deleteDoc(doc(db, 'Pets', docId));
        GetUserPost();
    }

  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30,
        color: Colors.backgroundGradientStart
      }}>Minhas Postagens</Text>

      <FlatList
        data={userPostList}
        numColumns={2}
        refreshing={loader}
        onRefresh={GetUserPost}
        renderItem={({item, index})=>(
            <View>
               <PetListItem pet={item} key={index}/> 
               <Pressable onPress={()=> OnDeletePost(item?.id)} style={styles.deleteBtn}>
                    <Text style={{
                        fontFamily:'outfit',
                        textAlign:'center'
                    }}>Excluir</Text>
               </Pressable>
            </View>
        )}
      />

      {userPostList?.length==0 && <Text style={{
        textAlign:'center',
        fontFamily:'outfit-medium',
        marginVertical:250,
        fontSize:30,
        color:Colors.GRAY
      }}>Não há Postagens</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  deleteBtn: {
    backgroundColor: Colors.backgroundGradientEnd,
    padding:5,
    borderRadius:7,
    marginTop:5,
    marginRight:12
  }
})
