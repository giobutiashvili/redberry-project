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
        <p class="input-option" :style="{ color: getColor(selectedName) }">
          მინიმუმ ორი სიმბოლო
        </p>
        <p class="input-option" :style="{ color: getColor(selectedName) }">
          მაქსიმუმ 255 სიმბოლო
        </p>
      </div>
      <div class="col-md-5">
        <label class="form-label">დეპარტამენტი*</label>

        <div class="custom-select" style="width: 100%">
          <div
            class="form-control d-flex align-items-center justify-content-between"
            @click="showDropdownDepartment = !showDropdownDepartment"
          >
            <div>
              {{
                departments.find((p) => p.id === selectedDepartment)?.name || ""
              }}
            </div>

            <font-awesome-icon
              :icon="['fas', 'angle-down']"
              :class="{ 'rotate-180': showDropdownDepartment }"
            />
          </div>

          <div v-if="showDropdownDepartment" class="dropdown">
            <div
              v-for="department in departments"
              :key="department.id"
              class="dropdown-item"
              @click="selectDepartment(department)"
            >
              {{ department.name }}
            </div>
          </div>
        </div>
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
        <p
          class="input-option"
          :style="{ color: getColor(selectedDescription) }"
        >
          მინიმუმ ორი სიმბოლო
        </p>
        <p
          class="input-option"
          :style="{ color: getColor(selectedDescription) }"
        >
          მაქსიმუმ 255 სიმბოლო
        </p>
      </div>
      <div class="col-md-5">
        <label class="form-label">პასუხისმგებელი თანამშრომელი*</label>

        <div class="custom-select" style="width: 270px">
          <div
            class="form-control d-flex align-items-center justify-content-between"
            @click="showDropdownEmploy = !showDropdownEmploy"
          >
            <div class="d-flex align-items-center gap-2">
              <div>
                <img
                  style="width: 30px; height: 30px; border-radius: 50%"
                  v-if="selectedemployees"
                  :src="
                    employees.find((p) => p.id === selectedemployees)?.avatar
                  "
                  class="option-icon"
                />
              </div>
              <p class="mb-0">{{ selectedEmployeeFullName }}</p>
            </div>

            <font-awesome-icon
              :icon="['fas', 'angle-down']"
              :class="{ 'rotate-180': showDropdownEmploy }"
            />
          </div>

          <div v-if="showDropdownEmploy" class="dropdown">
            <div
              v-for="employee in employees"
              :key="employee.id"
              class="dropdown-item"
              @click="selectemployee(employee)"
            >
              <img
                :src="employee.avatar"
                class="option-icon"
                style="width: 30px; height: 30px; border-radius: 50%"
              />
              {{ employee.name }} {{ employee.surname }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-4 gap-5 mb-5 mt-5">
      <div class="col-md-2" style="margin-right: 30px">
        <label for="priorities" class="form-label">პრიორიტეტი*</label>

        <div class="custom-select">
          <div
            class="form-control d-flex align-items-center justify-content-between"
            @click="showDropdown = !showDropdown"
          >
            <div>
              <img
                v-if="selectedPrioritie"
                :src="priorities.find((p) => p.id === selectedPrioritie)?.icon"
                class="option-icon"
              />
              {{
                priorities.find((p) => p.id === selectedPrioritie)?.name || ""
              }}
            </div>

            <font-awesome-icon
              :icon="['fas', 'angle-down']"
              :class="{ 'rotate-180': showDropdown }"
            />
          </div>

          <div v-if="showDropdown" class="dropdown">
            <div
              v-for="priority in priorities"
              :key="priority.id"
              class="dropdown-item"
              @click="selectPriority(priority)"
            >
              <img :src="priority.icon" class="option-icon" />
              {{ priority.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-2" style="margin-right: 30px">
        <label class="form-label">სტატუსი* </label>

        <div class="custom-select" style="width: 240px">
          <div
            class="form-control d-flex align-items-center justify-content-between"
            @click="showDropdownStatuses = !showDropdownStatuses"
          >
            <div>
              {{ statuses.find((p) => p.id === selectedStatuse)?.name || "" }}
            </div>

            <font-awesome-icon
              :icon="['fas', 'angle-down']"
              :class="{ 'rotate-180': showDropdownStatuses }"
            />
          </div>

          <div v-if="showDropdownStatuses" class="dropdown">
            <div
              v-for="statuse in statuses"
              :key="statuse.id"
              class="dropdown-item"
              @click="selectStatuses(statuse)"
            >
              {{ statuse.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <label class="form-label">დედლაინი*</label>
        <input type="date" v-model="selectedTime" class="form-control" />
      </div>
    </div>

    <div class="text-end">
      <button type="submit" :disabled="!isValidInput" class="create-task">
        დავალების შექმნა
      </button>
    </div>
  </form>
</template>

<script setup>
import httprequest from "../httprequests/HttpRequests";
import apiClient from "./ApiClient";
import { ref, onMounted, computed } from "vue";

//  სტატუსების get
const statuses = ref([]);
const showDropdownStatuses = ref(false);
const selectStatuses = (status) => {
  selectedStatuse.value = status.id;
  showDropdownStatuses.value = false;
};
const getStatuses = async () => {
  try {
    const response = await httprequest.getStatuses();
    statuses.value = response.data;
    if (statuses.value.length > 0) {
      selectedStatuse.value = statuses.value[0].id;
    }
  } catch (error) {
    console.error(error);
  }
};

//  პრიორიტეტები get
const priorities = ref([]);
const showDropdown = ref(false);
const getPriorities = async () => {
  try {
    const response = await httprequest.getPriorities();
    const data = response.data;
    priorities.value = data;

    if (data.length > 0) {
      selectedPrioritie.value = data[0].id;
    }
  } catch (error) {
    console.error(error);
  }
};
// პრიორიტეტების  არჩევის ფუნქცია
const selectPriority = (priority) => {
  selectedPrioritie.value = priority.id;
  showDropdown.value = false; //
};

// პასუხისმგებელი პირი get
const selectedemployees = ref("");
const employees = ref([]);
const showDropdownEmploy = ref(false);

const getEmployees = async () => {
  try {
    const response = await httprequest.getEmployees();
    const data = response.data;
    employees.value = data;
    if (data.length > 0) {
      selectedemployees.value = data[0].id;
    }
  } catch (error) {
    console.log(error);
  }
};
const selectemployee = (employee) => {
  selectedemployees.value = employee.id;
  showDropdownEmploy.value = false;
};
const selectedEmployeeFullName = computed(() => {
  const employee = employees.value.find(
    (p) => p.id === selectedemployees.value
  );
  return employee ? `${employee.name} ${employee.surname}` : "";
});

// დეპარტამენტი get
const selectedDepartment = ref("");
const showDropdownDepartment = ref(false);
const departments = ref([]);
const getDepartments = async () => {
  try {
    const response = await httprequest.getDepartments();
    departments.value = response.data;
    if (departments.value.length > 0) {
      selectedDepartment.value = departments.value[0].id;
    }
  } catch (error) {
    console.error(error);
  }
};
const selectDepartment = (department) => {
  selectedDepartment.value = department.id;
  showDropdownDepartment.value = false;
};

// ყველა task-ის წამოღება
const tasks = ref([]);
const getAllTasks = async () => {
  try {
    const response = await httprequest.getAllTasks();
    tasks.value = response.data;
    console.log(tasks.value);
  } catch (error) {
    console.log(error);
  }
};

// submitform

const selectedName = ref("");
const selectedDescription = ref("");

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
    console.error("Error:", error.response.data);
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
  getAllTasks();
});

const getColor = (text) => {
  return text.length >= 2 && text.length <= 255 ? "#08A508" : "#FA4D4D";
};

const isValidInput = computed(() => {
  return (
    selectedName.value.length >= 2 &&
    selectedName.value.length <= 255 &&
    selectedDescription.value.length >= 2 &&
    selectedDescription.value.length <= 255
  );
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

.option-icon {
  width: 16px;
  height: 18px;
}
.custom-select {
  position: relative;
  width: 200px;
  cursor: pointer;
}

.selected img {
  width: 18px;
  height: 16px;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}
.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f1f1f1;
}

.dropdown-item img {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>
