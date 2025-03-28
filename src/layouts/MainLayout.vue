<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="home" aria-label="Home" to="/" />
        <q-toolbar-title> Gestor de Orçamentos </q-toolbar-title>
        <q-btn flat dense round icon="add" aria-label="Cadastro" to="/register" />
        <q-btn flat dense round icon="list" aria-label="Listagem" to="/budgets" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">

</script>
