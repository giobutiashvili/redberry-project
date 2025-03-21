<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="content">
      <div class="modal-header align-items-center">
        <h2>თანამშრომლის დაამატება</h2>
      </div>
      <div class="modal-body">
        <form @submit.prevent="submitForm">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">სახელი*</label>
              <input
                class="form-control rounded p-2"
                type="text"
                v-model="name"
                required
              />
              <div class="d-flex">
                <font-awesome-icon
                  class="input-option"
                  :icon="['fas', 'check']"
                />
                <p class="input-option" :style="{ color: getColor(name) }">
                  მინიმუმ ორი სიმბოლო
                </p>
              </div>
              <div class="d-flex">
                <font-awesome-icon
                  class="input-option"
                  :icon="['fas', 'check']"
                />
                <p class="input-option" :style="{ color: getColor(name) }">
                  მაქსიმუმ 255 სიმბოლო
                </p>
              </div>
            </div>
            <div class="col-md-6">
              <label class="form-label">გვარი*</label>
              <input
                class="form-control rounded p-2"
                type="text"
                v-model="surname"
                required
              />
              <div class="d-flex">
                <font-awesome-icon
                  class="input-option"
                  :icon="['fas', 'check']"
                />
                <p class="input-option" :style="{ color: getColor(surname) }">
                  მინიმუმ ორი სიმბოლო
                </p>
              </div>
              <div class="d-flex">
                <font-awesome-icon
                  class="input-option"
                  :icon="['fas', 'check']"
                />
                <p class="input-option" :style="{ color: getColor(surname) }">
                  მაქსიმუმ 255 სიმბოლო
                </p>
              </div>
            </div>
          </div>

          <div class="col-md-12 mt-4">
            <h5 class="mb-3 types">ავატარი*</h5>
            <label class="form-label upload-label col-md-12" for="fileInput">
              <div
                class="upload-container rounded p-4 text-center"
                style="border: 1px dashed #2d3648; width: 920px; height: 130px"
              >
                <div class="parentimage">
                  <img
                    :src="previewImage"
                    alt="Preview"
                    :class="{
                      'preview-img': previewImage !== defaultImage,
                      'default-img': previewImage === defaultImage,
                    }"
                  />
                  <img
                    :src="trashcan"
                    v-if="previewImage !== defaultImage"
                    @click="removeImage"
                    class="delete-btn"
                  />

                  <p v-if="previewImage === defaultImage">ატვირთე ფოტო</p>
                </div>
              </div>
            </label>
            <input
              type="file"
              id="fileInput"
              class="d-none"
              @change="uploadFile"
            />

            <div class="col-md-5">
              <label class="form-label">დეპარტამენტი*</label>

              <div class="custom-select" style="width: 100%">
                <div
                  class="form-control d-flex align-items-center justify-content-between"
                  @click="showDropdownDepartment = !showDropdownDepartment"
                >
                  <div>
                    {{
                      departments.find((p) => p.id === selectedDepartment)
                        ?.name || ""
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

          <div class="d-flex g-3 mt-5 justify-content-end gap-3">
            <button
              type="button"
              @click="$emit('close')"
              style="
                width: 102px;
                height: 40px;
                border: 1px solid #8338ec;
                padding: 10px, 16px !important;
                border-radius: 5px !important;
                background-color: #fff;
              "
            >
              გაუქმება
            </button>
            <button
              :disabled="!isValidInput"
              type="submit"
              style="
                width: 263px;
                height: 40px;
                border-radius: 5px;
                padding: 10px, 20px;
                color: #fff;
                background-color: #8338ec;
              "
            >
              დაამატე თანამშრომელი
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import apiClient from "@/components/apiClient";
import httprequest from "../httprequests/HttpRequests";
import { onMounted, ref, computed } from "vue";
import defaultImage from "@/assets/photoframe.png";
import trashcan from "@/assets/trashcan.png";

// ფაილის ატვირთვა
const name = ref("");
const surname = ref("");
const file = ref(null);
const previewImage = ref(defaultImage);

// ვალიდაციის ფერები
const getColor = (text) => {
  return text.length >= 2 && text.length <= 255 ? "#08A508" : "#FA4D4D";
};
// ტექსტის ვალიდაცია
const isValidInput = computed(() => {
  return (
    name.value.length >= 2 &&
    name.value.length <= 255 &&
    surname.value.length >= 2 &&
    surname.value.length <= 255
  );
});

// ფაილის ატვირთვა
const uploadFile = (event) => {
  const uploadedFile = event.target.files[0];
  const maxSize = 600 * 1024;
  if (uploadedFile) {
    if (uploadedFile.size > maxSize) {
      alert("ფაილის ზომა უნდა იყოს მაქსიმუმ 600KB!");
      return;
    }

    file.value = uploadedFile;
    previewImage.value = URL.createObjectURL(uploadedFile);
  }
};

// ფორმის გაგზავნა
const submitForm = async () => {
  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("surname", surname.value);
  formData.append("avatar", file.value);
  formData.append("department_id", selectedDepartment.value);

  // გაგზავნა
  try {
    const response = await apiClient.post("/employees", formData);
    console.log("Response", response.data);
    clearForm();
  } catch (error) {
    console.error("error", error);
  }
};

// ფორმის გასუფთავება
const clearForm = () => {
  name.value = "";
  surname.value = "";
  selectedDepartment.value = "";
  file.value = null;
  previewImage.value = defaultImage;
};
// სურათის წაშლა
const removeImage = () => {
  file.value = null;
  previewImage.value = defaultImage;
};
// დეპარტამენტი
const showDropdownDepartment = ref(false);

const departments = ref([]);
const selectedDepartment = ref("");
const selectDepartment = (department) => {
  selectedDepartment.value = department.id;
  showDropdownDepartment.value = false;
};
const getDepartments = async () => {
  try {
    const response = await httprequest.getDepartments();
    departments.value = response.data;
  } catch (error) {
    console.error(error);
  }
};
onMounted(() => {
  getDepartments();
});
</script>

<style scoped>
.content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 50%;
}
.input-option {
  font-size: 12px;
  color: #6c757d;
}
.default-img {
  width: 24px;
  height: 24px;
}
.parentimage {
  position: relative;
  display: inline-block;
}

.preview-img {
  width: 84px;
  height: 84px;
  border-radius: 100px;
  object-fit: cover;
}

.delete-btn {
  position: absolute;

  bottom: 0px;
  right: 0px;
  width: 24px;
  height: 24px;
  cursor: pointer;
}
.rotate-180 {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}
.dropdown {
  position: absolute;
  top: 82%;
  left: 0;
  width: 384px;
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
