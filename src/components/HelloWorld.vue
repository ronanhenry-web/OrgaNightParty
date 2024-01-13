<template>
  <div>
    <h1>Liste des Personnes</h1>
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="name" label="Prénom" width="150" :formatter="formatFirstLetterToUpperCase" />
      <el-table-column prop="lastname" label="Nom" width="150" :formatter="formatUppercase" />
      <el-table-column prop="age" label="Âge" width="80" />
      <el-table-column prop="feedback" label="Feedback" width="200" :formatter="formatFirstLetterToUpperCase" />
      <el-table-column prop="gender" label="Genre" width="80" :formatter="formatUppercase" />
      <el-table-column prop="paid" label="Payé" width="100" :formatter="formatBoolean" />
      <el-table-column prop="present" label="Présent" width="100" :formatter="formatBoolean" />
      <el-table-column prop="team.id" label="Équipe" width="150" :formatter="formatFirstLetterToUpperCase" />
      <el-table-column prop="vegan" label="Végan" width="100" :formatter="formatBoolean" />
      <el-table-column fixed="right" label="Opérations" width="180">
        <template #default="{row}">
          <el-button type="primary" size="small" @click="handleDetail(row)">Détail</el-button>
          <el-button type="success" size="small" @click="handleEdit(row)">Éditer</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ElTable, ElTableColumn, ElButton  } from 'element-plus';

const users = ref([]);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  users.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

const formatFirstLetterToUpperCase = (row, column, cellValue) => {
  if (!cellValue) return '';
  return cellValue.charAt(0).toUpperCase() + cellValue.slice(1).toLowerCase();
};

const formatUppercase = (row, column, cellValue) => {
  return cellValue.toUpperCase();
};

const formatBoolean = (row, column, value) => {
  return value ? 'Oui' : 'Non';
};

const handleDetail = (user) => {
  console.log('Détails pour:', user);
};

const handleEdit = (user) => {
  console.log('Éditer:', user);
};
</script>