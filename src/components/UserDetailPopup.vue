<template>
<div v-if="user" class="user-detail-popup">
    <h3>Détails de <p v-if="user.name">{{ user.name }}</p><p v-if="user.lastname">{{ user.lastname }}</p></h3>
    <p v-if="user.gender"><strong>Genre:</strong> {{ user.gender }}</p>
    <p v-if="typeof user.age !== 'undefined'"><strong>Age:</strong> {{ user.age }}</p>
    <p v-if="user.feedback"><strong>Feedback:</strong> {{ user.feedback }}</p>
    <p v-if="typeof user.paid !== 'undefined'"><strong>Payé:</strong> {{ formatBoolean(user.paid) }}</p>
    <p v-if="typeof user.present !== 'undefined'"><strong>Présence:</strong> {{ formatBoolean(user.present) }}</p>
    <p v-if="typeof user.vegan !== 'undefined'"><strong>Régime végan:</strong> {{ formatBoolean(user.vegan) }}</p>
    <p v-if="user.team && user.team.id"><strong>Team:</strong> {{ user.team.id }}</p>
</div>
<div v-else>
    Utilisateur non sélectionné ou données manquantes.
</div>
</template>

<script>
export default {
name: "UserDetailPopup",
props: {
    user: {
    type: Object,
    required: true
    }
},
methods: {
    formatBoolean(value) {
    return value ? 'Oui' : 'Non';
    }
}
};
</script>
