<template>
  <div>
    <h1>Liste des Personnes</h1>
    <ul>
      <li v-for="personne in personnes" :key="personne.id">
        {{ personne.prenom }} {{ personne.nom }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default {
  name: 'HelloWorld',
  setup() {
    const personnes = ref([]);

    onMounted(async () => {
      const querySnapshot = await getDocs(collection(db, 'personnes'));
      personnes.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    });

    return { personnes };
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
