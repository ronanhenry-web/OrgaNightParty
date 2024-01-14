import { ref } from 'vue';
import { db } from '@/firebase';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';

const users = ref([]);
const teams = ref([]);

const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    users.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

const fetchTeams = async () => {
    const querySnapshot = await getDocs(collection(db, 'teams'));
    teams.value = querySnapshot.docs.map(doc => ({
    value: doc.id,
    label: doc.data().name,
    }));
};

export const addUser = async (userData) => {
    try {
        const newUserRef = doc(collection(db, 'users'));
    await setDoc(newUserRef, userData);
    } catch (error) {
        console.error('Erreur lors de l’ajout de l’utilisateur:', error);
    throw error;
    }
};

export const useStore = () => {
    return { users, teams, fetchUsers, fetchTeams, addUser  };
};
