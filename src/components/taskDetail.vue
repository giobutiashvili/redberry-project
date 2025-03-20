<template>
  <section class="task-detail col-12">
    <div class="container d-flex justify-content-between">
      <div class="col-5">
        <div class="d-flex justify-content-between">
          <div class="">
            <div class="d-flex flex-column">
              <div class="d-flex justify-content-between">
                <div v-if="task">
                  <div class="d-flex mb-3 mt-3">
                    <!-- პრიორიტეტის ბლოკი -->
                    <div
                      class="priority-badge"
                      :style="{
                        borderColor: getPriorityColor(task.priority.id),
                      }"
                    >
                      <img
                        :src="task.priority.icon"
                        :alt="task.priority.name"
                        class="me-1"
                        style="width: 12px; height: 9px"
                      />
                      <p
                        class="mb-0 small"
                        :style="{ color: getPriorityColor(task.priority.id) }"
                      >
                        {{ task.priority.name }}
                      </p>
                    </div>

                    <!-- დეპარტამენტის ბლოკი -->
                    <p
                      class="department-badge"
                      :style="{
                        backgroundColor: getStatusColor(task.status.id),
                      }"
                    >
                      {{ task.department.name.split(" ")[0] }}
                    </p>
                  </div>
                  <div class="mb-3 mt-3">
                    <h3 class="h3style">
                      {{ task.name }}
                    </h3>
                    <h4 class="h4style">
                      {{ task.description }}
                    </h4>
                  </div>
                  <div class="col-12">
                    <div class="card-details mt-4">
                      <p class="h5 mb-4 font-weight-bold">დავალების დეტალები</p>

                      <div class="d-flex justify-content-between">
                        <div class="mb-3 me-5 mt-3">
                          <div class="mb-4">
                            <img
                              class="me-2"
                              :src="statusi"
                              alt="statusi"
                              style="width: 24px; height: 24px"
                            />
                            <span class="font-weight-bold">სტატუსი</span>
                          </div>
                          <div class="mb-4 d-flex">
                            <img
                              :src="user"
                              alt="user"
                              class="me-2"
                              style="width: 24px; height: 24px"
                            />
                            <span class="font-weight-bold">თანამშრომელი</span>
                          </div>
                          <div class="mb-4">
                            <img :src="time" alt="time" class="me-2" />

                            <span>დავალების დრო</span>
                          </div>
                        </div>
                        <div class="mb-3 mt-3 ms-5">
                          <div>
                            <p
                              class="mb-3"
                              style="font-size: 14px; margin-bottom: 27px"
                            >
                              <select
                                v-model="selectedStatus"
                                class="form-select"
                                name="status"
                                id="status"
                                aria-label="Select Status"
                              >
                                <option
                                  v-for="status in statuses"
                                  :key="status.id"
                                  :value="status.id"
                                >
                                  {{ status.name }}
                                </option>
                              </select>
                            </p>
                          </div>
                          <div
                            class="mb-3 d-flex align-items-center"
                            style="margin-bottom: 10px !important"
                          >
                            <img
                              :src="task.employee.avatar"
                              alt="avatar"
                              class="rounded-circle me-2"
                              style="
                                width: 40px;
                                height: 40px;
                                object-fit: cover;
                              "
                            />
                            <div>
                              <p class="mb-0 statusname">
                                {{ task.department.name.split(" ")[0] }}
                              </p>
                              <p
                                class="mb-0 font-weight-bold"
                                style="font-size: 14px"
                              >
                                {{ task.employee.name }}
                                {{ task.employee.surname }}
                              </p>
                            </div>
                          </div>

                          <div class="mb-2">
                            <div style="font-size: 14px">
                              {{ formatDate(task.due_date) }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p v-else>მონაცემები იტვირთება...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="">
          <div
            class="p-3 mt-5 rounded border"
            style="background-color: #f8f3fea6; border-color: #ddd2ff"
          >
            <form @submit.prevent="submitForm" class="w-100">
              <div class="position-relative">
                <textarea
                  v-model="newComment"
                  class="form-control"
                  placeholder="დაწერე კომენტარი"
                  style="height: 100px; padding-right: 60px; resize: none"
                ></textarea>
                <button
                  type="submit"
                  class="create-task position-absolute"
                  style="
                    width: 155px;
                    height: 35px;
                    bottom: 10px;
                    right: 10px;
                    height: 35px;
                    padding: 8px 20px;
                    border-radius: 20px;
                    gap: 10px;
                  "
                >
                  გაგზავნა
                </button>
              </div>
            </form>

            <div>
              <div class="comments-section">
                <div class="d-flex">
                  <p>კომენტარები</p>
                  <p class="text-center textcenter ms-2">
                    {{ comments.length }}
                  </p>
                </div>

                <div
                  v-for="comment in comments"
                  :key="comment.id"
                  class="comment"
                >
                  <div class="d-flex align-items-center">
                    <img
                      :src="comment.author_avatar"
                      :alt="comment.author_nickname"
                      class="avatar"
                    />
                    <div class="ms-2">
                      <strong>{{ comment.author_nickname }}</strong>
                      <p>
                        {{ comment.text }}
                      </p>
                    </div>
                  </div>
                </div>
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
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import user from "../assets/user.png";
import time from "../assets/time.png";
import statusi from "../assets/statusi.png";
import apiClient from "./apiClient";

const statuses = ref([]);
const selectedStatus = ref(null);
const task = ref(null);
const route = useRoute();
const comments = ref("");
const newComment = ref("");
const taskid = route.params.id;

const colors = ["#F7BC30", "#FB5607", "#FF006E", "#3A86FF"];
const color = ["#FA4D4D", "#08A508", "#FFBE0B"];

// სტატუსის განახლების ფუნქცვია
watch(selectedStatus, async (newStatus) => {
  if (!newStatus) return;
  try {
    const response = await apiClient.put(`/tasks/${taskid}`, {
      status_id: newStatus,
    });
    task.value = response.data;
  } catch (error) {
    console.log(error);
  }
});

// კომენტარის გაგზავნის ფუნქცია
const submitForm = async () => {
  if (!newComment.value.trim()) return;

  const formData = new FormData();
  formData.append("text", newComment.value);
  try {
    const response = await apiClient.post(
      `/tasks/${taskid}/comments`,
      formData
    );
    comments.value.unshift(response.data);
    console.log(response);
    clearForm();
  } catch (error) {
    console.log(error);
  }
};
const clearForm = () => {
  newComment.value = "";
};

// სტატუსების მიღების ფუნქცია
const getStatuses = async () => {
  try {
    const response = await httprequest.getStatuses();
    statuses.value = response.data;
    if (task.value && task.value.status) {
      selectedStatus.value = task.value.status.id;
    }
  } catch (error) {
    console.log(error);
  }
};
// კომენტარების მიღების ფუნქცია
const getAllComments = async () => {
  try {
    const response = await apiClient.get(`/tasks/${taskid}/comments`);
    comments.value = response.data;
    console.log(comments.value, "komentarebia");
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

// სტატუსების ფერის შეცვლის ფუნქცია1
const getStatusColor = (statusId) => {
  return colors[statusId % colors.length];
};

// პრიორიტეტების ფერის შეცვლის ფუნქცია
const getPriorityColor = (priorityId) => {
  return color[priorityId % color.length];
};

// ტასკების მიღების ფუნქცია
const getTask = async (taskid) => {
  try {
    const response = await httprequest.getTask(taskid);
    task.value = response.data;
    selectedStatus.value = task.value.status.id;
  } catch (error) {
    console.log(error);
  }
};

// თარიღის ფორმატირება
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ka-GE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

onMounted(async () => {
  await getTask(route.params.id);
  getStatuses();
  getAllComments();
});
</script>

<style>
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #ddd;
}

.comments-section {
  margin-top: 20px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
}

.comment {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}
.task-detail {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
}
.textcenter {
  width: 30px;
  height: 22px;
  color: #ffffff;
  border-radius: 30px;
  background-color: #8338ec;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-details {
  margin-top: 40px;
}
.priority-badge {
  display: flex;
  align-items: center;
  border: 0.5px solid;
  border-radius: 4px;
  height: 26px;
  padding: 4px 8px;
  font-size: 12px;
}
.statusname {
  font-size: 11px;
  font-weight: 300;
  line-height: 100%;
  color: #474747;
}
.department-badge {
  font-size: 12px;
  font-weight: 500;
  border-radius: 10px;
  padding: 4px 10px;
  color: white;
  margin-left: 10px;
}
.h3style {
  color: var(--Grey-SHades-Headlines, #212529);
  font-family: Inter;
  font-size: 34px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.h4style {
  color: #000;
  font-family: FiraGO;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
}
.avatar {
  width: 31px;
  height: 31px;
  border-radius: 50%;
}
</style>
