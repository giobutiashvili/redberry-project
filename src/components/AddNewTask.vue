<template>
  <div class="container mt-4 mb-4">
    <h2 class="text-center fw-bold">შექმენი ახალი დავალება</h2>
  </div>

  <form class="container form-container p-5">
    <div class="row mb-3 gap-5">
      <div class="col-md-5">
        <label class="form-label">სათაური*</label>
        <input
          type="text"
          class="form-control"
          placeholder="დავალების სახელი"
        />
        <p class="input-option">მინიმუმ ორი სიმბოლო</p>
        <p class="input-option">მაქსიმუმ 255 სიმბოლო</p>
      </div>
      <div class="col-md-5">
        <label class="form-label">დეპარტამენტი*</label>
        <select
          name=""
          id="department"
          v-model="selectedDepartment"
          required
          class="form-control"
        >
          <option
            v-for="department in departments"
            :value="department.id"
            :key="department.id"
          >
            {{ department.name }}
            <font-awesome-icon :icon="['fas', 'angle-down']" />
          </option>
        </select>
      </div>
    </div>

    <div class="row mb-3 gap-5 mb-5 mt-5">
      <div class="col-md-5">
        <label class="form-label">აღწერა*</label>
        <textarea
          class="form-control"
          placeholder="დავალების აღწერა"
          rows="3"
        ></textarea>
        <p class="input-option">მინიმუმ ორი სიმბოლო</p>
        <p class="input-option">მაქსიმუმ 255 სიმბოლო</p>
      </div>
      <div class="col-md-5">
        <label class="form-label">პასუხისმგებელი თანამშრომელი*</label>
        <input
          type="text"
          class="form-control"
          placeholder="დავალების სახელი"
        />
      </div>
    </div>

    <div class="row mb-4 gap-5">
      <div class="col-md-2" style="margin-right: 30px">
        <label for="priorities" class="form-label">პრიორიტეტი*</label>

        <select
          name=""
          id="priorities"
          v-model="selectedPrioritie"
          required
          class="form-control"
        >
          <option
            v-for="prioritie in priorities"
            :value="prioritie.id"
            :key="prioritie.id"
          >
            {{ prioritie.name }} {{ prioritie.icon }}
            <font-awesome-icon :icon="['fas', 'angle-down']" />
          </option>
        </select>
      </div>
      <div class="col-md-2" style="margin-right: 30px">
        <label class="form-label">სტატუსი* </label>
        <select
          name=""
          id="statuse"
          v-model="selectedStatuse"
          required
          class="form-control"
        >
          <option
            v-for="statuse in statuses"
            :value="statuse.id"
            :key="statuse.id"
          >
            {{ statuse.name
            }}<font-awesome-icon :icon="['fas', 'angle-down']" />
          </option>
        </select>
      </div>
      <div class="col-md-4">
        <label class="form-label">დედლაინი*</label>
        <input type="date" class="form-control" />
      </div>
    </div>

    <div class="text-end">
      <button type="submit" class="btn btn-primary save-btn">შენახვა</button>
    </div>
  </form>
</template>

<script setup>
import httprequest from "../httprequests/HttpRequests";
import { ref, onMounted } from "vue";

const statuses = ref([]);
const colors = ["#F7BC30", "#FB5607", "#FF006E", "#3A86FF"];

const getStatuses = async () => {
  try {
    const response = await httprequest.getStatuses();
    statuses.value = response.data;
    console.log(statuses.value);
  } catch (error) {
    console.error(error);
  }
};
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
const selectedDepartment = ref("");
const selectedPrioritie = ref("");
const selectedStatuse = ref("");

onMounted(() => {
  getStatuses();
  getPriorities();
  getDepartments();
});
</script>
<style>
.form-container {
  background-color: #fbf9ff;
  border: 1px solid #ddd2ff;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.input-option {
  font-size: 12px;
  color: #6c757d;
  margin-top: 2px;
}

.save-btn {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
}
</style>
