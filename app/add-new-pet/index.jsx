import { View, Text, Image, TextInput, StyleSheet, ScrollView, Pressable, ToastAndroid, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db, storage } from '../../config/FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';

export default function AddNewPet() {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({ category: 'coelho', sex: 'Macho' });
    const [gender, setGender] = useState('Macho');
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('coelho');
    const [image, setImage] = useState(null);
    const [loader, setLoader] = useState(false);
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Adicionar Novo Pet',
        });
        GetCategories();
    }, []);

    const GetCategories = async () => {
        setCategoryList([]);
        const snapshot = await getDocs(collection(db, 'Category'));
        const categories = snapshot.docs.map(doc => doc.data());
        setCategoryList(categories);
    };

    const imagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleInputChange = (fieldName, fieldValue) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue,
        }));
    };

    const onSubmit = () => {
        if (Object.keys(formData).length < 8) {
            ToastAndroid.show('Insira todos os Detalhes', ToastAndroid.SHORT);
            return;
        }
        UploadImage();
    };

    const UploadImage = async () => {
      if (!image) return;
  
      setLoader(true);
      const resp = await fetch(image);
      const blobImage = await resp.blob();
      const storageRef = ref(storage, `/PetAdopt/${Date.now()}.jpg`);
  
      try {
          await uploadBytes(storageRef, blobImage);
          const downloadURL = await getDownloadURL(storageRef);
  
          // Substitui apenas a primeira barra após 'PetAdopt'
          const formattedImageUrl = downloadURL.replace(/(PetAdopt\/)/, 'PetAdopt%2F');
          SaveFormData(formattedImageUrl);
      } catch (error) {
          console.error("Error uploading image: ", error);
          setLoader(false);
      }
  };
  
  const SaveFormData = async (imageUrl) => {
      const docId = Date.now().toString();
      await setDoc(doc(db, 'Pets', docId), {
          ...formData,
          imageUrl: imageUrl, // Usa a URL formatada com a barra específica substituída
          username: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          userImage: user?.imageUrl,
          id: docId,
      });
      setLoader(false);
      router.replace('/(tabs)/home');
  };
  

    return (
        <ScrollView style={{ padding: 20 }}>
            <Text style={styles.title}>Adicionar Novo Pet</Text>

            <Pressable onPress={imagePicker}>
                <Image
                    source={image ? { uri: image } : require('./../../assets/images/dog.png')}
                    style={styles.image}
                />
            </Pressable>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome do Pet *</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => handleInputChange('name', value)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Categoria *</Text>
                <Picker
                    selectedValue={selectedCategory}
                    style={styles.input}
                    onValueChange={(itemValue) => {
                        setSelectedCategory(itemValue);
                        handleInputChange('category', itemValue);
                    }}>
                    {categoryList.map((category, index) => (
                        <Picker.Item key={index} label={category.name} value={category.name} />
                    ))}
                </Picker>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Raça *</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => handleInputChange('breed', value)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Idade *</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='number-pad'
                    onChangeText={(value) => handleInputChange('age', value)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Gênero *</Text>
                <Picker
                    selectedValue={gender}
                    style={styles.input}
                    onValueChange={(itemValue) => {
                        setGender(itemValue);
                        handleInputChange('sex', itemValue);
                    }}>
                    <Picker.Item label="Macho" value="Macho" />
                    <Picker.Item label="Fêmea" value="Fêmea" />
                    <Picker.Item label="Variado" value="Variado" />
                </Picker>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Peso *</Text>
                <TextInput
                    style={styles.input}
                    keyboardType='number-pad'
                    onChangeText={(value) => handleInputChange('weight', value)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Endereço *</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(value) => handleInputChange('address', value)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Sobre *</Text>
                <TextInput
                    style={styles.input}
                    numberOfLines={5}
                    multiline={true}
                    onChangeText={(value) => handleInputChange('about', value)}
                />
            </View>

            <TouchableOpacity style={styles.button} disabled={loader} onPress={onSubmit}>
                {loader ? <ActivityIndicator size='large' /> :
                <Text style={styles.buttonText}>Enviar</Text>}
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'outfit-bold',
        fontSize: 20,
        color: Colors.backgroundGradientStart,
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.backgroundGradientStart,
        marginBottom: 20,
    },
    inputContainer: {
        marginVertical: 5,
    },
    input: {
        padding: 10,
        backgroundColor: Colors.WHITE,
        borderRadius: 7,
        fontFamily: 'outfit',
    },
    label: {
        marginVertical: 5,
        fontFamily: 'outfit',
    },
    button: {
        padding: 15,
        backgroundColor: Colors.backgroundGradientStart,
        borderRadius: 7,
        marginVertical: 10,
        marginBottom: 50,
    },
    buttonText: {
        fontFamily: 'outfit-medium',
        textAlign: 'center',
    },
});
