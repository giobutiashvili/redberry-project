<template>
  <main class="container my-4 p-0">
    <div>
      <h2 class="mt-5 mb-5 task">დავალებების გვერდი</h2>
    </div>
    <div class="d-flex justify-content-between mb-3">
      <ul class="d-flex me-auto mb-2 mb-lg-0">
        <li class="mx-2">
          დეპარტამენტი <font-awesome-icon :icon="['fas', 'angle-down']" />
        </li>
        <li class="mx-2">
          პრიორიტეტი <font-awesome-icon :icon="['fas', 'angle-down']" />
        </li>
        <li class="mx-2">
          თანამშრომელი <font-awesome-icon :icon="['fas', 'angle-down']" />
        </li>
      </ul>
    </div>
  </main>

  <section>
    <!-- სტატუსების ნავიგაცია -->
    <div class="container p-0">
      <div class="d-flex justify-content-between">
        <button
          class="btn-status"
          v-for="(status, index) in statuses"
          :key="status.id"
          :style="{
            backgroundColor: colors[index],
            color: '#fff',
          }"
        >
          {{ status.name }}
        </button>
      </div>
    </div>
    <!-- ქარდები -->
    <div class="container mt-5 p-0">
      <div class="row">
        <div class="col-3">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div class="d-flex">
                  <div v-for="priority in priorities" :key="priority.id">
                    <img
                      :src="priority.icon"
                      :alt="priority.name"
                      class="priority-icon"
                    />
                    <p class="card-title">{{ priority.name }}</p>
                  </div>

                  <h5 class="card-title">დიზაინი</h5>
                </div>
                <div>
                  <time class="card-title"> დეპარტამენტი </time>
                </div>
              </div>
              <div>
                <h4>Redberry-ს საიტის ლენდინგის დიზაინი</h4>
                <p>
                  შექმენი საიტის მთავარი გვერდი, რომელიც მოიცავს მთავარ
                  სექციებს, ნავიგაციას.
                </p>
              </div>
              <div class="d-flex justify-content-between">
                <p>image</p>
                <p>coments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import httprequest from "../httprequests/HttpRequests";
import { ref, onMounted } from "vue";

const statuses = ref([]);
const colors = ["#F7BC30", "#FB5607", "#FF006E", "#3A86FF"];

// სტატუსების მიღება
const getStatuses = async () => {
  try {
    const response = await httprequest.getStatuses();
    statuses.value = response.data;
    console.log(statuses.value);
  } catch (error) {
    console.error(error);
  }
};

// პრიორიტეტების request-ი
const priorities = ref([]);
const getPriorities = async () => {
  try {
    const response = await httprequest.getPriorities();
    priorities.value = response.data;
    console.log(priorities.value);
  } catch (error) {
    console.error(error);
  }
};

// დეპარტამენტების request-ი
const departments = ref([]);
const getDepartments = async () => {
  try {
    const response = await httprequest.getDepartments();
    departments.value = response.data;
    console.log(departments.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getStatuses();
  getPriorities();
  getDepartments();
});
</script>

<style>
ul {
  list-style-type: none;
  padding: 6px;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  display: flex;
  gap: 24px;
  color: #021526;
  margin: 0;
}

li {
  white-space: normal;
  word-wrap: break-word;
  padding: 5px 0;
}
li:hover {
  cursor: pointer;
  color: #8338ec;
}
.task {
  color: #212529;
  font-family: "Fira Go", sans-serif;
  font-size: 34px;
  font-weight: 600;
  line-height: 100%;
  letter-spacing: 0%;
}

.btn-status {
  background-color: #8338ec;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 15px;
  font-size: 20px;
  font-weight: 500;
  line-height: 100%;
  margin-right: 20px;
  width: 381px;
}
.priority-icon {
  width: 24px;
  height: 24px;
}
</style>
