<template>
  <div class="header">
    <header class="row align-items-center py-3" style="margin-right: 18px">
      <div class="col-6 d-flex align-items-center gap-3">
        <router-link to="/" class="logo d-flex align-items-center gap-2">
          <img src="./assets/Momentum.png" alt="Momentum" />
          <img src="./assets/Hourglass.png" alt="image" />
        </router-link>
      </div>
      <div class="col-6 d-flex justify-content-end gap-3">
        <button @click="isModalVisible = true" class="add-staf">
          თანამშრომლის შექმნა
        </button>
        <AddNewEmpl v-if="isModalVisible" @close="isModalVisible = false" />
        <router-link :to="{ name: 'addnewtask' }" class="create-task">
          + შექმენი ახალი დავალება
        </router-link>
      </div>
    </header>
  </div>
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref } from "vue";
import AddNewEmpl from "./components/AddNewEmpl.vue";

const isModalVisible = ref(false);
</script>

<style>
body {
  max-width: 1600px;
  margin: auto !important;
}
.header {
  background-color: #fff;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* ღილაკები */
.add-staf,
.create-task {
  border-radius: 5px;
  border: 1px solid #8338ec;
  padding: 8px 20px;
  background-color: #fff;
  font-family: "Fira Go", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 100%;
  color: #212529;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  text-decoration: none;
}

.add-staf {
  width: 240px;
  height: 39px;
  border: 1px solid #8338ec;
  color: #212529;
}

.add-staf:hover {
  border-color: #b588f4;
}

.create-task {
  width: 268px;
  height: 40px;
  background-color: #8338ec;
  border: 1px solid #8338ec;
  color: #fff;
}

.create-task:hover {
  background-color: #b588f4;
  color: #fff;
}
/* modali */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
.types {
  font-family: "Fira Go", sans-serif;
  margin-right: 5px;
  font-size: 16px;
  line-height: 19.54px;
  font-weight: 500;
  color: #1a1a1f;
}
.input-option {
  font-family: "Fira Go", sans-serif;
  font-size: 14px;
  line-height: 16.8px;
  font-weight: 400;
  color: #021526;
}
</style>
