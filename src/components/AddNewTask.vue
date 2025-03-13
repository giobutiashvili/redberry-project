<template>
  <div class="container mt-4 mb-4">
    <h2 class="text-center fw-bold">შექმენი ახალი დავალება</h2>
  </div>

  <form @submit.prevent="submitForm" class="container form-container p-5">
    <div class="row mb-3 gap-5">
      <div class="col-md-5">
        <label class="form-label">სათაური*</label>
        <input
          type="text"
          class="form-control"
          placeholder="დავალების სახელი"
          v-model="selectedName"
          required
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
          v-model="selectedDescription"
        ></textarea>
        <p class="input-option">მინიმუმ ორი სიმბოლო</p>
        <p class="input-option">მაქსიმუმ 255 სიმბოლო</p>
      </div>
      <div class="col-md-5">
        <label class="form-label">პასუხისმგებელი თანამშრომელი*</label>
        <select
          name=""
          id="priorities"
          v-model="selectedemployees"
          required
          class="form-control"
        >
          <option
            v-for="employee in employees"
            :value="employee.id"
            :key="employee.id"
          >
            {{ employee.name }} {{ employee.surname }}
            <font-awesome-icon :icon="['fas', 'angle-down']" />
          </option>
        </select>
      </div>
    </div>

    <div class="row mb-4 gap-5 mb-5 mt-5">
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
            <img :src="prioritie.icon" alt="Icon" class="option-icon" />
            {{ prioritie.name }}
          </option>
          <font-awesome-icon :icon="['fas', 'angle-down']" />
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
        <input type="date" v-model="selectedTime" class="form-control" />
      </div>
    </div>

    <div class="text-end">
      <button type="submit" class="create-task">დავალების შექმნა</button>
    </div>
  </form>
</template>

<script setup>
import httprequest from "../httprequests/HttpRequests";
import apiClient from "./ApiClient";
import { ref, onMounted } from "vue";

const colors = ["#F7BC30", "#FB5607", "#FF006E", "#3A86FF"];

//  სტატუსების get
const statuses = ref([]);
const getStatuses = async () => {
  try {
    const response = await httprequest.getStatuses();
    statuses.value = response.data;
    console.log(statuses.value);
  } catch (error) {
    console.error(error);
  }
};
//  პრიორიტეტები get
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
// პასუხისმგებელი პირი get
const employees = ref([]);

const getEmployees = async () => {
  try {
    const response = await httprequest.getEmployees();
    employees.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

// დეპარტამენტი get
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

// submitform

const selectedName = ref("");
const selectedDescription = ref("");
const selectedDepartment = ref("");
const selectedemployees = ref("");
const selectedPrioritie = ref("");
const selectedStatuse = ref("");
const selectedTime = ref("");

const submitForm = async () => {
  const requestData = {
    name: selectedName.value,
    description: selectedDescription.value,
    due_date: selectedTime.value,
    status_id: selectedStatuse.value,
    priority_id: selectedPrioritie.value,
    department: selectedDepartment.value,
    employee_id: selectedemployees.value,
  };
  try {
    const response = await apiClient.post("/tasks", requestData);
    console.log(response.data);
    clearForm();
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
};
const clearForm = () => {
  selectedName.value = "";
  selectedDescription.value = "";
  selectedDepartment.value = "";
  selectedemployees.value = "";
  selectedPrioritie.value = "";
  selectedStatuse.value = "";
  selectedTime.value = "";
};

onMounted(() => {
  getStatuses();
  getPriorities();
  getDepartments();
  getEmployees();
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
.option-icon {
  width: 16px;
  height: 18px;
}
</style>
