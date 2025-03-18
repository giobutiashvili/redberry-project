<template>
  <main class="my-4 p-0">
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
    <div class="p-0">
      <div class="d-flex flex-wrap">
        <button
          class="btn-status"
          v-for="(status, index) in statuses"
          :key="status.id"
          style="width: 381px; margin-right: 18px"
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
    <div class="mt-5 p-0">
      <div class="row" style="padding: 0">
        <div
          class="col-3 mb-3"
          style="height: 217px; width: 381px; margin-right: 18px"
          v-for="(task, index) in tasks"
          :key="task.id"
        >
          <router-link :to="{ name: 'taskDetail', params: { id: task.id } }">
            <div
              class="card"
              style="
                width: 381px;
                display: flex;
                flex-direction: column;
                border-radius: 15px;
                gap: 28px;
              "
              :style="{ border: '1px solid ' + colors[index % colors.length] }"
            >
              <div class="card-body d-flex flex-column">
                <div
                  class="d-flex align-items-center mb-2 justify-content-between"
                >
                  <div class="d-flex">
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

                  <div>
                    <time class="cardtitle">{{
                      formatDate(task.due_date)
                    }}</time>
                  </div>
                </div>
                <div>
                  <h4
                    style="
                      font-family: FiraGO;
                      font-size: 15px;
                      font-style: normal;
                      font-weight: 500;
                      line-height: normal;
                    "
                  >
                    {{ task.name }}
                  </h4>
                  <p
                    style="
                      font-family: FiraGO;
                      font-size: 14px;
                      font-style: normal;
                      font-weight: 400;
                      line-height: normal;
                    "
                  >
                    {{ task.description }}
                  </p>
                </div>
                <div
                  class="d-flex justify-content-between align-items-center mt-auto"
                >
                  <img
                    :src="task.employee.avatar"
                    alt="icon"
                    style="width: 31px; height: 31px; border-radius: 100px"
                  />

                  <div>
                    <img
                      :src="commentsimg"
                      alt="comments"
                      class="comments-icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import httprequest from "../httprequests/HttpRequests";
import { ref, onMounted } from "vue";
import commentsimg from "../assets/Comments.png";

const statuses = ref([]);
const colors = ["#F7BC30", "#FB5607", "#FF006E", "#3A86FF"];
const color = ["#FA4D4D", "#08A508", "#FFBE0B"];

const getStatusColor = (statusId) => {
  return colors[statusId % colors.length];
};

const getPriorityColor = (priorityId) => {
  return color[priorityId % color.length];
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ka-GE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};
// სტატუსების მიღება
const getStatuses = async () => {
  try {
    const response = await httprequest.getStatuses();
    statuses.value = response.data;
  } catch (error) {
    console.error(error);
  }
};
// კომენტარების მიღება

// პრიორიტეტების request-ი
const priorities = ref([]);
const getPriorities = async () => {
  try {
    const response = await httprequest.getPriorities();
    priorities.value = response.data;
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
  } catch (error) {
    console.error(error);
  }
};

// ყველა  task
const tasks = ref([]);

const getAllTasks = async () => {
  try {
    const response = await httprequest.getAllTasks();
    tasks.value = response.data;
    console.log(tasks.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getAllTasks();
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
p {
  margin: 0;
}

.btn-status {
  background-color: #8338ec;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 15px;
  font-size: 18px;
  font-weight: 500;
  line-height: 100%;
  width: 100%;
  max-width: 381px;
  text-align: center;
}
.card {
  height: 100%;
  width: 100%;
  max-width: 381px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

.department-badge {
  font-size: 12px;
  font-weight: 500;
  border-radius: 10px;
  padding: 4px 10px;
  color: white;
  margin-left: 10px;
}

.avatar {
  width: 31px;
  height: 31px;
  border-radius: 50%;
}

.comments-icon {
  width: 22px;
  height: 22px;
}
.cardtitle {
  font-family: FiraGO;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
</style>
