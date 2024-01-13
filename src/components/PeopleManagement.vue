<template>
  <div>
    <div>
      <h1>Catalogue des Participants</h1>
      <!-- Search bar -->
      <div>
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearch"
          popper-class="my-autocomplete"
          placeholder="Chercher une personne"
          @select="handleSelect"
        >
          <template #suffix>
            <el-icon class="el-input__icon" @click="handleIconClick">
              <edit />
            </el-icon>
          </template>
          <template #default="{ item }">
            <div class="value">{{ item.value }}</div>
            <span class="link">{{ item.link }}</span>
          </template>
        </el-autocomplete>
      </div>
      <!-- Filter -->
      <div>
        <el-select
          v-model="selectedTeam"
          filterable
          placeholder="Filtrer par équipe"
          style="width: 200px"
        >
          <el-option label="Reset" :value="''" />
          <el-option
            v-for="team in teams"
            :key="team.value"
            :label="team.label"
            :value="team.value"
          />
        </el-select>
      </div>
      <div>
        <el-select
          v-model="selectedGender"
          filterable
          placeholder="Filtrer par genre"
          style="width: 200px"
        >
          <el-option label="Reset" :value="''" />
          <el-option label="Homme" value="m" />
          <el-option label="Femme" value="f" />
        </el-select>
      </div>
      <div>
        <el-select
          v-model="selectedPaid"
          filterable
          placeholder="Filtrer par statut de paiement"
          style="width: 200px"
        >
          <el-option label="Reset" :value="''" />
          <el-option label="Payé" value="true" />
          <el-option label="Non Payé" value="false" />
        </el-select>
      </div>
      <div>
        <el-select
          v-model="selectedPresent"
          filterable
          placeholder="Filtrer par présence"
          style="width: 200px"
        >
          <el-option label="Reset" :value="''" />
          <el-option label="Présent" value="true" />
          <el-option label="Absent" value="false" />
        </el-select>
      </div>
      <div>
        <el-select
          v-model="selectedVegan"
          filterable
          placeholder="Filtrer par régime végan"
          style="width: 200px"
        >
          <el-option label="Reset" :value="''" />
          <el-option label="Végan" value="true" />
          <el-option label="Non Végan" value="false" />
        </el-select>
      </div>
      <!-- Table -->
      <el-table :data="filteredResults" style="width: 50%; margin: auto; margin-top: 5%;">
          <el-table-column prop="name" label="Prénom" width="150" :formatter="formatFirstLetterToUpperCase" align="center" />
          <el-table-column prop="lastname" label="Nom" width="150" :formatter="formatUppercase" align="center" />
          <el-table-column prop="gender" label="Genre" width="80" :formatter="formatUppercase" align="center" />
          <el-table-column prop="paid" label="Payé" width="100" :formatter="formatBoolean" align="center" />
          <el-table-column prop="present" label="Présent" width="100" :formatter="formatBoolean" align="center" />
          <el-table-column prop="vegan" label="Végan" width="100" :formatter="formatBoolean" align="center" />
          <el-table-column prop="team.id" label="Équipe" width="150" :formatter="formatFirstLetterToUpperCase" align="center" />
          <el-table-column prop="age" label="Âge" width="80" align="center" />
          <el-table-column prop="feedback" label="Feedback" width="200" :formatter="formatFirstLetterToUpperCase" align="center" />
          <el-table-column fixed="right" label="Opérations" width="180"  align="center">
            <template #default="{row}">
              <el-button type="primary" size="small" @click="handleDetail(row)">Détail</el-button>
              <el-button type="success" size="small" @click="handleEdit(row)">Éditer</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from '@/store/Database';
import { ElTable, ElTableColumn, ElButton  } from 'element-plus';
import { Edit } from '@element-plus/icons-vue';

const { users, teams, fetchUsers, fetchTeams } = useStore();
const selectedTeam = ref('');
const selectedGender = ref('');
const selectedPaid = ref('');
const selectedPresent = ref('');
const selectedVegan = ref('');

// Search bar
const state = ref('');
const links = ref([]);

const querySearch = (queryString, cb) => {
  const results = queryString
    ? users.value.filter(createFilter(queryString))
    : users.value;
  cb(results.map(user => ({ value: user.name + ' ' + user.lastname })));
};

const createFilter = (queryString) => {
  return (user) => {
    return (
      user.name.toLowerCase().includes(queryString.toLowerCase()) || 
      user.lastname.toLowerCase().includes(queryString.toLowerCase())
    );
  };
};

const loadAll = () => {
  return [
    // Mes données
  ];
};

const handleSelect = (item) => {
  console.log(item);
};

const handleIconClick = (ev) => {
  console.log(ev);
};

onMounted(async () => {
  await fetchUsers();
  await fetchTeams();
  links.value = loadAll();
});

// Filter
const filteredResults = computed(() => {
  const filteredBySearch = state.value
    ? users.value.filter(user =>
        user.name.toLowerCase().includes(state.value.toLowerCase()) ||
        user.lastname.toLowerCase().includes(state.value.toLowerCase())
      )
    : users.value;

  return filteredBySearch.filter(user => {
    return (
      (selectedTeam.value === '' || user.team.id === selectedTeam.value) &&
      (selectedGender.value === '' || user.gender === selectedGender.value) &&
      (selectedPaid.value === '' || user.paid.toString() === selectedPaid.value) &&
      (selectedPresent.value === '' || user.present.toString() === selectedPresent.value) &&
      (selectedVegan.value === '' || user.vegan.toString() === selectedVegan.value)
    );
  });
});

// Formatter
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

// Operations
const handleDetail = (user) => {
  console.log('Détails pour:', user);
};

const handleEdit = (user) => {
  console.log('Éditer:', user);
};
</script>