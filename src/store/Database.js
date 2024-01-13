// useStore.js
import { ref } from 'vue';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

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

export const useStore = () => {
    return { users, teams, fetchUsers, fetchTeams };
};
