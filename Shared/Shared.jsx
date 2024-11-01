import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../config/FirebaseConfig';

const GetFavList = async (user) => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return { favorites: [] }; // Caso o email seja indefinido

    const docRef = doc(db, 'UserFavPet', email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data(); // Retorna os dados existentes
    } else {
        // Inicializa o documento com um array vazio
        await setDoc(docRef, { email, favorites: [] });
        return { favorites: [] }; // Retorna a estrutura inicial
    }
};

const UpdateFav = async (user, favorites) => {
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!email) return; // Caso o email seja indefinido

    const docRef = doc(db, 'UserFavPet', email);
    try {
        await updateDoc(docRef, { favorites });
        console.log("Favoritos atualizados com sucesso");
    } catch (error) {
        console.error("Erro ao atualizar favoritos:", error);
    }
};

export default {
    GetFavList,
    UpdateFav,
};
