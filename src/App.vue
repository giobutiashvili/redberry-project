<template>
  <div class="container header">
    <header class="row align-items-center py-3">
      <div class="col-6 d-flex align-items-center gap-3">
        <router-link to="/" class="logo d-flex align-items-center gap-2">
          <img src="./assets/Momentum.png" alt="Momentum" />
          <img src="./assets/Hourglass.png" alt="image" />
        </router-link>
      </div>
      <div class="col-6 d-flex justify-content-end gap-3">
        <button class="add-staf">თანამშრომლის შექმნა</button>
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
</script>

<style scoped>
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
</style>
